const formatSrc = (src, resizedOptions, width, height) =>
	// Use resizedOptions as querystring params on the src URL. If width and/or height are provided
	// both in resizedOptions as well as function arguments, the function arguments will be used.
	src.concat(
		"?",
		new URLSearchParams({
			...resizedOptions,
			...(width ? { width } : {}),
			...(height ? { height } : {}),
		}).toString()
	);

export default formatSrc;
