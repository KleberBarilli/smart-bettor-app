module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo','module:metro-react-native-babel-preset'],
    plugins: [
        ["module:react-native-dotenv", {
          "envName": "API_URL",
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": true,
          "allowUndefined": true
        }]
      ]
  };
};
