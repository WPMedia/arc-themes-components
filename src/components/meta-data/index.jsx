/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/forbid-prop-types */
/* istanbul ignore next */

import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import { RESIZER_TOKEN_VERSION } from "fusion:environment";
import { useContent } from "fusion:content";
import { URL } from "url";
import formatURL from "../../utils/format-url";
import formatSrc from "../../utils/format-image-resizer-src";
import getImageFromANS from "../../utils/get-image-from-ans";
import imageANSToImageSrc from "../../utils/image-ans-to-image-src";

const getCustomMetaData = (metaHTMLString) => {
	let customMetaData = null;
	if (typeof window === "undefined") {
		const DomParser = require("dom-parser");
		customMetaData = new DomParser()
			.parseFromString(metaHTMLString)
			.getElementsByTagName("META")
			.map((metaNode) => ({
				metaName: metaNode.getAttribute("name"),
				metaValue: metaNode.getAttribute("value") || metaNode.getAttribute("content"),
			}));
	}
	return customMetaData;
};

const generateCustomMetaTags = (metaData, MetaTag, MetaTags) => {
	const metaHTMLString = ReactDOMServer.renderToString(<MetaTags />);
	const customMetaData = getCustomMetaData(metaHTMLString).filter(
		(metaObj) => !metaData[metaObj.metaName]
	);
	return (
		<>
			{customMetaData.length > 0 &&
				customMetaData.map((metaObj, i) => (
					<MetaTag
						// eslint-disable-next-line react/no-array-index-key
						key={`custom-meta-data-${i}`}
						name={metaObj.metaName}
						default={metaObj.metaValue}
					/>
				))}
		</>
	);
};

const buildUrl = (domain, path) => {
	try {
		const url = new URL(path || "", domain);
		return formatURL(url.href);
	} catch {
		return null;
	}
};

const getUrlParameters = (requestUri = "") => {
	const matches = Array.from(
		requestUri.matchAll(/(?:[&?]?([\w\d%\-._~]{1:100})=([\w\d%\-._~]{1:100})){:10}?/gi)
	);
	return matches.reduce((accumulator, [, key, value]) => {
		if (accumulator[key]) {
			return {
				...accumulator,
				[key]: [
					...(typeof accumulator[key] === "object" ? accumulator[key] : [accumulator[key]]),
					value,
				],
			};
		}
		return { ...accumulator, [key]: value };
	}, {});
};

const getPageCanonicalUrl = (pageType, domain, globalContent, requestUri) => {
	const urlParameters = getUrlParameters(requestUri);
	const authorCanonicalPath = globalContent?.authors ? globalContent?.authors[0]?.bio_page : "";
	const globalCanonicalPath = globalContent?.canonical_url;
	const querylyCanonicalPath = urlParameters.query
		? `${requestUri.replace(/\?.*/, "")}?query=${urlParameters.query}`
		: "";
	const searchCanonicalPath = globalContent?.metadata ? `search/${globalContent?.metadata.q}/` : "";
	const tagCanonicalPath = globalContent?.Payload ? `tags/${globalContent?.Payload[0]?.slug}/` : "";

	const canonicalUrlMapping = {
		article: buildUrl(domain, globalCanonicalPath),
		author: buildUrl(domain, authorCanonicalPath),
		gallery: buildUrl(domain, globalCanonicalPath),
		homepage: domain,
		"queryly-search": buildUrl(domain, querylyCanonicalPath),
		search: buildUrl(domain, searchCanonicalPath), // arc search
		section: buildUrl(domain, globalContent?._id || ""),
		tag: buildUrl(domain, tagCanonicalPath),
		video: buildUrl(domain, globalCanonicalPath),
	};
	return canonicalUrlMapping[pageType];
};

const generateUrl = (arcSite, websiteDomain, gc) => {
	const siteData = gc && gc.websites && gc.websites[arcSite];
	if (!siteData) {
		return null;
	}
	return `${websiteDomain}${siteData.website_url}`;
};

const normalizeFallbackImage = (websiteDomain, url) => {
	if (!url) {
		return null;
	}
	if (!url.startsWith("http")) {
		const tmp = `${websiteDomain}¬${url}`;
		return tmp.replace(/\/?¬\/?/, "/");
	}
	return url;
};

