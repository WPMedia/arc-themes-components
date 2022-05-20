// Join based on rules for serial comma use (aka. Oxford comma)

const serialJoin = (list = [], conjunction = "and", delimiter = ",", spacer = " ") =>
	list
		.filter((item) => typeof item !== "object" && typeof item !== "undefined")
		.map(
			(item, index, { length }) =>
				`${length > 1 && index === length - 1 ? `${conjunction}${spacer}` : ""}${item}${
					length > 2 && index !== length - 1 ? delimiter : ""
				}`
		)
		.join(spacer);

export default serialJoin;
