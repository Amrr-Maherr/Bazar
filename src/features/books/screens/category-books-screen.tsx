import { useCallback } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { BookGridItem } from "@/features/books/components/book-grid-item";
import { useCategoryBooks } from "@/features/home/hooks/useCategoryBooks";
import { HOME_CATEGORIES, CATEGORY_ICONS } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

type Props = {
  categoryName: string;
};

export function CategoryBooksScreen({ categoryName }: Props) {
  const { data: books, isLoading, isError, refetch } = useCategoryBooks(categoryName, 50);

  const category = HOME_CATEGORIES.find((c) => c.key === categoryName);

  const handleBookPress = useCallback((book: OpenLibraryWork) => {
    const workId = book.key.replace("/works/", "");
    router.push({ pathname: "/(tabs)/book/[id]", params: { id: workId } });
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const renderBook = useCallback(
    ({ item }: { item: OpenLibraryWork }) => (
      <BookGridItem book={item} onPress={handleBookPress} />
    ),
    [handleBookPress]
  );

  const keyExtractor = useCallback(
    (item: OpenLibraryWork) => item.key,
    []
  );

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purple[500]} />
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
        <View style={styles.centerContainer}>
          <View style={[styles.iconCircle, { backgroundColor: colors.red }]}>
            <Ionicons name="alert" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.errorTitle}>Failed to load books</Text>
          <Pressable
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
            onPress={() => refetch()}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const iconName = category
    ? (CATEGORY_ICONS[category.key] as keyof typeof Ionicons.glyphMap)
    : "book";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
      <View style={styles.headerSection}>
        <View style={[styles.headerGradient, { backgroundColor: colors.purple[600] }]}>
          <View style={styles.headerOverlay} />
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={handleBack}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <View style={styles.headerContent}>
          <View style={[styles.iconCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <Ionicons name={iconName} size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>
            {category?.label ?? categoryName}
          </Text>
          <Text style={styles.headerSubtitle}>
            {books?.length ?? 0} books
          </Text>
        </View>
      </View>

      <FlatList
        data={books ?? []}
        renderItem={renderBook}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No books found in this category</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerSection: {
    height: 200,
    position: "relative",
  },
  headerGradient: {
    ...StyleSheet.absoluteFill,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    position: "absolute",
    top: 8,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: "rgba(255,255,255,0.8)",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  errorTitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 16,
    marginTop: 16,
  },
  retryButton: {
    backgroundColor: colors.purple[500],
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 48,
  },
  retryButtonPressed: {
    opacity: 0.85,
  },
  retryText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: "#FFFFFF",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    gap: 12,
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: "center",
  },
  emptyText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[500],
  },
});
