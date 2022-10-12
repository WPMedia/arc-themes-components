const path = require("path");

module.exports = {
	stories: ["../src/**/*.stories.mdx"],
	addons: [
		"@etchteam/storybook-addon-css-variables-theme",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
	],
	staticDirs: ["../resources"],
	webpackFinal: (config) => ({
		...config,
		module: {
			...config.module,
			rules: [
				...config.module.rules,
				{
					test: /\.scss$/,
					use: ["style-loader", "css-loader", "sass-loader"],
					include: path.resolve(__dirname, "../"),
				},
			],
		},
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve.alias,
				"fusion:context": path.resolve(__dirname, "./alias/context.js"),
				"fusion:intl": path.resolve(__dirname, "./alias/intl.js"),
				"fusion:properties": path.resolve(__dirname, "./alias/properties.js"),
			},
		},
	}),
};
