import React, { useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import useBookDetails from "../Api/useBookDetails";
import BookDetailsShimmer from "../components/BookDetailsShimmer";
import ErrorComponent from "../components/ErrorComponent";

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    data: book,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["book-details", id],
    queryFn: () => useBookDetails({ Query: id as string }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: book?.title
        ? book.title.length > 25
          ? `${book.title.substring(0, 25)}...`
          : book.title
        : "Book Details",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation, book]);

  if (isLoading) return <BookDetailsShimmer />;

  if (error || !book) {
    return (
      <ErrorComponent
        message="Failed to load book details. Please check your connection and try again."
        onRetry={() => refetch}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: book.formats["image/jpeg"] }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>
          By{" "}
          {book.authors
            ?.map(
              (a) =>
                `${a.name}${
                  a.birth_year
                    ? ` (${a.birth_year}-${a.death_year || "present"})`
                    : ""
                }`
            )
            .join(", ") || "Unknown Author"}
        </Text>

        {/* باقي تفاصيل الكتاب مثل Basic Info و Categories و Description ... */}
        {/* ... */}
        <Pressable
          style={styles.readBtn}
          onPress={() => router.push(`/reader?id=${book.id}`)}
        >
          <Text style={styles.readText}>Read Book</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  content: { padding: 20 },
  bookImage: {
    width: 160,
    height: 220,
    borderRadius: 15,
    marginBottom: 30,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bookTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 32,
  },
  bookAuthor: {
    fontSize: 18,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  readBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  readText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
