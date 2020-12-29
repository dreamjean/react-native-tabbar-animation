import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const DEFAULT_TABBAR_HEIGHT = 60;
const TABBAR_COVER_HEIGHT = 42;

export default {
  width,
  height,
  DEFAULT_TABBAR_HEIGHT,
  TABBAR_COVER_HEIGHT,
};
