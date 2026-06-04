import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

export function DetailsLoading() {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.gray[50] }]}>
      <ActivityIndicator size="large" color={colors.purple[500]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
