import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { CategorySection } from "@/features/home/components/category-section";
import { HeroBanner } from "@/features/home/components/hero-banner";
import { HorizontalBookList } from "@/features/home/components/horizontal-book-list";
import { useNewReleases } from "@/features/home/hooks/useNewReleases";
import { useTrendingDaily } from "@/features/home/hooks/useTrendingBooks";

export default function Home() {
  const { data: trendingBooks, isLoading: trendingLoading } = useTrendingDaily();
  const { data: newReleases, isLoading: newReleasesLoading } = useNewReleases();

  const isLoading = trendingLoading || newReleasesLoading;

  const handleBookPress = useCallback((book: { key: string }) => {
    const workId = book.key.replace("/works/", "");
    router.push({ pathname: "/(tabs)/book/[id]", params: { id: workId } });
  }, []);

  const handleCategoryPress = useCallback((category: string) => {
    router.push({ pathname: "/(tabs)/category/[name]", params: { name: category } });
  }, []);

  const trendingData = useMemo(() => trendingBooks ?? [], [trendingBooks]);
  const newReleasesData = useMemo(() => newReleases ?? [], [newReleases]);

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.purple[500]} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Discover</Text>
          <Text style={styles.subtitle}>Find your next great read</Text>
        </View>

        <HeroBanner
          books={trendingData}
          onBookPress={handleBookPress}
        />

        <CategorySection onCategoryPress={handleCategoryPress} />

        <HorizontalBookList
          title="Trending Now"
          books={trendingData}
          isLoading={trendingLoading}
          onBookPress={handleBookPress}
        />

        <HorizontalBookList
          title="New Releases"
          books={newReleasesData}
          isLoading={newReleasesLoading}
          onBookPress={handleBookPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  greeting: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
