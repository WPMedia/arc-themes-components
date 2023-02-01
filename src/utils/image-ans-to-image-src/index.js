/**
 * Helper to take an ANS image object and return an src string
 *
 * @param data ANS Image Object
 *
 * @return an image string to be used in the src of a image tag
 */
const imageANSToImageSrc = (data) => {
	const { _id: id, auth, url } = data || {};
	if (url) {
		if (id) {
			const urlParts = url.split(".");
			if (urlParts.length !== 1) {
				return `${id}.${urlParts.pop()}`;
			}
		} else if (auth) {
			return encodeURI(url);
		}
	}
	return null;
};

export default imageANSToImageSrc;
