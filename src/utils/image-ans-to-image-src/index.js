/**
 * Helper to take an ANS image object and return an src string
 *
 * @param data ANS Image Object
 *
 * @return an image string to be used in the src of a image tag
 */
const imageANSToImageSrc = (data) => {
	const { _id: id, url } = data || {};

	if (id && url) {
		const urlParts = url.split(".");
		if (urlParts.length !== 1) {
			return `${id}.${urlParts.pop()}`;
		}
	}

	return null;
};

export default imageANSToImageSrc;
