import "@testing-library/jest-dom";

window.matchMedia =
	window.matchMedia ||
	// eslint-disable-next-line func-names
	function () {
		return {
			matches: false,
			addListener() {},
			removeListener() {},
		};
	};

beforeEach(() => {
	jest.resetModules();
});
