import cssVariablesTheme from "@etchteam/storybook-addon-css-variables-theme";

// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import news from "!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./themes/news.scss";
// eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
import commerce from "!!style-loader?injectType=lazyStyleTag!css-loader!sass-loader!./themes/commerce.scss";

export const decorators = [cssVariablesTheme];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	layout: "fullscreen",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	options: {
		storySort: (a, b) =>
			a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
	},
	cssVariables: {
		files: {
			news,
			commerce,
		},
	},
};
