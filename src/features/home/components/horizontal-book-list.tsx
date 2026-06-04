import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { getCoverUrl } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

type Props = {
  title: string;
  books: OpenLibraryWork[];
  isLoading?: boolean;
  onBookPress: (book: OpenLibraryWork) => void;
};

export function HorizontalBookList({ title, books, isLoading, onBookPress }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: OpenLibraryWork }) => {
      const coverUrl = getCoverUrl(item.cover_id ?? item.cover_i, "M");

      return (
        <Pressable
          style={({ pressed }) => [
            styles.bookItem,
            pressed && styles.bookItemPressed,
          ]}
          onPress={() => onBookPress(item)}
        >
          <View style={styles.bookCover}>
            {coverUrl ? (
              <Image
                source={{ uri: coverUrl }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderCover}>
                <Text style={styles.placeholderText}>
                  {item.title.charAt(0)}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.author_name?.[0] && (
            <Text style={styles.bookAuthor} numberOfLines={1}>
              {item.author_name[0]}
            </Text>
          )}
        </Pressable>
      );
    },
    [onBookPress]
  );

  const keyExtractor = useCallback(
    (item: OpenLibraryWork) => item.key,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.purple[500]} />
        </View>
      ) : books.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No books available</Text>
        </View>
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
  },
  list: {
    paddingHorizontal: 16,
    gap: 12,
  },
  bookItem: {
    width: 120,
  },
  bookItemPressed: {
    opacity: 0.8,
  },
  bookCover: {
    width: 120,
    height: 180,
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
    backgroundColor: colors.gray[200],
  },
  placeholderText: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[400],
  },
  bookTitle: {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[900],
    lineHeight: 16,
  },
  bookAuthor: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
    marginTop: 2,
  },
  loadingContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[500],
  },
});
