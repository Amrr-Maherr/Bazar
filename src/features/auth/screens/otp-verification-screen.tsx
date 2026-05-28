import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/features/auth/components/auth-header";

const OTP_LENGTH = 6;

type Props = {
  onNavigateResetPassword: () => void;
  onGoBack?: () => void;
  onVerify: () => void;
};

export function OTPVerificationScreen({
  onNavigateResetPassword,
  onGoBack,
  onVerify,
}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => code[i] ?? "");

  function handleChangeText(text: string) {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, OTP_LENGTH);
    setCode(cleaned);

    if (cleaned.length === OTP_LENGTH) {
      inputRef.current?.blur();
    }
  }

  function handleKeyPress(e: { nativeEvent: { key: string } }) {
    if (e.nativeEvent.key === "Backspace" && code.length > 0) {
      setCode(code.slice(0, -1));
    }
  }

  function handleBoxPress() {
    inputRef.current?.focus();
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.gray[50] }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {onGoBack && (
            <Pressable onPress={onGoBack} style={styles.backButton} hitSlop={8}>
              <Ionicons name="chevron-back" size={24} color={colors.black} />
            </Pressable>
          )}
          <View style={styles.header}>
            <AuthHeader
              title="Verify OTP"
              subtitle={`Enter the 6-digit code sent to your email`}
            />
          </View>

          <Pressable style={styles.otpContainer} onPress={handleBoxPress}>
            {digits.map((digit, index) => {
              const isFocused = index === code.length;
              return (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    {
                      backgroundColor: colors.gray[100],
                      borderColor: isFocused
                        ? colors.purple[500]
                        : "transparent",
                    },
                  ]}
                >
                  <ThemedText style={styles.otpDigit}>
                    {digit}
                  </ThemedText>
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleChangeText}
            onKeyPress={handleKeyPress}
            maxLength={OTP_LENGTH}
            keyboardType="number-pad"
            autoFocus
          />

          <View style={styles.action}>
            <Button
              title="Verify"
              loading={loading}
              disabled={code.length !== OTP_LENGTH}
              onPress={onVerify}
            />
          </View>

          <View style={styles.resend}>
            <ThemedText
              style={[styles.resendText, { color: colors.gray[600] }]}
            >
              Didn{'\''}t receive the code?{" "}
            </ThemedText>
            <Pressable>
              <ThemedText
                style={[styles.resendLink, { color: colors.purple[500] }]}
              >
                Resend
              </ThemedText>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.six,
    paddingBottom: Spacing.five,
  },
  backButton: {
    marginBottom: Spacing.three,
  },
  header: {
    marginBottom: Spacing.five,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.two,
    marginBottom: Spacing.five,
  },
  otpBox: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 52,
  },
  otpDigit: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
  action: {
    marginBottom: Spacing.four,
  },
  resend: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
  },
  resendLink: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies["roboto-semibold"],
  },
});
