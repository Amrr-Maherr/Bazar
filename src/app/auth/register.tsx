import SignupScreen from "@/features/auth/screens/register-screen";
import { router } from "expo-router";

export default function Register() {
  return (
    <SignupScreen
      onNavigateLogin={() => router.replace("/auth/login")}
      onSignup={() => {
        router.replace("/(tabs)/home");
      }}
      onGuest={() => {
        router.replace("/(tabs)/home");
      }}
    />
  );
}
