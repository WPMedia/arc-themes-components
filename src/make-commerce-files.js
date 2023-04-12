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
	const themesDir = path.join(componentsDir, componentDir, "themes");
	const commercePath = path.join(themesDir, "commerce.json");

	// Check if the themes directory exists in the component directory
	if (fs.existsSync(themesDir)) {
		// Check if the commerce.json file already exists
		if (!fs.existsSync(commercePath)) {
			// Create an empty commerce.json file
			fs.writeFileSync(commercePath, "{}");
			console.log(`Created ${commercePath}`);
		}
	}
});
