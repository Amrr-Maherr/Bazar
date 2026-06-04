import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";

type Props = {
  onRetry: () => void;
};

export function DetailsError({ onRetry }: Props) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.gray[50] }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: colors.red }]}>
          <Ionicons name="alert" size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.message}>
          We could not load the book details. Please try again.
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: colors.gray[900],
    marginBottom: 8,
  },
  message: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.purple[500],
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 48,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: "#FFFFFF",
  },
});
