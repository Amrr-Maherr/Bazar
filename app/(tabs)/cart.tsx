import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
} from "react-native";

const cartItems = [
  {
    id: "1",
    name: "Smartphone",
    price: 599,
    image: "https://via.placeholder.com/60",
  },
  {
    id: "2",
    name: "Headphones",
    price: 99,
    image: "https://via.placeholder.com/60",
  },
  {
    id: "3",
    name: "Shoes",
    price: 120,
    image: "https://via.placeholder.com/60",
  },
];

export default function Cart() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/images/EmptyCart.png")}
      />
      <Text style={styles.header}>There is no products</Text>
    </View>
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
    width: 180,
    height: 180,
    marginBottom: 24,
  },
});
