import PropTypes from "prop-types";

const COMPONENT_CLASS_NAME = "c-video";

const Video = ({ className, aspectRatio, viewportPercentage }) => {
	const videoIsLoading = true;

	const containerClassNames = [
		COMPONENT_CLASS_NAME,
		videoIsLoading && `${COMPONENT_CLASS_NAME}--not-loaded`,
		className,
	]
		.filter((i) => i)
		.join(" ");

	return (
		<div
			className={containerClassNames}
			style={{
				"--aspect-ratio": aspectRatio,
				"--viewport-percentage": viewportPercentage,
			}}
		/>
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
