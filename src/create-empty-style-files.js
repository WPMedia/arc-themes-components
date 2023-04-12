const fs = require("fs");
const path = require("path");

const componentsDir = path.join(__dirname, "components");
const subDirs = fs
	.readdirSync(componentsDir, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

for (const subDir of subDirs) {
	const stylesFilePath = path.join(componentsDir, subDir, "styles.json");
	fs.writeFileSync(stylesFilePath, JSON.stringify({}, null, 2));
}
