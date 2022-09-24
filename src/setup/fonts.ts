import * as Font from "expo-font";

const fontsSetup = async () =>
  await Font.loadAsync({
    "Roboto-Thin": require("@assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("@assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("@assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("@assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("@assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("@assets/fonts/Roboto-Black.ttf"),
  });

  export default fontsSetup;