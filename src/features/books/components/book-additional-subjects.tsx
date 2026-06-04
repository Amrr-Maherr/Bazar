import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

type Props = {
  places?: string[];
  people?: string[];
  times?: string[];
};

type Section = {
  label: string;
  items: string[];
};

export function BookAdditionalSubjects({ places, people, times }: Props) {
  const sections = useMemo(() => {
    const result: Section[] = [];
    if (places && places.length > 0) result.push({ label: "Places", items: places });
    if (people && people.length > 0) result.push({ label: "People", items: people });
    if (times && times.length > 0) result.push({ label: "Time Periods", items: times });
    return result;
  }, [places, people, times]);

  if (sections.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Additional Details</Text>
      {sections.map((section) => (
        <View key={section.label} style={styles.section}>
          <Text style={styles.label}>{section.label}</Text>
          <View style={styles.chips}>
            {section.items.map((item) => (
              <View key={item} style={[styles.chip, { backgroundColor: colors.gray[100] }]}>
                <Text style={[styles.chipText, { color: colors.gray[700] }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ))}
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
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
    color: colors.gray[600],
    marginBottom: 8,
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
    fontFamily: fontFamilies.roboto,
  },
});
