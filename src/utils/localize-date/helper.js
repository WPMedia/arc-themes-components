function localizeDateHelper(date, targetDateFormat, language, timeZone) {
	let locale = null;
	switch (language) {
		case "sv":
			locale = "sv_SE";
			break;
		case "fr":
			locale = "fr_FR";
			break;
		case "no":
			locale = "nb_NO";
			break;
		case "de":
			locale = "de_DE";
			break;
		case "es":
			locale = "es_ES";
			break;
		case "ja":
			locale = "ja_JP";
			break;
		case "ko":
			locale = "ko_KR";
			break;
		case "pt":
			locale = "pt_PT";
			break;
		case "en":
			locale = "en_US";
			break;
		default:
			locale = language;
	}

	const dateObj = new Date(date);
    // convert date format, 'targetDateFormat', into options for Intl.DateTimeFormat.
	
	return Intl.DateTimeFormat(locale, {
		timeZone
	}).format(dateObj);
}

export default localizeDateHelper;
