import { OTPVerificationScreen } from "@/features/auth/screens/otp-verification-screen";
import { router } from "expo-router";

export default function OTPVerification() {
  return (
    <OTPVerificationScreen
      onNavigateResetPassword={() => router.push("/auth/reset-password")}
      onGoBack={() => router.back()}
      onVerify={() => {}}
    />
  );
}
