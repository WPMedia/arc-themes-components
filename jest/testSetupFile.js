import "@testing-library/jest-dom";

beforeEach(() => {
	jest.resetModules();
});

// Polyfill TextEncoder / TextDecoder for libraries (e.g., dom-parser, URL APIs) that
// expect them to exist in the jsdom + Node test environment.
// Node >= 11 usually provides these globals, but some Jest environments can miss them.
// Using the util implementation keeps bundle size out of production code while ensuring tests run.
try {
	const { TextEncoder, TextDecoder } = require("util");
	if (typeof global.TextEncoder === "undefined") {
		global.TextEncoder = TextEncoder;
	}
	if (typeof global.TextDecoder === "undefined") {
		global.TextDecoder = TextDecoder;
	}
} catch (e) {
	// Silently ignore; tests that truly need TextEncoder will then fail loudly.
}
