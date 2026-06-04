import { useLocalSearchParams } from "expo-router";

import { BookDetailsScreen } from "@/features/books/screens/book-details-screen";

export default function BookDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return null;

  return <BookDetailsScreen workId={id} />;
}
