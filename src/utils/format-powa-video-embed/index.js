const isEqual = (object1, object2) => {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length === keys2.length) {
		return !keys1.find((key) => object1[key] !== object2[key]);
	}
	return false;
};

const formatPowaVideoEmbed = (embedMarkup, powaFields = {}) => {
	if (embedMarkup) {
		// get markup as node to set properties
		const parser = new DOMParser();
		const doc = parser.parseFromString(embedMarkup, "text/html");
		const embedHTMLWithPlayStatus = doc.body;
		if (
			isEqual(powaFields, { "aspect-ratio": 0.562 }) ||
			isEqual(powaFields, { "aspect-ratio": 0.5625 })
		) {
			return embedHTMLWithPlayStatus.innerHTML;
		}
		const powaFieldEntries = Object.entries(powaFields).filter(
			([, value]) => typeof value !== "undefined"
		);

		// set the rest of powa fields
		// https://redirector.arcpublishing.com/alc/arc-products/videocenter/user-docs/video-center-player-settings/
		powaFieldEntries.forEach(([key, value]) => {
			embedHTMLWithPlayStatus.querySelector(".powa")?.setAttribute(`data-${key}`, value);
		});

		// innerhtml ensures body tag not rendered
		return embedHTMLWithPlayStatus.innerHTML;
	}
	return "";
};

export default formatPowaVideoEmbed;
