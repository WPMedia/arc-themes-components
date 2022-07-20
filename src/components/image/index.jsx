import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({
	alt,
	className,
	loading,
	src,
	resizedOptions,
	resizerURL,
	responsiveImages,
	width,
	height,
	sizes,
}) => {
	// get the default height and width of the image
	// use aspect ratio to generate other sizes
	const { auth } = resizedOptions;

	if (!auth) {
		// eslint-disable-next-line no-console
		console.error("No auth token provided for resizer");

		return (
			<img
				alt={alt}
				className={className ? `${COMPONENT_CLASS_NAME} ${className}` : COMPONENT_CLASS_NAME}
				src={src}
				width={width}
				height={height}
			/>
		);
	}

	// ex: 'filter=filterHere&auth=abc123'
	const stringOptionsWithoutHeightWidth = new URLSearchParams(resizedOptions).toString();

	// "https://resizer.com" + "\image.jpg" + "?auth=secret&filter=true"
	const srcWithOptionsWithoutHeightWidth = resizerURL.concat(
		src,
		"?",
		stringOptionsWithoutHeightWidth
	);

	let aspectRatio = 0;

	// if no height and width, no responsive image calculation
	if (height && width) {
		aspectRatio = width / height;
	}

	const responsiveHeightsAndWidths = responsiveImages.reduce(
		(accumulator, responsiveImageWidth) => {
			if (Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0) {
				return [
					...accumulator,
					{
						width: responsiveImageWidth,
						// divide the derived aspect ratio by each of the responsiveImages widths to get the height
						// aspect ratio of zero will not show the height
						...(aspectRatio !== 0 && { height: responsiveImageWidth / aspectRatio }),
					},
				];
			}
			return accumulator;
		},
		[]
	);

	// add the height and width to the default src if they exist
	// auth token will at least exist here so don't need to worry about ? prepend
	const defaultSrc = srcWithOptionsWithoutHeightWidth.concat(
		`${width ? `&width=${width}` : ""}${height ? `&height=${height}` : ""}`
	);

	return (
		<img
			alt={alt}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : COMPONENT_CLASS_NAME}
			height={height}
			loading={loading}
			src={defaultSrc}
			width={width}
			srcSet={
				responsiveHeightsAndWidths
					.map(
						(responsiveImage) =>
							`${srcWithOptionsWithoutHeightWidth}&width=${responsiveImage.width}${
								responsiveImage?.height ? `&height=${responsiveImage.height}` : ""
							} ${responsiveImage.width}w`
					)
					.join(", ") || null
			}
			sizes={
				sizes
					? sizes
							.reduce((sizesStringList, currentSizeObject) => {
								if (currentSizeObject.isDefault) {
									return sizesStringList;
								}
								return `${sizesStringList}${currentSizeObject.mediaCondition} ${currentSizeObject.sourceSizeValue}, `;
							}, "")
							.concat(
								sizes.find((currentSizeObject) => currentSizeObject.isDefault)?.sourceSizeValue ||
									""
							)
					: null
			}
		/>
	);
};

Image.defaultProps = {
	alt: "",
	loading: "lazy",
	resizedOptions: {},
	resizerURL: "",
	responsiveImages: [],
	sizes: "",
	width: null,
	height: null,
};

Image.propTypes = {
	/** Alt text for the image - if not set the image will be treated as decorative */
	alt: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The intrinsic height of the image in pixels */
	height: PropTypes.number,
	/** Indication of how the browser should load the image, using the native loading attribute of an <img /> tag */
	loading: PropTypes.oneOf(["lazy", "eager"]),
	/** Options to pass into v2 resizer, with height and width being used for img tag as well */
	resizedOptions: PropTypes.shape({}),
	/** The URL of the resizer service */
	resizerURL: PropTypes.string,
	/** Array of widths to use as sizes for the image */
	responsiveImages: PropTypes.arrayOf(PropTypes.number),
	/** The options relating to each of the available srcset options of the image */
	sizes: PropTypes.arrayOf(
		PropTypes.shape({
			/** Whether it's the default last size available */
			isDefault: PropTypes.bool,
			/** The intrinsic width of the image in pixels or responsive units */
			sourceSizeValue: PropTypes.string,
			/** Media condition to render the corresponding source size value */
			mediaCondition: PropTypes.string,
		})
	),
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
	/** The URL to an image to load and display */
	src: PropTypes.string.isRequired,
};

export default Image;
