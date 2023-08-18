const get = require("lodash.get");

const RedirectError = (location, message = "Redirect", code = 302) => {
	const err = new Error();
	err.message = message;
	err.status = code;
	err.location = location;
	return err;
};

const handleRedirect = (response) => {
	const content = response.data;
	const contentType = content.type;
	const redirectUrl = get(content, "related_content.redirect[0].redirect_url", null);

	if (contentType && contentType === "story" && redirectUrl) {
		console.log("this is a redirect");
		throw RedirectError(redirectUrl);
	}
};

export default handleRedirect;
