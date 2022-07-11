import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({ alt, className, loading, src, resizedOptions }) => {
	const { width, height } = resizedOptions;
	const stringOptions = Object.keys(resizedOptions).reduce((acc, key, currentIndex) => {
		// on the first iteration need to prepend the ? to the string
		if (currentIndex === 0) {
			return `?${key}=${resizedOptions[key]}`;
		}
		return `${acc}&${key}=${resizedOptions[key]}`;
	}, "");
	const srcWithOptions = src.concat(stringOptions);
	return (
		<img
			alt={alt}
			className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			height={height}
			loading={loading}
			src={srcWithOptions}
			width={width}
		/>
	);
};

Image.defaultProps = {
	alt: "",
	loading: "lazy",
	resizedOptions: {},
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
	/** The URL to an image to load and display */
	src: PropTypes.string.isRequired,
};

export default Image;
