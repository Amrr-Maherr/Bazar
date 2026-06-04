import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import type { AuthorDetails } from "@/types/openlibrary";

type Props = {
  title: string;
  author: AuthorDetails | null;
  firstPublishYear?: string;
};

export function BookInfo({ title, author, firstPublishYear }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {author && (
        <Text style={styles.author}>by {author.name}</Text>
      )}
      {firstPublishYear && (
        <Text style={styles.year}>First published: {firstPublishYear}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    textAlign: "center",
    marginBottom: 8,
  },
  author: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    color: colors.purple[500],
    marginBottom: 4,
  },
  year: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[500],
  },
});
