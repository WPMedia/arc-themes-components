import formatAuthors from ".";

const authors = [
	{
		name: "Author One",
		type: "author",
		url: "#",
	},
	{
		name: "Author Two",
		type: "author",
	},
	{
		name: "Author Three",
		type: "author",
	},
	{
		name: "Invalid Author",
		type: "not author",
		url: "#",
	},
];

describe("format authors utility function", () => {
	it("should return empty string if nothing passed in", () => {
		expect(formatAuthors()).toBe("");
	});
	it("should return empty string if empty array passed in", () => {
		expect(formatAuthors([])).toBe("");
	});
	it("should return empty string if null value passed in", () => {
		expect(formatAuthors([null])).toBe("");
	});
	it("should return empty string if undefined value passed in", () => {
		expect(formatAuthors([undefined])).toBe("");
	});
	it("should return properly formatted for a single item", () => {
		expect(formatAuthors(authors.slice(0, 1))).toBe('<a href="#">Author One</a>');
	});
	it("should return properly formatted for two items", () => {
		expect(formatAuthors(authors.slice(0, 2))).toBe('<a href="#">Author One</a> and Author Two');
	});
	it("should return properly formatted for three items", () => {
		expect(formatAuthors(authors.slice(0, 3))).toBe(
			'<a href="#">Author One</a>, Author Two, and Author Three'
		);
	});
	it("should return nothing for invalid authors", () => {
		expect(formatAuthors(authors.slice(3, 4))).toBe("");
	});
	it("should return properly formatted for three items aith custom conjunction", () => {
		expect(formatAuthors(authors.slice(0, 3), "or")).toBe(
			'<a href="#">Author One</a>, Author Two, or Author Three'
		);
	});
});
