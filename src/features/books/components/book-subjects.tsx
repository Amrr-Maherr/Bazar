import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

type Props = {
  subjects: string[];
};

export function BookSubjects({ subjects }: Props) {
  const displaySubjects = useMemo(
    () => subjects.filter((s) => !s.includes("--")).slice(0, 12),
    [subjects]
  );

  if (displaySubjects.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Subjects</Text>
      <View style={styles.chips}>
        {displaySubjects.map((subject) => (
          <View key={subject} style={[styles.chip, { backgroundColor: colors.purple[100] }]}>
            <Text style={[styles.chipText, { color: colors.purple[600] }]}>
              {subject}
            </Text>
          </View>
        ))}
      </View>
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
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
  },
});
