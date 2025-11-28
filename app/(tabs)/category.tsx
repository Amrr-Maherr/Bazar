import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Books" },
  { id: "4", name: "Home & Kitchen" },
  { id: "5", name: "Toys" },
];

export default function Category() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.categoryBtn}>
            <Text style={styles.categoryText}>{item.name}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111",
  },

  categoryBtn: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    marginBottom: 15,
  },

  categoryText: {
    fontSize: 16,
    color: "#111",
  },
});
