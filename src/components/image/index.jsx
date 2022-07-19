import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({ alt, className, loading, src, resizedOptions, resizerURL, responsiveImages }) => {
	// get the default height and width of the image
	// use aspect ratio to generate other sizes
	const { width, height, auth } = resizedOptions;

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

	let aspectRatio = 0;

	if (height && width) {
		aspectRatio = width / height;
	}

	// add all options except height and width
	const stringOptionsWithoutHeightWidth = Object.keys(resizedOptions).reduce((acc, key) => {
		// skip height and width setting to account for different sizes
		if (key === "height" || key === "width") {
			return acc;
		}

		if (acc === "") {
			return `?${key}=${resizedOptions[key]}`;
		}

		return `${acc}&${key}=${resizedOptions[key]}`;
	}, "");

	// "https://resizer.com" + "\image.jpg" + "?auth=secret&filter=true"
	const srcWithOptionsWithoutHeightWidth = resizerURL.concat(src, stringOptionsWithoutHeightWidth);

	let responsiveHeightsAndWidths = [];
	if (aspectRatio === 0) {
		responsiveHeightsAndWidths = responsiveImages.reduce((accumulator, responsiveImageWidth) => {
			if (Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0) {
				return [
					...accumulator,
					{
						width: responsiveImageWidth,
					},
				];
			}
			return accumulator;
		}, []);
	} else {
		// divide the derived aspect ratio by each of the responsiveImages widths to get the height
		responsiveHeightsAndWidths = responsiveImages.reduce((accumulator, responsiveImageWidth) => {
			if (Number.isInteger(responsiveImageWidth) && responsiveImageWidth > 0) {
				return [
					...accumulator,
					{
						width: responsiveImageWidth,
						height: responsiveImageWidth / aspectRatio,
					},
				];
			}
			return accumulator;
		}, []);
	}

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
				responsiveHeightsAndWidths.length > 0
					? responsiveHeightsAndWidths
							.map(
								(responsiveImage) =>
									`${srcWithOptionsWithoutHeightWidth}&width=${responsiveImage.width}${
										responsiveImage?.height ? `&height=${responsiveImage.height}` : ""
									} ${responsiveImage.width}w`
							)
							.join(", ")
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
};

Image.propTypes = {
	/** Alt text for the image - if not set the image will be treated as decorative */
	alt: PropTypes.string,
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Indication of how the browser should load the image, using the native loading attribute of an <img /> tag */
	loading: PropTypes.oneOf(["lazy", "eager"]),
	/** Options to pass into v2 resizer, with height and width being used for img tag as well */
	resizedOptions: PropTypes.shape({
		/** The intrinsic width of the image in pixels */
		width: PropTypes.number,
		/** The intrinsic height of the image in pixels */
		height: PropTypes.number,
	}),
	/** The URL of the resizer service */
	resizerURL: PropTypes.string,
	/** Array of widths to use as sizes for the image */
	responsiveImages: PropTypes.arrayOf(PropTypes.number),
	/** The URL to an image to load and display */
	src: PropTypes.string.isRequired,
};

export default Image;
