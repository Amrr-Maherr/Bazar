import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";

type Provider = "google" | "apple";

type Props = {
  provider: Provider;
  onPress?: () => void;
};

export function SocialAuthButton({ provider, onPress }: Props) {
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
        {provider === "google" ? (
          <FontAwesome5 name="google" size={18} color={colors.gray[600]} />
        ) : (
          <Ionicons name="logo-apple" size={18} color={colors.gray[600]} />
        )}
      </View>
      <Text style={styles.text}>
        Continue with {provider === "google" ? "Google" : "Apple"}
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
    alignItems: "center",
  },
  text: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies["roboto-medium"],
    color: colors.gray[600],
  },
});
