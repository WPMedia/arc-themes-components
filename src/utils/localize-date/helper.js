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
		timeZone,
	};
	if (targetDateFormat.includes("%a")) {
		options.weekday = "short";
	}
	if (targetDateFormat.includes("%A")) {
		options.weekday = "long";
	}
	if (targetDateFormat.includes("%b") || targetDateFormat.includes("%h")) {
		options.month = "short";
	}
	if (targetDateFormat.includes("%B")) {
		options.month = "long";
	}
	if (targetDateFormat.includes("%m")) {
		options.month = "2-digit";
	}
	if (targetDateFormat.includes("%y")) {
		options.year = "2-digit";
	}
	if (targetDateFormat.includes("%Y")) {
		options.year = "numeric";
	}
	if (targetDateFormat.includes("%H")) {
		options.hour12 = false;
		options.hour = "2-digit";
	}
	if (targetDateFormat.includes("%I")) {
		options.hour12 = true;
		options.hour = "2-digit";
	}
	if (targetDateFormat.includes("%k")) {
		options.hour12 = false;
		options.hour = "numeric";
	}
	if (targetDateFormat.includes("%l")) {
		options.hour12 = true;
		options.hour = "numeric";
	}
	if (targetDateFormat.includes("%M")) {
		options.minute = "2-digit";
	}
	if (targetDateFormat.includes("%S")) {
		options.second = "2-digit";
	}
	if (targetDateFormat.includes("%p")) {
		options.dayPeriod = "short";
	}
	if (targetDateFormat.includes("%Z")) {
		options.timeZoneName = "short"
	}
	if (targetDateFormat.includes("%z")) {
		options.timeZoneName = "longOffset"
	}
	return Intl.DateTimeFormat("en-US", options).format(dateObj);
}

export default localizeDateHelper;
