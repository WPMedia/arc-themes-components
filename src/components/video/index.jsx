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

	return (
		<div className={`${COMPONENT_CLASS_NAME}__frame`}>
			<div
				{...rest}
				className={containerClassNames}
				style={{
					"--aspect-ratio": aspectRatio,
					"--height": viewportPercentage,
				}}
			>
				{shouldRenderVideoContent ? (
					<EmbedContainer markup={embedMarkup}>
						<div
							dangerouslySetInnerHTML={{
								__html: embedMarkup,
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
	aspectRatio: PropTypes.number,
	/* The vertical percentage of the viewport takes up */
	viewportPercentage: PropTypes.number,
};

export default Video;
