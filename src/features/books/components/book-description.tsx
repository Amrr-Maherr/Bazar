import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

type Props = {
  description?: string | { type: string; value: string };
};

const MAX_LENGTH = 250;

export function BookDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!description) return null;

  const text = typeof description === "string" ? description : description.value;
  const isLong = text.length > MAX_LENGTH;
  const displayText = isLong && !expanded ? text.slice(0, MAX_LENGTH) + "..." : text;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{displayText}</Text>
      {isLong && (
        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text style={styles.readMore}>
            {expanded ? "Show less" : "Read more"}
          </Text>
        </Pressable>
      )}
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
    marginBottom: 8,
  },
  description: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[700],
    lineHeight: 22,
  },
  readMore: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    color: colors.purple[500],
    marginTop: 8,
  },
});
