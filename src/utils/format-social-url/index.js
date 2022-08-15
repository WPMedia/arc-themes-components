const SocialTypes = Object.freeze({
	Email: Symbol("email"),
	Facebook: Symbol("facebook"),
	Instagram: Symbol("instagram"),
	LinkedIn: Symbol("linkedin"),
	Medium: Symbol("medium"),
	Pinterest: Symbol("pinterest"),
	Reddit: Symbol("reddit"),
	Snapchat: Symbol("snapchat"),
	SoundCloud: Symbol("soundcloud"),
	Tumblr: Symbol("tumblr"),
	Twitter: Symbol("twitter"),
	WhatsApp: Symbol("whatsapp"),
	Youtube: Symbol("youtube"),
});

function formatSocialURL(type, field) {
	switch (type) {
		case SocialTypes.Email:
			return `mailto:${field}`;
		case SocialTypes.Facebook:
			return `https://www.facebook.com/${field}`;
		case SocialTypes.Instagram:
			return `https://www.instagram.com/${field}/`;
		case SocialTypes.LinkedIn:
			return `https://www.linkedin.com/in/${field}/`;
		case SocialTypes.Medium:
			return `https://medium.com/${field}`;
		case SocialTypes.Pinterest:
			return `https://www.pinterest.com/${field}/`;
		case SocialTypes.Reddit:
			return `https://www.reddit.com/user/${field}/`;
		case SocialTypes.Snapchat:
			return `https://www.snapchat.com/add/${field}`;
		case SocialTypes.SoundCloud:
			return `https://soundcloud.com/${field}`;
		case SocialTypes.Tumblr:
			return `https://${field}.tumblr.com`;
		case SocialTypes.Twitter:
			return `https://twitter.com/${field}`;
		case SocialTypes.WhatsApp:
			return `https://wa.me/${field}`;
		case SocialTypes.Youtube:
			return `https://www.youtube.com/user/${field}`;
		default:
			return field;
	}
}

formatSocialURL.types = SocialTypes;

export default formatSocialURL;
