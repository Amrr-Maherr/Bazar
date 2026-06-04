import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

type Props = {
  title?: string;
  message?: string;
};

export function BookEmptyState({
  title = "Nothing here",
  message = "No books found",
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, { backgroundColor: colors.gray[100] }]}>
        <Ionicons name="book-outline" size={36} color={colors.gray[400]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    color: colors.gray[900],
    marginBottom: 8,
    textAlign: "center",
  },
  message: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
    textAlign: "center",
    lineHeight: 22,
  },
});
