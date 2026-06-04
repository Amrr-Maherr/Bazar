import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { getCoverUrl } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

type Props = {
  book: OpenLibraryWork;
  onPress: (book: OpenLibraryWork) => void;
};

export function BookGridItem({ book, onPress }: Props) {
  const coverUrl = getCoverUrl(book.cover_id ?? book.cover_i, "M");

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(book)}
    >
      <View style={styles.coverContainer}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderCover, { backgroundColor: colors.gray[200] }]}>
            <Text style={styles.placeholderText}>
              {book.title.charAt(0)}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {book.title}
      </Text>
      {book.author_name?.[0] && (
        <Text style={styles.author} numberOfLines={1}>
          {book.author_name[0]}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  coverContainer: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.gray[200],
    marginBottom: 8,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  placeholderCover: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[400],
  },
  title: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[900],
    lineHeight: 18,
  },
  author: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
    marginTop: 2,
  },
});
