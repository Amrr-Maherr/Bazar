import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import useBookDetails from '../Api/useBookDetails';
import { AntDesign } from '@expo/vector-icons';

export default function ReaderScreen() {
    const { id } = useLocalSearchParams();

  const router = useRouter();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book-details', id],
    queryFn: () => useBookDetails({ Query: id as string }),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color="#000" />
          </Pressable>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#54408C" />
        </View>
      </View>
    );
  }

  if (error || !book) {
    Alert.alert('Error', 'Failed to load book', [
      { text: 'OK', onPress: () => router.back() },
    ]);
    return null;
  }

  // Find the best format to display
  let readerUrl = null;

  // Prefer HTML format
  if (book.formats['text/html; charset=utf-8']) {
    readerUrl = book.formats['text/html; charset=utf-8'];
  } else if (book.formats['text/html']) {
    readerUrl = book.formats['text/html'];
  }
  // Alternatively, plain text or epub could be handled differently

  if (!readerUrl) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color="#000" />
          </Pressable>
          <Text style={styles.title}>Reader</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            No readable format available for this book.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.title}>{book.title.length > 30 ? `${book.title.substring(0, 30)}...` : book.title}</Text>
      </View>
      <WebView
        source={{ uri: readerUrl }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#54408C" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          Alert.alert('Error', 'Failed to load the book content');
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
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
    padding: 16,
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
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121212',
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
