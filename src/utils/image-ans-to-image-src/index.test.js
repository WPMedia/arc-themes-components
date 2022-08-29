import imageANSToImageSrc from ".";

describe("imageANSToImageSrc", () => {
	it("return image src with ext", () => {
		expect(imageANSToImageSrc({ _id: 123, url: "test.jpg" })).toBe("123.jpg");
		expect(imageANSToImageSrc({ _id: 123, url: "test.test.jpg" })).toBe("123.jpg");
		expect(imageANSToImageSrc({ _id: 321, url: "test.test.jpeg" })).toBe("321.jpeg");
	});

	it("will return null if incorrect ANS data", () => {
		expect(imageANSToImageSrc({ _id: 123, url: "testjpg" })).toBe(null);
		expect(imageANSToImageSrc({ _id: 123 })).toBe(null);
		expect(imageANSToImageSrc({ url: "testjpg" })).toBe(null);
		expect(imageANSToImageSrc()).toBe(null);
	});
});
