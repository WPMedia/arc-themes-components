import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-image";

const Image = ({ alt, className, height, loading, src, width }) => (
	<img
		alt={alt}
		className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
		height={height}
		loading={loading}
		src={src}
		width={width}
	/>
);

Image.defaultProps = {
	alt: "",
	loading: "lazy",
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
	/** The URL to an image to load and display */
	src: PropTypes.string.isRequired,
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
};

export default Image;
