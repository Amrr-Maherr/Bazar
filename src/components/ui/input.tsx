import { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { ThemedText } from "@/components/themed-text";

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export function Input({
  label,
  error,
  secureTextEntry,
  containerStyle,
  style,
  ...rest
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.gray[100],
            borderColor: error
              ? colors.red
              : isFocused
                ? colors.purple[500]
                : "transparent",
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.gray[900] }, style]}
          placeholderTextColor={colors.gray[600]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
            hitSlop={8}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={colors.gray[600]}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <ThemedText style={[styles.errorText, { color: colors.red }]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.roboto,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1.5,
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.base,
    fontFamily: fontFamilies.roboto,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
  },
  eyeButton: {
    padding: Spacing.two,
  },
  errorText: {
    fontSize: fontSizes.xs,
  },
});
