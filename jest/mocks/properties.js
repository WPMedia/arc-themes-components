export default jest.fn(() => ({
	locale: "en",
	resizerURL: "http://default-resizer.com/",
	resizerURLs: {
		prod: "http://env-resizer.com/",
		stage: "http://stage-resizer.com/",
	},
}));
