const fs = require("fs");
const path = require("path");

// read in the input styles.json file
const stylesPath = path.join(__dirname, "styles.json");
const styles = JSON.parse(fs.readFileSync(stylesPath));

// create version a of the output schema
const stylesA = {};
for (const [key, value] of Object.entries(styles)) {
	stylesA[key] = { styles: value };
}

// create version b of the output schema
const stylesB = {};
for (const [key, value] of Object.entries(styles)) {
	stylesB[key] = { styles: { default: value } };
}

// write the output schemas to disk
const stylesAPath = path.join(__dirname, "styles-a.json");
const stylesBPath = path.join(__dirname, "styles-b.json");
fs.writeFileSync(stylesAPath, JSON.stringify(stylesA, null, 4));
fs.writeFileSync(stylesBPath, JSON.stringify(stylesB, null, 4));
