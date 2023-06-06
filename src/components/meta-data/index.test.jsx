/* eslint-disable no-tabs */
/**
 * this is for mocking node env
 * will not have window attribute, testing ssr
 * https://jestjs.io/docs/en/configuration.html#testenvironment-string
 * @jest-environment node
 */
import React from "react";
import { render, screen } from "@testing-library/react";
// import { useContent } from "fusion:content";

import MetaData from "./index";

jest.mock("react-dom/server", () => ({
	renderToString: jest.fn().mockReturnValue("<meta />"),
	__esModule: true,
	default: {
		renderToString: jest.fn().mockReturnValue("<meta />"),
	},
}));

const websiteName = "The Sun";
const websiteDomain = "http://example.com";
const twitterUsername = "the-sun";
const resizerURL = "https://fake.cdn.com/resizer";
const arcSite = "the-sun";
const facebookAdmins = "1111111111";
const fallbackImageLocal = "/resources/images/fallback_image.jpg";
const fallbackImageRemote = "https://remote-site.com/images/fallback_image_remote.jpg";

const globalContentComplete = {
	_id: "/section/url",
	description: {
		basic: "this is a description",
	},
	headlines: {
		basic: "this is a headline",
	},
	taxonomy: {
		seo_keywords: ["keyword1", "keyword2"],
		tags: [{ slug: "tag1" }, { slug: "tag2" }],
	},
	promo_items: {
		basic: {
			url: "awesome-url",
			alt_text: "alt text",
		},
	},
	websites: {
		"the-sun": {
			website_url: "/url/to/story/",
		},
	},
	Payload: [
		{
			name: "payload name",
			description: "payload description",
			slug: "tagSlug",
		},
	],
	canonical_url: "/path/to/global-content/",
	name: "section name",
	metadata: {
		metadata_description: "metadata section description",
		metadata_title: "metadata section title",
		q: "searchQuery",
	},
};

const globalContentLeadArt = {
	promo_items: {
		lead_art: {
			type: "image",
			url: "awesome-url",
		},
	},
};

const globalContentLeadArtWithResize = {
	promo_items: {
		lead_art: {
			resized_params: {
				0x0: "I0HK-BD7QKeAN9drBwVrYoryXDE=filters:format(jpg):quality(70):focal(3699x534:3709x544)/",
			},
			type: "image",
			url: "awesome-url",
		},
	},
};

const globalContentAuthor = {
	authors: [
		{
			_id: "johndoe",
			firstName: "John",
			lastName: "Doe",
			secondLastName: "",
			byline: "John Missing Doe",
			role: "Senior Product Manager",
			image:
				"https://s3.amazonaws.com/arc-authors/corecomponents/b80bd029-16d8-4a28-a874-78fc07ebc14a.jpg",
			email: "john.doe@washpost.com",
			affiliations: "",
			education: [],
			awards: [],
			books: [],
			podcasts: [],
			twitter: "johndoe",
			bio_page: "/author/john-doe/",
			bio: "John Doe is a senior product manager for Arc Publishing. This is a short bio. ",
			longBio:
				"John Doe is a senior product manager for Arc Publishing. She works on Arc Themes and PageBuilder Fusion. This is a long bio. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
			slug: "john-doe",
			instagram: "johndoe",
			native_app_rendering: false,
			fuzzy_match: false,
			contributor: false,
			status: true,
			last_updated_date: "2020-03-04T18:20:55.600Z",
			type: "author",
			resized_params: {
				"84x56": "Zl9GCeY1h_VWYVOhDEUuZLth_I8=filters:cm=t/",
			},
		},
	],
	...globalContentComplete,
};

const imageResized = {
	hash: "e0ddcd9d7845eb82dffbf04085385ef9247dd2c9b5a93a7be14731734abc6a2d",
	type: "sha256",
	_id: "b850a4e745b2193037a1b756bbb03dc02406e00f32147e8daf202f534a1e0d52",
};

// jest.mock("fusion:context", () => ({
// 	useFusionContext: jest.fn(() => ({
// 		id: "",
// 		arcSite: "the-sun",
// 		deployment: jest.fn(() => {}),
// 	})),
// }));

// jest.mock("fusion:content", () => ({
// 	useContent: jest.fn(() => imageResized),
// }));

jest.mock("fusion:content", () => ({
	useContent: jest.fn(() => {}),
}));

const expectDefaultMeta = () => {
	const ogSiteNameMetaElement = document.querySelector("meta[property='og:site_name']");
	expect(ogSiteNameMetaElement.getAttribute("content")).toEqual(websiteName);

	const twitterSiteMetaElement = document.querySelector("meta[name='twitter:site']");
	expect(twitterSiteMetaElement.getAttribute("content")).toEqual(`@${twitterUsername}`);

	const twitterCardMetaElement = document.querySelector("meta[name='twitter:card']");
	expect(twitterCardMetaElement.getAttribute("content")).toEqual("summary_large_image");

	const fbAdminsMetaElement = document.querySelector("meta[property='fb:admins']");
	expect(fbAdminsMetaElement.getAttribute("content")).toEqual(facebookAdmins);
};

const expectDefaultMetaMissing = () => {
	expect(document.querySelector("meta[name='twitter:site']")).toBeNull();
	expect(document.querySelector("meta[name='twitter:card']").getAttribute("content")).toBe(
		"summary_large_image"
	);
};

const expectImageMetaMissing = () => {
	const twitterImageMetaElements = document.querySelectorAll("meta[name='twitter:image']");
	expect(twitterImageMetaElements.length).toBe(0);

	const twitterImageAltMetaElements = document.querySelectorAll("meta[name='twitter:image:alt']");
	expect(twitterImageAltMetaElements.length).toBe(0);

	const ogImageMetaElements = document.querySelectorAll("meta[property='og:image']");
	expect(ogImageMetaElements.length).toBe(0);

	const ogImageAltMetaElements = document.querySelectorAll("meta[property='og:image:alt']");
	expect(ogImageAltMetaElements.length).toBe(0);
};

