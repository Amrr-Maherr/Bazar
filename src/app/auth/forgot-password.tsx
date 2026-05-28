import { ForgotPasswordScreen } from "@/features/auth/screens/forgot-password-screen";
import { router } from "expo-router";

export default function ForgotPassword() {
  return (
    <ForgotPasswordScreen
      onNavigateLogin={() => router.replace("/auth/login")}
      onGoBack={() => router.back()}
      onSendResetLink={() => router.push("/auth/otp-verification")}
    />
  );
}
