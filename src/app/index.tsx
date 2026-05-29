import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { useAuth } from "@/contexts/AuthContext";

export default function Splash() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)/home");
      } else {
        router.replace("/onboarding");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [loading, isAuthenticated, router]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.logoRow}>
        <Image
          source={require("@/assets/Logo/Logo.png")}
          contentFit="contain"
          style={{ width: 37.94, height: 37.85 }}
        />
        <Text style={styles.title}>Bazar</Text>
      </View>
      <View style={styles.bottomImage}>
        <Image
          source={require("@/assets/Splash/Vector.png")}
          contentFit="contain"
          style={styles.vector}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple[500],
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: fontSizes["2xl"],
    fontFamily: fontFamilies["roboto-bold"],
    fontWeight: fontWeights.bold,
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  vector: {
    width: 316.61,
    height: 315.86,
  },
});
