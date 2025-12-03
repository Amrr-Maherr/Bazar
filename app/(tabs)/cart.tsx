import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useFavoritesStore } from '@/store/favoritesStore';
import BookCard from '@/components/Books/BookCard';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Bookmarks() {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const router = useRouter();

  const bookmarks = favorites;

  const handleRemoveBookmark = (bookId: number) => {
    Alert.alert(
      'Remove Bookmark',
      'Are you sure you want to remove this book from bookmarks?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromFavorites(bookId),
        },
      ]
    );
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <View style={styles.bookItem}>
      <BookCard book={item} />
      <Pressable
        style={styles.removeBtn}
        onPress={() => handleRemoveBookmark(item.id)}
      >
        <Ionicons name="bookmark" size={20} color="#EF5A56" />
      </Pressable>
    </View>
  );

  if (bookmarks.length === 0) {
    return (
      <View style={styles.container}>
        <Ionicons name="bookmark-outline" size={80} color="#666" />
        <Text style={styles.header}>No Bookmarks Yet</Text>
        <Text style={styles.subtitle}>
          Favorite books to see them here
        </Text>
        <Pressable
          style={styles.browseBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.browseBtnText}>Browse Books</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        My Bookmarks ({bookmarks.length})
      </Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBookItem}
        numColumns={2}
        contentContainerStyle={styles.booksGrid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  browseBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    paddingTop: 10,
  },
  booksGrid: {
    gap: 10,
    paddingBottom: 20,
  },
  bookItem: {
    flex: 1,
    maxWidth: '50%',
    position: 'relative',
  },
  removeBtn: {
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
