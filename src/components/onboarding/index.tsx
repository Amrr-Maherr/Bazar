import { useCallback, useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { onboardingData } from "./data";
import { OnboardingPagination } from "./pagination";
import { OnboardingSlide } from "./slide";

const { width } = Dimensions.get("screen");

type Props = {
  onFinish: () => void;
  onSignIn?: () => void;
};

export function OnboardingScreen({ onFinish, onSignIn }: Props) {
  const ref = useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboardingData.length - 1;

  const onPressNext = useCallback(() => {
    if (isLastSlide) {
      onFinish();
    } else {
      ref.current?.scrollTo({ index: activeIndex + 1, animated: true });
    }
  }, [activeIndex, isLastSlide, onFinish]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {!isLastSlide && (
        <Pressable style={styles.skip} onPress={onFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      )}
      <View style={styles.container}>
        <Carousel
          ref={ref}
          data={onboardingData}
          renderItem={({ item }) => <OnboardingSlide item={item} />}
          width={width}
          loop={false}
          onSnapToItem={setActiveIndex}
          style={styles.carousel}
        />

        <View style={styles.footer}>
          <OnboardingPagination
            count={onboardingData.length}
            activeIndex={activeIndex}
          />

          <Pressable style={styles.button} onPress={onPressNext}>
            <Text style={styles.buttonText}>
              {isLastSlide ? "Get Started" : "Next"}
            </Text>
          </Pressable>

          <Pressable style={styles.signInButton} onPress={onSignIn ?? onFinish}>
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  carousel: {
    flex: 1,
  },
  footer: {
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: colors.purple[500],
    width: "100%",
    paddingVertical: 16,
    borderRadius: 48,
    alignItems: "center",
  },
  skip: {
    position: "absolute",
    top: 26,
    right: 24,
    zIndex: 10,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  skipText: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    fontWeight: fontWeights.medium,
    color: colors.gray[600],
  },
  signInButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.gray[300],
    width: "100%",
    paddingVertical: 16,
    borderRadius: 48,
    alignItems: "center",
  },
  signInText: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies["roboto-bold"],
    fontWeight: fontWeights.bold,
    color: colors.gray[600],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: fontSizes.base,
    fontFamily: fontFamilies["roboto-bold"],
    fontWeight: fontWeights.bold,
  },
});
