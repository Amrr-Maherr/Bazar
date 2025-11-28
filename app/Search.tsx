import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";



export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={styles.title}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons
          name="search"
          size={20}
          color="#555"
          style={{ marginRight: 10 }}
        />
        <TextInput
          placeholder="Search products..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"flex-start",
    marginBottom: 15,
    gap:97
  },

  backBtn: {
    padding: 5,
    marginRight: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 20,
    height: 50,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    padding: 15,
    borderRadius: 12,
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

  noResult: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#555",
  },
});
