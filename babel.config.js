module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    
      plugins: [
        [
           'module-resolver',
           {
             root: ['./src'],
             extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
             alias: {
               tests: ['./tests/'],
               "@components": "./src/components",
               "@assets": "./src/assets",
               "@screens": "./src/screens",
               "@hooks": "./src/hooks",
               "@models": "./src/models",
               "@services": "./src/services",
               "@styles": "./src/styles",
               "@utils": "./src/utils",
               "@routes": "./src/routes",
               "@setup": "./src/setup",
             }
           }
       ],
       ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
      ]
  };
};
