import AppTabs from "@/components/app-tabs";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import Splash from "./splash";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    // var for the timer
    let timer;
    // prepare the splash screen
    async function prepare() {
      try {
        const timer = setTimeout(() => {
          setSplashDone(true);
        }, 3000);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }
    // clear the timer in the component life cycle
    () => {
      clearTimeout(timer);
    };
    prepare();
  }, []);

  if (!splashDone) {
    return <Splash />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppTabs />
    </ThemeProvider>
  );
}
