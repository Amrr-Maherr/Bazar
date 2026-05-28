import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

export default function Splash() {
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
