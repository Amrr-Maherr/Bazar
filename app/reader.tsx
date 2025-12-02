import React, { useLayoutEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert, Text } from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import useBookDetails from "../Api/useBookDetails";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";

export default function ReaderScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const {
    data: book,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["book-details", id],
    queryFn: () => useBookDetails({ Query: id as string }),
    enabled:!!id
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerTitle: book?.title
        ? book.title.length > 30
          ? `${book.title.substring(0, 30)}...`
          : book.title
        : "Reader",

      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingRight: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation, book]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#54408C" />
      </View>
    );
  }

  if (error || !book) {
    Alert.alert("Error", "Failed to load book", [
      { text: "Retry ?", onPress: () => refetch },
    ]);
    return null;
  }

  let readerUrl =
    book.formats["text/html; charset=utf-8"] ||
    book.formats["text/html"] ||
    null;

  if (!readerUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No readable format available for this book.
        </Text>
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: readerUrl }}
      style={styles.webview}
      startInLoadingState
      renderLoading={() => (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#54408C" />
        </View>
      )}
      onError={() => {
        Alert.alert("Error", "Failed to load the book content");
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
