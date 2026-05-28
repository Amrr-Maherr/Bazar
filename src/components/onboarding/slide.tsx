import { Image } from "expo-image";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import type { OnboardingItem } from "./data";

const { width } = Dimensions.get("screen");

type Props = {
  item: OnboardingItem;
};

export function OnboardingSlide({ item }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={item.image}
        contentFit="contain"
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  image: {
    width: width * 0.75,
    height: width * 0.75,
    marginBottom: 40,
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies["roboto-bold"],
    fontWeight: fontWeights.bold,
    color: colors.black,
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    fontWeight: fontWeights.normal,
    color: colors.gray[500],
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
