const fs = require("fs");
const path = require("path");

// Define the directory to search
const componentsDir = path.join(__dirname, "components");

// Get a list of all directories in the components directory
const componentDirs = fs
	.readdirSync(componentsDir, { withFileTypes: true })
	.filter((dir) => dir.isDirectory())
	.map((dir) => dir.name);

// Loop through each component directory
componentDirs.forEach((componentDir) => {
	const stylesPath = path.join(componentsDir, componentDir, "styles.json");
	const themePath = path.join(componentsDir, componentDir, "themes", "news.json");

	// Check if the styles.json file exists in the component directory
	if (fs.existsSync(stylesPath)) {
		// Create the themes directory if it doesn't already exist
		const themesDir = path.join(componentsDir, componentDir, "themes");
		if (!fs.existsSync(themesDir)) {
			fs.mkdirSync(themesDir);
		}

		// Rename the styles.json file to themes/news.json
		fs.renameSync(stylesPath, themePath);
		console.log(`Moved ${stylesPath} to ${themePath}`);
	}
});
