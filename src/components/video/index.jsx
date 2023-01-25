import { useEffect } from "react";
import PropTypes from "prop-types";
import EmbedContainer from "react-oembed-container";

const COMPONENT_CLASS_NAME = "c-video";

const Video = ({ className, aspectRatio, viewportPercentage, embedMarkup, ...rest }) => {
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

	const embedMarkupWithAspectRatio =
		aspectRatio === "16:9" || !aspectRatio
			? embedMarkup
			: embedMarkup?.replace("0.562", aspectRatio.split(":")[1] / aspectRatio.split(":")[0]);

	const aspectRatioFormatted = aspectRatio ? aspectRatio.replace(":", "/") : "16/9";

	return (
		<div className={`${COMPONENT_CLASS_NAME}__frame`}>
			<div
				{...rest}
				className={containerClassNames}
				style={{
					"--aspect-ratio": aspectRatioFormatted,
					"--height": viewportPercentage,
				}}
			>
				{shouldRenderVideoContent ? (
					<EmbedContainer markup={embedMarkupWithAspectRatio}>
						<div
							dangerouslySetInnerHTML={{
								__html: embedMarkupWithAspectRatio,
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
	aspectRatio: PropTypes.oneOf(["16:9", "3:2", "4:3"]),
	/* The vertical percentage of the viewport takes up */
	viewportPercentage: PropTypes.number,
};

export default Video;
