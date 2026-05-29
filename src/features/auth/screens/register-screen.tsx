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

import { Spacing } from "@/constants/theme";
import { fontFamilies, fontSizes, fontWeights } from "@/constants/typography";
import { colors } from "@/constants/colors";
import { ThemedText } from "@/components/themed-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthHeader } from "@/features/auth/components/auth-header";
import { SocialAuthButton } from "@/features/auth/components/social-auth-button";
import { useSignup } from "@/features/auth/hooks/useSignup";
import StatusMessage from "@/shared/components/ui/StatusMessage";

type Props = {
  onNavigateLogin: () => void;
  onSignup: () => void;
};

export default function SignupScreen({
  onNavigateLogin,
  onSignup,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { handleSignup, loading, error, success } = useSignup();

  const SignupFun = async () => {
    try {
      if (password !== confirmPassword) {
        return;
      }

      const response = await handleSignup(email, password);
      if (response) {
        onSignup();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          <View style={styles.header}>
            <AuthHeader
              title="Create Account"
              subtitle="Sign up to get started"
            />
          </View>

          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
            />

            <StatusMessage
              message={error || success}
              type={error ? "error" : "success"}
            />

            <Button
              title="Sign Up"
              loading={loading}
              onPress={SignupFun}
            />
          </View>

          <View style={styles.divider}>
            <View
              style={[styles.dividerLine, { backgroundColor: colors.gray[200] }]}
            />
            <ThemedText
              style={[styles.dividerText, { color: colors.gray[600] }]}
            >
              Or continue with
            </ThemedText>
            <View
              style={[styles.dividerLine, { backgroundColor: colors.gray[200] }]}
            />
          </View>

          <View style={styles.socialButtons}>
            <SocialAuthButton />
          </View>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              Already have an account?{" "}
            </ThemedText>
            <Pressable onPress={onNavigateLogin}>
              <ThemedText
                style={[styles.footerLink, { color: colors.purple[500] }]}
              >
                Sign In
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
  header: {
    marginBottom: Spacing.five,
  },
  form: {
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    marginBottom: Spacing.four,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
  },
  socialButtons: {
    gap: Spacing.three,
    marginBottom: Spacing.five,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    fontSize: fontSizes.sm,
    fontFamily: fontFamilies.roboto,
    color: colors.gray[600],
  },
  footerLink: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
  },
});
