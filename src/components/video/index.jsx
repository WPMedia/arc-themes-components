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
const getEmbedHTMLWithPlayStatus = (embedMarkup, aspectRatio, powaFields = {}) => {
	if (embedMarkup) {
		const embedHTMLWithPlayStatus = convertStringToNode(embedMarkup);

		// set the rest of powa fields, minus aspect ratio
		// https://redirector.arcpublishing.com/alc/arc-products/videocenter/user-docs/video-center-player-settings/
		const powaFieldEntries = Object.entries(powaFields);

		// set aspect ratio
		// flip the resolution to match implementation in powa height / width
		embedHTMLWithPlayStatus
			.querySelector(".powa")
			.setAttribute("data-aspect-ratio", 1 / aspectRatio);

		powaFieldEntries.forEach(([key, value]) => {
			embedHTMLWithPlayStatus.querySelector(".powa").setAttribute(`data-${key}`, value);
		});

		// innerhtml ensures body tag not rendered
		return embedHTMLWithPlayStatus.innerHTML;
	}
	return "";
};

const Video = ({ className, aspectRatio, viewportPercentage, embedMarkup, powaFields }) => {
	// only render or call powaboot on client-side
	const isClientSide = typeof window !== "undefined";

	useEffect(() => {
		// will only ever run client-side as window object not available on server
		// if powaboot available, call it
		if (isClientSide && window.powaBoot) {
			window.powaBoot();
		}
	}, [isClientSide]);

	const containerClassNames = [COMPONENT_CLASS_NAME, className].filter((i) => i).join(" ");

	return (
		<div
			className={containerClassNames}
			style={{
				"--aspect-ratio": aspectRatio,
				"--height": viewportPercentage,
			}}
		>
			{isClientSide ? (
				<EmbedContainer markup={getEmbedHTMLWithPlayStatus(embedMarkup, aspectRatio, powaFields)}>
					<div
						dangerouslySetInnerHTML={{
							__html: getEmbedHTMLWithPlayStatus(embedMarkup, aspectRatio, powaFields),
						}}
					/>
				</EmbedContainer>
			) : null}
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
