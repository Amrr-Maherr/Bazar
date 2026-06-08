import { useLocalSearchParams } from "expo-router";

import { CategoryBooksScreen } from "@/features/books/screens/category-books-screen";

export default function CategoryBooksRoute() {
  const { name } = useLocalSearchParams<{ name: string }>();

  if (!name) return null;

  return <CategoryBooksScreen categoryName={name} />;
}
