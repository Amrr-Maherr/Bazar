import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { useLayoutEffect as useLE } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useBookSearch } from '@/Hooks/useBookSearch';
import BookCard from '@/components/Books/BookCard';
import AuthorDetailsShimmer from '@/components/AuthorDetailsShimmer';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function AuthorDetails() {
  const { authorName } = useLocalSearchParams<{ authorName: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  const { data: books, isLoading, isError, refetch } = useBookSearch(authorName || '');

  useLE(() => {
    navigation.setOptions({
      title: authorName || 'Author',
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
  }, [navigation, authorName]);

  const toggleFavorite = (book: any) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
      Alert.alert('Removed from Favorites', `${book.title} removed from favorites`);
    } else {
      addToFavorites(book);
      Alert.alert('Added to Favorites', `${book.title} added to favorites`);
    }
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <View style={styles.bookItem}>
      <BookCard book={item} />
      <Pressable
        style={styles.favoriteBtn}
        onPress={() => toggleFavorite(item)}
      >
        <Ionicons
          name={isFavorite(item.id) ? "heart" : "heart-outline"}
          size={24}
          color={isFavorite(item.id) ? "#EF5A56" : "#666"}
        />
      </Pressable>
    </View>
  );

  if (isLoading) {
    return <AuthorDetailsShimmer />;
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF5A56" />
        <Text style={styles.errorText}>Failed to load author books</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  const filteredBooks = books?.filter((book: any) =>
    book.authors?.some((author: any) =>
      author.name.toLowerCase().includes((authorName || '').toLowerCase())
    )
  ) || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person" size={32} color="#54408C" />
        <Text style={styles.bookCount}>
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} available
        </Text>
      </View>

      {filteredBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No Books Found</Text>
          <Text style={styles.emptySubtitle}>
            We couldn't find books by {authorName} in our collection.
          </Text>
          <Pressable
            style={styles.exploreBtn}
            onPress={() => router.push('/Search')}
          >
            <Text style={styles.exploreBtnText}>Search Other Books</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Books by {authorName}</Text>
          <FlatList
            data={filteredBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBookItem}
            numColumns={2}
            contentContainerStyle={styles.booksGrid}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#54408C',
  },
  errorText: {
    fontSize: 16,
    color: '#EF5A56',
    marginTop: 16,
    textAlign: 'center',
  },
  retryBtn: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#54408C',
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  authorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#121212',
    marginTop: 12,
    textAlign: 'center',
  },
  bookCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  booksGrid: {
    paddingHorizontal: 20,
    gap: 10,
    paddingBottom: 20,
  },
  bookItem: {
    flex: 1,
    maxWidth: '50%',
    position: 'relative',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
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
