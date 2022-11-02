const calculateAspectRatio = ({ aspectRatio = "", width, height, ansImage = {} }) => {
	if (width && height) {
		return width / height;
	}

	const [w, h] = aspectRatio.split(":");
	const imageWidth = ansImage?.width || width;

	if (aspectRatio && imageWidth) {
		const calculatedHeight = (h / w) * imageWidth;
		return imageWidth / calculatedHeight;
	}

	if (aspectRatio && height) {
		const calculatedWidth = (h / w) * height;
		return height / calculatedWidth;
	}

	return 0;
};

export default calculateAspectRatio;
