import { useFusionContext } from "fusion:context";
import getProperties from "fusion:properties";
import getTranslatedPhrases from "fusion:intl";

// https://arcpublishing.atlassian.net/wiki/spaces/TI/pages/2538275032/Lokalise+and+Theme+Blocks

function usePhrases() {
	const { arcSite } = useFusionContext();
	const { locale = "en" } = getProperties(arcSite);
	return getTranslatedPhrases(locale);
}

export default usePhrases;
