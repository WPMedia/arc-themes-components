import PropTypes from "prop-types";
import formatSrcset from "../../../utils/format-srcset";

const Source = ({ height, media, resizerOptions, resizerURL, src, width, ...rest }) => {
	if (media && src) {
		if (resizerOptions?.auth) {
			return (
				<source
					{...rest}
					height={height}
					media={media}
					srcSet={formatSrcset(resizerURL.concat(src), resizerOptions, width, height)}
					width={width}
				/>
			);
		}
		return <source {...rest} media={media} srcSet={src} />;
	}
	return null;
};

Source.defaultProps = {
	resizerOptions: {},
	resizerURL: "",
	width: null,
	height: null,
};

Source.propTypes = {
	/** The intrinsic height of the image in pixels */
	height: PropTypes.number,
	/** Media query used for the tag's `media` attribute */
	media: PropTypes.string,
	/** Options to pass into v2 resizer. */
	resizerOptions: PropTypes.object,
	/** The URL of the resizer service. Should have a trailing slash */
	resizerURL: PropTypes.string,
	/** The URL to an image to load and display. Should not have a leading slash */
	src: PropTypes.string,
	/** The intrinsic width of the image in pixels */
	width: PropTypes.number,
};

export default Source;
