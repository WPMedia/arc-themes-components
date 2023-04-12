const fs = require("fs");
const path = require("path");

// Define the directory to search for JSON files
const componentsDir = path.join(__dirname, "components");

// Loop through all files in the components directory
fs.readdirSync(componentsDir).forEach((folderName) => {
	const folderPath = path.join(componentsDir, folderName);

	// Only process subdirectories that contain a styles.json file
	const stylesPath = path.join(folderPath, "styles.json");
	if (!fs.existsSync(stylesPath)) {
		return;
	}

	// Read the styles.json file
	const stylesData = fs.readFileSync(stylesPath);
	const styles = JSON.parse(stylesData);

	// Loop through all objects with a styles property
	Object.keys(styles).forEach((componentName) => {
		const component = styles[componentName];
		if (component.styles) {
			const { styles } = component;
			delete component.styles;
			component.styles = { default: styles };
		}
	});

	// Write the updated styles.json file
	fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
});
