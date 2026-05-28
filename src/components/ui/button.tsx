import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { ThemedText } from "@/components/themed-text";

type Variant = "primary" | "outline" | "ghost";

type Props = PressableProps & {
  title: string;
  variant?: Variant;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  containerStyle,
  style,
  ...rest
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "outline" && [
          styles.outline,
          { borderColor: colors.purple[500] },
        ],
        variant === "ghost" && styles.ghost,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        containerStyle,
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : colors.purple[500]}
        />
      ) : (
        <ThemedText
          style={[
            styles.text,
            variant === "primary" && styles.primaryText,
            variant === "outline" && [
              styles.outlineText,
              { color: colors.purple[500] },
            ],
            variant === "ghost" && [
              styles.ghostText,
              { color: colors.purple[500] },
            ],
          ]}
        >
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: colors.purple[500],
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: fontSizes.base,
    fontFamily: fontFamilies["roboto-bold"],
    fontWeight: fontWeights.bold,
  },
  primaryText: {
    color: "#FFFFFF",
  },
  outlineText: {},
  ghostText: {},
});