const wrapperGenerator = (
	metaValue,
	globalContent,
	fallbackImage = fallbackImageLocal,
	canonicalDomain = null,
	canonicalResolver = null,
	outputCanonicalLink = false
) => {
	render(
		<MetaData
			arcSite={arcSite}
			canonicalDomain={canonicalDomain}
			canonicalResolver={canonicalResolver}
			facebookAdmins={facebookAdmins}
			fallbackImage={fallbackImage}
			globalContent={globalContent}
			MetaTag={jest.fn()}
			MetaTags={jest.fn()}
			metaValue={metaValue}
			outputCanonicalLink={outputCanonicalLink}
			requestUri="/test/?fizz=buzz&query=search&foo=bar&foo=baz"
			resizerURL={resizerURL}
			twitterUsername={twitterUsername}
			websiteDomain={websiteDomain}
			websiteName={websiteName}
		/>
	);
};

const metaValues = (values) => {
	const data = { ...values };
	return (prop) => data[prop];
};

const titleTest = (pageType) => {
	describe("when need to add a title tag", () => {
		it("must use the meta value", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				title: "meta title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expect(document.title).toEqual(metaValue("title"));
		});

		it("must use the headline if metaValue missing", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expect(document.title).toEqual(`${globalContentComplete.headlines.basic} – ${websiteName}`);
		});

		it("must use the websiteName if found no valid values", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const globalContent = {
				...globalContentComplete,
				headlines: {},
			};
			wrapperGenerator(metaValue, globalContent);
			expect(document.title).toEqual(websiteName);
		});
	});
};
const ogTitleTest = (pageType) => {
	describe("when need to add a og:title tag", () => {
		it("must use the meta value first and add the site name", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				"og:title": "og meta title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogTitleMetaTag = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaTag).not.toBeNull();
			expect(ogTitleMetaTag.getAttribute("content")).toEqual(metaValue("og:title"));
		});

		it("must use the headline if metaValue missing", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogTitleMetaTag = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaTag).not.toBeNull();
			expect(ogTitleMetaTag.getAttribute("content")).toEqual(globalContentComplete.headlines.basic);
		});

		it("must use the websiteName if found no valid values", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const globalContent = {
				...globalContentComplete,
				headlines: {},
			};
			wrapperGenerator(metaValue, globalContent);
			const ogTitleMetaTag = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaTag).not.toBeNull();
			expect(ogTitleMetaTag.getAttribute("content")).toEqual(websiteName);
		});
	});
};
const descriptionTest = (pageType) => {
	describe("when need to add a description tag", () => {
		it("must use the meta value first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				title: "the-sun",
				description: "description from metaValue",
			});

			const globalContent = {
				description: {
					basic: "this is a description",
				},
			};
			wrapperGenerator(metaValue, globalContent);
			const descriptionMetaTag = document.querySelector("meta[name='description']");
			expect(descriptionMetaTag).not.toBeNull();
			expect(descriptionMetaTag.getAttribute("content")).toEqual(metaValue("description"));
		});

		it("must use the global content if metaValue missing", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				title: "the-sun",
			});

			const globalContent = {
				description: {
					basic: "this is a description",
				},
			};
			wrapperGenerator(metaValue, globalContent);
			const descriptionMetaTag = document.querySelector("meta[name='description']");
			expect(descriptionMetaTag).not.toBeNull();
			expect(descriptionMetaTag.getAttribute("content")).toEqual(globalContent.description.basic);
		});

		it("must not render a description if found no valid values", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				title: "the-sun",
			});

			const globalContent = {};
			wrapperGenerator(metaValue, globalContent);
			const descriptionMetaTag = document.querySelector("meta[name='description']");
			expect(descriptionMetaTag).toBeNull();
		});
	});
};

const ogImageTest = (pageType) => {
	describe("when need to add a og:image tag", () => {
		it("must use the metaValue first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				"og:image": "http://example.com/resources/image.jpg",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogImageContent = document.querySelector("meta[property='og:image']")?.content;
			expect(ogImageContent?.substring(0, resizerURL.length)).toEqual(resizerURL);
		});

		it("must use the promo_items.basic if found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogImageContent = document.querySelector("meta[property='og:image']")?.content;
			const url = globalContentComplete.promo_items.basic.url.replace("https://", "");
			expect(ogImageContent?.substring(0, resizerURL.length)).toEqual(resizerURL);
			expect(ogImageContent?.slice(url.length * -1)).toEqual(url);
		});
		it("must add og:image if url not found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const globalContent = {
				...globalContentComplete,
				promo_items: {},
			};

			wrapperGenerator(metaValue, globalContent);
			const ogImageContent = document.querySelector("meta[property='og:image']")?.content;
			expect(ogImageContent).toEqual(`${websiteDomain}${fallbackImageLocal}`);
		});
		it("must add og:image using lead art", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentLeadArt);
			const ogImageContent = document.querySelector("meta[property='og:image']")?.content;
			expect(ogImageContent).toMatch(/awesome-url/i);
		});
		it("must add og:image using lead art carrying resize options", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentLeadArtWithResize);
			const ogImageContent = document.querySelector("meta[property='og:image']")?.content;
			expect(ogImageContent).toMatch(
				/filters:format\(jpg\):quality\(70\):focal\(3699x534:3709x544\)/i
			);
		});
	});
};

const ogImageAltTest = (pageType) => {
	describe("when need to add a og:image:alt tag", () => {
		it("must use the metaValue first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				"og:image:alt": "meta alt image description",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogImageAltContent = document.querySelector("meta[property='og:image:alt']")?.content;
			expect(ogImageAltContent).toEqual(metaValue("og:image:alt"));
		});

		it("must use the promo_images alt value", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogImageAltContent = document.querySelector("meta[property='og:image:alt']")?.content;
			expect(ogImageAltContent).toBeUndefined();
		});

		it("must not add og:image:alt if values not found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const content = {
				...globalContentComplete,
				promo_items: {},
			};
			wrapperGenerator(metaValue, content);
			const ogImageAlt = document.querySelector("meta[property='og:image:alt']");
			expect(ogImageAlt).toBeNull();
		});
	});
};

