import { RegisterScreen } from "@/features/auth/screens/register-screen";
import { router } from "expo-router";

export default function Register() {
  return (
    <RegisterScreen
      onNavigateLogin={() => router.replace("/auth/login")}
      onGoBack={() => router.back()}
      onRegister={() => {}}
      onGuest={() => {
        router.replace("/(tabs)/home");
      }}
    />
  );
}
