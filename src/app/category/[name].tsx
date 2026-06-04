import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function CategoryBooks() {
  return (
    <View style={[styles.container, { backgroundColor: colors.gray[50] }]}>
      <Text>Category Books</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
