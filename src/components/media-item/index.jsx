import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-media-item";

const MediaItem = ({ alt, caption, className, credit, title, height, loading, src, width }) => (
	<>
		{title || caption || credit || src ? (
			<figcaption
				className={className ? `${COMPONENT_CLASS_NAME} ${className}` : `${COMPONENT_CLASS_NAME}`}
			>
				{src ? (
					<img
						alt={alt}
						className={`${COMPONENT_CLASS_NAME}__image`}
						height={height}
						loading={loading}
						src={src}
						width={width}
					/>
				) : null}
				{title ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${title} ` }}
						className={`${COMPONENT_CLASS_NAME}__title`}
					/>
				) : null}
				{caption ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${caption} ` }}
						className={`${COMPONENT_CLASS_NAME}__caption`}
					/>
				) : null}
				{credit ? (
					<span
						dangerouslySetInnerHTML={{ __html: `${credit} ` }}
						className={`${COMPONENT_CLASS_NAME}__credit`}
					/>
				) : null}
			</figcaption>
		) : null}
	</>
);

MediaItem.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** Title is the first area in the component, if present */
	title: PropTypes.node,
	/** Caption is the second area in the component, if present */
	caption: PropTypes.node,
	/** Credit is the third area in the component, if present */
	credit: PropTypes.node,
	/** The intrinsic height of the image in pixels */
	height: PropTypes.number,
	/** Indication of how the browser should load the image, using the native loading attribute of an <img /> tag */
	loading: PropTypes.oneOf(["lazy", "eager"]),
	/** The URL to an image to load and display */
	src: PropTypes.string.isRequired,
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
	/** Alt text for the image - if not set the image will be treated as decorative */
	alt: PropTypes.string,
};

MediaItem.defaultProps = {
	alt: "",
	loading: "lazy",
};

export default MediaItem;
