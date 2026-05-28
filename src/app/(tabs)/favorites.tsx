import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

export default function Favorites() {
  return (
    <View style={[styles.container, { backgroundColor: colors.gray[50] }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: colors.gray[100] }]}>
          <Ionicons name="heart-outline" size={36} color={colors.gray[400]} />
        </View>
        <Text style={styles.title}>No favorites yet</Text>
        <Text style={styles.description}>
          Start exploring and save your favorite items here
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.five,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.four,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    marginBottom: Spacing.two,
    textAlign: "center",
    color: colors.gray[900],
  },
  description: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    textAlign: "center",
    lineHeight: 22,
    color: colors.gray[600],
  },
});
