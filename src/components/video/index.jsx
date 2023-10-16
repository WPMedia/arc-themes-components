import { useEffect } from "react";
import PropTypes from "prop-types";
import EmbedContainer from "react-oembed-container";
import formatPowaVideoEmbed from "../../utils/format-powa-video-embed";

const COMPONENT_CLASS_NAME = "c-video";

const Video = ({
	className,
	aspectRatio,
	viewportPercentage,
	embedMarkup,
	borderRadius,
	...rest
}) => {
	// only render or call powaboot on client-side
	const shouldRenderVideoContent = embedMarkup && typeof window !== "undefined";

	useEffect(() => {
		// will only ever run client-side as window object not available on server
		// if powaboot available, call it
		if (shouldRenderVideoContent && window.powaBoot) {
			window.powaBoot();
		}
	}, [shouldRenderVideoContent]);

	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");

	const truncate = (num) => Math.trunc(num * 10000) / 10000;

	const [w, h] = aspectRatio ? aspectRatio.split(":") : [16, 9];
	const videoAspectRatio = truncate(h / w);

	const updatedEmbedMarkup = formatPowaVideoEmbed(embedMarkup, {
		"aspect-ratio": videoAspectRatio,
		"border-radius": videoAspectRatio > 1 ? borderRadius : undefined,
	});

	return (
		<div className={`${COMPONENT_CLASS_NAME}__frame`}>
			<div
				{...rest}
				className={containerClassNames}
				style={{
					"--aspect-ratio": truncate(w / h),
					"--height": videoAspectRatio > 1 ? viewportPercentage : 65,
				}}
			>
				{shouldRenderVideoContent ? (
					<EmbedContainer markup={updatedEmbedMarkup}>
						<div
							dangerouslySetInnerHTML={{
								__html: updatedEmbedMarkup,
							}}
						/>
					</EmbedContainer>
				) : null}
			</div>
		</div>
	);
};

Video.propTypes = {
	/** Class name(s) that get appended to default class name of the component */
	className: PropTypes.string,
	/** The aspect ratio of the video */
	aspectRatio: PropTypes.string,
	/* The vertical percentage of the viewport takes up */
	viewportPercentage: PropTypes.number,
	/* The vertical percentage of the viewport takes up */
	borderRadius: PropTypes.number,
};

export default Video;
