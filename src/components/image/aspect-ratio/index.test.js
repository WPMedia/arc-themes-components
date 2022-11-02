import calculateAspectRatio from ".";

describe("calculateAspectRatio", () => {
	it("return aspect ratio based on width and height ", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", width: 1600, height: 900 })).toBe(
			1.7777777777777777
		);
	});

	it("returns aspect ratio based on ansImage width", () => {
		expect(
			calculateAspectRatio({ aspectRatio: "16:9", width: 800, ansImage: { width: 1600 } })
		).toBe(1.7777777777777777);
	});

	it("returns aspect ratio based on width", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", width: 1600 })).toBe(1.7777777777777777);
	});

	it("returns aspect ratio based on height", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9", height: 1600 })).toBe(1.7777777777777777);
	});

	it("returns 0 if no width or height", () => {
		expect(calculateAspectRatio({ aspectRatio: "16:9" })).toBe(0);
	});
});
