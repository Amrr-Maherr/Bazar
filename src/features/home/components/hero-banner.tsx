import { useCallback, useRef } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { getCoverUrl } from "@/services/openlibrary/openlibrary";
import type { OpenLibraryWork } from "@/types/openlibrary";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CAROUSEL_HEIGHT = 280;

type Props = {
  books: OpenLibraryWork[];
  onBookPress: (book: OpenLibraryWork) => void;
};

export function HeroBanner({ books, onBookPress }: Props) {
  const ref = useRef(null);

  const renderItem = useCallback(
    ({ item }: { item: OpenLibraryWork }) => {
      const coverUrl = getCoverUrl(item.cover_id ?? item.cover_i, "L");

      return (
        <Pressable
          style={styles.slide}
          onPress={() => onBookPress(item)}
        >
          <View style={styles.overlay} />
          {coverUrl && (
            <Image
              source={{ uri: coverUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.slideContent}>
            <Text style={styles.slideTitle} numberOfLines={2}>
              {item.title}
            </Text>
            {item.author_name?.[0] && (
              <Text style={styles.slideAuthor} numberOfLines={1}>
                {item.author_name[0]}
              </Text>
            )}
          </View>
        </Pressable>
      );
    },
    [onBookPress]
  );

  if (books.length === 0) return null;

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        data={books}
        renderItem={renderItem}
        width={SCREEN_WIDTH - 32}
        height={CAROUSEL_HEIGHT}
        style={styles.carousel}
        loop
        autoPlay
        autoPlayInterval={4000}
        scrollAnimationDuration={800}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 50,
        }}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    alignItems: "center",
  },
  carousel: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
  },
  slide: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: colors.gray[200],
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 1,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  slideContent: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  slideTitle: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: "#FFFFFF",
    marginBottom: 4,
  },
  slideAuthor: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: "rgba(255,255,255,0.8)",
  },
});
