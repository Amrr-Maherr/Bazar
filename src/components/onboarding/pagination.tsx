import { colors } from "@/constants/colors";
import { StyleSheet, View } from "react-native";

type Props = {
  count: number;
  activeIndex: number;
};

export function OnboardingPagination({ count, activeIndex }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex ? styles.dotActive : styles.dotInactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.purple[500],
    borderRadius: 4,
  },
  dotInactive: {
    backgroundColor: colors.gray[300],
  },
});
