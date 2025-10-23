/* eslint-disable */
const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "style-token-descriptions.json");
const inputJson = JSON.parse(fs.readFileSync(inputFilePath, "utf8"));

function createStyleTokensFile(name, tokens) {
	const folderPath = path.join(__dirname, "..", "src", "components", name);
	const filePath = `${folderPath}/STYLE-TOKENS.md`;

	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}

	let content = `## Style Tokens\n\nThis component provides the following style tokens for customization.\n\n| **Token** | **Description** |\n| --- | --- |\n`;

	for (const tokenName in tokens) {
		let { description } = tokens[tokenName];
		if (!description.endsWith(".")) {
			description += ".";
		}
		content += `| ${tokenName} | ${description} |\n`;
	}

	fs.writeFileSync(filePath, content, "utf8");
}

for (const name in inputJson) {
	createStyleTokensFile(name, inputJson[name]);
}
