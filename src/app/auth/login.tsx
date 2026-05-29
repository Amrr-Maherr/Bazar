import LoginScreen from "@/features/auth/screens/login-screen";
import { router } from "expo-router";

export default function Login() {
  return (
    <LoginScreen
      onNavigateRegister={() => router.replace("/auth/register")}
      onNavigateForgotPassword={() => router.push("/auth/forgot-password")}
      onLogin={() => {
        router.replace("/(tabs)/home");
      }}
      onGuest={() => {
        router.replace("/(tabs)/home");
      }}
    />
  );
}
