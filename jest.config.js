module.exports = {
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
	},
	setupFilesAfterEnv: [
		'./jest/testSetupFile.js',
	],
	verbose: true,
	moduleNameMapper: {
		'^.+\\.(scss)$': 'identity-obj-proxy',
	},
	transformIgnorePatterns: [
		'/node_modules/(?!@wpmedia)',
	],
	coverageDirectory: '<rootDir>/coverage',
	coverageThreshold: {
		global: {
			statements: 90,
			branches: 90,
			functions: 90,
			lines: 90,
		},
	},
	collectCoverageFrom: [
		'**/**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/images/*.svg',
		'!**/mock*.js',
		'!**/*.story*.jsx',
		'!**/*.(config).*',
		'!**/.storybook/**',
		'!**/coverage/**',
		'!**/jest/**',
		'!index.js',
		'!.*.js',
		'!__tests__/scss.test.js',
	],
};
