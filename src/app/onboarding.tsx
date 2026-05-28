import { OnboardingScreen } from "@/components/onboarding";
import { useRouter } from "expo-router";

export default function Onboarding() {
  const router = useRouter();

  return (
    <OnboardingScreen
      onFinish={() => {
        router.replace("/(tabs)/home");
      }}
      onSignIn={() => {
        router.replace("/auth/login");
      }}
    />
  );
}
