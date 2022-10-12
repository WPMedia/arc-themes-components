module.exports = {
	env: {
		test: {
			plugins: [
				[
					"module-resolver",
					{
						alias: {
							"fusion:context": "./jest/mocks/context.js",
							"fusion:properties": "./jest/mocks/properties.js",
							"fusion:intl": "./jest/mocks/intl.js",
						},
					},
				],
			],
		},
	},
};