const MetaData = ({
	arcSite,
	canonicalDomain,
	canonicalResolver,
	facebookAdmins,
	fallbackImage,
	globalContent: gc,
	MetaTag,
	MetaTags,
	metaValue,
	outputCanonicalLink,
	requestUri,
	resizerURL,
	twitterUsername,
	websiteDomain,
	websiteName,
}) => {
	const pageType = metaValue("page-type");

	let storyMetaDataTags = null;
	let tagMetaDataTags = null;
	let authorMetaDataTags = null;
	let searchMetaDataTags = null;
	let sectionMetaDataTags = null;
	let homepageMetaDataTags = null;
	let nativoMetaDataTags = null;
	let commonTagsOnPage = true;
	let canonicalLink = null;

	const metaData = {
		description: null,
		keywords: null,
		ogImage: null,
		ogImageAlt: null,
		url: generateUrl(arcSite, websiteDomain, gc),
		"page-type": pageType,
		title: metaValue("title") || websiteName,
		"og:title": metaValue("og:title") || websiteName,
		ogSiteName: websiteName,
		twitterUsername: twitterUsername ? `@${twitterUsername}` : null,
		twitterCard: "summary_large_image",
		"twitter:title": metaValue("twitter:title") || websiteName,
		twitterImage: null,
		fallbackImage: normalizeFallbackImage(websiteDomain, fallbackImage),
	};

	const resizedOGImage = useContent(
		metaValue("og:image") ? { source: "signing-service", query: { id: metaValue("og:image") } } : {}
	);

	const resizedTwitterImage = useContent(
		metaValue("twitter:image")
			? { source: "signing-service", query: { id: metaValue("twitter:image") } }
			: {}
	);

	const getImgURL = (metaType = "og:image") => {
		const resizedOptions = { smart: true };
		const imageURL = (src, auth) =>
			formatSrc(resizerURL.concat(src), { ...resizedOptions, auth }, 1200, 630);
		if (metaType === "og:image" && resizedOGImage) {
			return imageURL(encodeURIComponent(metaValue("og:image")), resizedOGImage.hash);
		}
		if (metaType === "twitter:image" && resizedTwitterImage) {
			return imageURL(encodeURIComponent(metaValue("twitter:image")), resizedTwitterImage.hash);
		}
		if (gc?.promo_items?.basic?.url || gc?.promo_items?.lead_art?.type === "image") {
			const image = getImageFromANS(gc);
			const auth = image.auth[RESIZER_TOKEN_VERSION];
			return imageURL(imageANSToImageSrc(image), auth);
		}
		return "";
	};

	const getImgAlt = (metaType = "og:image:alt") => {
		if (metaValue(metaType)) {
			return metaValue(metaType);
		}

		return (
			gc?.promo_items?.basic?.alt_text ||
			gc?.promo_items?.basic?.caption ||
			gc?.promo_items?.lead_art?.alt_text ||
			gc?.promo_items?.lead_art?.caption ||
			null
		);
	};

	if (pageType === "article" || pageType === "video" || pageType === "gallery") {
		if (typeof window === "undefined") {
			const description = gc && gc.description && gc.description.basic;
			const headline = gc && gc.headlines && gc.headlines.basic;

			metaData.title =
				metaValue("title") || (headline && `${headline} – ${websiteName}`) || websiteName;
			metaData.description = metaValue("description") || description || null;
			metaData["og:title"] = metaValue("og:title") || headline || websiteName;
			metaData.ogImage = getImgURL("og:image") || metaData.fallbackImage;
			metaData.ogImageAlt = getImgAlt("og:image:alt");

			metaData["twitter:title"] = metaValue("twitter:title") || headline || websiteName;
			metaData.twitterImage = getImgURL("twitter:image") || metaData.fallbackImage;
			metaData.twitterImageAlt = getImgAlt("twitter:image:alt");

			// Keywords could be comma delimited string or array of string or an array of objects
			if (metaValue("keywords")) {
				metaData.keywords = metaValue("keywords");
			} else if (gc && gc.taxonomy && gc.taxonomy.seo_keywords) {
				if (typeof gc.taxonomy.seo_keywords !== "undefined") {
					metaData.keywords = gc.taxonomy.seo_keywords.join(",");
				}
			} else if (gc && gc.taxonomy && gc.taxonomy.tags) {
				if (typeof gc.taxonomy.tags !== "undefined" && gc.taxonomy.tags.length) {
					metaData.keywords = [];
					gc.taxonomy.tags.forEach((item) => {
						if (item.slug) metaData.keywords.push(item.slug);
					});
					metaData.keywords = metaData.keywords.join(",");
				}
			} else {
				metaData.keywords = null;
			}

			storyMetaDataTags = (
				<>
					{metaData.description && (
						<>
							<meta name="description" content={metaData.description} />
							<meta name="twitter:description" content={metaData.description} />
							<meta property="og:description" content={metaData.description} />
						</>
					)}
					{metaData.keywords && <meta name="keywords" content={metaData.keywords} />}

					<meta property="og:title" content={metaData["og:title"]} />
					<meta name="twitter:title" content={metaData["twitter:title"]} />

					{metaData.ogImage && <meta property="og:image" content={metaData.ogImage} />}
					{metaData.ogImageAlt && <meta property="og:image:alt" content={metaData.ogImageAlt} />}
					{metaData.twitterImage && <meta name="twitter:image" content={metaData.twitterImage} />}
					{metaData.twitterImageAlt && (
						<meta name="twitter:image:alt" content={metaData.twitterImageAlt} />
					)}

					{pageType === "article" && (
						<>
							<meta property="og:type" content="article" />
							<meta name="robots" content="noarchive" />
						</>
					)}
				</>
			);
		}
	} else if (pageType === "author") {
		const author = gc && gc.authors && gc.authors.length ? gc.authors[0] : {};
		const fallbackTitle = (author.byline && `${author.byline} - ${websiteName}`) || websiteName;
		metaData.description = metaValue("description") || author.bio || null;
		metaData["og:title"] = metaValue("og:title") || fallbackTitle;
		metaData["twitter:title"] = metaValue("twitter:title") || fallbackTitle;
		metaData.title = metaValue("title") || fallbackTitle;
		const { name: authorName } = author;
		const authorImageUrl =
			typeof author.image === "string" ? author.image : author.image && author.image.url;
		const authorAltText =
			typeof author.image === "object" ? author.image.alt_text : author.byline || authorName;

		const authorPhoto = authorImageUrl || metaData.fallbackImage;
		const authorAlt = authorAltText || authorName || author.byline || websiteName;

		authorMetaDataTags = (
			<>
				{metaData.description && (
					<>
						<meta name="description" content={metaData.description} />
						<meta property="og:description" content={metaData.description} />
						<meta name="twitter:description" content={metaData.description} />
					</>
				)}
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />
				{authorPhoto && (
					<>
						<meta property="og:image" content={authorPhoto} />
						<meta property="og:image:alt" content={authorAlt} />
						<meta name="twitter:image" content={authorPhoto} />
						<meta name="twitter:image:alt" content={authorAlt} />
					</>
				)}
			</>
		);
	} else if (pageType === "search") {
		const fallbackTitle = `Search - ${websiteName}`;
		metaData.title = metaValue("title") || fallbackTitle;
		metaData["og:title"] = metaValue("og:title") || fallbackTitle;
		metaData["twitter:title"] = metaValue("twitter:title") || fallbackTitle;

		searchMetaDataTags = (
			<>
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />
			</>
		);
	} else if (pageType === "tag") {
		const payload = gc && gc.Payload && gc.Payload.length ? gc.Payload[0] : {};
		const fallbackTitle = (payload.name && `${payload.name} - ${websiteName}`) || websiteName;
		metaData.description = metaValue("description") || payload.description || null;
		metaData.title = metaValue("title") || fallbackTitle;
		metaData["og:title"] = metaValue("og:title") || fallbackTitle;
		metaData["twitter:title"] = metaValue("twitter:title") || fallbackTitle;

		tagMetaDataTags = (
			<>
				{metaData.description && (
					<>
						<meta name="description" content={metaData.description} />
						<meta property="og:description" content={metaData.description} />
						<meta name="twitter:description" content={metaData.description} />
					</>
				)}
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />
				{metaData.fallbackImage && (
					<>
						<meta property="og:image" content={metaData.fallbackImage} />
						<meta property="og:image:alt" content={metaData["og:title"]} />
						<meta name="twitter:image" content={metaData.fallbackImage} />
						<meta name="twitter:image:alt" content={metaData["twitter:title"]} />
					</>
				)}
			</>
		);
	} else if (pageType === "section") {
		const payload = gc && gc.name ? gc : {};
		const gcMetadata = gc && gc.metadata ? gc.metadata : {};
		const fallbackTitle = (payload.name && `${payload.name} - ${websiteName}`) || websiteName;
		metaData.description = metaValue("description") || gcMetadata.metadata_description || null;
		metaData.title = metaValue("title") || gcMetadata.metadata_title || fallbackTitle;
		metaData["og:title"] = metaValue("og:title") || fallbackTitle;
		metaData["twitter:title"] = metaValue("twitter:title") || fallbackTitle;

		sectionMetaDataTags = (
			<>
				{metaData.description && (
					<>
						<meta name="description" content={metaData.description} />
						<meta property="og:description" content={metaData.description} />
						<meta name="twitter:description" content={metaData.description} />
					</>
				)}
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />

				{metaData.fallbackImage && (
					<>
						<meta property="og:image" content={metaData.fallbackImage} />
						<meta property="og:image:alt" content={metaData["og:title"]} />
						<meta name="twitter:image" content={metaData.fallbackImage} />
						<meta name="twitter:image:alt" content={metaData["twitter:title"]} />
					</>
				)}
			</>
		);
	} else if (pageType === "homepage") {
		homepageMetaDataTags = (
			<>
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />
				{metaData.fallbackImage && (
					<>
						<meta property="og:image" content={metaData.fallbackImage} />
						<meta property="og:image:alt" content={websiteName} />
						<meta name="twitter:image" content={metaData.fallbackImage} />
						<meta name="twitter:image:alt" content={websiteName} />
					</>
				)}
			</>
		);
	} else if (pageType === "nativo-clp") {
		/* Nativo ad integration */
		/* this kind of page type can not render any social metadata */
		commonTagsOnPage = false;
		nativoMetaDataTags = (
			<>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="robots" content="noindex, nofollow" />
			</>
		);
	} else {
		sectionMetaDataTags = (
			<>
				<meta property="og:title" content={metaData["og:title"]} />
				<meta name="twitter:title" content={metaData["twitter:title"]} />
			</>
		);
	}
	// Twitter meta tags go on all pages
	const twitterTags = (
		<>
			{metaData.ogSiteName && <meta property="og:site_name" content={metaData.ogSiteName} />}
			{metaData.url && <meta property="og:url" content={metaData.url} />}
			{metaData.twitterUsername && <meta name="twitter:site" content={metaData.twitterUsername} />}
			{metaData.twitterCard && <meta name="twitter:card" content={metaData.twitterCard} />}
			{facebookAdmins && <meta property="fb:admins" content={facebookAdmins} />}
		</>
	);

	if (outputCanonicalLink) {
		const defaultResolution = getPageCanonicalUrl(
			pageType,
			canonicalDomain || websiteDomain,
			gc,
			requestUri
		);
		const canonicalUrl = canonicalResolver
			? canonicalResolver(pageType, defaultResolution)
			: defaultResolution;

		if (canonicalUrl) {
			canonicalLink = <link rel="canonical" href={canonicalUrl} />;
		}
	}

	const customMetaTags = generateCustomMetaTags(metaData, MetaTag, MetaTags);

	return (
		<>
			<title>{metaData.title}</title>
			{storyMetaDataTags}
			{tagMetaDataTags}
			{sectionMetaDataTags}
			{homepageMetaDataTags}
			{authorMetaDataTags}
			{searchMetaDataTags}
			{customMetaTags}
			{commonTagsOnPage && twitterTags}
			{nativoMetaDataTags}
			{canonicalLink}
		</>
	);
};

MetaData.propTypes = {
	arcSite: PropTypes.string,
	canonicalDomain: PropTypes.string,
	facebookAdmins: PropTypes.string,
	fallbackImage: PropTypes.string,
	globalContent: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.shape({
			basic: PropTypes.string,
		}),
		headlines: PropTypes.shape({
			basic: PropTypes.string,
		}),
		taxonomy: PropTypes.shape({
			seo_keywords: PropTypes.array,
			tags: PropTypes.array,
		}),
		authors: PropTypes.array,
		Payload: PropTypes.array,
		metadata: PropTypes.shape({
			metadata_description: PropTypes.string,
			metadata_title: PropTypes.string,
		}),
		canonical_url: PropTypes.string,
	}),
	MetaTag: PropTypes.func,
	MetaTags: PropTypes.func,
	metaValue: PropTypes.func,
	outputCanonicalLink: PropTypes.bool,
	resizerURL: PropTypes.string,
	twitterUsername: PropTypes.string,
	websiteDomain: PropTypes.string,
	websiteName: PropTypes.string,
};

export default MetaData;
