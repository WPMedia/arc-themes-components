import getImageFromANS from "./getImageFromANS";

const mockLeadArtVideo = {
	_id: "WRONBKU2AVFKBOGTD3U7TYQJEQ",
	type: "story",
	version: "0.10.5",
	content_elements: [
		{
			_id: "QVI6IF4OWJDGBNU6PB6WSBMYDA",
			type: "text",
			additional_properties: {
				_id: 1580422784412,
				comments: [],
				inline_comments: [],
			},
			content: "River video",
		},
	],
	created_date: "2020-05-15T14:44:00.063Z",
	revision: {
		revision_id: "BOHCRHJDGZDUZN26PZR7MP4RPQ",
		parent_id: "E3LJDAEVJFHRPMMN3VL7ZSP54A",
		editions: ["default"],
		branch: "default",
		user_id: "MASONL@washpost.com",
		published: true,
	},
	last_updated_date: "2020-05-15T14:45:53.239Z",
	canonical_url: "/news/2020/05/15/video-promo-test-story/",
	headlines: {
		basic: "Video Promo test Story",
		mobile: "",
		native: "",
		print: "",
		tablet: "",
		web: "",
		meta_title: "",
	},
	owner: {
		sponsored: false,
		id: "corecomponents",
	},
	content_restrictions: {
		content_code: "free",
	},
	address: {},
	workflow: {
		status_code: 1,
	},
	subheadlines: {
		basic: "A Shallow River Streaming Through A Bed Of Rocks",
	},
	description: {
		basic: "",
	},
	language: "",
	label: {},
	source: {
		name: "corecomponents",
		system: "composer",
		source_type: "staff",
	},
	taxonomy: {
		tags: [],
		sites: [
			{
				_id: "/news",
				type: "site",
				version: "0.5.8",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						parent: "/",
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
					},
				},
			},
		],
		sections: [
			{
				_id: "/kultur",
				_website: "dagen",
				type: "section",
				version: "0.6.0",
				name: "Kultur",
				path: "/kultur",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/kultur",
						metadata: {
							metadata_title: "Kultur - Dagen Kultur",
							metadata_description:
								"Kulturartiklar från Dagen, Sveriges största dagstidning på kristen grund",
							content_code: "premium",
						},
						_website: "dagen",
						name: "Kultur",
						order: {
							footer: 2001,
						},
						parent: {
							default: "/",
							footer: "/familj",
							"hamburger-menu": "/",
						},
						ancestors: {
							default: [],
							footer: ["/", "/familj"],
							"hamburger-menu": [],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "dagen./kultur",
			},
		],
		primary_site: {
			_id: "/news",
			type: "site",
			version: "0.5.8",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			additional_properties: {
				original: {
					_id: "/news",
					site: {
						site_tagline: null,
						pagebuilder_path_for_native_apps: null,
						site_description: null,
						site_url: null,
						site_keywords: null,
						site_title: null,
						site_about: null,
					},
					social: {
						rss: null,
						twitter: null,
						instagram: null,
						facebook: null,
					},
					navigation: {
						nav_title: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					name: "News",
					parent: "/",
					_admin: {
						alias_ids: ["/news"],
					},
					inactive: false,
					node_type: "section",
				},
			},
		},
		primary_section: {
			_id: "/news",
			_website: "the-sun",
			type: "section",
			version: "0.6.0",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			parent: {
				default: "/",
			},
			additional_properties: {
				original: {},
			},
		},
	},
	related_content: {
		basic: [],
		redirect: [],
	},
	promo_items: {
		lead_art: {
			type: "video",
			_id: "e3fd9d65-abef-44c0-95b6-7bdfe2acc82d",
			version: "0.8.0",
			canonical_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
			canonical_website: "the-gazette",
			short_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
			created_date: "2019-11-05T19:47:14Z",
			last_updated_date: "2019-11-05T20:42:24Z",
			publish_date: "2019-11-05T20:42:36Z",
			first_publish_date: "2019-11-05T19:53:57Z",
			display_date: "2019-11-05T19:53:57Z",
			headlines: {
				basic: "A Shallow River Streaming Through A Bed Of Rocks",
			},
			subheadlines: {
				basic: "This is the blurb for the video 'A Shallow River Streaming Through A Bed Of Rocks'",
			},
			description: {
				basic:
					"This is the caption for the video 'A Shallow River Streaming Through A Bed Of Rocks'",
			},
			credits: {
				affiliation: [
					{
						name: "Pexels",
					},
				],
				by: [
					{
						type: "author",
						name: "",
						org: "Pexels",
						slug: "",
					},
				],
			},
			taxonomy: {
				tags: [],
				primary_site: {
					type: "site",
					_id: "/arts",
					version: "0.5.8",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sites: [
					{
						type: "site",
						_id: "/arts",
						version: "0.5.8",
						name: "Arts",
						path: "/arts",
						primary: true,
					},
				],
				primary_section: {
					type: "section",
					_id: "/arts",
					_website: "the-gazette",
					version: "0.6.0",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sections: [],
				seo_keywords: [],
			},
			promo_items: {
				basic: {
					type: "image",
					version: "0.5.8",
					credits: {},
					caption: "GF Default - A Shallow River Streaming Through A Bed Of Rocks",
					url: "https://d22ff27hdsy159.cloudfront.net/11-05-2019/t_9f51049ae2e640ba99b4a7f1763ca5fc_name_t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708__scaled.jpg",
					width: 1920,
					height: 1080,
				},
			},
			related_content: {
				redirect: [],
				basic: [],
			},
			owner: {
				sponsored: false,
			},
			planning: {
				scheduling: {},
			},
			revision: {
				published: true,
			},
			syndication: {
				search: true,
			},
			source: {
				name: "Pexels",
				system: "video center",
				edit_url:
					"https://corecomponents.arcpublishing.com/goldfish/video/5dc1d1c252faff00098c3399",
			},
			distributor: {
				mode: "reference",
				reference_id: "884ff0c4-4276-4ac3-895b-53c717097079",
			},
			tracking: {
				in_url_headline: "05",
			},
			additional_properties: {},
			duration: 27583,
			video_type: "clip",
			streams: [
				{
					height: 720,
					width: 1280,
					filesize: 7611481,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/Custom/2019/11/05/5dc1d1c252faff00098c3399/t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708/file_1280x720-2000-v3_1.mp4",
					bitrate: 2000,
					provider: "mediaconvert",
				},
			],
			subtitles: {},
			promo_image: {
				type: "image",
				version: "0.5.8",
				credits: {},
				caption: "GF Default - A Shallow River Streaming Through A Bed Of Rocks",
				url: "https://d22ff27hdsy159.cloudfront.net/11-05-2019/t_9f51049ae2e640ba99b4a7f1763ca5fc_name_t_1c01cadfde48422b857383e38d8553a7_name_Pexels_Videos_2330708__scaled.jpg",
				width: 1920,
				height: 1080,
			},
			embed_html:
				"<div class='powa' id='powa-e3fd9d65-abef-44c0-95b6-7bdfe2acc82d' data-org='corecomponents' data-env='prod' data-uuid='e3fd9d65-abef-44c0-95b6-7bdfe2acc82d' data-aspect-ratio='0.562' data-api='prod'><script src='//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents'></script></div>",
			websites: {
				"the-gazette": {
					website_section: {
						path: "/arts",
						_website: "the-gazette",
						name: "Arts",
						_id: "/arts",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
				"the-globe": {
					website_section: {
						path: "/news",
						_website: "the-globe",
						name: "News",
						_id: "/news",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
				"the-planet": {
					website_section: {
						path: "/news",
						_website: "the-planet",
						name: "News",
						_id: "/news",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
				"the-prophet": {
					website_section: {
						path: "/news",
						_website: "the-prophet",
						name: "News",
						_id: "/news",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
				"the-sun": {
					website_section: {
						path: "/news",
						_website: "the-sun",
						name: "News",
						_id: "/news",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
				"the-mercury": {
					website_section: {
						path: "/politics",
						_website: "the-mercury",
						name: "Politics",
						_id: "/politics",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/2019/11/05/a-shallow-river-streaming-through-a-bed-of-rocks/",
				},
			},
		},
	},
	distributor: {
		name: "corecomponents",
		category: "staff",
		subcategory: "",
	},
	canonical_website: "the-sun",
	planning: {
		internal_note: "",
		story_length: {
			word_count_actual: 2,
			character_count_actual: 11,
			character_encoding: "UTF-16",
			line_count_actual: 1,
			inch_count_actual: 1,
		},
	},
	display_date: "2020-05-15T14:45:49.425Z",
	credits: {
		by: [
			{
				name: "Luke Mason",
				org: "Arc Publishing",
				type: "author",
				additional_properties: {
					original: {
						author_type: "",
					},
				},
			},
		],
	},
	subtype: "right-rail-template",
	first_publish_date: "2020-05-15T14:45:53.275Z",
	websites: {
		dagen: {
			website_section: {
				_id: "/kultur",
				_website: "dagen",
				type: "section",
				version: "0.6.0",
				name: "Kultur",
				path: "/kultur",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/kultur",
						metadata: {
							metadata_title: "Kultur - Dagen Kultur",
							metadata_description:
								"Kulturartiklar från Dagen, Sveriges största dagstidning på kristen grund",
							content_code: "premium",
						},
						_website: "dagen",
						name: "Kultur",
						order: {
							footer: 2001,
						},
						parent: {
							default: "/",
							footer: "/familj",
							"hamburger-menu": "/",
						},
						ancestors: {
							default: [],
							footer: ["/", "/familj"],
							"hamburger-menu": [],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "dagen./kultur",
			},
			website_url: "/news/2020/05/15/video-promo-test-story/",
		},
		"the-sun": {
			website_section: {
				_id: "/news",
				_website: "the-sun",
				type: "section",
				version: "0.6.0",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						_website: "the-sun",
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
						order: {
							"links-bar": 1003,
						},
					},
				},
				_website_section_id: "the-sun./news",
			},
			website_url: "/news/2020/05/15/video-promo-test-story/",
		},
	},
	additional_properties: {
		clipboard: {},
		has_published_copy: true,
		is_published: false,
		publish_date: false,
	},
	publish_date: "2020-05-15T14:45:53.275Z",
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	website: "the-sun",
	website_url: "/news/2020/05/15/video-promo-test-story/",
};
const mockLeadArtVideoNoImage = {
	_id: "ZFGIZMA6LFEUHMOMN4D4CAJXWY",
	type: "story",
	version: "0.10.5",
	content_elements: [
		{
			_id: "ALEXEUBIPFH5LD4PQ63H5ISHHU",
			type: "text",
			additional_properties: {
				comments: [],
				_id: 1597068366879,
				inline_comments: [],
			},
			content: "<br/>",
		},
	],
	created_date: "2020-08-10T14:06:20.882Z",
	revision: {
		revision_id: "JS2EM2RI5NEGVFOSOT25OWIQEI",
		parent_id: "UMLEVIHEJ5CGXKHV32LDBUJUNI",
		editions: ["default"],
		branch: "default",
		user_id: "fernandezn@washpost.com",
		published: true,
	},
	last_updated_date: "2020-08-10T14:21:07.915Z",
	canonical_url: "/news/2020/08/10/story-with-video-without-a-promo-item/",
	headlines: {
		basic: "story with video without thumbnail",
		mobile: "",
		native: "",
		print: "",
		tablet: "",
		web: "",
		meta_title: "",
	},
	owner: {
		sponsored: false,
		id: "corecomponents",
	},
	content_restrictions: {},
	address: {},
	workflow: {
		status_code: 1,
	},
	subheadlines: {
		basic: "",
	},
	description: {
		basic: "",
	},
	language: "",
	source: {
		system: "composer",
		name: "corecomponents",
		source_type: "staff",
	},
	label: {},
	taxonomy: {
		sites: [],
		tags: [],
		sections: [
			{
				_id: "/news",
				_website: "the-gazette",
				type: "section",
				version: "0.6.0",
				name: "News",
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						metadata: {
							metadata_title: "News and latest updates from The Gazette",
							metadata_description: "This is the description for the News section",
						},
						_website: "the-gazette",
						name: "News",
						order: {
							default: 1006,
							"hamburger-menu": 1002,
							"links-bar": 1006,
						},
						parent: {
							default: "/",
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "the-gazette./news",
			},
			{
				_id: "/news",
				_website: "the-sun",
				type: "section",
				version: "0.6.0",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						_website: "the-sun",
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
						order: {
							"links-bar": 1003,
						},
					},
				},
				_website_section_id: "the-sun./news",
			},
		],
		primary_site: {
			_id: "/news",
			type: "site",
			version: "0.5.8",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			additional_properties: {
				original: {
					_id: "/news",
					site: {
						site_tagline: null,
						pagebuilder_path_for_native_apps: null,
						site_description: null,
						site_url: null,
						site_keywords: null,
						site_title: null,
						site_about: null,
					},
					social: {
						rss: null,
						twitter: null,
						instagram: null,
						facebook: null,
					},
					navigation: {
						nav_title: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					name: "News",
					parent: "/",
					_admin: {
						alias_ids: ["/news"],
					},
					inactive: false,
					node_type: "section",
				},
			},
		},
		primary_section: {
			_id: "/news",
			_website: "the-sun",
			type: "section",
			version: "0.6.0",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			parent: {
				default: "/",
			},
			additional_properties: {
				original: {
					_id: "/news",
					site: {
						site_tagline: null,
						pagebuilder_path_for_native_apps: null,
						site_description: null,
						site_url: null,
						site_keywords: null,
						site_title: null,
						site_about: null,
					},
					social: {
						rss: null,
						twitter: null,
						instagram: null,
						facebook: null,
					},
					navigation: {
						nav_title: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					name: "News",
					_website: "the-sun",
					parent: {
						default: "/",
						footer: null,
						"hamburger-menu": "/",
						"links-bar": "/",
					},
					ancestors: {
						default: [],
						footer: [],
						"hamburger-menu": [],
						"links-bar": ["/"],
					},
					_admin: {
						alias_ids: ["/news"],
					},
					inactive: false,
					node_type: "section",
					order: {
						"links-bar": 1003,
					},
				},
			},
		},
	},
	related_content: {
		basic: [],
		redirect: [],
	},
	promo_items: {
		lead_art: {
			type: "video",
			_id: "ba52f779-47be-46b9-8bd5-58dcb4318101",
			version: "0.8.0",
			canonical_url: "/video/2020/08/03/video-without-a-promo-image/",
			canonical_website: "the-gazette",
			short_url: "/video/2020/08/03/video-without-a-promo-image/",
			created_date: "2020-08-03T21:56:22Z",
			last_updated_date: "2020-08-03T22:02:48Z",
			publish_date: "2020-08-03T22:02:52Z",
			first_publish_date: "2020-08-03T21:59:03Z",
			display_date: "2020-08-03T21:59:03Z",
			headlines: {
				basic: "Video without a promo image",
			},
			subheadlines: {
				basic:
					"Test to verify that a video without a promo image still renders as expected on Themes promo blocks.",
			},
			credits: {
				affiliation: [
					{
						name: "Pexels",
					},
				],
				by: [
					{
						type: "author",
						name: "",
						org: "Pexels",
						slug: "",
					},
				],
			},
			taxonomy: {
				tags: [],
				primary_site: {
					type: "site",
					_id: "/arts",
					version: "0.5.8",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sites: [
					{
						type: "site",
						_id: "/arts",
						version: "0.5.8",
						name: "Arts",
						path: "/arts",
						primary: true,
					},
				],
				primary_section: {
					type: "section",
					_id: "/arts",
					_website: "the-gazette",
					version: "0.6.0",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sections: [
					{
						type: "section",
						_id: "/arts",
						_website: "the-gazette",
						version: "0.6.0",
						name: "Arts",
						path: "/arts",
						primary: true,
					},
				],
				seo_keywords: [],
			},
			promo_items: {
				basic: {
					type: "image",
					version: "0.5.8",
					credits: {},
				},
			},
			related_content: {
				redirect: [],
				basic: [],
			},
			owner: {
				sponsored: false,
			},
			planning: {
				scheduling: {},
			},
			revision: {
				published: true,
			},
			syndication: {
				search: true,
			},
			source: {
				name: "Pexels",
				system: "video center",
				edit_url:
					"https://corecomponents.arcpublishing.com/goldfish/video/5f288807c9e77c00013acd07",
			},
			distributor: {
				mode: "reference",
				reference_id: "884ff0c4-4276-4ac3-895b-53c717097079",
			},
			tracking: {
				in_url_headline: "03",
			},
			additional_properties: {
				subsection: "Arts",
				videoCategory: "vod",
				isWire: false,
				gifAsThumbnail: false,
				videoId: "5f288807c9e77c00013acd07",
				vertical: false,
				embedContinuousPlay: true,
				published: true,
				imageResizerUrls: [],
				advertising: {
					allowPrerollOnDomain: false,
					autoPlayPreroll: false,
					commercialAdNode: "/arts",
					enableAdInsertion: false,
					enableAutoPreview: true,
					enableServerSideFallback: false,
					forceAd: false,
					playAds: true,
					playVideoAds: true,
					videoAdZone: "",
				},
				disableUpNext: false,
				videoAdZone: "",
				lastPublishedBy: {
					name: "Sara Carothers",
					email: "Sara.Carothers@washpost.com",
					lastname: "",
				},
				permalinkUrl: "/video/2020/08/03/video-without-a-promo-image/",
				platform: "desktop",
				playVideoAds: true,
				forceClosedCaptionsOn: false,
				doNotShowTranscripts: false,
				useVariants: false,
				has_published_copy: true,
				playlistTags: [],
				firstPublishedBy: {
					name: "Sara Carothers",
					email: "Sara.Carothers@washpost.com",
					lastname: "",
				},
			},
			duration: 24290,
			video_type: "clip",
			streams: [
				{
					height: 180,
					width: 320,
					filesize: 1205456,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 160,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 1717944,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 300,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 2626360,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 600,
					provider: "mediaconvert",
				},
				{
					height: 480,
					width: 854,
					filesize: 4576296,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/master.m3u8",
					bitrate: 1200,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 15250560,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/hd.m3u8",
					bitrate: 4500,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 17428164,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/hlsv4_master.m3u8",
					bitrate: 5400,
					provider: "mediaconvert",
				},
				{
					height: 180,
					width: 320,
					filesize: 916085,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_320x180-160-v3.mp4",
					bitrate: 160,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 2306171,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_640x360-600-v3.mp4",
					bitrate: 600,
					provider: "mediaconvert",
				},
				{
					height: 480,
					width: 854,
					filesize: 4213998,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_854x480-1200-v3_1.mp4",
					bitrate: 1200,
					provider: "mediaconvert",
				},
				{
					height: 720,
					width: 1280,
					filesize: 6749501,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_1280x720-2000-v3_1.mp4",
					bitrate: 2000,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 17445140,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_1920x1080-5400-v4.mp4",
					bitrate: 5400,
					provider: "mediaconvert",
				},
			],
			subtitles: {},
			promo_image: {
				type: "image",
				version: "0.5.8",
				credits: {},
			},
			embed_html:
				"<div class='powa' id='powa-ba52f779-47be-46b9-8bd5-58dcb4318101' data-org='corecomponents' data-env='prod' data-uuid='ba52f779-47be-46b9-8bd5-58dcb4318101' data-aspect-ratio='0.562' data-api='prod'><script src='//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents'></script></div>",
			websites: {
				"the-gazette": {
					website_section: {
						path: "/arts",
						_website: "the-gazette",
						name: "Arts",
						_id: "/arts",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/video/2020/08/03/video-without-a-promo-image/",
				},
			},
		},
	},
	distributor: {
		name: "corecomponents",
		category: "staff",
		subcategory: "",
	},
	canonical_website: "the-sun",
	geo: {},
	planning: {
		internal_note: "",
		story_length: {
			word_count_actual: 0,
			character_count_actual: 0,
			character_encoding: "UTF-16",
			line_count_actual: 0,
			inch_count_actual: 0,
		},
	},
	display_date: "2020-08-10T14:07:57.831Z",
	credits: {
		by: [],
	},
	first_publish_date: "2020-08-10T14:07:57.831Z",
	websites: {
		"the-gazette": {
			website_section: {
				_id: "/news",
				_website: "the-gazette",
				type: "section",
				version: "0.6.0",
				name: "News",
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						metadata: {
							metadata_title: "News and latest updates from The Gazette",
							metadata_description: "This is the description for the News section",
						},
						_website: "the-gazette",
						name: "News",
						order: {
							default: 1006,
							"hamburger-menu": 1002,
							"links-bar": 1006,
						},
						parent: {
							default: "/",
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "the-gazette./news",
			},
			website_url: "/news/2020/08/10/story-with-video-without-a-promo-item/",
		},
		"the-sun": {
			website_section: {
				_id: "/news",
				_website: "the-sun",
				type: "section",
				version: "0.6.0",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						_website: "the-sun",
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
						order: {
							"links-bar": 1003,
						},
					},
				},
				_website_section_id: "the-sun./news",
			},
			website_url: "/news/2020/08/10/story-with-video-without-a-promo-item/",
		},
	},
	additional_properties: {
		clipboard: {},
		has_published_copy: true,
		is_published: true,
		publish_date: "2020-08-10T14:21:07.514Z",
	},
	publish_date: "2020-08-10T14:21:07.514Z",
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	website: "the-sun",
	website_url: "/news/2020/08/10/story-with-video-without-a-promo-item/",
};
const mockLeadArtVideoPromoBasic = {
	_id: "Y72XAJSRQRE4LABBKKDW6GJZNM",
	type: "story",
	version: "0.10.5",
	content_elements: [
		{
			_id: "E3567HNOYFDTXDFMHPXWXDII24",
			type: "text",
			additional_properties: {
				comments: [],
				_id: 1597069314271,
				inline_comments: [],
			},
			content: "<br/>",
		},
	],
	created_date: "2020-08-10T14:24:45.120Z",
	revision: {
		revision_id: "MEF42TULIVF3VEGUFXT2ZNRGFQ",
		parent_id: "B7SAI6XTNZD5LNNIM5ZK3FZUDQ",
		editions: ["default"],
		branch: "default",
		user_id: "fernandezn@washpost.com",
		published: true,
	},
	last_updated_date: "2020-08-10T16:22:21.404Z",
	canonical_url: "/news/2020/08/10/story-with-video-without-thumbnail-but-with-promo-item/",
	headlines: {
		basic: "story with video without thumbnail but with promo item",
		mobile: "",
		native: "",
		print: "",
		tablet: "",
		web: "",
		meta_title: "",
	},
	owner: {
		sponsored: false,
		id: "corecomponents",
	},
	content_restrictions: {},
	address: {},
	workflow: {
		status_code: 1,
	},
	subheadlines: {
		basic: "",
	},
	description: {
		basic: "",
	},
	language: "",
	source: {
		system: "composer",
		name: "corecomponents",
		source_type: "staff",
	},
	label: {},
	taxonomy: {
		sites: [
			{
				_id: "/news",
				type: "site",
				version: "0.5.8",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						parent: "/",
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
					},
				},
			},
		],
		tags: [],
		sections: [
			{
				_id: "/news",
				_website: "the-sun",
				type: "section",
				version: "0.6.0",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						_website: "the-sun",
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
						order: {
							"links-bar": 1003,
						},
					},
				},
				_website_section_id: "the-sun./news",
			},
			{
				_id: "/news",
				_website: "the-gazette",
				type: "section",
				version: "0.6.0",
				name: "News",
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						metadata: {
							metadata_title: "News and latest updates from The Gazette",
							metadata_description: "This is the description for the News section",
						},
						_website: "the-gazette",
						name: "News",
						order: {
							default: 1006,
							"hamburger-menu": 1002,
							"links-bar": 1006,
						},
						parent: {
							default: "/",
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "the-gazette./news",
			},
		],
		primary_site: {
			_id: "/news",
			type: "site",
			version: "0.5.8",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			additional_properties: {
				original: {
					_id: "/news",
					site: {
						site_tagline: null,
						pagebuilder_path_for_native_apps: null,
						site_description: null,
						site_url: null,
						site_keywords: null,
						site_title: null,
						site_about: null,
					},
					social: {
						rss: null,
						twitter: null,
						instagram: null,
						facebook: null,
					},
					navigation: {
						nav_title: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					name: "News",
					parent: "/",
					_admin: {
						alias_ids: ["/news"],
					},
					inactive: false,
					node_type: "section",
				},
			},
		},
		primary_section: {
			_id: "/news",
			_website: "the-sun",
			type: "section",
			version: "0.6.0",
			name: "News",
			description: null,
			path: "/news",
			parent_id: "/",
			parent: {
				default: "/",
			},
			additional_properties: {
				original: {
					_id: "/news",
					site: {
						site_tagline: null,
						pagebuilder_path_for_native_apps: null,
						site_description: null,
						site_url: null,
						site_keywords: null,
						site_title: null,
						site_about: null,
					},
					social: {
						rss: null,
						twitter: null,
						instagram: null,
						facebook: null,
					},
					navigation: {
						nav_title: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					name: "News",
					_website: "the-sun",
					parent: {
						default: "/",
						footer: null,
						"hamburger-menu": "/",
						"links-bar": "/",
					},
					ancestors: {
						default: [],
						footer: [],
						"hamburger-menu": [],
						"links-bar": ["/"],
					},
					_admin: {
						alias_ids: ["/news"],
					},
					inactive: false,
					node_type: "section",
					order: {
						"links-bar": 1003,
					},
				},
			},
		},
	},
	related_content: {
		basic: [],
		redirect: [],
	},
	promo_items: {
		basic: {
			_id: "GH3BDATX7FBZ7DSPPZFD5DPFJM",
			additional_properties: {
				fullSizeResizeUrl:
					"/photo/resize/6BiTyEjupbGWhooSE6SJwf0bPl8=/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				galleries: [
					{
						headlines: {
							basic: "test12345",
						},
						_id: "DN4VKLOXHRBOJMKUEAPXR3XNHM",
					},
				],
				ingestionMethod: "manual",
				keywords: [],
				mime_type: "image/jpeg",
				originalName: "tv-test-pattern.jpg",
				originalUrl:
					"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				owner: "eric.carlisle@washpost.com",
				proxyUrl:
					"/photo/resize/6BiTyEjupbGWhooSE6SJwf0bPl8=/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				published: true,
				resizeUrl:
					"http://thumbor-prod-us-east-1.photo.aws.arc.pub/6BiTyEjupbGWhooSE6SJwf0bPl8=/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				restricted: false,
				thumbnailResizeUrl:
					"http://thumbor-prod-us-east-1.photo.aws.arc.pub/-cpR4jwGLrJAyqewch1fs-Aip5s=/300x0/arc-anglerfish-arc2-prod-corecomponents/public/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
				version: 2,
				template_id: 229,
			},
			address: {},
			alt_text: "TV Test pattern",
			caption: "TV Test pattern",
			created_date: "2019-11-19T21:26:23Z",
			credits: {
				affiliation: [
					{
						name: "",
						type: "author",
					},
				],
				by: [],
			},
			geo: {},
			height: 576,
			image_type: "photograph",
			last_updated_date: "2019-11-19T21:32:18Z",
			licensable: false,
			owner: {
				id: "corecomponents",
				sponsored: false,
			},
			source: {
				additional_properties: {
					editor: "photo center",
				},
				edit_url: "https://corecomponents.arcpublishing.com/photo/GH3BDATX7FBZ7DSPPZFD5DPFJM",
				system: "photo center",
			},
			subtitle: "TV Test Pattern",
			taxonomy: {
				associated_tasks: [],
			},
			type: "image",
			url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/GH3BDATX7FBZ7DSPPZFD5DPFJM.jpg",
			version: "0.10.3",
			width: 720,
		},
		lead_art: {
			type: "video",
			_id: "ba52f779-47be-46b9-8bd5-58dcb4318101",
			version: "0.8.0",
			canonical_url: "/video/2020/08/03/video-without-a-promo-image/",
			canonical_website: "the-gazette",
			short_url: "/video/2020/08/03/video-without-a-promo-image/",
			created_date: "2020-08-03T21:56:22Z",
			last_updated_date: "2020-08-03T22:02:48Z",
			publish_date: "2020-08-03T22:02:52Z",
			first_publish_date: "2020-08-03T21:59:03Z",
			display_date: "2020-08-03T21:59:03Z",
			headlines: {
				basic: "Video without a promo image",
			},
			subheadlines: {
				basic:
					"Test to verify that a video without a promo image still renders as expected on Themes promo blocks.",
			},
			credits: {
				affiliation: [
					{
						name: "Pexels",
					},
				],
				by: [
					{
						type: "author",
						name: "",
						org: "Pexels",
						slug: "",
					},
				],
			},
			taxonomy: {
				tags: [],
				primary_site: {
					type: "site",
					_id: "/arts",
					version: "0.5.8",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sites: [
					{
						type: "site",
						_id: "/arts",
						version: "0.5.8",
						name: "Arts",
						path: "/arts",
						primary: true,
					},
				],
				primary_section: {
					type: "section",
					_id: "/arts",
					_website: "the-gazette",
					version: "0.6.0",
					name: "Arts",
					path: "/arts",
					primary: true,
				},
				sections: [
					{
						type: "section",
						_id: "/arts",
						_website: "the-gazette",
						version: "0.6.0",
						name: "Arts",
						path: "/arts",
						primary: true,
					},
				],
				seo_keywords: [],
			},
			promo_items: {
				basic: {
					type: "image",
					version: "0.5.8",
					credits: {},
				},
			},
			related_content: {
				redirect: [],
				basic: [],
			},
			owner: {
				sponsored: false,
			},
			planning: {
				scheduling: {},
			},
			revision: {
				published: true,
			},
			syndication: {
				search: true,
			},
			source: {
				name: "Pexels",
				system: "video center",
				edit_url:
					"https://corecomponents.arcpublishing.com/goldfish/video/5f288807c9e77c00013acd07",
			},
			distributor: {
				mode: "reference",
				reference_id: "884ff0c4-4276-4ac3-895b-53c717097079",
			},
			tracking: {
				in_url_headline: "03",
			},
			additional_properties: {
				subsection: "Arts",
				videoCategory: "vod",
				isWire: false,
				gifAsThumbnail: false,
				videoId: "5f288807c9e77c00013acd07",
				vertical: false,
				embedContinuousPlay: true,
				published: true,
				imageResizerUrls: [],
				advertising: {
					allowPrerollOnDomain: false,
					autoPlayPreroll: false,
					commercialAdNode: "/arts",
					enableAdInsertion: false,
					enableAutoPreview: true,
					enableServerSideFallback: false,
					forceAd: false,
					playAds: true,
					playVideoAds: true,
					videoAdZone: "",
				},
				disableUpNext: false,
				videoAdZone: "",
				lastPublishedBy: {
					name: "Sara Carothers",
					email: "Sara.Carothers@washpost.com",
					lastname: "",
				},
				permalinkUrl: "/video/2020/08/03/video-without-a-promo-image/",
				platform: "desktop",
				playVideoAds: true,
				forceClosedCaptionsOn: false,
				doNotShowTranscripts: false,
				useVariants: false,
				has_published_copy: true,
				playlistTags: [],
				firstPublishedBy: {
					name: "Sara Carothers",
					email: "Sara.Carothers@washpost.com",
					lastname: "",
				},
			},
			duration: 24290,
			video_type: "clip",
			streams: [
				{
					height: 180,
					width: 320,
					filesize: 1205456,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 160,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 1717944,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 300,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 2626360,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/mobile.m3u8",
					bitrate: 600,
					provider: "mediaconvert",
				},
				{
					height: 480,
					width: 854,
					filesize: 4576296,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/master.m3u8",
					bitrate: 1200,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 15250560,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/hd.m3u8",
					bitrate: 4500,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 17428164,
					stream_type: "ts",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/hlsv4_master.m3u8",
					bitrate: 5400,
					provider: "mediaconvert",
				},
				{
					height: 180,
					width: 320,
					filesize: 916085,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_320x180-160-v3.mp4",
					bitrate: 160,
					provider: "mediaconvert",
				},
				{
					height: 360,
					width: 640,
					filesize: 2306171,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_640x360-600-v3.mp4",
					bitrate: 600,
					provider: "mediaconvert",
				},
				{
					height: 480,
					width: 854,
					filesize: 4213998,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_854x480-1200-v3_1.mp4",
					bitrate: 1200,
					provider: "mediaconvert",
				},
				{
					height: 720,
					width: 1280,
					filesize: 6749501,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_1280x720-2000-v3_1.mp4",
					bitrate: 2000,
					provider: "mediaconvert",
				},
				{
					height: 1080,
					width: 1920,
					filesize: 17445140,
					stream_type: "mp4",
					url: "https://d3nn18fxf34y7p.cloudfront.net/wp-corecomponents/2020/08/03/5f288807c9e77c00013acd07/t_3b24d4232de44aea9d20d1ce5e981fa4_name_Pexels_Videos_4514/file_1920x1080-5400-v4.mp4",
					bitrate: 5400,
					provider: "mediaconvert",
				},
			],
			subtitles: {},
			promo_image: {
				type: "image",
				version: "0.5.8",
				credits: {},
			},
			embed_html:
				"<div class='powa' id='powa-ba52f779-47be-46b9-8bd5-58dcb4318101' data-org='corecomponents' data-env='prod' data-uuid='ba52f779-47be-46b9-8bd5-58dcb4318101' data-aspect-ratio='0.562' data-api='prod'><script src='//d2w3jw6424abwq.cloudfront.net/prod/powaBoot.js?org=corecomponents'></script></div>",
			websites: {
				"the-gazette": {
					website_section: {
						path: "/arts",
						_website: "the-gazette",
						name: "Arts",
						_id: "/arts",
						type: "section",
						version: "0.6.0",
						primary: true,
					},
					website_url: "/video/2020/08/03/video-without-a-promo-image/",
				},
			},
		},
	},
	distributor: {
		name: "corecomponents",
		category: "staff",
		subcategory: "",
	},
	canonical_website: "the-sun",
	geo: {},
	planning: {
		internal_note: "",
		story_length: {
			word_count_actual: 0,
			character_count_actual: 0,
			character_encoding: "UTF-16",
			line_count_actual: 0,
			inch_count_actual: 0,
		},
	},
	display_date: "2020-08-10T14:25:48.333Z",
	credits: {
		by: [
			{
				name: "guest author",
				org: "",
				type: "author",
				additional_properties: {
					original: {
						author_type: "",
					},
				},
			},
		],
	},
	first_publish_date: "2020-08-10T14:25:48.333Z",
	websites: {
		"the-sun": {
			website_section: {
				_id: "/news",
				_website: "the-sun",
				type: "section",
				version: "0.6.0",
				name: "News",
				description: null,
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						site: {
							site_tagline: null,
							pagebuilder_path_for_native_apps: null,
							site_description: null,
							site_url: null,
							site_keywords: null,
							site_title: null,
							site_about: null,
						},
						social: {
							rss: null,
							twitter: null,
							instagram: null,
							facebook: null,
						},
						navigation: {
							nav_title: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						name: "News",
						_website: "the-sun",
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						_admin: {
							alias_ids: ["/news"],
						},
						inactive: false,
						node_type: "section",
						order: {
							"links-bar": 1003,
						},
					},
				},
				_website_section_id: "the-sun./news",
			},
			website_url: "/news/2020/08/10/story-with-video-without-thumbnail-but-with-promo-item/",
		},
		"the-gazette": {
			website_section: {
				_id: "/news",
				_website: "the-gazette",
				type: "section",
				version: "0.6.0",
				name: "News",
				path: "/news",
				parent_id: "/",
				parent: {
					default: "/",
				},
				additional_properties: {
					original: {
						_id: "/news",
						metadata: {
							metadata_title: "News and latest updates from The Gazette",
							metadata_description: "This is the description for the News section",
						},
						_website: "the-gazette",
						name: "News",
						order: {
							default: 1006,
							"hamburger-menu": 1002,
							"links-bar": 1006,
						},
						parent: {
							default: "/",
							"hamburger-menu": "/",
							"links-bar": "/",
						},
						ancestors: {
							default: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						node_type: "section",
					},
				},
				_website_section_id: "the-gazette./news",
			},
			website_url: "/news/2020/08/10/story-with-video-without-thumbnail-but-with-promo-item/",
		},
		dagen: {
			website_url: "/news/2020/08/10/story-with-video-without-thumbnail-but-with-promo-item/",
		},
	},
	additional_properties: {
		clipboard: {},
		has_published_copy: true,
		is_published: true,
		publish_date: "2020-08-10T16:22:21.007Z",
	},
	publish_date: "2020-08-10T16:22:21.007Z",
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	website: "the-sun",
	website_url: "/news/2020/08/10/story-with-video-without-thumbnail-but-with-promo-item/",
};
const mockStoryPromoItemsGalleryFocalPoint = {
	_id: "BPGB4PD6UJFJBMBFCZD7IHHRU4",
	additional_properties: {
		clipboard: {},
		has_published_copy: true,
		is_published: true,
		publish_date: "2020-09-15T19:06:11.480Z",
	},
	address: {},
	canonical_url: "/health/2020/09/15/testing-image-focal-point/",
	canonical_website: "the-sun",
	content_elements: [
		{
			_id: "ZUBFLUHI2NF23NILNSLT2UPX6M",
			additional_properties: {
				_id: 1600187300741,
				comments: [],
				inline_comments: [],
			},
			content: "<br/>",
			type: "text",
		},
	],
	content_restrictions: {},
	created_date: "2020-09-15T16:30:31.419Z",
	credits: {
		by: [],
	},
	description: {
		basic: "",
	},
	display_date: "2020-09-15T16:33:12.862Z",
	distributor: {
		category: "staff",
		name: "corecomponents",
		subcategory: "",
	},
	first_publish_date: "2020-09-15T16:33:12.862Z",
	geo: {},
	headlines: {
		basic: "testing image focal point",
		meta_title: "",
		mobile: "",
		native: "",
		print: "",
		tablet: "",
		web: "",
	},
	label: {},
	language: "",
	last_updated_date: "2020-09-15T19:06:11.900Z",
	owner: {
		id: "corecomponents",
		sponsored: false,
	},
	planning: {
		internal_note: "",
		story_length: {
			character_count_actual: 0,
			character_encoding: "UTF-16",
			inch_count_actual: 0,
			line_count_actual: 0,
			word_count_actual: 0,
		},
	},
	promo_items: {
		lead_art: {
			_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
			additional_properties: {
				has_published_copy: true,
				owner: "sara.carothers@washpost.com",
				published: true,
				restricted: false,
				roles: [],
				version: 31,
			},
			canonical_url: "/2019/07/29/a-day-at-the-beach/",
			canonical_website: "the-sun",
			content_elements: [
				{
					_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						galleries: [
							{
								_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
								headlines: {
									basic: "A day at the beach",
								},
							},
						],
						galleryOrder: 0,
						ingestionMethod: "manual",
						keywords: [],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock_EnergyandSerenity6.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						restricted: false,
						version: 1,
					},
					address: {},
					alt_text: "A person laying on their surfboard in the ocean.",
					caption: "Im overriding the caption on this image for this particular gallery",
					created_date: "2019-07-09T22:26:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [
							{
								byline: "Brett Danielsen (custom credit)",
								name: "Brett Danielsen",
								type: "author",
							},
						],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					focal_point: {
						x: 5250,
						y: 218,
					},
					geo: {},
					height: 3744,
					image_type: "photograph",
					last_updated_date: "2019-07-09T22:29:42Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						additional_properties: {
							editor: "photo center",
						},
						edit_url: "https://corecomponents.arcpublishing.com/photo/P3V3THIJPVGUBLRIIYWKFHZTKA",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Im overriding the subtitle on this image for this particular gallery",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
					version: "0.10.3",
					width: 5616,
				},
				{
					_id: "IEYJJACCYVFQTN4TF37K4E2EMU",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/IKANxp82I8Ce6Gwr2iOqm54eEkk=/arc-anglerfish-arc2-prod-corecomponents/public/IEYJJACCYVFQTN4TF37K4E2EMU.jpg",
						galleries: [],
						galleryOrder: 1,
						ingestionMethod: "manual",
						keywords: ["beach", "ocean"],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock2.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/IEYJJACCYVFQTN4TF37K4E2EMU.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/IKANxp82I8Ce6Gwr2iOqm54eEkk=/arc-anglerfish-arc2-prod-corecomponents/public/IEYJJACCYVFQTN4TF37K4E2EMU.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/IKANxp82I8Ce6Gwr2iOqm54eEkk=/arc-anglerfish-arc2-prod-corecomponents/public/IEYJJACCYVFQTN4TF37K4E2EMU.jpg",
						restricted: false,
						takenOn: "2015-01-11T14:35:03Z",
						version: 0,
					},
					address: {},
					alt_text: "Palm trees stand in front of a building.",
					caption: "The rain had chased all the beach-goers away. It was cloudy and cold.",
					credits: {
						affiliation: [],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					height: 5596,
					image_type: "photograph",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/IEYJJACCYVFQTN4TF37K4E2EMU",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Cloudy day at the beach",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/IEYJJACCYVFQTN4TF37K4E2EMU.jpg",
					version: "0.10.3",
					width: 3731,
				},
				{
					_id: "CITIAYX2ERDOPP2TPJGEUV7SNQ",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
						galleries: [],
						galleryOrder: 2,
						ingestionMethod: "manual",
						keywords: [],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock_EnergyandSerenity4.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/x3tXYyoI4592s_zt6DAIHhv2kEw=/arc-anglerfish-arc2-prod-corecomponents/public/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
						restricted: false,
						version: 0,
					},
					address: {},
					alt_text: "A person walks down a path with their surfboard towards the ocean.",
					caption:
						"Australias great ocean road is home to the kind of stuff you see in magazines and always wish you could visit one day. Twelve Apostles, Koalas, Kangaroos, surf towns, Bells Beach and Point Break; cowabunga Keanu.",
					created_date: "2019-07-09T22:26:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [
							{
								byline: "Brett Danielsen (custom credit)",
								name: "Brett Danielsen",
								type: "author",
							},
						],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					height: 3744,
					image_type: "photograph",
					last_updated_date: "2019-07-09T22:26:02Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/CITIAYX2ERDOPP2TPJGEUV7SNQ",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Australia surf trip",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CITIAYX2ERDOPP2TPJGEUV7SNQ.jpg",
					version: "0.10.3",
					width: 5616,
				},
				{
					_id: "CLPUNWMKOZHWPLFYKRZXW6XTNU",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/Nbqik6bD_5EBv5PjxwduPNml1Gk=/arc-anglerfish-arc2-prod-corecomponents/public/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
						galleries: [],
						galleryOrder: 3,
						ingestionMethod: "manual",
						keywords: ["flower", "nature"],
						mime_type: "image/jpeg",
						originalName: "Death_to_stock_photography_bonus_floral_10.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/Nbqik6bD_5EBv5PjxwduPNml1Gk=/arc-anglerfish-arc2-prod-corecomponents/public/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/Nbqik6bD_5EBv5PjxwduPNml1Gk=/arc-anglerfish-arc2-prod-corecomponents/public/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
						restricted: false,
						version: 1,
					},
					address: {},
					alt_text: "Close-up view of palm fronds with light shining through.",
					caption: "Sun shining through palm fronds",
					created_date: "2019-07-09T23:03:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					geo: {},
					height: 5009,
					image_type: "photograph",
					last_updated_date: "2019-12-30T22:28:21Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/CLPUNWMKOZHWPLFYKRZXW6XTNU",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Plants",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/CLPUNWMKOZHWPLFYKRZXW6XTNU.jpg",
					version: "0.10.3",
					width: 3339,
				},
				{
					_id: "O3UWIM3AHBH3ZMM2C4MW6U472Y",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/nU5CQ2RNA0j1uhoj8EUPBOBpD1Y=/arc-anglerfish-arc2-prod-corecomponents/public/O3UWIM3AHBH3ZMM2C4MW6U472Y.jpg",
						galleries: [],
						galleryOrder: 4,
						ingestionMethod: "manual",
						keywords: [],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock_EnergyandSerenity1.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/O3UWIM3AHBH3ZMM2C4MW6U472Y.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/nU5CQ2RNA0j1uhoj8EUPBOBpD1Y=/arc-anglerfish-arc2-prod-corecomponents/public/O3UWIM3AHBH3ZMM2C4MW6U472Y.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/nU5CQ2RNA0j1uhoj8EUPBOBpD1Y=/arc-anglerfish-arc2-prod-corecomponents/public/O3UWIM3AHBH3ZMM2C4MW6U472Y.jpg",
						restricted: false,
						version: 0,
					},
					address: {},
					alt_text: "Three tiny silhouettes of people walking in the Australian wilderness.",
					caption:
						"Australias great ocean road is home to the kind of stuff you see in magazines and always wish you could visit one day. Twelve Apostles, Koalas, Kangaroos, surf towns, Bells Beach and Point Break; cowabunga Keanu.",
					created_date: "2019-07-09T22:26:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [
							{
								byline: "Brett Danielsen (custom credit)",
								name: "Brett Danielsen",
								type: "author",
							},
						],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					height: 3744,
					image_type: "photograph",
					last_updated_date: "2019-07-09T22:26:02Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/O3UWIM3AHBH3ZMM2C4MW6U472Y",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Australia surf trip",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/O3UWIM3AHBH3ZMM2C4MW6U472Y.jpg",
					version: "0.10.3",
					width: 5616,
				},
				{
					_id: "Y3TQJYLS3NGCRF5RIC53BQQDCU",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/w3XfE-gOqNpNoSBPX1nAv1JJgrs=/arc-anglerfish-arc2-prod-corecomponents/public/Y3TQJYLS3NGCRF5RIC53BQQDCU.jpg",
						galleries: [],
						galleryOrder: 5,
						ingestionMethod: "manual",
						keywords: [],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock_EnergyandSerenity3.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/Y3TQJYLS3NGCRF5RIC53BQQDCU.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/w3XfE-gOqNpNoSBPX1nAv1JJgrs=/arc-anglerfish-arc2-prod-corecomponents/public/Y3TQJYLS3NGCRF5RIC53BQQDCU.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/w3XfE-gOqNpNoSBPX1nAv1JJgrs=/arc-anglerfish-arc2-prod-corecomponents/public/Y3TQJYLS3NGCRF5RIC53BQQDCU.jpg",
						restricted: false,
						version: 0,
					},
					address: {},
					alt_text: "A person gets their sufboard out of the trunk of an orange Volkswagon RV.",
					caption:
						"Australias great ocean road is home to the kind of stuff you see in magazines and always wish you could visit one day. Twelve Apostles, Koalas, Kangaroos, surf towns, Bells Beach and Point Break; cowabunga Keanu.",
					created_date: "2019-07-09T22:26:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [
							{
								byline: "Brett Danielsen (custom credit)",
								name: "Brett Danielsen",
								type: "author",
							},
						],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					height: 5616,
					image_type: "photograph",
					last_updated_date: "2019-07-09T22:26:02Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/Y3TQJYLS3NGCRF5RIC53BQQDCU",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Australia surf trip",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/Y3TQJYLS3NGCRF5RIC53BQQDCU.jpg",
					version: "0.10.3",
					width: 3744,
				},
				{
					_id: "BFFDAZKJVJHHNF5QORDFXUFVD4",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/KgMIsiC3BgSSW0MpowUUMkpHbTU=/arc-anglerfish-arc2-prod-corecomponents/public/BFFDAZKJVJHHNF5QORDFXUFVD4.jpg",
						galleries: [
							{
								_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
								headlines: {
									basic: "A day at the beach",
								},
							},
						],
						galleryOrder: 6,
						ingestionMethod: "manual",
						keywords: ["beach", "ocean"],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock10.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/BFFDAZKJVJHHNF5QORDFXUFVD4.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/KgMIsiC3BgSSW0MpowUUMkpHbTU=/arc-anglerfish-arc2-prod-corecomponents/public/BFFDAZKJVJHHNF5QORDFXUFVD4.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/KgMIsiC3BgSSW0MpowUUMkpHbTU=/arc-anglerfish-arc2-prod-corecomponents/public/BFFDAZKJVJHHNF5QORDFXUFVD4.jpg",
						restricted: false,
						takenOn: "2015-01-12T13:16:29Z",
						version: 3,
					},
					address: {},
					alt_text: "A woman with her back to the camera looks out at the ocean on a cloudy day.",
					caption: "test caption",
					created_date: "2019-07-09T22:23:18Z",
					credits: {
						by: [],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					geo: {},
					height: 3793,
					image_type: "photograph",
					last_updated_date: "2020-05-12T18:03:42Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						additional_properties: {
							editor: "photo center",
						},
						edit_url: "https://corecomponents.arcpublishing.com/photo/BFFDAZKJVJHHNF5QORDFXUFVD4",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Test subtitle",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/BFFDAZKJVJHHNF5QORDFXUFVD4.jpg",
					version: "0.10.3",
					width: 5689,
				},
				{
					_id: "4JF472HUGVECVLATRYVJQZOZZU",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/P817MgbeesO1YgnaOJ5YfgnVDFw=/arc-anglerfish-arc2-prod-corecomponents/public/4JF472HUGVECVLATRYVJQZOZZU.jpg",
						galleries: [],
						galleryOrder: 7,
						ingestionMethod: "manual",
						keywords: ["beach", "ocean"],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock9.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4JF472HUGVECVLATRYVJQZOZZU.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/P817MgbeesO1YgnaOJ5YfgnVDFw=/arc-anglerfish-arc2-prod-corecomponents/public/4JF472HUGVECVLATRYVJQZOZZU.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/P817MgbeesO1YgnaOJ5YfgnVDFw=/arc-anglerfish-arc2-prod-corecomponents/public/4JF472HUGVECVLATRYVJQZOZZU.jpg",
						restricted: false,
						takenOn: "2015-01-12T13:15:55Z",
						version: 0,
					},
					address: {},
					alt_text: "A vertical image of a big, cloudy, grey sky at the beach.",
					caption: "The rain had chased all the beach-goers away. It was cloudy and cold.",
					credits: {
						affiliation: [],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					height: 5760,
					image_type: "photograph",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						edit_url: "https://corecomponents.arcpublishing.com/photo/4JF472HUGVECVLATRYVJQZOZZU",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Cloudy day at the beach",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/4JF472HUGVECVLATRYVJQZOZZU.jpg",
					version: "0.10.3",
					width: 3840,
				},
				{
					_id: "Z7N5XB7MABFFBAPTU6MZFAGN6Q",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/uM2qD7AaFB57xyUPo25E0v7-Y28=/arc-anglerfish-arc2-prod-corecomponents/public/Z7N5XB7MABFFBAPTU6MZFAGN6Q.jpg",
						galleries: [
							{
								_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
								headlines: {
									basic: "A day at the beach",
								},
							},
						],
						galleryOrder: 8,
						ingestionMethod: "manual",
						keywords: ["beach", "ocean"],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock3.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/Z7N5XB7MABFFBAPTU6MZFAGN6Q.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/uM2qD7AaFB57xyUPo25E0v7-Y28=/arc-anglerfish-arc2-prod-corecomponents/public/Z7N5XB7MABFFBAPTU6MZFAGN6Q.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/uM2qD7AaFB57xyUPo25E0v7-Y28=/arc-anglerfish-arc2-prod-corecomponents/public/Z7N5XB7MABFFBAPTU6MZFAGN6Q.jpg",
						restricted: false,
						takenOn: "2015-01-12T12:31:30Z",
						version: 1,
					},
					address: {},
					alt_text: "A lifeguard stand far away on the horizon at the beach.",
					caption: "",
					created_date: "2019-07-09T22:23:18Z",
					credits: {
						by: [],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					geo: {},
					height: 3767,
					image_type: "photograph",
					last_updated_date: "2020-05-07T16:09:38Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						additional_properties: {
							editor: "photo center",
						},
						edit_url: "https://corecomponents.arcpublishing.com/photo/Z7N5XB7MABFFBAPTU6MZFAGN6Q",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Cloudy day at the beach",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/Z7N5XB7MABFFBAPTU6MZFAGN6Q.jpg",
					version: "0.10.3",
					width: 5650,
				},
			],
			created_date: "2019-07-29T21:16:40Z",
			credits: {
				by: [],
			},
			description: {
				basic: "Photos of a day at the beach",
			},
			display_date: "2019-07-29T21:16:40Z",
			first_publish_date: "2019-07-29T21:16:40Z",
			headlines: {
				basic: "A day at the beach",
			},
			last_updated_date: "2020-09-15T16:03:22Z",
			owner: {
				id: "corecomponents",
				sponsored: false,
			},
			promo_items: {
				basic: {
					_id: "P3V3THIJPVGUBLRIIYWKFHZTKA",
					additional_properties: {
						fullSizeResizeUrl:
							"/photo/resize/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						galleries: [
							{
								_id: "ZMTIFZGC2NCYTDVU7GIGHJKEUY",
								headlines: {
									basic: "A day at the beach",
								},
							},
						],
						galleryOrder: 0,
						ingestionMethod: "manual",
						keywords: [],
						mime_type: "image/jpeg",
						originalName: "DeathtoStock_EnergyandSerenity6.jpg",
						originalUrl:
							"https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						owner: "sara.carothers@washpost.com",
						proxyUrl:
							"/photo/resize/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						published: true,
						resizeUrl:
							"http://thumbor-prod-us-east-1.photo.aws.arc.pub/6aRJ4xT2a4iiFV-JRBBWUdpDtvE=/arc-anglerfish-arc2-prod-corecomponents/public/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
						restricted: false,
						version: 1,
					},
					address: {},
					alt_text: "A person laying on their surfboard in the ocean.",
					caption: "Im overriding the caption on this image for this particular gallery",
					created_date: "2019-07-09T22:26:02Z",
					credits: {
						affiliation: [
							{
								name: "Death to Stock Photo",
								type: "author",
							},
						],
						by: [
							{
								byline: "Brett Danielsen (custom credit)",
								name: "Brett Danielsen",
								type: "author",
							},
						],
					},
					distributor: {
						mode: "reference",
						reference_id: "508c6d12-f2bb-47db-a836-b2b5de225c43",
					},
					focal_point: {
						x: 5250,
						y: 218,
					},
					geo: {},
					height: 3744,
					image_type: "photograph",
					last_updated_date: "2019-07-09T22:29:42Z",
					licensable: false,
					owner: {
						id: "corecomponents",
						sponsored: false,
					},
					source: {
						additional_properties: {
							editor: "photo center",
						},
						edit_url: "https://corecomponents.arcpublishing.com/photo/P3V3THIJPVGUBLRIIYWKFHZTKA",
						name: "Death to Stock Photo",
						source_type: "stock",
						system: "Anglerfish",
					},
					subtitle: "Im overriding the subtitle on this image for this particular gallery",
					taxonomy: {
						associated_tasks: [],
					},
					type: "image",
					url: "https://cloudfront-us-east-1.images.arcpublishing.com/corecomponents/P3V3THIJPVGUBLRIIYWKFHZTKA.jpg",
					version: "0.10.3",
					width: 5616,
				},
			},
			publish_date: "2020-05-12T21:09:30Z",
			source: {
				additional_properties: {
					editor: "photo center",
				},
				edit_url:
					"https://corecomponents.arcpublishing.com/photo/gallery/ZMTIFZGC2NCYTDVU7GIGHJKEUY",
				system: "photo center",
			},
			taxonomy: {
				sections: [
					{
						referent: {
							id: "/news",
							type: "section",
							website: "arc-demo-1",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/news",
							type: "section",
							website: "arc-demo-2",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/news",
							type: "section",
							website: "arc-demo-3",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/news",
							type: "section",
							website: "arc-demo-4",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/news",
							type: "section",
							website: "arc-demo-5",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/debatt",
							type: "section",
							website: "dagen",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/local",
							type: "section",
							website: "the-gazette",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/entertainment",
							type: "section",
							website: "the-globe",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/arts",
							type: "section",
							website: "the-mercury",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/entertainment",
							type: "section",
							website: "the-planet",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/news",
							type: "section",
							website: "the-prophet",
						},
						type: "reference",
					},
					{
						referent: {
							id: "/entertainment",
							type: "section",
							website: "washpost",
						},
						type: "reference",
					},
				],
			},
			type: "gallery",
			version: "0.10.3",
			websites: {
				"arc-demo-1": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "arc-demo-1",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"arc-demo-2": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "arc-demo-2",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"arc-demo-3": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "arc-demo-3",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"arc-demo-4": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "arc-demo-4",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"arc-demo-5": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "arc-demo-5",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				dagen: {
					website_section: {
						referent: {
							id: "/debatt",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "dagen",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-gazette": {
					website_section: {
						referent: {
							id: "/local",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "the-gazette",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-globe": {
					website_section: {
						referent: {
							id: "/entertainment",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "the-globe",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-mercury": {
					website_section: {
						referent: {
							id: "/arts",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "the-mercury",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-planet": {
					website_section: {
						referent: {
							id: "/entertainment",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "the-planet",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-prophet": {
					website_section: {
						referent: {
							id: "/news",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "the-prophet",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
				"the-sun": {
					website_url: "/2019/07/29/a-day-at-the-beach/",
				},
				washpost: {
					website_section: {
						referent: {
							id: "/entertainment",
							provider: "api.corecomponents.arcpublishing.com/site/v3/website",
							type: "section",
							website: "washpost",
						},
						type: "reference",
					},
					website_url: "/gallery/2019/07/29/a-day-at-the-beach/",
				},
			},
		},
	},
	publish_date: "2020-09-15T19:06:11.480Z",
	publishing: {
		scheduled_operations: {
			publish_edition: [],
			unpublish_edition: [],
		},
	},
	related_content: {
		basic: [],
		redirect: [],
	},
	revision: {
		branch: "default",
		editions: ["default"],
		parent_id: "YMBHON5TPBHPFOTTMLRREY3TPU",
		published: true,
		revision_id: "HOI3BLRUP5BUXFEVKLA4HNGYIA",
		user_id: "fernandezn@washpost.com",
	},
	source: {
		name: "corecomponents",
		source_type: "staff",
		system: "composer",
	},
	subheadlines: {
		basic: "",
	},
	taxonomy: {
		primary_section: {
			_id: "/health",
			_website: "the-sun",
			additional_properties: {
				original: {
					_admin: {
						alias_ids: ["/health"],
					},
					_id: "/health",
					_website: "the-sun",
					ancestors: {
						default: [],
						"hamburger-menu": [],
					},
					inactive: false,
					name: "Health",
					navigation: {
						nav_title: null,
					},
					node_type: "section",
					parent: {
						default: "/",
						"hamburger-menu": "/",
					},
					site: {
						pagebuilder_path_for_native_apps: null,
						site_about: null,
						site_description: null,
						site_keywords: null,
						site_tagline: null,
						site_title: null,
						site_url: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					social: {
						facebook: null,
						instagram: null,
						rss: null,
						twitter: null,
					},
				},
			},
			description: null,
			name: "Health",
			parent: {
				default: "/",
			},
			parent_id: "/",
			path: "/health",
			type: "section",
			version: "0.6.0",
		},
		primary_site: {
			_id: "/health",
			additional_properties: {
				original: {
					_admin: {
						alias_ids: ["/health"],
					},
					_id: "/health",
					inactive: false,
					name: "Health",
					navigation: {
						nav_title: null,
					},
					node_type: "section",
					parent: "/",
					site: {
						pagebuilder_path_for_native_apps: null,
						site_about: null,
						site_description: null,
						site_keywords: null,
						site_tagline: null,
						site_title: null,
						site_url: null,
					},
					site_topper: {
						site_logo_image: null,
					},
					social: {
						facebook: null,
						instagram: null,
						rss: null,
						twitter: null,
					},
				},
			},
			description: null,
			name: "Health",
			parent_id: "/",
			path: "/health",
			type: "site",
			version: "0.5.8",
		},
		sections: [
			{
				_id: "/health",
				_website: "the-sun",
				_website_section_id: "the-sun./health",
				additional_properties: {
					original: {
						_admin: {
							alias_ids: ["/health"],
						},
						_id: "/health",
						_website: "the-sun",
						ancestors: {
							default: [],
							"hamburger-menu": [],
						},
						inactive: false,
						name: "Health",
						navigation: {
							nav_title: null,
						},
						node_type: "section",
						parent: {
							default: "/",
							"hamburger-menu": "/",
						},
						site: {
							pagebuilder_path_for_native_apps: null,
							site_about: null,
							site_description: null,
							site_keywords: null,
							site_tagline: null,
							site_title: null,
							site_url: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						social: {
							facebook: null,
							instagram: null,
							rss: null,
							twitter: null,
						},
					},
				},
				description: null,
				name: "Health",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/health",
				type: "section",
				version: "0.6.0",
			},
			{
				_id: "/arts",
				_website: "the-gazette",
				_website_section_id: "the-gazette./arts",
				additional_properties: {
					original: {
						_id: "/arts",
						_website: "the-gazette",
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						name: "Arts",
						node_type: "section",
						order: {
							"hamburger-menu": 1004,
							"links-bar": 1004,
						},
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
					},
				},
				name: "Arts",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/arts",
				type: "section",
				version: "0.6.0",
			},
			{
				_id: "/kronikor",
				_website: "dagen",
				_website_section_id: "dagen./kronikor",
				additional_properties: {
					original: {
						_id: "/kronikor",
						_website: "dagen",
						ancestors: {
							default: [],
							footer: ["/"],
							"hamburger-menu": [],
						},
						inactive: false,
						metadata: {
							content_code: "Premium",
							metadata_description: "Dagens kr\u00f6nikor fr\u00e5n egna och externa skribenter.",
							metadata_title: "Kr\u00f6nikor - Dagen Kr\u00f6nikor",
						},
						name: "Kr\u00f6nikor",
						node_type: "section",
						order: {
							footer: 1001,
						},
						parent: {
							default: "/",
							footer: "/",
							"hamburger-menu": "/",
						},
					},
				},
				name: "Kr\u00f6nikor",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/kronikor",
				type: "section",
				version: "0.6.0",
			},
		],
		sites: [
			{
				_id: "/health",
				additional_properties: {
					original: {
						_admin: {
							alias_ids: ["/health"],
						},
						_id: "/health",
						inactive: false,
						name: "Health",
						navigation: {
							nav_title: null,
						},
						node_type: "section",
						parent: "/",
						site: {
							pagebuilder_path_for_native_apps: null,
							site_about: null,
							site_description: null,
							site_keywords: null,
							site_tagline: null,
							site_title: null,
							site_url: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						social: {
							facebook: null,
							instagram: null,
							rss: null,
							twitter: null,
						},
					},
				},
				description: null,
				name: "Health",
				parent_id: "/",
				path: "/health",
				type: "site",
				version: "0.5.8",
			},
		],
		tags: [],
	},
	type: "story",
	version: "0.10.5",
	website: "the-sun",
	website_url: "/health/2020/09/15/testing-image-focal-point/",
	websites: {
		dagen: {
			website_section: {
				_id: "/kronikor",
				_website: "dagen",
				_website_section_id: "dagen./kronikor",
				additional_properties: {
					original: {
						_id: "/kronikor",
						_website: "dagen",
						ancestors: {
							default: [],
							footer: ["/"],
							"hamburger-menu": [],
						},
						inactive: false,
						metadata: {
							content_code: "Premium",
							metadata_description: "Dagens kr\u00f6nikor fr\u00e5n egna och externa skribenter.",
							metadata_title: "Kr\u00f6nikor - Dagen Kr\u00f6nikor",
						},
						name: "Kr\u00f6nikor",
						node_type: "section",
						order: {
							footer: 1001,
						},
						parent: {
							default: "/",
							footer: "/",
							"hamburger-menu": "/",
						},
					},
				},
				name: "Kr\u00f6nikor",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/kronikor",
				type: "section",
				version: "0.6.0",
			},
			website_url: "/health/2020/09/15/testing-image-focal-point/",
		},
		"the-gazette": {
			website_section: {
				_id: "/arts",
				_website: "the-gazette",
				_website_section_id: "the-gazette./arts",
				additional_properties: {
					original: {
						_id: "/arts",
						_website: "the-gazette",
						ancestors: {
							default: [],
							footer: [],
							"hamburger-menu": [],
							"links-bar": ["/"],
						},
						inactive: false,
						name: "Arts",
						node_type: "section",
						order: {
							"hamburger-menu": 1004,
							"links-bar": 1004,
						},
						parent: {
							default: "/",
							footer: null,
							"hamburger-menu": "/",
							"links-bar": "/",
						},
					},
				},
				name: "Arts",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/arts",
				type: "section",
				version: "0.6.0",
			},
			website_url: "/health/2020/09/15/testing-image-focal-point/",
		},
		"the-sun": {
			website_section: {
				_id: "/health",
				_website: "the-sun",
				_website_section_id: "the-sun./health",
				additional_properties: {
					original: {
						_admin: {
							alias_ids: ["/health"],
						},
						_id: "/health",
						_website: "the-sun",
						ancestors: {
							default: [],
							"hamburger-menu": [],
						},
						inactive: false,
						name: "Health",
						navigation: {
							nav_title: null,
						},
						node_type: "section",
						parent: {
							default: "/",
							"hamburger-menu": "/",
						},
						site: {
							pagebuilder_path_for_native_apps: null,
							site_about: null,
							site_description: null,
							site_keywords: null,
							site_tagline: null,
							site_title: null,
							site_url: null,
						},
						site_topper: {
							site_logo_image: null,
						},
						social: {
							facebook: null,
							instagram: null,
							rss: null,
							twitter: null,
						},
					},
				},
				description: null,
				name: "Health",
				parent: {
					default: "/",
				},
				parent_id: "/",
				path: "/health",
				type: "section",
				version: "0.6.0",
			},
			website_url: "/health/2020/09/15/testing-image-focal-point/",
		},
	},
	workflow: {
		status_code: 1,
	},
};

describe("when extract an image from a story", () => {
	it("return null if not found", () => {
		const url = getImageFromANS({});

		expect(url).toEqual(null);
	});
	it("must extract image from lead_art.promo_items if is present", () => {
		const url = getImageFromANS(mockLeadArtVideo);
		const imageUrl = mockLeadArtVideo.promo_items.lead_art.promo_items.basic.url;

		expect(url).toEqual(imageUrl);
	});

	it("must extract image from basic if lead_art image is empty", () => {
		const url = getImageFromANS(mockLeadArtVideoPromoBasic);
		const imageUrl = mockLeadArtVideoPromoBasic.promo_items.basic.url;

		expect(url).toEqual(imageUrl);
	});

	it("must return null if lead_art or basic doesn't have an image", () => {
		const url = getImageFromANS(mockLeadArtVideoNoImage);

		expect(url).toBeNull();
	});

	it("must extract image from basic if lead_art is gallery", () => {
		const url = getImageFromANS(mockStoryPromoItemsGalleryFocalPoint);
		const imageUrl =
			mockStoryPromoItemsGalleryFocalPoint.promo_items.lead_art.promo_items.basic.url;

		expect(url).toEqual(imageUrl);
	});
});
