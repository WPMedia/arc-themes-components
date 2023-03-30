import handleFetchError from ".";

describe("handleFetchError()", () => {
	it("handles errors with the response", () => {
		try {
			handleFetchError({ response: { status: "404" } });
		} catch (e) {
			expect(e.message).toEqual(
				"The response from the server was an error with the status code 404."
			);
		}
	});

	it("handles errors with the request", () => {
		try {
			handleFetchError({ request: {} });
		} catch (e) {
			expect(e.message).toEqual("The request to the server failed with no response.");
		}
	});

	it("handles errors creating the request", () => {
		try {
			handleFetchError({});
		} catch (e) {
			expect(e.message).toEqual("An error occured creating the request.");
		}
	});
});
