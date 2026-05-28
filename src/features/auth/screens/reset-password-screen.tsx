import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";
import { ThemedText } from "@/components/themed-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/features/auth/components/auth-header";

type Props = {
  onNavigateLogin: () => void;
  onGoBack?: () => void;
  onResetPassword: () => void;
};

export function ResetPasswordScreen({
  onNavigateLogin,
  onGoBack,
  onResetPassword,
}: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
              title="Reset Password"
              subtitle="Enter your new password"
            />
          </View>

          <View style={styles.form}>
            <Input
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <Button
              title="Reset Password"
              loading={loading}
              onPress={onResetPassword}
            />
          </View>

          <View style={styles.footer}>
            <Pressable onPress={onNavigateLogin}>
              <ThemedText
                style={[styles.backLink, { color: colors.purple[500] }]}
              >
                Back to Sign In
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
  form: {
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  footer: {
    alignItems: "center",
    marginTop: "auto",
  },
  backLink: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies["roboto-medium"],
  },
});
