import { BooksResponse } from "@/Data/Books";
import React from "react";
import { View, FlatList } from "react-native";
import BookCard from "./BookCard";

type BooksListProps = {
  Books: BooksResponse;
};

export default function BooksList({ Books }: BooksListProps) {
  return (
    <View>
      {/* <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data?.results}
        keyExtractor={(book) => book.id.toString()}
        renderItem={({ item }) => <BookCard book={item} />}
      /> */}
    </View>
  );
}
