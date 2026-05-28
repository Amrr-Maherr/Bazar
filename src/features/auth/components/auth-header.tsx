import { StyleSheet, View } from "react-native";

import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";
import { ThemedText } from "@/components/themed-text";

type Props = {
  title: string;
  subtitle?: string;
};

export function AuthHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {subtitle && (
        <ThemedText
          style={[styles.subtitle, { color: colors.gray[600] }]}
        >
          {subtitle}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  title: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    lineHeight: 24,
  },
});
