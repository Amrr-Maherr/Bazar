import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";

export default function Notification() {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/images/EmptyNotification.png")}
        />
        <Text style={styles.header}>There is no notifications</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    fontSize: 27,
    fontWeight: "700",
    color: "#121212",
  },

  image: {
    width: 128,
    height: 150,
    marginBottom: 24,
  },
});
