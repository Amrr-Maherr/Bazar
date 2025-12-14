import { BookDetails } from "@/Data/Books";
import { Image, Pressable, Text, View, StyleSheet, Alert, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFavoritesStore } from "@/store/favoritesStore";

const { width: screenWidth } = Dimensions.get('window');

type BookCardProps = {
  book: BookDetails
};
export default function BookCard({ book }: BookCardProps) {
    const router = useRouter();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();
    const imageUrl =
      book.formats["image/jpeg"] || book.formats["image/png"] || undefined;

    const toggleFavorite = () => {
      if (isFavorite(book.id)) {
        removeFromFavorites(book.id);
        Alert.alert('Removed from Favorites', `${book.title} removed from favorites`);
      } else {
        addToFavorites(book);
        Alert.alert('Added to Favorites', `${book.title} added to favorites`);
      }
    };

  return (
    <>
      <View style={styles.card}>
        <Pressable
          style={styles.container}
          onPress={() => router.push(`/book-details?id=${book.id}`)}
        >
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{book.title.slice(0,10)}...</Text>
          <Text style={styles.authors} numberOfLines={1} ellipsizeMode="tail">
            {book.authors.map((a) => a.name).join(", ")}
          </Text>
        </Pressable>
        <Pressable style={styles.favoriteBtn} onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite(book.id) ? "bookmark" : "bookmark-outline"}
            size={20}
            color={isFavorite(book.id) ? "#EF5A56" : "#666"}
          />
        </Pressable>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    width: (screenWidth - 80) / 2,
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
    position: 'relative',
  },
  container: {
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 5,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  authors: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
});
