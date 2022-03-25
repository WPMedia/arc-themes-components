import { useEffect } from "react";
import PropTypes from "prop-types";
import EmbedContainer from "react-oembed-container";

const COMPONENT_CLASS_NAME = "c-video";

// simple util function
function convertStringToNode(string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(string, "text/html");
	// get the body, will return <body> around your code
	return doc.body;
}

// taking in embed code
// adding on any powa fields
// todo: return the embed code with the correct statuses
const getEmbedHTMLWithPlayStatus = (embedMarkup) => {
	if (embedMarkup) {
		const embedHTMLWithPlayStatus = convertStringToNode(embedMarkup);

		// innerhtml ensures body tag not rendered
		return embedHTMLWithPlayStatus.innerHTML;
	}
	return "";
};

const Video = ({ className, aspectRatio, viewportPercentage, embedMarkup }) => {
	useEffect(() => {
		// will only ever run client-side as window object not available on server
		// if powaboot available, call it
		if (window.powaBoot) {
			window.powaBoot();
		}
	}, []);

	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");

	return (
		<div
			className={containerClassNames}
			style={{
				"--aspect-ratio": aspectRatio,
				"--viewport-percentage": viewportPercentage,
			}}
		>
			<EmbedContainer markup={getEmbedHTMLWithPlayStatus(embedMarkup)}>
				<div dangerouslySetInnerHTML={{ __html: getEmbedHTMLWithPlayStatus(embedMarkup) }} />
			</EmbedContainer>
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
