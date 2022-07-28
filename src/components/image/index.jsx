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

	// "https://resizer.com/" + "image.jpg" + "?auth=secret&filter=true"
	const srcWithOptionsWithoutHeightWidth = resizerURL.concat(
		src,
		"?",
		new URLSearchParams(resizedOptions).toString()
	);

	// add the height and width to the default src if they exist
	// auth token will at least exist here so don't need to worry about ? prepend
	const defaultSrc = srcWithOptionsWithoutHeightWidth.concat(
		`${width ? `&width=${width}` : ""}`,
		`${height ? `&height=${height}` : ""}`
	);

	// if no height and width, no responsive image calculation
	const aspectRatio = height && width ? width / height : 0;
	const responsiveSrcSet =
		responsiveImages
			.filter(
				(responsiveImageWidth) => Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0
			)
			.map((responsiveImageWidth) =>
				// divide the derived aspect ratio by each of the responsiveImages widths to get the height
				// aspect ratio of zero will not show the height
				srcWithOptionsWithoutHeightWidth.concat(
					`&width=${responsiveImageWidth}`,
					`${aspectRatio !== 0 && height ? `&height=${responsiveImageWidth / aspectRatio}` : ""}`,
					` ${responsiveImageWidth}w`
				)
			)
			.join(", ") || null;

	const responsiveSizes = sizes
		? sizes
				.filter(({ isDefault }) => !isDefault)
				.map(({ mediaCondition, sourceSizeValue }) => `${mediaCondition} ${sourceSizeValue}`)
				.concat(
					sizes.find((currentSizeObject) => currentSizeObject.isDefault)?.sourceSizeValue || []
				)
				.join(", ")
		: null;

	return (
		<img
			alt={alt}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : COMPONENT_CLASS_NAME}
			height={height}
			loading={loading}
			src={defaultSrc}
			width={width}
			srcSet={responsiveSrcSet}
			sizes={responsiveSizes}
		/>
	);
};

Image.defaultProps = {
	alt: "",
	loading: "lazy",
	resizedOptions: {},
	resizerURL: "",
	responsiveImages: [],
	sizes: [],
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
	/** Options to pass into v2 resizer */
	resizedOptions: PropTypes.object,
	/** The URL of the resizer service. Should have a trailing slash */
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
	/** The URL to an image to load and display. Should not have a leading slash */
	src: PropTypes.string.isRequired,
};

export default Image;
