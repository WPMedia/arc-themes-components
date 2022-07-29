import formatSrcset from ".";

describe("format sourceset", () => {
	it("without width or height params", () => {
		expect(
			formatSrcset("https://www.test.org/image.jpg", {
				auth: "xyz123",
				filter: 70,
				smart: true,
			})
		).toBe("https://www.test.org/image.jpg?auth=xyz123&filter=70&smart=true");
	});

	it("with width and height included as resizer options", () => {
		expect(
			formatSrcset("https://www.test.org/image.jpg", {
				auth: "xyz123",
				filter: 70,
				smart: true,
				width: 100,
				height: 100,
			})
		).toBe("https://www.test.org/image.jpg?auth=xyz123&filter=70&smart=true&width=100&height=100");
	});

	it("with width and height as explicit params, not as resizer options", () => {
		expect(
			formatSrcset(
				"https://www.test.org/image.jpg",
				{
					auth: "xyz123",
					filter: 70,
					smart: true,
				},
				50,
				50
			)
		).toBe("https://www.test.org/image.jpg?auth=xyz123&filter=70&smart=true&width=50&height=50");
	});

	it("with width and height explicit params overriding dimensions provided as resizer options", () => {
		expect(
			formatSrcset(
				"https://www.test.org/image.jpg",
				{
					auth: "xyz123",
					filter: 70,
					smart: true,
					width: 100,
					height: 100,
				},
				50,
				50
			)
		).toBe("https://www.test.org/image.jpg?auth=xyz123&filter=70&smart=true&width=50&height=50");
	});
});
