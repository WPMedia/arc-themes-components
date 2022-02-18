import "./theme.scss";

// eslint-disable-next-line import/prefer-default-export
export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	layout: "fullscreen",
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};
