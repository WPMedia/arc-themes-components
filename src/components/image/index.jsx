import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({ alt, className, loading, src, resizedOptions, resizerURL, responsiveImages }) => {
	const { width, height } = resizedOptions;

	// todo: deduplicate logic with height and width
	const stringOptions = Object.keys(resizedOptions).reduce((acc, key, currentIndex) => {
		// on the first iteration need to prepend the ? to the string
		if (currentIndex === 0) {
			return `?${key}=${resizedOptions[key]}`;
		}
		return `${acc}&${key}=${resizedOptions[key]}`;
	}, "");
	// todo: will need to ignore height and width setting here
	// this will allow the options to be added in the srcset
	const stringOptionsWithoutHeightWidth = Object.keys(resizedOptions).reduce(
		(acc, key, currentIndex) => {
			if (key === "height" || key === "width") {
				return acc;
			}
			// on the first iteration need to prepend the ? to the string
			if (currentIndex === 0) {
				return `?${key}=${resizedOptions[key]}`;
			}
			return `${acc}&${key}=${resizedOptions[key]}`;
		},
		""
	);
	const srcWithOptions = resizerURL.concat(src, stringOptions);
	const srcWithOptionsWithoutHeightWidth = resizerURL.concat(src, stringOptionsWithoutHeightWidth);

	// todo: handle if there's no height and/or no width in the resized options
	// get the aspect ratio of the image based on the resizedOptions.width and height
	// height is 100px and width is 200px
	// aspect ratio is 2
	const aspectRatio = resizedOptions.width / resizedOptions.height;

	// divide the derived aspect ratio by each of the responsiveImages widths to get the height
	const responsiveHeightsAndWidths = responsiveImages.map((responsiveImageWidth) => ({
		width: responsiveImageWidth,
		height: responsiveImageWidth / aspectRatio,
	}));

	return (
		<img
			alt={alt}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			height={height}
			loading={loading}
			src={srcWithOptions}
			width={width}
			// todo: handle if no responsive images are provided
			srcSet={responsiveHeightsAndWidths
				.map(
					(responsiveImage) =>
						`${srcWithOptionsWithoutHeightWidth}&width=${responsiveImage.width}&height=${responsiveImage.height} ${responsiveImage.width}w`
				)
				.join(", ")}
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
