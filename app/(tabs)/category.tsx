import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons, AntDesign } from '@expo/vector-icons';

const categories = [
  { id: "1", name: "Fiction", icon: "book" },
  { id: "2", name: "Science", icon: "science" },
  { id: "3", name: "History", icon: "time" },
  { id: "4", name: "Philosophy", icon: "chatbubble" },
  { id: "5", name: "Poetry", icon: "flower" },
  { id: "6", name: "Adventure", icon: "compass" },
  { id: "7", name: "Romance", icon: "heart" },
  { id: "8", name: "Mystery", icon: "search" },
  { id: "9", name: "Biography", icon: "person" },
  { id: "10", name: "Children", icon: "happy" },
];

export default function Category() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Book Categories",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Explore books by genre and topic</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={styles.categoryBtn}
            onPress={() => router.push(`/CategoryDetails?categoryName=${encodeURIComponent(item.name)}`)}
          >
            <View style={styles.categoryContent}>
              <Ionicons name={item.icon as any} size={24} color="#54408C" />
              <View style={styles.categoryTextContainer}>
                <Text style={styles.categoryText}>{item.name}</Text>
                <Text style={styles.categoryCount}>Browse books</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ccc" />
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
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

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  categoryBtn: {
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  categoryTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  categoryText: {
    fontSize: 16,
    color: "#111",
    fontWeight: '600',
  },
  categoryCount: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
