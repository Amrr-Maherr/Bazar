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
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <View style={styles.totalWrapper}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>${total}</Text>
      </View>

      <Pressable style={styles.checkoutBtn}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingTop: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111",
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    marginBottom: 15,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
  },

  price: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  totalWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 10,
  },

  totalText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  checkoutBtn: {
    height: 50,
    backgroundColor: "#54408C",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  checkoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
