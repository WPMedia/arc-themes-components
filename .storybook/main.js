const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx"],
	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
	],
	staticDirs: ["../resources"],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"],
			include: path.resolve(__dirname, "../"),
		});

		// Return the altered config
		return config;
	},
};
