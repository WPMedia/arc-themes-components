const formatSrc = (src, resizerOptions, width, height) =>
	// Use resizerOptions as querystring params on the src URL. If width and/or height are provided
	// both in resizerOptions as well as function arguments, the function arguments will be used.
	src.concat(
		"?",
		new URLSearchParams({
			...resizerOptions,
			...(width ? { width } : {}),
			...(height ? { height } : {}),
		}).toString()
	);

export default formatSrc;
