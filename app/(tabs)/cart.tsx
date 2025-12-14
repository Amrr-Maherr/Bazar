import React, { useLayoutEffect } from "react";
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
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';

export default function Bookmarks() {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const router = useRouter();
  const navigation = useNavigation();

  const bookmarks = favorites;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `My Bookmarks (${bookmarks.length})`,
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [bookmarks]);
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
      <View style={styles.emptyContainer}>
        <Ionicons name="bookmark-outline" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start adding books to your bookmarks and they'll appear here
        </Text>
        <Pressable
          style={styles.exploreBtn}
          onPress={() => router.push('/')}
        >
          <Text style={styles.exploreBtnText}>Explore Books</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#121212',
    marginBottom: 16,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#121212',
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreBtn: {
    backgroundColor: '#54408C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
