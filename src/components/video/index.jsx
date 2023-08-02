import { useEffect } from "react";
import PropTypes from "prop-types";
import EmbedContainer from "react-oembed-container";
import formatPowaVideoEmbed from "../../utils/format-powa-video-embed";

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

	const truncate = (num) => Math.trunc(num * 10000) / 10000;

	// console.log(`--- Aspect ratio: ${embedAspectRatio} | VideoAspectRatio: ${videoAspectRatio} ---`);
	let retVal;

	// If the aspect ratio is passed in (promo blocks do this), then use that instead
	if (aspectRatio) {
		// console.log("If statement triggered");
		// const [w, h] = aspectRatio.split(":");

		const [w, h] = aspectRatio ? aspectRatio.split(":") : [16, 9];
		const videoAspectRatio = truncate(h / w);

		const embedMarkupWithAspectRatio = formatPowaVideoEmbed(embedMarkup, {
			"aspect-ratio": videoAspectRatio,
		});

		retVal = (
			<div className={`${COMPONENT_CLASS_NAME}__frame`}>
				<div
					{...rest}
					className={containerClassNames}
					style={{
						"--aspect-ratio": truncate(w / h),
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
	} else {
		// Extract the aspect ratio from embedMarkup
		const searchResult = /data-aspect-ratio="([.0-9]+)"/.exec(embedMarkup);
		const embedAspectRatio = parseFloat(searchResult[1]);
		const videoAspectRatio = truncate(1 / embedAspectRatio);

		// console.log(`--- Aspect ratio: ${embedAspectRatio} | VideoAspectRatio: ${videoAspectRatio} ---`);

		const embedMarkupWithAspectRatio = embedMarkup;

		// console.log("-----------------------------------------------------------");
		// console.log(`Passed-in aspectRatio: ${aspectRatio} and viewportPercentage: ${viewportPercentage}`);
		// console.log(`Calculated aspect ratio: ${truncate(w / h)}`);
		// console.log(`Calculated videoAspectRatio: ${videoAspectRatio}`);
		// console.log(embedMarkup);
		// console.log(`--- Aspect ratio: ${embedAspectRatio} | VideoAspectRatio: ${videoAspectRatio} ---`);
		// console.log("-----------------------------------------------------------");

		retVal = (
			<div className={`${COMPONENT_CLASS_NAME}__frame`}>
				<div
					{...rest}
					className={containerClassNames}
					style={{
						"--aspect-ratio": videoAspectRatio,
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
	}

	return retVal;
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
