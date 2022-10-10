import getProperties from "fusion:properties";

import usePhrases from ".";

jest.mock("fusion:properties");

describe("usePhrases hook", () => {
	it("should return phrases object", () => {
		expect(usePhrases()).toHaveProperty("t");
		expect(typeof usePhrases().t).toBe("function");
	});
	it("should default to 'en' if no locale property is found", () => {
		getProperties.mockImplementationOnce(() => ({}));
		expect(usePhrases()).toHaveProperty("t");
		expect(typeof usePhrases().t).toBe("function");
	});
});
