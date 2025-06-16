/*
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
*/

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {withNativeWind} = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
});

// Wrap with NativeWind support (e.g., for global.css)
module.exports = withNativeWind(config, {input: './global.css'});
