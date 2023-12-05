function localizeDateHelper(date, targetDateFormat, language, timeZone) {
	let locale = null;

	// Handles legacy values for the language field in Themes settings.
	switch (language) {
		case "sv":
			locale = "sv-SE";
			break;
		case "fr":
			locale = "fr-FR";
			break;
		case "no":
			locale = "nb-NO";
			break;
		case "de":
			locale = "de-DE";
			break;
		case "es":
			locale = "es-ES";
			break;
		case "ja":
			locale = "ja-JP";
			break;
		case "ko":
			locale = "ko-KR";
			break;
		case "pt":
			locale = "pt-PT";
			break;
		case "en":
			locale = "en-US";
			break;
		default:
			locale = language;
	}
	// Locales can be stored in Themes settings with an underscore, so it needs to be converted to a hyphen here.
	locale = locale.replaceAll('_', '-');
	const dateObj = new Date(date);
	
    // Build options object for Intl.DateTimeFormat
	const options = {
		timeZone
	};
	if (targetDateFormat === "date" || targetDateFormat === "dateTime") {
		options.dateStyle = "long";
	}
	if (targetDateFormat === "dateTime") {
		options.timeStyle = "medium";
	}
	return Intl.DateTimeFormat(locale, options).format(dateObj);
}

export default localizeDateHelper;
