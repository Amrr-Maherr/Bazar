import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
  Share,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import useBookDetails from "../Api/useBookDetails";
import BookDetailsShimmer from "../components/BookDetailsShimmer";
import ErrorComponent from "../components/ErrorComponent";
import AudioReader from "@/components/AudioReader";
import { useFavoritesStore } from "@/store/favoritesStore";

export default function BookDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("summary");
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesStore();

  const {
    data: book,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["book-details", id],
    queryFn: () => useBookDetails({ Query: String(id) }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: book?.title
        ? book.title.length > 25
          ? `${book.title.substring(0, 25)}...`
          : book.title
        : "Book Details",
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation, book]);

  if (isLoading) return <BookDetailsShimmer />;

  if (error || !book) {
    return (
      <ErrorComponent
        message="Failed to load book details. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  // --------- SHARE BOOK ----------
  const shareBook = async () => {
    try {
      await Share.share({
        message: `Check this book: ${book.title}\n${book.formats["text/html"]}`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* -------- BOOK IMAGE -------- */}
        <Image
          resizeMode="contain"
          source={{ uri: book.formats["image/jpeg"] }}
          style={styles.bookImage}
        />

        {/* -------- TITLE -------- */}
        <Text style={styles.bookTitle}>{book.title}</Text>
        {/* -------- AUTHORS -------- */}
        <View style={styles.authorContainer}>
          {book.authors?.map((author, index) => (
            <Pressable
              key={index}
              onPress={() =>
                router.push(
                  `/AuthorDetails?authorName=${encodeURIComponent(author.name)}`
                )
              }
            >
              <Text style={styles.authorLink}>
                {author.name}
                {index < (book.authors?.length || 0) - 1 ? ", " : ""}
              </Text>
            </Pressable>
          )) || <Text style={styles.author}>Unknown Author</Text>}
        </View>

        {/* -------- BUTTONS: SHARE + FAVORITE -------- */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn} onPress={shareBook}>
            <Feather name="share-2" size={22} color="#007AFF" />
            <Text style={styles.actionTxt}>Share</Text>
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => {
              if (isFavorite(book.id)) {
                removeFromFavorites(book.id);
              } else {
                addToFavorites(book);
              }
            }}
          >
            <MaterialIcons
              name={isFavorite(book.id) ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isFavorite(book.id) ? "red" : "#007AFF"}
            />
            <Text style={styles.actionTxt}>Bookmark</Text>
          </Pressable>
        </View>

        {/* -------- TABS -------- */}
        <View style={styles.tabsRow}>
          {["summary", "details", "download"].map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* -------- TAB CONTENT -------- */}
        {activeTab === "summary" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>
              {book.summaries?.[0] || "No summary available."}
            </Text>
            <AudioReader text={book.summaries?.[0] || ""} />
          </View>
        )}

        {activeTab === "details" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Language: </Text>
              {book.languages?.join(", ") || "Unknown"}
            </Text>

            <Text style={styles.detailItem}>
              <Text style={styles.detailLabel}>Download Count: </Text>
              {book.download_count}
            </Text>

            <Text style={styles.detailLabel}>Subjects:</Text>
            {book.subjects?.map((s, i) => (
              <Text key={i} style={styles.bullet}>
                • {s}
              </Text>
            ))}
          </View>
        )}

        {activeTab === "download" && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Download Options</Text>

            {Object.entries(book.formats).map(([format, link], i) => (
              <Pressable
                key={i}
                style={styles.downloadItem}
                onPress={() => router.push(link as never)}
              >
                <Text style={styles.downloadFormat}>{format}</Text>
                <AntDesign name="download" size={20} color="#007AFF" />
              </Pressable>
            ))}
          </View>
        )}

        {/* READ BUTTON */}
        <Pressable
          style={styles.readBtn}
          onPress={() => router.push(`/reader?id=${book.id}`)}
        >
          <Text style={styles.readText}>Read Book</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { padding: 20 },

  bookImage: {
    width: 230,
    height: 300,
    marginBottom: 25,
    alignSelf: "center",
    borderRadius: 8,
  },

  bookTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 6,
  },
  author: {
    fontSize: 16,
    color: "#6c7a89",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  authorLink: {
    fontSize: 16,
    color: "#54408C",
    fontStyle: "italic",
    textDecorationLine: "underline",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    marginBottom: 25,
  },
  actionBtn: {
    alignItems: "center",
  },
  actionTxt: {
    marginTop: 6,
    fontSize: 14,
    color: "#007AFF",
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e9ecef",
    padding: 8,
    borderRadius: 12,
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#54408C",
  },
  tabText: {
    fontSize: 14,
    color: "#6c7a89",
    fontWeight: "700",
  },
  tabTextActive: {
    color: "#fff",
  },

  tabContent: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 12,
    color: "#2c3e50",
  },

  paragraph: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },

  detailItem: {
    fontSize: 15,
    marginBottom: 6,
    color: "#333",
  },
  detailLabel: {
    fontWeight: "700",
    color: "#000",
  },
  bullet: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
    marginBottom: 4,
  },

  downloadItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  downloadFormat: {
    fontSize: 15,
    fontWeight: "600",
    color: "#54408C",
  },

  readBtn: {
    backgroundColor: "#54408C",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  readText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
