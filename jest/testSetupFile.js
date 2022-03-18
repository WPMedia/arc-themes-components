import "@testing-library/jest-dom";

// eslint-disable-next-line no-undef
Object.defineProperty(globalThis, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

beforeEach(() => {
	jest.resetModules();
});
