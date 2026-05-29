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
import { useLogin } from "@/features/auth/hooks/useLogin";
import StatusMessage from "@/shared/components/ui/StatusMessage";

type Props = {
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onLogin: () => void;
};

export default function LoginScreen({
  onNavigateRegister,
  onNavigateForgotPassword,
  onLogin,
}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, loading, error, success } = useLogin();

  const LoginFun = async () => {
    try {
      const response = await handleLogin(email, password);
      if (response) {
        onLogin();
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
              title="Welcome Back"
              subtitle="Sign in to your account"
            />
          </View>

          <View style={styles.form}>
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
            />

            <StatusMessage
              message={error || success}
              type={error ? "error" : "success"}
            />

            <Pressable
              onPress={onNavigateForgotPassword}
              style={styles.forgotPassword}
            >
              <ThemedText
                style={[styles.forgotPasswordText, { color: colors.purple[500] }]}
              >
                Forgot Password?
              </ThemedText>
            </Pressable>

            <Button
              title="Sign In"
              loading={loading}
              onPress={LoginFun}
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
              Don{'\''}t have an account?{" "}
            </ThemedText>
            <Pressable onPress={onNavigateRegister}>
              <ThemedText
                style={[styles.footerLink, { color: colors.purple[500] }]}
              >
                Sign Up
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
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies["roboto-medium"],
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
