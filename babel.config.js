module.exports = {
	env: {
		test: {
			plugins: [
				[
					"module-resolver",
					{
						alias: {
							"fusion:context": "./jest/mocks/context.js",
							"fusion:content": "./jest/mocks/content.js",
							"fusion:properties": "./jest/mocks/properties.js",
							"fusion:intl": "./jest/mocks/intl.js",
							"fusion:environment": "./jest/mocks/environment.js",
						},
					},
				],
			],
		},
	},
};
