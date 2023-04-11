import { localizeDate, localizeDateTime } from ".";

describe("localizeDate()", () => {
	// supported locale and timezone if no blocks.json found
	it("returns us east expected output with at", () => {
		expect(localizeDate("2000-01-02", "%B %d, %Y", "en", "America/New_York")).toEqual(
			"January 01, 2000"
		);
	});

	// unsupported locale and timezone if no blocks.json found
	it("returns American english language and utc date for timezone not found", () => {
		expect(localizeDate("2000-01-02 01:00", "%B %d, %Y", "wrong_LANG", "Incorrect/Zone")).toEqual(
			"January 02, 2000"
		);
	});

	it("returns empty when no date is passed in", () => {
		expect(localizeDate()).toEqual("");
	});

	it("uses the default format if invalid", () => {
		expect(localizeDate("2000-01-02", "    ")).toEqual("January 01, 2000");
	});
});

describe("lcoalizeDateTime()", () => {
	// supported locale and timezone if no blocks.json found
	it("returns us east expected output with at", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M %P %Z", "en", "America/New_York")
		).toEqual("January 01, 2000 at  8:00 pm EST");
	});

	// unsupported locale and timezone if no blocks.json found
	it("returns American english language and utc date for timezone not found", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "wrong_LANG", "Incorrect/Zone")
		).toEqual("January 02, 2000  1:00 am UTC");
	});

	// supported locale if no blocks.json found
	// unsupported timezone if no blocks.json found
	it("returns correct Korean language for locale ko but falls back to UTC", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "ko", "Incorrect/Zone")
		).toEqual("1월 02, 2000  1:00 오전 UTC");
	});

	// supported timezone by default if no blocks.json found
	// supported language en to show am/pm
	// Pacific/Auckland GMT+13
	it("supports Auckland timezone", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "en", "Pacific/Auckland")
		).toEqual("January 02, 2000  2:00 pm NZDT");
	});

	// supported timezone by default if no blocks.json found
	// paris (GMT+1)
	it("supports Paris timezone", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "en", "Europe/Paris")
		).toEqual("January 02, 2000  2:00 am CET");
	});

	it("handles french meridiems", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "fr", "Europe/Paris")
		).toEqual("janvier 02, 2000  2:00 am CET");
	});

	it("handles spanish meridiems", () => {
		expect(
			localizeDateTime("2000-01-02 13:00", "%B %d, %Y %l:%M %P %Z", "es", "Europe/Paris")
		).toEqual("enero 02, 2000  2:00 pm CET");
	});

	it("returns empty when no date is passed in", () => {
		expect(localizeDateTime()).toEqual("");
	});

	it("uses the default format if invalid", () => {
		expect(localizeDateTime("2000-01-02 01:00", "   ")).toEqual("January 01, 2000 at  8:00PM EST");
	});

	it("returns Swedish locale", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M%p %Z", "sv", "America/New_York")
		).toEqual("januari 01, 2000 at  8:00PM EST");
	});

	it("returns Norwegian locale", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M%p %Z", "no", "America/New_York")
		).toEqual("januar 01, 2000 at  8:00PM EST");
	});

	it("returns German locale", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M%p %Z", "de", "America/New_York")
		).toEqual("Januar 01, 2000 at  8:00PM EST");
	});

	it("returns Japanese locale", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M%p %Z", "ja", "America/New_York")
		).toEqual("1月 01, 2000 at  8:00午後 EST");
	});

	it("returns Portuguese locale", () => {
		expect(
			localizeDateTime("2000-01-02 01:00", "%B %d, %Y at %l:%M%p %Z", "pt", "America/New_York")
		).toEqual("Janeiro 01, 2000 at  8:00PM EST");
	});
});