const twitterTitleTest = (pageType) => {
	describe("when need to add a twitter:title tag", () => {
		it("must use the metaValue first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				"twitter:title": "meta alt twitter title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleContent = document
				.querySelector("meta[name='twitter:title']")
				.getAttribute("content");
			expect(titleContent).toEqual(metaValue("twitter:title"));
		});

		it("must use the headlines if metaValue not found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleContent = document
				.querySelector("meta[name='twitter:title']")
				.getAttribute("content");
			expect(titleContent).toEqual(globalContentComplete.headlines.basic);
		});

		it("must use the websiteName if no values found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const content = {
				...globalContentComplete,
				headlines: {},
			};
			wrapperGenerator(metaValue, content);
			const titleContent = document
				.querySelector("meta[name='twitter:title']")
				.getAttribute("content");
			expect(titleContent).toEqual(websiteName);
		});
	});
};

const twitterImageTest = (pageType) => {
	describe("when need to add a twitter:image tag", () => {
		it("must use the metaValue first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				"twitter:image": "http://example.com/resources/image.jpg",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const content = document.querySelector("meta[name='twitter:image']").getAttribute("content");
			expect(content.substring(0, resizerURL.length)).toEqual(resizerURL);
		});

		it("must use the promo_items.basic if found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const content = document.querySelector("meta[name='twitter:image']").getAttribute("content");
			const url = globalContentComplete.promo_items.basic.url.replace("https://", "");
			expect(content.substring(0, resizerURL.length)).toEqual(resizerURL);
			expect(content.slice(url.length * -1)).toEqual(url);
		});

		it("must add twitter:image if url not found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const globalContent = {
				...globalContentComplete,
				promo_items: {},
			};

			wrapperGenerator(metaValue, globalContent);
			expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toEqual(
				`${websiteDomain}${fallbackImageLocal}`
			);
		});
	});
};

const keywordsTest = (pageType) => {
	describe("when need to add a keywords tag", () => {
		it("must use the metaValue first", () => {
			const metaValue = metaValues({
				"page-type": pageType,
				keywords: "key1, key2,key3",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expect(document.querySelector("meta[name='keywords']").getAttribute("content")).toEqual(
				metaValue("keywords")
			);
		});

		it("must use the globalContent.taxonomy.seo_keywords if exists", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expect(document.querySelector("meta[name='keywords']").getAttribute("content")).toEqual(
				globalContentComplete.taxonomy.seo_keywords.join(",")
			);
		});

		it("must use the globalContent.taxonomy.tags if exists", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const content = {
				...globalContentComplete,
				taxonomy: {
					tags: globalContentComplete.taxonomy.tags,
				},
			};
			wrapperGenerator(metaValue, content);
			const tags = content.taxonomy.tags.reduce((acc, ele) => acc.concat(ele.slug), []).join(",");
			expect(document.querySelector("meta[name='keywords']").getAttribute("content")).toEqual(tags);
		});

		it("must not use meta keywords if valid values not found", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const content = {
				...globalContentComplete,
				taxonomy: {},
			};
			wrapperGenerator(metaValue, content);
			expect(document.querySelector("meta[name='keywords']")).toBeNull();
		});

		it("must not use meta keywords if tags do not have slug", () => {
			const metaValue = metaValues({
				"page-type": pageType,
			});
			const content = {
				...globalContentComplete,
				taxonomy: {
					tags: [{ zapato: "tag1" }, { zapato: "tag2" }],
				},
			};
			wrapperGenerator(metaValue, content);
			expect(document.querySelectorAll("meta[name='keywords']").length).toBe(0);
		});
	});
};

const urlTest = (pageType) => {
	describe("when globalContent is provided", () => {
		const metaValue = metaValues({
			"page-type": pageType,
			title: "the-sun",
		});
		wrapperGenerator(metaValue, globalContentComplete);

		it("should have a og:url", () => {
			expect(document.querySelector("meta[property='og:url']").getAttribute("content")).toEqual(
				"http://example.com/url/to/story/"
			);
		});
	});
};

const noGlobalContent = (pageType) => {
	const metaValue = metaValues({
		"page-type": pageType,
	});
	wrapperGenerator(metaValue, null);

	it("should have a title tag", () => {
		expect(document.title).toEqual(websiteName);
	});

	it("should not have a description meta tag", () => {
		expect(document.querySelector("meta[name='description']")).toBeNull();
	});

	it("should not have a twitter:description meta tag", () => {
		expect(document.querySelector("meta[name='twitter:description']")).toBeNull();
	});

	it("should not have a og:description meta tag", () => {
		expect(document.querySelector("meta[property='og:description']")).toBeNull();
	});

	it("should not have a keywords meta tag", () => {
		expect(document.querySelector("meta[name='keywords']")).toBeNull();
	});

	it("should have a og:title meta tag", () => {
		expect(document.querySelector("meta[property='og:title']").getAttribute("content")).toBe(
			websiteName
		);
	});

	it("should have a twitter:title meta tag", () => {
		expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
			websiteName
		);
	});

	it("should not have an og:image meta tag if there is not any page-type", () => {
		if (metaValue["page-type"] === "") {
			expect(document.querySelector("meta[property='og:image']")).toBeNull();
		}
	});

	it("should have an og:image meta tag if any page-type", () => {
		if (metaValue["page-type"]) {
			expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toEqual(
				`${websiteDomain}${fallbackImageLocal}`
			);
		}
	});

	it("should not have an og:image:alt meta tag", () => {
		expect(document.querySelector("meta[property='og:image:alt']")).toBeNull();
	});
};

