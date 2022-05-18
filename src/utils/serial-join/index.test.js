import serialJoin from ".";

describe("serial join utility function", () => {
	it("should return empty string if nothing passed in", () => {
		expect(serialJoin()).toBe("");
	});
	it("should return empty string if empty array passed in", () => {
		expect(serialJoin([])).toBe("");
	});
	it("should return empty string if null", () => {
		expect(serialJoin([null])).toBe("");
	});
	it("should return empty string if undefined value passed in", () => {
		expect(serialJoin([undefined])).toBe("");
	});
	it("should return properly formatted for a single item", () => {
		expect(serialJoin(["one"])).toBe("one");
	});
	it("should return properly formatted for two items", () => {
		expect(serialJoin(["one", "two"])).toBe("one and two");
	});
	it("should return properly formatted for three items", () => {
		expect(serialJoin(["one", "two", "three"])).toBe("one, two, and three");
	});
	it("should return properly formatted for three items for custom conjunction", () => {
		expect(serialJoin(["one", "two", "three"], "or")).toBe("one, two, or three");
	});
	it("should return properly formatted for three items for custom delimiter", () => {
		expect(serialJoin(["one", "two", "three"], undefined, "/")).toBe("one/ two/ and three");
	});
	it("should return properly formatted for three items for custom spacer", () => {
		expect(serialJoin(["one", "two", "three"], undefined, undefined, "")).toBe("one,two,andthree");
	});
	it("should not render inappropriate values", () => {
		expect(serialJoin([[], "one", null, "two", undefined, "three", {}])).toBe(
			"one, two, and three"
		);
	});
});
