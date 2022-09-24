import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";

const SIZE = {
    padding: 16,
    margin: 16,
};

export {
    isAndroid,
    SIZE
}