describe("the meta data", () => {
	describe("specific meta title values override internal logic, title, og:title, twitter:title", () => {
		it("when no page-type given", () => {
			const metaValue = metaValues({
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, {});
			const titleElement = document.querySelector("title");
			expect(titleElement.textContent).toEqual(metaValue("title"));

			const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaElement.getAttribute("content")).toEqual(metaValue("og:title"));

			const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
			expect(twitterTitleMetaElement.getAttribute("content")).toEqual(metaValue("twitter:title"));
		});

		it("when search page-type", () => {
			const metaValue = metaValues({
				"page-type": "search",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByTestId("og-title-meta");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByTestId("twitter-title-meta");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when section page-type", () => {
			const metaValue = metaValues({
				"page-type": "section",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByTestId("og-title-meta");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByTestId("twitter-title-meta");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when article page-type", () => {
			const metaValue = metaValues({
				"page-type": "article",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByTestId("og-title-meta");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByTestId("twitter-title-meta");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when video page type", () => {
			const metaValue = metaValues({
				"page-type": "video",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			const globalContent = {
				...globalContentComplete,
				headlines: {},
			};
			wrapperGenerator(metaValue, globalContent);
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByTestId("og-title-meta");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByTestId("twitter-title-meta");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when gallery page-type", () => {
			const metaValue = metaValues({
				"page-type": "gallery",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			const globalContent = {
				...globalContentComplete,
				headlines: {},
			};
			wrapperGenerator(metaValue, globalContent);
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByProperty("og:title");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByProperty("twitter:title");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when author page-type", () => {
			const metaValue = metaValues({
				"page-type": "author",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, {});
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByProperty("og:title");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByProperty("twitter:title");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when tag page-type", () => {
			const metaValue = metaValues({
				"page-type": "tag",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, {});
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByProperty("og:title");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByProperty("twitter:title");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});

		it("when homepage page-type", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
				title: "Custom Page Title",
				"og:title": "Custom OG Title",
				"twitter:title": "Custom Twitter Title",
			});
			wrapperGenerator(metaValue, {});
			const titleElement = screen.getByText(metaValue("title"));
			expect(titleElement).toBeInTheDocument();

			const ogTitleMetaElement = screen.getByProperty("og:title");
			expect(ogTitleMetaElement).toHaveAttribute("content", metaValue("og:title"));

			const twitterTitleMetaElement = screen.getByProperty("twitter:title");
			expect(twitterTitleMetaElement).toHaveAttribute("content", metaValue("twitter:title"));
		});
	});

	describe("when a article page type is provided", () => {
		describe("when globalContent is provided", () => {
			titleTest("article");
			descriptionTest("article");
			ogTitleTest("article");
			ogImageTest("article");
			ogImageAltTest("article");
			twitterTitleTest("article");
			twitterImageTest("article");
			keywordsTest("article");
			urlTest("article");

			it("should have robots noarchive", () => {
				const metaValue = metaValues({
					"page-type": "article",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']").getAttribute("content")).toEqual(
					"noarchive"
				);
			});

			it("should have og:type", () => {
				const metaValue = metaValues({
					"page-type": "article",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']").getAttribute("content")).toBe(
					"article"
				);
			});
		});

		describe("when globalContent is not provided", () => {
			noGlobalContent("article");

			it("should have robots noarchive", () => {
				const metaValue = metaValues({
					"page-type": "article",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']").getAttribute("content")).toEqual(
					"noarchive"
				);
			});

			it("should have og:type", () => {
				const metaValue = metaValues({
					"page-type": "article",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']").getAttribute("content")).toBe(
					"article"
				);
			});
		});
	});

	describe("when a video page type is provided", () => {
		describe("when global content is provided", () => {
			titleTest("video");
			descriptionTest("video");
			ogTitleTest("video");
			ogImageTest("video");
			ogImageAltTest("video");
			twitterTitleTest("video");
			twitterImageTest("video");
			keywordsTest("video");

			it("should not have a robots meta tag", () => {
				const metaValue = metaValues({
					"page-type": "video",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']")).toBeNull();
			});

			it("should not have og:type", () => {
				const metaValue = metaValues({
					"page-type": "video",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']")).toBeNull();
			});
		});

		describe("when global content is not provided", () => {
			noGlobalContent("video");

			it("should not have a robots meta tag", () => {
				const metaValue = metaValues({
					"page-type": "video",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']")).toBeNull();
			});

			it("should not have og:type", () => {
				const metaValue = metaValues({
					"page-type": "video",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']")).toBeNull();
			});
		});
	});

	describe("when a gallery page type is provided", () => {
		describe("when global content is provided", () => {
			titleTest("gallery");
			descriptionTest("gallery");
			ogTitleTest("gallery");
			ogImageTest("gallery");
			ogImageAltTest("gallery");
			twitterTitleTest("gallery");
			twitterImageTest("gallery");
			keywordsTest("gallery");

			it("should not have a robots meta tag", () => {
				const metaValue = metaValues({
					"page-type": "gallery",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']")).toBeNull();
			});

			it("should not have og:type", () => {
				const metaValue = metaValues({
					"page-type": "gallery",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']")).toBeNull();
			});
		});

		describe("when global content is not provided", () => {
			noGlobalContent("gallery");

			it("should not have a robots meta tag", () => {
				const metaValue = metaValues({
					"page-type": "gallery",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='robots']")).toBeNull();
			});

			it("should not have og:type", () => {
				const metaValue = metaValues({
					"page-type": "gallery",
					title: "the-sun",
				});
				wrapperGenerator(metaValue, globalContentComplete);

				expect(document.querySelector("meta[property='og:type']")).toBeNull();
			});
		});
	});

	describe("when an author page type is provided", () => {
		describe("when global content is provided", () => {
			it("should use metaValue first if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "author",
					description: "author meta value bio",
				});
				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					metaValue("description")
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(metaValue("description"));
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(metaValue("description"));
			});

			it("should use authors.bio if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});
				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					globalContentAuthor.authors[0].bio
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(globalContentAuthor.authors[0].bio);
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(globalContentAuthor.authors[0].bio);
			});

			it("should use authors.byline for title if exists", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});

				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.title).toEqual(`${globalContentAuthor.authors[0].byline} - ${websiteName}`);
				expect(document.querySelector("meta[property='og:title']").getAttribute("content")).toBe(
					`${globalContentAuthor.authors[0].byline} - ${websiteName}`
				);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					`${globalContentAuthor.authors[0].byline} - ${websiteName}`
				);
			});

			it("should have an author twitter:title meta tag", () => {
				const metaValue = metaValues({
					"page-type": "author",
					"twitter:title": "meta value title",
				});

				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					metaValue("twitter:title")
				);
			});

			it("should use authors.byline if twitter:title not found", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});

				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					`${globalContentAuthor.authors[0].byline} - ${websiteName}`
				);
			});

			it("should use local fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});
				const authors = { ...globalContentAuthor.authors[0], image: undefined };
				wrapperGenerator(metaValue, { authors: [authors] });
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(authors.byline);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(authors.byline);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});
				const authors = { ...globalContentAuthor.authors[0], image: undefined };
				wrapperGenerator(metaValue, { authors: [authors] }, fallbackImageRemote);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(authors.byline);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(authors.byline);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});
				const authors = { ...globalContentAuthor.authors[0], image: undefined };
				wrapperGenerator(metaValue, { authors: [authors] }, null);
				expectImageMetaMissing();
			});

			it("should use author image for social meta tags if exists", () => {
				const metaValue = metaValues({
					"page-type": "author",
				});
				wrapperGenerator(metaValue, globalContentAuthor);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					globalContentAuthor.authors[0].image
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(globalContentAuthor.authors[0].byline);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					globalContentAuthor.authors[0].image
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(globalContentAuthor.authors[0].byline);
			});
		});

		describe("when global content is not provided", () => {
			const metaValue = metaValues({
				"page-type": "author",
			});

			it("should have a title tag", () => {
				wrapperGenerator(metaValue, null);
				const titleElement = document.querySelector("title");
				expect(titleElement.textContent).toEqual(websiteName);

				const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
				expect(ogTitleMetaElement.getAttribute("content")).toEqual(websiteName);

				const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
				expect(twitterTitleMetaElement.getAttribute("content")).toEqual(websiteName);
			});

			it("should not have description", () => {
				wrapperGenerator(metaValue, null);
				const descriptionMetaElements = document.querySelectorAll("meta[name='description']");
				expect(descriptionMetaElements.length).toBe(0);
			});

			it("should have default social meta", () => {
				wrapperGenerator(metaValue, null);
				expectDefaultMeta();
			});

			it("should use local fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null);
				const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageMetaElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

				const ogImageMetaElement = document.querySelector("meta[property='og:image']");
				expect(ogImageMetaElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null, fallbackImageRemote);

				const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

				const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

				const ogImageMetaElement = document.querySelector("meta[property='og:image']");
				expect(ogImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

				const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				wrapperGenerator(metaValue, null, null);
				expectImageMetaMissing();
			});
		});
	});

	describe("when a tag page type is provided", () => {
		describe("when global content is provided", () => {
			it("should use metaValue first if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "tag",
					description: "tag meta valu",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					metaValue("description")
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(metaValue("description"));
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(metaValue("description"));
			});

			it("should use Payload.description if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					globalContentComplete.Payload[0].description
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(globalContentAuthor.Payload[0].description);
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(globalContentAuthor.Payload[0].description);
			});

			it("should have an author twitter:title meta tag", () => {
				const metaValue = metaValues({
					"page-type": "tag",
					"twitter:title": "meta value title",
				});

				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					metaValue("twitter:title")
				);
			});

			it("should use Payload.name for title if exists", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});

				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.title).toEqual(`${globalContentComplete.Payload[0].name} - ${websiteName}`);
				expect(document.querySelector("meta[property='og:title']").getAttribute("content")).toBe(
					`${globalContentComplete.Payload[0].name} - ${websiteName}`
				);
			});

			it("should have an author twitter:title meta tag", () => {
				const metaValue = metaValues({
					"page-type": "tag",
					"twitter:title": "meta value title",
				});

				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					metaValue("twitter:title")
				);
			});

			it("should use authors.byline if twitter:title not found", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});

				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='twitter:title']").getAttribute("content")).toBe(
					`${globalContentComplete.Payload[0].name} - ${websiteName}`
				);
			});

			it("should use local fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(`${globalContentComplete.Payload[0].name} - ${websiteName}`);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(`${globalContentComplete.Payload[0].name} - ${websiteName}`);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});
				wrapperGenerator(metaValue, globalContentComplete, fallbackImageRemote);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(`${globalContentComplete.Payload[0].name} - ${websiteName}`);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(`${globalContentComplete.Payload[0].name} - ${websiteName}`);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				const metaValue = metaValues({
					"page-type": "tag",
				});
				wrapperGenerator(metaValue, globalContentComplete, null);
				expectImageMetaMissing();
			});
		});

		describe("when global content is not provided", () => {
			const metaValue = metaValues({
				"page-type": "tag",
			});

			it("should have a title tag", () => {
				wrapperGenerator(metaValue, null);
				expect(document.title).toEqual(websiteName);
				expect(document.querySelector("meta[property='og:title']").getAttribute("content")).toEqual(
					websiteName
				);
				expect(
					document.querySelector("meta[name='twitter:title']").getAttribute("content")
				).toEqual(websiteName);
			});

			it("should not have description", () => {
				wrapperGenerator(metaValue, null);
				expect(document.querySelector("meta[name='description']")).toBeNull();
			});

			it("should use local fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(websiteName);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(websiteName);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null, fallbackImageRemote);
				expect(document.querySelector("meta[name='twitter:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[name='twitter:image:alt']").getAttribute("content")
				).toBe(websiteName);
				expect(document.querySelector("meta[property='og:image']").getAttribute("content")).toBe(
					fallbackImageRemote
				);
				expect(
					document.querySelector("meta[property='og:image:alt']").getAttribute("content")
				).toBe(websiteName);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				wrapperGenerator(metaValue, null, null);
				expectImageMetaMissing();
			});
		});
	});

	describe("when a section page type is provided", () => {
		describe("when global content is provided", () => {
			it("should use metaValue first if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "section",
					description: "section meta valu",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					metaValue("description")
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(metaValue("description"));
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(metaValue("description"));
			});

			it("should use metadata_description if exists for description", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				expect(document.querySelector("meta[name='description']").getAttribute("content")).toBe(
					globalContentComplete.metadata.metadata_description
				);
				expect(
					document.querySelector("meta[name='twitter:description']").getAttribute("content")
				).toBe(globalContentComplete.metadata.metadata_description);
				expect(
					document.querySelector("meta[property='og:description']").getAttribute("content")
				).toBe(globalContentComplete.metadata.metadata_description);
			});

			describe("title handling", () => {
				it("should use metaValue title for title", () => {
					const metaValue = metaValues({
						"page-type": "section",
						title: "meta value title",
					});

					wrapperGenerator(metaValue, globalContentComplete);

					const titleElement = screen.getByText(metaValue("title"));
					expect(titleElement).toBeInTheDocument();
					// expect(container.find("title").childAt(0).text()).toEqual(metaValue("title"));
				});

				it("should use metadata_title if title not found", () => {
					const metaValue = metaValues({
						"page-type": "section",
					});

					wrapperGenerator(metaValue, globalContentComplete);
					const titleElement = screen.getByText(globalContentComplete.metadata.metadata_title);
					expect(titleElement).toBeInTheDocument();
				});

				it("should use gc.name if metadata_title and title are missing", () => {
					const metaValue = metaValues({
						"page-type": "section",
					});
					const content = {
						...globalContentComplete,
						metadata: {},
					};

					wrapperGenerator(metaValue, content);
					const titleElement = screen.getByText(`${content.name} - ${websiteName}`);
					expect(titleElement).toBeInTheDocument();
				});

				it("should use websiteName if metadata_title, title and gc.name are missing", () => {
					const metaValue = metaValues({
						"page-type": "section",
						"og:title": "meta value og:title",
					});
					const content = {
						...globalContentComplete,
						name: null,
						metadata: {},
					};

					wrapperGenerator(metaValue, content);
					const titleElement = screen.getByText(websiteName);
					expect(titleElement).toBeInTheDocument();
				});
			});

			it("should use og:title", () => {
				const metaValue = metaValues({
					"page-type": "section",
					"og:title": "meta value og:title",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				const ogTitleElement = document.querySelector('meta[property="og:title"]');
				expect(ogTitleElement.getAttribute("content")).toBe(metaValue("og:title"));
			});

			it("should use gc.name if og:title missing", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				const ogTitleElement = document.querySelector("meta[property='og:title']");
				expect(ogTitleElement.getAttribute("content")).toBe(
					`${globalContentComplete.name} - ${websiteName}`
				);
			});

			it("should use websiteName if gc.name and og:title are missing", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				const content = {
					...globalContentComplete,
					name: null,
				};
				wrapperGenerator(metaValue, content);
				const ogTitleElement = document.querySelector("meta[property='og:title']");
				expect(ogTitleElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use twitter:title", () => {
				const metaValue = metaValues({
					"page-type": "section",
					"twitter:title": "meta value twitter:title",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				const twitterTitleElement = document.querySelector("meta[name='twitter:title']");
				expect(twitterTitleElement.getAttribute("content")).toBe(metaValue("twitter:title"));
			});

			it("should use gc.name if twitter:title is missing", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				wrapperGenerator(metaValue, globalContentComplete);
				const twitterTitleElement = document.querySelector("meta[name='twitter:title']");
				expect(twitterTitleElement.getAttribute("content")).toBe(
					`${globalContentComplete.name} - ${websiteName}`
				);
			});

			it("should use websiteName if twitter:title is missing", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				const content = {
					...globalContentComplete,
					name: null,
				};
				wrapperGenerator(metaValue, content);
				const twitterTitleElement = document.querySelector("meta[name='twitter:title']");
				expect(twitterTitleElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use local fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				const content = { ...globalContentComplete };
				wrapperGenerator(metaValue, content);
				const twitterImageElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const twitterImageAltElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltElement.getAttribute("content")).toBe(
					`${content.name} - ${websiteName}`
				);

				const ogImageElement = document.querySelector("meta[property='og:image']");
				expect(ogImageElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const ogImageAltElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltElement.getAttribute("content")).toBe(`${content.name} - ${websiteName}`);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				const content = { ...globalContentComplete };
				wrapperGenerator(metaValue, content, fallbackImageRemote);
				const twitterImageElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageElement.getAttribute("content")).toBe(fallbackImageRemote);

				const twitterImageAltElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltElement.getAttribute("content")).toBe(
					`${content.name} - ${websiteName}`
				);

				const ogImageElement = document.querySelector("meta[property='og:image']");
				expect(ogImageElement.getAttribute("content")).toBe(fallbackImageRemote);

				const ogImageAltElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltElement.getAttribute("content")).toBe(`${content.name} - ${websiteName}`);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				const metaValue = metaValues({
					"page-type": "section",
				});
				wrapperGenerator(metaValue, globalContentComplete, null);
				expectImageMetaMissing();
			});
		});

		describe("when global content is not provided", () => {
			const metaValue = metaValues({
				"page-type": "section",
			});

			it("should use websiteName as title", () => {
				wrapperGenerator(metaValue, null);

				const titleElement = document.querySelector("title");
				expect(titleElement.textContent).toEqual(websiteName);
			});

			it("should not have a section description meta tag", () => {
				wrapperGenerator(metaValue, null);

				const descriptionMetaElement = document.querySelector("meta[name='description']");
				expect(descriptionMetaElement).toBeNull();
			});

			it("should use websiteName as og:title meta tag", () => {
				wrapperGenerator(metaValue, null);

				const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
				expect(ogTitleMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use websiteName as twitter:title meta tag", () => {
				wrapperGenerator(metaValue, null);

				const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
				expect(twitterTitleMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use local fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null);

				const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageMetaElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

				const ogImageMetaElement = document.querySelector("meta[property='og:image']");
				expect(ogImageMetaElement.getAttribute("content")).toBe(
					`${websiteDomain}${fallbackImageLocal}`
				);

				const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should use remote fallbackImage for social meta tags", () => {
				wrapperGenerator(metaValue, null, fallbackImageRemote);

				const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
				expect(twitterImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

				const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
				expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

				const ogImageMetaElement = document.querySelector("meta[property='og:image']");
				expect(ogImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

				const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
				expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
			});

			it("should not render image social meta tags if fallbackImage is missing", () => {
				wrapperGenerator(metaValue, null, null);
				expectImageMetaMissing();
			});
		});
	});

	describe("when a search page type is provided", () => {
		it("should use websiteName as title", () => {
			const metaValue = metaValues({
				"page-type": "search",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = document.querySelector("title");
			expect(titleElement.textContent).toEqual(`Search - ${websiteName}`);
		});

		it("should use websiteName as og:title", () => {
			const metaValue = metaValues({
				"page-type": "search",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaElement.getAttribute("content")).toBe(`Search - ${websiteName}`);
		});

		it("should use websiteName as twitter:title", () => {
			const metaValue = metaValues({
				"page-type": "search",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
			expect(twitterTitleMetaElement.getAttribute("content")).toBe(`Search - ${websiteName}`);
		});
	});

	describe("when a homepage page type is provided", () => {
		it("should use websiteName as title", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = document.querySelector("title");
			expect(titleElement.textContent).toEqual(websiteName);
		});

		it("should override title when defining title meta tag", () => {
			const title = "This is customization title";
			const metaValue = metaValues({
				"page-type": "homepage",
				title,
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const titleElement = document.querySelector("title");
			expect(titleElement.textContent).toEqual(title);

			const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaElement.getAttribute("content")).toBe(websiteName);

			const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
			expect(twitterTitleMetaElement.getAttribute("content")).toBe(websiteName);
		});

		it("should use websiteName as og:title", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const ogTitleMetaElement = document.querySelector("meta[property='og:title']");
			expect(ogTitleMetaElement.getAttribute("content")).toBe(websiteName);
		});

		it("should use websiteName as twitter:title", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const twitterTitleMetaElement = document.querySelector("meta[name='twitter:title']");
			expect(twitterTitleMetaElement.getAttribute("content")).toBe(websiteName);
		});

		it("should render default twitter meta", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expectDefaultMeta();
		});

		it("should use local fallbackImage for social meta tags", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
			expect(twitterImageMetaElement.getAttribute("content")).toBe(
				`${websiteDomain}${fallbackImageLocal}`
			);

			const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
			expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

			const ogImageMetaElement = document.querySelector("meta[property='og:image']");
			expect(ogImageMetaElement.getAttribute("content")).toBe(
				`${websiteDomain}${fallbackImageLocal}`
			);

			const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
			expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
		});

		it("should use remote fallbackImage for social meta tags", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete, fallbackImageRemote);
			const twitterImageMetaElement = document.querySelector("meta[name='twitter:image']");
			expect(twitterImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

			const twitterImageAltMetaElement = document.querySelector("meta[name='twitter:image:alt']");
			expect(twitterImageAltMetaElement.getAttribute("content")).toBe(websiteName);

			const ogImageMetaElement = document.querySelector("meta[property='og:image']");
			expect(ogImageMetaElement.getAttribute("content")).toBe(fallbackImageRemote);

			const ogImageAltMetaElement = document.querySelector("meta[property='og:image:alt']");
			expect(ogImageAltMetaElement.getAttribute("content")).toBe(websiteName);
		});

		it("should not render image social meta tags if fallbackImage is missing", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
			});
			wrapperGenerator(metaValue, globalContentComplete, null);
			expectImageMetaMissing();
		});
	});

	describe("twitter meta", () => {
		const metaValue = metaValues({
			"page-type": "article",
			title: "the-sun",
		});

		it("should have twitter tags", () => {
			wrapperGenerator(metaValue, globalContentComplete);
			expectDefaultMeta();
		});

		it("must not have an empty twitter:site metatag if twitterUsername missing", () => {
			render(
				<MetaData
					metaValue={metaValue}
					MetaTag={jest.fn()}
					MetaTags={jest.fn()}
					globalContent={globalContentComplete}
					websiteName={websiteName}
					resizerURL={resizerURL}
				/>
			);

			expectDefaultMetaMissing();
		});

		it("must not have an empty twitter:site metatag if twitterUsername empty", () => {
			render(
				<MetaData
					metaValue={metaValue}
					MetaTag={jest.fn()}
					MetaTags={jest.fn()}
					globalContent={globalContentComplete}
					twitterUsername=""
					websiteName={websiteName}
					resizerURL={resizerURL}
				/>
			);

			expectDefaultMetaMissing();
		});
	});

	describe("Canonical links", () => {
		const canonicalDomainName = "http://canonical.com";
		it("must have canonical tag for article pages", () => {
			const metaValue = metaValues({
				"page-type": "article",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", canonicalDomainName, null, true);
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				`${canonicalDomainName}${globalContentComplete.canonical_url}`
			);
		});

		it("does not have canonical tag for article pages if not canonicalDomain", () => {
			const metaValue = metaValues({
				"page-type": "article",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			expect(document.querySelector('link[rel="canonical"]')).toBeNull();
		});

		it("must have canonical tag for video pages", () => {
			const metaValue = metaValues({
				"page-type": "video",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", canonicalDomainName, null, true);
			const canonicalHref = `${canonicalDomainName}${globalContentComplete.canonical_url}`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for gallery pages", () => {
			const metaValue = metaValues({
				"page-type": "gallery",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", canonicalDomainName, null, true);
			const canonicalHref = `${canonicalDomainName}${globalContentComplete.canonical_url}`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for tag pages", () => {
			const metaValue = metaValues({
				"page-type": "tag",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", null, null, true);
			const canonicalHref = `${websiteDomain}/tags/${globalContentComplete.Payload[0].slug}/`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for author pages", () => {
			const metaValue = metaValues({
				"page-type": "author",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentAuthor, "", null, null, true);
			const canonicalHref = `${websiteDomain}${globalContentAuthor.authors[0].bio_page}`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for section pages", () => {
			const metaValue = metaValues({
				"page-type": "section",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", null, null, true);
			const canonicalHref = `${websiteDomain}${globalContentComplete._id}/`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for search pages", () => {
			const metaValue = metaValues({
				"page-type": "search",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", null, null, true);
			const canonicalHref = `${websiteDomain}/search/${globalContentComplete.metadata.q}/`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("must have canonical tag for homepage pages", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, {}, "", null, null, true);
			const canonicalHref = `${websiteDomain}`;
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				canonicalHref
			);
		});

		it("only output domain if no global content and pageType should have canonical link", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, {}, "", null, null, true);
			expect(document.querySelector('link[rel="canonical"]').getAttribute("href")).toBe(
				`${websiteDomain}`
			);
		});

		it("will not output canonical link if outputCanonicalLink is false", () => {
			const metaValue = metaValues({
				"page-type": "homepage",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, {}, "", null, null, false);
			expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(0);
		});

		it("will not output canonical link if canonicalDomain does not resolve to a valid url", () => {
			const metaValue = metaValues({
				"page-type": "section",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete, "", "invalidDomain", null, true);
			expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(0);
		});

		it("does not output for an unknown page type", () => {
			const metaValue = metaValues({
				"page-type": "comic",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, {});
			expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(0);
		});
	});

	describe("facebook article meta", () => {
		it("articles pages must have og:type = article", () => {
			const metaValue = metaValues({
				"page-type": "article",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const metaTag = document.querySelector("meta[property='og:type']");
			expect(metaTag.getAttribute("content")).toBe("article");
		});

		it("no articles pages must not have og:type = article", () => {
			const metaValue = metaValues({
				"page-type": "video",
				title: "the-sun",
			});
			wrapperGenerator(metaValue, globalContentComplete);

			const metaTags = document.querySelectorAll("meta[property='og:type']");
			expect(metaTags.length).toBe(0);
		});
	});

	describe("all pages tags", () => {
		it("all pages must have this social tags", () => {
			const metaValue = metaValues({
				"page-type": "all-pages",
			});
			wrapperGenerator(metaValue, globalContentComplete);

			expect(
				document.querySelector('meta[property="og:site_name"]').getAttribute("content")
			).toEqual(websiteName);
			expect(document.querySelector('meta[name="twitter:site"]').getAttribute("content")).toEqual(
				`@${twitterUsername}`
			);
			expect(document.querySelector('meta[name="twitter:card"]').getAttribute("content")).toEqual(
				"summary_large_image"
			);
			expect(document.querySelector('meta[property="fb:admins"]').getAttribute("content")).toEqual(
				facebookAdmins
			);
		});

		it("must have the og:url if can build the page url", () => {
			const metaValue = metaValues({
				"page-type": "all-pages",
			});
			wrapperGenerator(metaValue, globalContentComplete);
			const url = `${websiteDomain}${globalContentComplete.websites[arcSite].website_url}`;

			expect(document.querySelector('meta[property="og:url"]').getAttribute("content")).toEqual(
				url
			);
		});
	});

	describe("all pages tags without globalContent", () => {
		it("all pages must have this social tags", () => {
			const metaValue = metaValues({
				"page-type": "all-pages",
			});
			wrapperGenerator(metaValue, null);

			expect(
				document.querySelector('meta[property="og:site_name"]').getAttribute("content")
			).toEqual(websiteName);
			expect(document.querySelector('meta[name="twitter:site"]').getAttribute("content")).toEqual(
				`@${twitterUsername}`
			);
			expect(document.querySelector('meta[name="twitter:card"]').getAttribute("content")).toEqual(
				"summary_large_image"
			);
			expect(document.querySelector('meta[property="fb:admins"]').getAttribute("content")).toEqual(
				facebookAdmins
			);
		});

		it("must not have og:url if not has globalContent", () => {
			const metaValue = metaValues({
				"page-type": "all-pages",
			});
			wrapperGenerator(metaValue, null);

			expect(document.querySelectorAll('meta[property="og:url"]').length).toBe(0);
		});

		it("must not have og:url if can not build the url", () => {
			const metaValue = metaValues({
				"page-type": "all-pages",
			});
			const localContent = {
				...globalContentComplete,
				websites: {},
			};
			wrapperGenerator(metaValue, localContent);
			expect(document.querySelectorAll('meta[property="og:url"]').length).toBe(0);
		});
	});

	describe("when page type is not provided", () => {
		describe("must reder default meta tags", () => {
			noGlobalContent("");
		});
	});

	describe("when page type is nativo-clp with globalContent", () => {
		const metaValue = metaValues({
			"page-type": "nativo-clp",
		});
		wrapperGenerator(metaValue, globalContentComplete);

		it("must not have any twitter meta tags", () => {
			expect(document.querySelectorAll('meta[name^="twitter:"]').length).toBe(0);
		});

		it("must not have any facebook meta tags", () => {
			expect(document.querySelectorAll('meta[name^="og:"]').length).toBe(0);
		});

		it("must not have canonical tag", () => {
			expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(0);
		});

		it("must have required nativo tags", () => {
			expect(
				document
					.querySelector('meta[http-equiv="X-UA-Compatible"][content="IE=edge"]')
					.getAttribute("http-equiv")
			).toEqual("X-UA-Compatible");
			expect(document.querySelector('meta[name="robots"]').getAttribute("content")).toEqual(
				"noindex, nofollow"
			);
		});
	});

	describe("when page type is nativo-clp without globalContent", () => {
		const metaValue = metaValues({
			"page-type": "nativo-clp",
		});
		wrapperGenerator(metaValue, null);

		it("must not have any twitter meta tags", () => {
			expect(document.querySelectorAll('meta[name^="twitter:"]').length).toBe(0);
		});

		it("must not have any facebook meta tags", () => {
			expect(document.querySelectorAll('meta[name^="og:"]').length).toBe(0);
		});

		it("must not have canonical tag", () => {
			expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(0);
		});

		it("must have required nativo tags", () => {
			expect(
				document.querySelector('meta[http-equiv="X-UA-Compatible"][content="IE=edge"]')
			).toBeTruthy();
			expect(
				document.querySelector('meta[name="robots"][content="noindex, nofollow"]')
			).toBeTruthy();
		});
	});
});
