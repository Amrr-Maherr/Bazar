import { ThemedText } from "@/components/themed-text";
import { fontFamilies, fontSizes } from "@/constants/typography";
import { StyleSheet, View } from "react-native";

type Props = {
  message?: string | null;
  type?: "error" | "success" | "warning";
};

export default function StatusMessage({ message, type = "error" }: Props) {
  if (!message) return null;

  return (
    <View
      style={[
        styles.box,
        type === "error" && styles.errorBox,
        type === "success" && styles.successBox,
        type === "warning" && styles.warningBox,
      ]}
    >
      <ThemedText
        style={[
          styles.text,
          type === "error" && styles.errorText,
          type === "success" && styles.successText,
          type === "warning" && styles.warningText,
        ]}
      >
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 8,
  },
  text: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#B91C1C",
  },
  successBox: {
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
  },
  successText: {
    color: "#166534",
  },
  warningBox: {
    backgroundColor: "#FEF9C3",
    borderColor: "#FDE047",
  },
  warningText: {
    color: "#854D0E",
  },
});
