import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useFavoritesStore } from '@/store/favoritesStore';
import BookCard from '@/components/Books/BookCard';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavoritesStore();
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'My Favorites',
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
  }, [navigation]);

  const handleRemoveFavorite = (bookId: number) => {
    Alert.alert(
      'Remove from Favorites',
      'Are you sure you want to remove this book from favorites?',
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
        onPress={() => handleRemoveFavorite(item.id)}
      >
        <AntDesign name="heart" size={20} color="#EF5A56" />
      </Pressable>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <AntDesign name="heart" size={80} color="#ccc" />
        <Text style={styles.emptyTitle}>No Favorite Books Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start adding books to your favorites and they'll appear here
        </Text>
        <Pressable
          style={styles.exploreBtn}
          onPress={() => router.push('/Search')}
        >
          <Text style={styles.exploreBtnText}>Explore Books</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
      </Text>
      <FlatList
        data={favorites}
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
  headerText: {
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
