/**
 * @jest-environment node
 */
import ReactDOMServer from "react-dom/server";
import { useContent } from "fusion:content";
import MetaData from ".";

// Helper to render server-side and return markup string
const renderSSR = (jsx) => ReactDOMServer.renderToStaticMarkup(jsx);

afterEach(() => {
	if (useContent.mockReset) useContent.mockReset();
});

describe("MetaData (server-side)", () => {
	it("uses globalContent.canonical_url_external for canonical link if present", () => {
		useContent.mockReturnValue(null); // simplify
		const metaValue = (key) => (key === "page-type" ? "article" : null);
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="SiteName"
				websiteDomain="https://example.com"
				canonicalDomain="https://canonical.example.com"
				outputCanonicalLink
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				globalContent={{
					canonical_url: "/story/slug/",
					canonical_url_external: "https://external.example.com/story/override/",
					websites: { "test-site": { website_url: "/story/slug/" } },
				}}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		expect(view).toContain(
			'<link rel="canonical" href="https://external.example.com/story/override/"',
		);
		// Should NOT contain the fallback canonical
		expect(view).not.toContain(
			'<link rel="canonical" href="https://canonical.example.com/story/slug/"',
		);
	});
	it("renders with minimal required props without throwing", () => {
		const metaValue = (key) => (key === "page-type" ? "homepage" : null);
		expect(() =>
			renderSSR(
				<MetaData
					arcSite="test-site"
					websiteName="Test Site"
					websiteDomain="https://example.com"
					metaValue={metaValue}
					MetaTag={() => null}
					MetaTags={() => null}
					globalContent={{ websites: { "test-site": { website_url: "/" } } }}
					resizerURL="https://example.com/resizer/"
				/>,
			),
		).not.toThrow();
	});

	it("homepage includes basic social tags and fallback image when provided", () => {
		useContent
			.mockReturnValueOnce(null) // resizedOGImage (not used for homepage)
			.mockReturnValueOnce(null) // resizedTwitterImage
			.mockReturnValueOnce(null) // authorImageHash
			.mockReturnValueOnce({ hash: "fallbackhash" }); // fallbackImageHash
		const metaValue = (key) => (key === "page-type" ? "homepage" : null);
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="Test Site"
				websiteDomain="https://example.com"
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				fallbackImage="/images/fallback.jpg"
				globalContent={{ websites: { "test-site": { website_url: "/" } } }}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		expect(view).toContain("<title>Test Site</title>");
		expect(view).toContain('meta property="og:title" content="Test Site"');
		expect(view).toContain('meta name="twitter:title" content="Test Site"');
		// Fallback image should produce og:image meta if hash present
		expect(view).toContain('meta property="og:image"');
	});

	it("homepage with fallback image and no hash uses original normalized URL", () => {
		useContent
			.mockReturnValueOnce(null) // resizedOGImage
			.mockReturnValueOnce(null) // resizedTwitterImage
			.mockReturnValueOnce(null) // authorImageHash
			.mockReturnValueOnce(null); // fallbackImageHash -> triggers non-resized fallback path
		const metaValue = (key) => (key === "page-type" ? "homepage" : null);
		const fallbackPath = "/images/fallback-nohash.jpg";
		const expectedNormalized = "https://example.com/images/fallback-nohash.jpg";
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="Test Site"
				websiteDomain="https://example.com"
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				fallbackImage={fallbackPath}
				globalContent={{ websites: { "test-site": { website_url: "/" } } }}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		// Should include og:image tag with the normalized (non-resized) fallback image URL
		expect(view).toContain(`meta property="og:image" content="${expectedNormalized}"`);
	});

	it("article uses resizerURLs[ENVIRONMENT] when resizerURL prop omitted", () => {
		// Mock content hash resolves so we generate resized image URLs
		useContent
			.mockReturnValueOnce({ hash: "oghash" }) // resizedOGImage
			.mockReturnValueOnce(null) // resizedTwitterImage
			.mockReturnValueOnce(null) // authorImageHash
			.mockReturnValueOnce(null); // fallbackImageHash
		const metaMap = { "page-type": "article", "og:image": "og-image-id" };
		const metaValue = (k) => metaMap[k] || null;
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="SiteName"
				websiteDomain="https://example.com"
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				globalContent={{
					websites: { "test-site": { website_url: "/story/" } },
					headlines: { basic: "Headline" },
				}}
			/>,
		);
		// Because we omitted resizerURL prop, implementation should fall back to env-specific URL (http://env-resizer.com/ from properties mock)
		expect(view).toContain("http://env-resizer.com/");
	});

	it("article includes description, keywords, and image tags with metaValue overrides", () => {
		useContent
			.mockReturnValueOnce({ hash: "oghash" }) // resizedOGImage
			.mockReturnValueOnce({ hash: "twhash" }) // resizedTwitterImage
			.mockReturnValueOnce(null) // authorImageHash
			.mockReturnValueOnce(null); // fallbackImageHash
		const metaMap = {
			"page-type": "article",
			"og:image": "og-image-id",
			"twitter:image": "tw-image-id",
			title: "Custom Title",
			"og:title": "OG Custom Title",
			"twitter:title": "TW Custom Title",
			description: "Custom description",
			keywords: "alpha,beta",
		};
		const metaValue = (key) => metaMap[key] || null;
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="SiteName"
				websiteDomain="https://example.com"
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				globalContent={{ websites: { "test-site": { website_url: "/article-path/" } } }}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		expect(view).toContain('<meta name="description" content="Custom description"');
		expect(view).toContain('<meta name="keywords" content="alpha,beta"');
		expect(view).toContain('meta property="og:image"');
		expect(view).toContain("og-image-id");
		expect(view).toContain("tw-image-id");
		expect(view).toContain('<meta property="og:title" content="OG Custom Title"');
		expect(view).toContain('<meta name="twitter:title" content="TW Custom Title"');
	});

	it("author page renders author image alt tags when image hash present", () => {
		useContent
			.mockReturnValueOnce(null) // resizedOGImage (not used)
			.mockReturnValueOnce(null) // resizedTwitterImage
			.mockReturnValueOnce({ hash: "authorhash" }) // authorImageHash
			.mockReturnValueOnce(null); // fallbackImageHash
		const metaValue = (key) => (key === "page-type" ? "author" : null);
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="SiteName"
				websiteDomain="https://example.com"
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				globalContent={{
					authors: [
						{
							byline: "Jane Doe",
							name: "Jane Doe",
							image: "https://cdn.example.com/jane.jpg",
						},
					],
					websites: { "test-site": { website_url: "/authors/jane/" } },
				}}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		expect(view).toContain('meta property="og:image"');
		expect(view).toContain('meta property="og:image:alt" content="Jane Doe"');
	});

	it("outputs canonical link when enabled", () => {
		useContent.mockReturnValue(null); // simplify
		const metaValue = (key) => (key === "page-type" ? "article" : null);
		const view = renderSSR(
			<MetaData
				arcSite="test-site"
				websiteName="SiteName"
				websiteDomain="https://example.com"
				canonicalDomain="https://canonical.example.com"
				outputCanonicalLink
				metaValue={metaValue}
				MetaTag={() => null}
				MetaTags={() => null}
				globalContent={{
					canonical_url: "/story/slug/",
					websites: { "test-site": { website_url: "/story/slug/" } },
				}}
				resizerURL="https://resizer.example.com/"
			/>,
		);
		expect(view).toContain(
			'<link rel="canonical" href="https://canonical.example.com/story/slug/"',
		);
	});
});
