import localizeDateHelper from "./helper";

// supported locale and timezone if no blocks.json found
it("returns us east expected output with at", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y at %l:%M %P %Z", "en", "America/New_York")
	).toEqual("January 01, 2000 at  8:00 pm EST");
});

// unsupported locale and timezone if no blocks.json found
it("returns American english language and utc date for timezone not found", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "wrong_LANG", "Incorrect/Zone")
	).toEqual("January 02, 2000  1:00 am UTC");
});

// supported locale if no blocks.json found
// unsupported timezone if no blocks.json found
it("returns correct Korean language for locale ko but falls back to UTC", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "ko", "Incorrect/Zone")
	).toEqual("1월 02, 2000  1:00 오전 UTC");
});

// supported timezone by default if no blocks.json found
// supported language en to show am/pm
// Pacific/Auckland GMT+13
it("supports Auckland timezone", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "en", "Pacific/Auckland")
	).toEqual("January 02, 2000  2:00 pm NZDT");
});

// supported timezone by default if no blocks.json found
// paris (GMT+1)
it("supports Paris timezone", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "en", "Europe/Paris")
	).toEqual("January 02, 2000  2:00 am CET");
});

it("handles french meridiems", () => {
	expect(
		localizeDateHelper("2000-01-02 01:00", "%B %d, %Y %l:%M %P %Z", "fr", "Europe/Paris")
	).toEqual("janvier 02, 2000  2:00 am CET");
});

it("handles spanish meridiems", () => {
	expect(
		localizeDateHelper("2000-01-02 13:00", "%B %d, %Y %l:%M %P %Z", "es", "Europe/Paris")
	).toEqual("enero 02, 2000  2:00 pm CET");
});
