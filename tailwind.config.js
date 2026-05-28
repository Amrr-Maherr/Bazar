/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/shared/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "roboto-thin": ["Roboto_100Thin"],
        "roboto-extralight": ["Roboto_200ExtraLight"],
        "roboto-light": ["Roboto_300Light"],
        roboto: ["Roboto_400Regular"],
        "roboto-medium": ["Roboto_500Medium"],
        "roboto-semibold": ["Roboto_600SemiBold"],
        "roboto-bold": ["Roboto_700Bold"],
        "roboto-extrabold": ["Roboto_800ExtraBold"],
        "roboto-black": ["Roboto_900Black"],
        "open-sans-light": ["OpenSans_300Light"],
        "open-sans": ["OpenSans_400Regular"],
        "open-sans-medium": ["OpenSans_500Medium"],
        "open-sans-semibold": ["OpenSans_600SemiBold"],
        "open-sans-bold": ["OpenSans_700Bold"],
        "open-sans-extrabold": ["OpenSans_800ExtraBold"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        rounded: ["var(--font-rounded)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [],
};
