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
				const fileExtension = urlParts.pop();
				if (fileExtension.includes(id)) {
					// This can happen when there is no file extension on the image URL.
					// Return only the ID forced to be a string.
					return `${id}`;
				}
				return `${id}.${fileExtension}`;
			}
		} else if (auth) {
			return encodeURIComponent(url);
		}
	}
	return null;
};

export default imageANSToImageSrc;
