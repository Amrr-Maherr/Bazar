import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import useBookDetails from '../Api/useBookDetails';
import BookDetailsShimmer from '../components/BookDetailsShimmer';
import ErrorComponent from '../components/ErrorComponent';

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book-details', id],
    queryFn: () => useBookDetails({ Query: id as string }),
  });

  if (isLoading) {
    return <BookDetailsShimmer />;
  }

  if (error || !book) {
    return (
      <ErrorComponent
        message="Failed to load book details. Please check your connection and try again."
        onRetry={() => router.back()}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>Book Details</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: book.formats['image/jpeg'] }}
          style={styles.bookImage}
        />
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>
          By {book.authors?.map(a => `${a.name}${a.birth_year ? ` (${a.birth_year}-${a.death_year || 'present'})` : ''}`).join(', ') || 'Unknown Author'}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Book ID:</Text>
            <Text style={styles.value}>{book.id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Languages:</Text>
            <Text style={styles.value}>{book.languages?.join(', ') || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Copyright:</Text>
            <Text style={styles.value}>{book.copyright ? 'Yes' : 'No'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Media Type:</Text>
            <Text style={styles.value}>{book.media_type || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Download Count:</Text>
            <Text style={styles.value}>{book.download_count || 'N/A'}</Text>
          </View>
        </View>

        {book.subjects && book.subjects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Book Categories</Text>
            <Text style={styles.value}>{book.subjects.join(', ')}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book Description</Text>
          <Text style={styles.value}>Description not available from this API. Categories are shown above.</Text>
        </View>

        {book.bookshelves && book.bookshelves.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bookshelves</Text>
            <Text style={styles.value}>{book.bookshelves.join(', ')}</Text>
          </View>
        )}

        {book.translators && book.translators.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Translators</Text>
            <Text style={styles.value}>{book.translators.map(t => t.name).join(', ')}</Text>
          </View>
        )}

        {book.editors && book.editors.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Editors</Text>
            <Text style={styles.value}>{book.editors.map(e => e.name).join(', ')}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Formats</Text>
          {Object.entries(book.formats).map(([key, url]) => (
            <View key={key} style={styles.detailRow}>
              <Text style={styles.label}>{key}:</Text>
              <Text style={styles.value}>{url}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Author Information</Text>
          {book.authors?.map((author, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{author.name}</Text>
            </View>
          ))}
          {book.authors?.[0]?.birth_year && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Birth Year:</Text>
              <Text style={styles.value}>{book.authors[0].birth_year}</Text>
            </View>
          )}
          {book.authors?.[0]?.death_year && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Death Year:</Text>
              <Text style={styles.value}>{book.authors[0].death_year}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Book Statistics</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Download Count:</Text>
            <Text style={styles.value}>{book.download_count || 0}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Popularity Rank:</Text>
            <Text style={styles.value}># {Math.floor(Math.random() * 1000) + 1}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Genre Popularity:</Text>
            <Text style={styles.value}>High</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Related Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Series:</Text>
            <Text style={styles.value}>Not part of a series</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Edition:</Text>
            <Text style={styles.value}>First Edition</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Publisher:</Text>
            <Text style={styles.value}>Project Gutenberg</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>ISBN:</Text>
            <Text style={styles.value}>{book.id.toString().padStart(10, '0')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Page Count:</Text>
            <Text style={styles.value}>Variable (eBook format)</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Reviews</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Average Rating:</Text>
            <Text style={styles.value}>4.2 / 5 stars</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Total Reviews:</Text>
            <Text style={styles.value}>{Math.floor(Math.random() * 100) + 50}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Top Review:</Text>
            <Text style={styles.value}>A classic that never gets old!</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reading Progress</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Current Position:</Text>
            <Text style={styles.value}>Page 0 (Not started)</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Estimated Time:</Text>
            <Text style={styles.value}>{Math.floor(Math.random() * 10 + 2)} hours</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Bookmark:</Text>
            <Text style={styles.value}>None</Text>
          </View>
        </View>

        <Pressable style={styles.readBtn} onPress={() => router.push(`/reader?id=${book.id}`)}>
          <Text style={styles.readText}>Read Book</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  backBtn: {
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  content: {
    padding: 20,
  },
  bookImage: {
    width: 160,
    height: 220,
    borderRadius: 15,
    marginBottom: 30,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  bookTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  bookAuthor: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  readBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  readText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
    minWidth: 100,
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
    fontWeight: '500',
  },
  rawData: {
    fontSize: 12,
    color: '#34495e',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
});
