import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useBookSearch } from '@/Hooks/useBookSearch';
import BookCard from '@/components/Books/BookCard';
import { useFavoritesStore } from '@/store/favoritesStore';

export default function CategoryDetails() {
  const { categoryName } = useLocalSearchParams<{ categoryName: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  const { data: books, isLoading, isError, refetch } = useBookSearch(categoryName || '');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName || 'Category',
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
  }, [navigation, categoryName]);

  const toggleFavorite = (book: any) => {
    if (isFavorite(book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
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

  const filteredBooks = books?.filter((book: any) =>
    book.subjects?.some((subject: string) =>
      subject.toLowerCase().includes((categoryName || '').toLowerCase())
    )
  ) || [];

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading books in {categoryName}...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={48} color="#EF5A56" />
        <Text style={styles.errorText}>Failed to load category books</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="folder-open" size={32} color="#54408C" />
        <Text style={styles.categoryTitle}>{categoryName}</Text>
        <Text style={styles.bookCount}>
          {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} available
        </Text>
      </View>

      {filteredBooks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>No Books Found</Text>
          <Text style={styles.emptySubtitle}>
            We couldn't find books in the "{categoryName}" category.
          </Text>
          <Text style={styles.emptyHint}>
            Try searching in a different category or browse all books.
          </Text>
          <Pressable
            style={styles.browseBtn}
            onPress={() => router.push('/Search')}
          >
            <Text style={styles.browseBtnText}>Browse All Books</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Books in {categoryName}</Text>
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
  categoryTitle: {
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
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  browseBtn: {
    backgroundColor: '#54408C',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
