import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import type { WorkDetails } from "@/types/openlibrary";

type Props = {
  work: WorkDetails;
  editionsTotal: number;
};

type Field = {
  label: string;
  value: string;
};

export function BookMetadata({ work, editionsTotal }: Props) {
  const fields = useMemo(() => {
    const result: Field[] = [];
    if (work.first_publish_date) result.push({ label: "First Published", value: work.first_publish_date });
    if (work.subjects?.[0]) result.push({ label: "Genre", value: work.subjects[0] });
    if (editionsTotal > 0) result.push({ label: "Editions", value: String(editionsTotal) });
    if (work.latest_revision) result.push({ label: "Latest Revision", value: `Rev. ${work.latest_revision}` });
    if (work.revision) result.push({ label: "Revision", value: `Rev. ${work.revision}` });
    if (work.last_modified) result.push({ label: "Last Modified", value: new Date(work.last_modified.value).toLocaleDateString() });
    return result;
  }, [work, editionsTotal]);

  if (fields.length === 0) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Details</Text>
      <View style={styles.grid}>
        {fields.map((field) => (
          <View key={field.label} style={styles.field}>
            <Text style={styles.label}>{field.label}</Text>
            <Text style={styles.value} numberOfLines={2}>
              {field.value}
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  field: {
    width: "47%",
  },
  label: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[500],
    marginBottom: 2,
  },
  value: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[900],
  },
});
