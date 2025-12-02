import { BookDetails } from "@/Data/Books";
import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import BookCard from "./BookCard";

type BooksListProps = {
  books?: BookDetails[];
  SectionTitle?:string
};

export default function BooksList({ books,SectionTitle }: BooksListProps) {
  return (
    <View>
      <View>
        <Text style={styles.sectionTitle}>{SectionTitle}</Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        // array or empty array
        data={books || []}
        keyExtractor={(book) => book.id.toString()}
        renderItem={({ item }) => <BookCard book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginVertical: 15,
    color: "#121212",
  },
});
