const handleFetchError = (error) => {
	if (error?.response) {
		if (error.response?.status === 404) {
			const NotFoundError = (message = "Not Found") => {
				const err = new Error();
				err.message = message;
				err.statusCode = 404;
				return err;
			};
			throw NotFoundError();
		}
		throw new Error(
			`The response from the server was an error with the status code ${error?.response?.status}.`
		);
	} else if (error?.statusCode === 302) {
		throw error;
	} else if (error?.request) {
		throw new Error("The request to the server failed with no response.");
	} else {
		throw new Error("An error occured creating the request.");
	}
};

export default handleFetchError;
