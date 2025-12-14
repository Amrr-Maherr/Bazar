import BookCard from "@/components/Books/BookCard";
import { BookDetails } from "@/Data/Books";
import { useBookSearch } from "@/Hooks/useBookSearch";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const {
    data: books,
    isLoading,
    isError,
    refetch,
  } = useBookSearch(searchTerm);

  const handleSearch = () => {
    if (searchQuery.trim().length >= 2) {
      setSearchTerm(searchQuery.trim());
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchTerm("");
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation]);
  
  const renderBookItem = ({ item }: { item: BookDetails }) => (
    <View style={styles.bookItem}>
      <BookCard book={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#555"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search for books, authors..."
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </Pressable>
          )}
        </View>
        <Pressable onPress={handleSearch} style={styles.searchBtn}>
          <Ionicons name="search" size={20} color="#fff" />
        </Pressable>
      </View>

      {/* Results */}
      {searchTerm && (
        <View style={styles.resultsContainer}>
          {isLoading && (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color="#54408C" />
              <Text style={styles.loadingText}>Searching books...</Text>
            </View>
          )}

          {isError && (
            <View style={styles.centerContent}>
              <Ionicons name="alert-circle" size={48} color="#EF5A56" />
              <Text style={styles.errorText}>
                Failed to search books. Try again.
              </Text>
              <Pressable onPress={() => refetch()} style={styles.retryBtn}>
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </View>
          )}

          {!isLoading && !isError && books && books.length === 0 && (
            <View style={styles.centerContent}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.noResultsText}>
                No books found for "{searchTerm}"
              </Text>
              <Text style={styles.noResultsSubText}>
                Try searching with different keywords
              </Text>
            </View>
          )}

          {!isLoading && !isError && books && books.length > 0 && (
            <>
              <Text style={styles.resultsCount}>
                Found {books.length} books for "{searchTerm}"
              </Text>
              <FlatList
                data={books}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBookItem}
                numColumns={2}
                contentContainerStyle={styles.booksGrid}
                showsVerticalScrollIndicator={false}
              />
            </>
          )}
        </View>
      )}

      {/* Empty State */}
      {!searchTerm && (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Search for books</Text>
          <Text style={styles.emptySubText}>
            Find books by title, author, or topic
          </Text>
        </View>
      )}
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

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    height: 50,
    flex: 1,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111",
    paddingHorizontal: 15,
  },

  clearBtn: {
    padding: 8,
    marginRight: 5,
  },

  searchIcon: {
    marginHorizontal: 10,
  },

  searchContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  searchBtn: {
    backgroundColor: "#54408C",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  resultsContainer: {
    flex: 1,
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },

  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#EF5A56",
    textAlign: "center",
    marginHorizontal: 20,
  },

  retryBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#54408C",
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  noResultsText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
  },

  noResultsSubText: {
    marginTop: 8,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 30,
  },

  resultsCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
    fontWeight: "500",
  },

  booksGrid: {
    gap: 10,
    paddingBottom: 20,
  },

  bookItem: {
    flex: 1,
    maxWidth: "50%",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: "600",
    color: "#111",
  },

  emptySubText: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 40,
  },
});
