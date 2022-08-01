import PropTypes from "prop-types";
import formatSrcset from "../../../utils/format-srcset";

const Source = ({ height, media, resizerOptions, resizerURL, src, width, ...rest }) => {
	if (media && src) {
		if (resizerOptions && resizerOptions.auth) {
			return (
				<source
					{...rest}
					className="c-picture__source"
					height={height}
					media={media}
					srcSet={formatSrcset(resizerURL.concat(src), resizerOptions, width, height)}
					width={width}
				/>
			);
		}
		return <source {...rest} className="c-picture__source" media={media} srcSet={src} />;
	}
	return null;
};

Source.defaultProps = {};

Source.propTypes = {
	/** TODO */
	height: PropTypes.number,
	/** Media query of the src media */
	media: PropTypes.string,
	/** Options to pass into v2 resize. */
	resizerOptions: PropTypes.object,
	/** TODO: The complete URL of the image source. */
	resizerURL: PropTypes.string,
	/** TODO */
	src: PropTypes.string,
	/** TODO */
	width: PropTypes.number,
};

export default Source;
