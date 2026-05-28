import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Bazar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.purple[500],
  },
});
