export const colors = {
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E8E8E8",
    300: "#D6D6D6",
    400: "#B8B8B8",
    500: "#A6A6A6",
    600: "#7A7A7A",
    700: "#454545",
    800: "#292929",
    900: "#121212",
  },
  purple: {
    50: "#FAF9FD",
    100: "#E5DEF8",
    200: "#CABCEF",
    300: "#A28CE0",
    400: "#7D64C3",
    500: "#54408C",
    600: "#352368",
    700: "#251554",
    800: "#10052F",
    900: "#09031B",
  },
  blue: "#3784FB",
  red: "#EF5A56",
  orange: "#FF8C39",
  yellow: "#FBAE05",
  black: "#000000",
} as const;

export type ColorKey = keyof typeof colors;
