const path = require("path");

module.exports = {
	stories: ["../src/**/*.@(mdx|stories.@(js|jsx))"],

	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-styling-webpack",
		"@storybook/addon-webpack5-compiler-babel",
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
				{
					test: /\.(js|jsx)$/,
					include: path.resolve(__dirname, "../node_modules/@wpmedia/arc-themes-components"),
					use: {
						loader: "babel-loader",
						options: {
							plugins: [
								[
									// Module resolver aliases need to be set here as well so arc-themes-components uses the right mock files.
									"module-resolver",
									{
										alias: {
											"fusion:context": "./.storybook/alias/context.js",
											"fusion:environment": "./.storybook/alias/environment.js",
											"fusion:intl": "./.storybook/alias/intl.js",
											"fusion:properties": "./.storybook/alias/properties.js",
										},
									},
								],
							],
						},
					},
				},
			],
		},

		externals: /^(fusion:)/,
	}),

	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},

	docs: {
		source: {
			language: "jsx",
		},
	},

	babelDefault: {
		presets: [
			[
				"@babel/preset-env",
				{
					targets: {
						node: "current",
					},
					modules: "commonjs",
				},
			],
			[
				"@babel/preset-react",
				{
					runtime: "automatic",
				},
			],
		],
		plugins: [
			"@babel/plugin-proposal-nullish-coalescing-operator",
			"transform-react-remove-prop-types",
			"@babel/plugin-proposal-class-properties",
			"@babel/plugin-transform-private-methods",
			[
				"module-resolver",
				{
					alias: {
						"fusion:context": "./.storybook/alias/context.js",
						"fusion:environment": "./.storybook/alias/environment.js",
						"fusion:intl": "./.storybook/alias/intl.js",
						"fusion:properties": "./.storybook/alias/properties.js",
					},
				},
			],
		],
	},
};
