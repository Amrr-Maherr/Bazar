import { ResetPasswordScreen } from "@/features/auth/screens/reset-password-screen";
import { router } from "expo-router";

export default function ResetPassword() {
  return (
    <ResetPasswordScreen
      onNavigateLogin={() => router.replace("/auth/login")}
      onGoBack={() => router.back()}
      onResetPassword={() => {}}
    />
  );
}
