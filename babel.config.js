module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo', 'nativewind/babel'],
		plugins: [
			[
				'module:react-native-dotenv',
				{
					moduleName: '@env',
					path: '.env',
				},
			],
			[
				'module-resolver',
				{
					root: ['./src'],
					alias: {
						'@': './src',
					},
				},
			],
			'react-native-reanimated/plugin',
		],
	};
};
