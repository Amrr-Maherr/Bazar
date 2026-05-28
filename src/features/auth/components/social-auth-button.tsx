import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";

type Props = {
  onPress?: () => void;
};

export function SocialAuthButton({ onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.gray[100] },
        pressed && { opacity: 0.8 },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Image source={require("@/assets/Google - Original.png")} style={styles.icon} />
      </View>
      <Text style={styles.text}>
        Continue with Google
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.gray[300],
    gap: 10,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  text: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies["roboto-medium"],
    color: colors.gray[600],
  },
});
