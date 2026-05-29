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
import { useAnonymousLogin } from "@/features/auth/hooks/useAnonymousLogin";

type Props = {
  onNavigateLogin: () => void;
  onGoBack?: () => void;
  onRegister: () => void;
  onGuest: () => void;
};

export function RegisterScreen({ onNavigateLogin, onGoBack, onRegister, onGuest }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleGuestLogin, guestLoading } = useAnonymousLogin();

  const GuestFun = async () => {
    try {
      const response = await handleGuestLogin();
      if (response) {
        onGuest();
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
          {onGoBack && (
            <Pressable onPress={onGoBack} style={styles.backButton} hitSlop={8}>
              <Ionicons name="chevron-back" size={24} color={colors.black} />
            </Pressable>
          )}
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

            <Button
              title="Sign Up"
              loading={loading}
              onPress={onRegister}
            />

            <Button
              title="Continue as Guest"
              variant="outline"
              loading={guestLoading}
              onPress={GuestFun}
            />
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
  backButton: {
    marginBottom: Spacing.three,
  },
  header: {
    marginBottom: Spacing.five,
  },
  form: {
    gap: Spacing.three,
    marginBottom: "auto",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.five,
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
