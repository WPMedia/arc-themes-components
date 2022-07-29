const formatSrcset = (src, resizerOptions, width, height) =>
	// TODO : Update comment
	// Append resizerOptions to src as a querystring params:
	// "https://resizer.com/image.jpg" + "?auth=secret&filter=true"
	src.concat(
		"?",
		new URLSearchParams({
			...resizerOptions,
			...(width ? { width } : {}),
			...(height ? { height } : {}),
		}).toString()
	);

export default formatSrcset;
