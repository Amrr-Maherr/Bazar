import { ImageSourcePropType } from "react-native";

export type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const onboardingData: OnboardingItem[] = [
  {
    id: "1",
    title: "Now reading books will be easier",
    description:
      " Discover new worlds, join a vibrant reading community. Start your reading adventure effortlessly with us.",
    image: require("@/assets/Onboarding/FrameOne.png"),
  },
  {
    id: "2",
    title: "Your Bookish Soulmate Awaits",
    description:
      "Let us be your guide to the perfect read. Discover books tailored to your tastes for a truly rewarding experience.",
    image: require("@/assets/Onboarding/FrameTwo.png"),
  },
  {
    id: "3",
    title: "Start Your Adventure",
    description:
      "Ready to embark on a quest for inspiration and knowledge? Your adventure begins now. Let's go!",
    image: require("@/assets/Onboarding/FrameThree.png"),
  },
];
