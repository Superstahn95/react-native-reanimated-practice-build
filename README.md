This is a practice repo for carrying out animations in react native using react-natvie-reanimated.

To set up react-native-reanimated in this expo bundled react native app, i installed react-native-reanimated using `npx expo install react-native-reanimated`

The next step was to set up my `babel.config.js` as by adding the reanimated plugin as shown below;

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin"], //added this line
  };
};
```
