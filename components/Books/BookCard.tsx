import { BookDetails } from "@/Data/Books";
import { Image, Pressable, Text, View,StyleSheet } from "react-native";

type BookCardProps = {
  book:BookDetails
};
export default function BookCard({ book }: BookCardProps) {
    const imageUrl =
      book.formats["image/jpeg"] || book.formats["image/png"] || undefined;
  return (
    <>
      
      <Pressable style={styles.card}>
        <View style={styles.container}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          <Text style={styles.title}>{book.title.slice(0,10)}...</Text>
          <Text style={styles.authors}>
            {book.authors.map((a) => a.name).join(", ")}
          </Text>
        </View>
      </Pressable>
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
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
});
