import { scaleFont } from "./mixins";

const Font = {
  FAMILY: {
    THIN: "Roboto-Thin",
    LIGHT: "Roboto-Light",
    MEDIUM: "Roboto-Medium",
    REGULAR: "Roboto-Regular",
    BOLD: "Roboto-Bold",
    BLACK: "Roboto-Black",
  },
  WEIGHT: {
    THIN: "100",
    EXTRA_LIGHT: "200",
    LIGHT: "300",
    REGULAR: "400",
    MEDIUM: "500",
    SEMI_BOLD: "600",
    BOLD: "700",
    EXTRA_BOLD: "800",
    BLACK: "900",
  },
  SIZE: {
    SIZE_12: scaleFont(12),
    SIZE_14: scaleFont(14),
    SIZE_15: scaleFont(15),
    SIZE_16: scaleFont(16),
    SIZE_18: scaleFont(18),
    SIZE_20: scaleFont(20),
    SIZE_28: scaleFont(28),
  },
  LINE_HEIGHT: {
    _14: scaleFont(14),
    _18: scaleFont(18),
    _22: scaleFont(22),
  },
};

export default Font;