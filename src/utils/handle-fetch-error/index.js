const handleFetchError = (error) => {
	if (error?.response) {
		throw new Error(
			`The response from the server was an error with the status code ${error?.response?.status}.`
		);
	} else if (error?.request) {
		throw new Error("The request to the server failed with no response.");
	} else {
		throw new Error("An error occured creating the request.");
	}
};

export default handleFetchError;
