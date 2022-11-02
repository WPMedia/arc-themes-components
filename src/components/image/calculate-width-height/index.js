const calculateWidthAndHeight = ({ aspectRatio = "", width, height, ansImage = {} }) => {
	if (width && height) {
		return { width, height };
	}

	const [w, h] = aspectRatio.split(":");
	const imageWidth = ansImage?.width || width;

	if (aspectRatio && imageWidth) {
		const calculatedHeight = (h / w) * imageWidth;
		return { width: imageWidth, height: Math.floor(calculatedHeight) };
	}

	if (aspectRatio && height) {
		const calculatedWidth = (w / h) * height;
		return { width: Math.floor(calculatedWidth), height };
	}

	return {
		width: width || null,
		height: height || null,
	};
};

export default calculateWidthAndHeight;
