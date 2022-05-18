import serialJoin from "../serial-join";

const formatAuthors = (byCredits = [], conjunction = "and") =>
	serialJoin(
		byCredits
			.map((credit) => ({
				type: credit?.type,
				name: credit?.additional_properties?.original?.byline || credit?.name,
				url: credit?.url,
			}))
			.filter(({ type, name }) => type === "author" && name)
			.map(({ name, url }) => (url ? `<a href="${url}">${name}</a>` : name)),
		conjunction
	);

export default formatAuthors;
