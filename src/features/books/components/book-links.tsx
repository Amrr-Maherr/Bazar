import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import type { WorkDetails } from "@/types/openlibrary";

type Props = {
  work: WorkDetails;
};

export function BookLinks({ work }: Props) {
  if (!work.latest_revision && !work.last_modified) return null;

  const openLibraryUrl = `https://openlibrary.org${work.key}`;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Links</Text>
      <Pressable
        style={({ pressed }) => [
          styles.link,
          pressed && styles.linkPressed,
        ]}
        onPress={() => Linking.openURL(openLibraryUrl)}
      >
        <Text style={styles.linkText}>View on OpenLibrary</Text>
        <Text style={styles.linkArrow}>→</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 12,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.purple[50],
  },
  linkPressed: {
    opacity: 0.7,
  },
  linkText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    color: colors.purple[500],
  },
  linkArrow: {
    fontSize: fontSizes.base,
    color: colors.purple[500],
  },
});
