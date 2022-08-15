import formatSocialURL from ".";

describe("construct social url helper", () => {
	it("takes in email as a field and returns interpolated string", () => {
		expect(formatSocialURL("email", "username")).toBe("mailto:username");
	});
	it("takes in twitter as a field and returns interpolated string", () => {
		expect(formatSocialURL("twitter", "username")).toBe("https://twitter.com/username");
	});
	it("takes in instagram as a field and returns interpolated string", () => {
		expect(formatSocialURL("instagram", "username")).toBe("https://www.instagram.com/username/");
	});
	it("takes in facebook as a field and returns interpolated string", () => {
		expect(formatSocialURL("facebook", "https://www.thefacebook.com/zuck")).toBe(
			"https://www.thefacebook.com/zuck"
		);
	});
	it("takes in reddit as a field and returns interpolated string", () => {
		expect(formatSocialURL("reddit", "username")).toBe("https://www.reddit.com/user/username/");
	});
	it("takes in youtube as a field and returns interpolated string", () => {
		expect(formatSocialURL("youtube", "chasereeves")).toBe(
			"https://www.youtube.com/user/chasereeves"
		);
	});
	it("takes in medium as a field and returns interpolated string", () => {
		expect(formatSocialURL("medium", "@username")).toBe("https://medium.com/@username");
	});
	it("takes in tumblr as a field and returns interpolated string", () => {
		expect(formatSocialURL("tumblr", "fishingboatproceeds")).toBe(
			"https://fishingboatproceeds.tumblr.com"
		);
	});
	it("takes in pinterest as a field and returns interpolated string", () => {
		expect(formatSocialURL("pinterest", "username")).toBe("https://www.pinterest.com/username/");
	});
	it("takes in snapchat as a field and returns interpolated string", () => {
		expect(formatSocialURL("snapchat", "username")).toBe("https://www.snapchat.com/add/username");
	});
	it("takes in whatsapp as a field and returns interpolated string", () => {
		expect(formatSocialURL("whatsapp", "phonenum")).toBe("https://wa.me/phonenum");
	});
	it("takes in linkedin as a field and returns interpolated string", () => {
		expect(formatSocialURL("linkedin", "username")).toBe("https://www.linkedin.com/in/username/");
	});
	it("takes in rss as a field and returns interpolated string", () => {
		expect(formatSocialURL("rss", "www.blog-rss.com")).toBe("www.blog-rss.com");
	});
	it("takes in soundcloud as a field and returns interpolated string", () => {
		expect(formatSocialURL("soundcloud", "username")).toBe("https://soundcloud.com/username");
	});
});
