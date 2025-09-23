module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-worklets/plugin',
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: 'app.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true
      }]
    ],
  };
};
