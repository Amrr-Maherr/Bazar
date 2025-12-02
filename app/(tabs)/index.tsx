import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, StyleSheet,View,FlatList,Text,ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useBooks } from "@/Hooks/useGetBooks";
import BookCard from "@/components/Books/BookCard";
import BooksList from "@/components/Books/BooksList";
import Banner from "@/components/Books/Banner";
import HomeShimmer from "@/components/HomeShimmer";

export default function TabOneScreen() {
  const { isError, isLoading, data } = useBooks();
  console.log(isError, "isError");
  console.log(isLoading, "isLoading");
  console.log(data, "data");

  const navigation = useNavigation();
  const Router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
      headerTitleAlign: "center",
      headerRight: () => (
        <Pressable
          onPress={() => Router.push("/Notification")}
          style={styles.headerRight}
        >
          <View style={styles.outerDot}>
            <View style={styles.innerDot} />
          </View>
          <Ionicons name="notifications" size={24} color="#121212" />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable
          onPress={() => Router.push("/Search")}
          style={styles.headerLeft}
        >
          <Ionicons name="search" size={24} color="#121212" />
        </Pressable>
      ),
      headerTintColor: "#121212",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    });
  }, [navigation]);

  if (isLoading) {
    return <HomeShimmer />;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Banner featuredProducts={data?.results.slice(0, 5)} />
      <BooksList
        books={data?.results.slice(0, 10)}
        SectionTitle="New Arrivals"
      />
      <BooksList
        books={data?.results.slice(10, 15)}
        SectionTitle="Best Sellers"
      />
      <BooksList books={data?.results.slice(15, 20)} SectionTitle="Top Rated" />
      <Banner featuredProducts={data?.results.slice(10, 25)} />
      <BooksList
        books={data?.results.slice(20, 25)}
        SectionTitle="Recommended for You"
      />
      <BooksList
        books={data?.results.slice(25, 30)}
        SectionTitle="Trending Now"
      />
      <BooksList
        books={data?.results.slice(30, 35)}
        SectionTitle="Award Winners"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  headerRight: {
    marginRight: 15,
  },
  headerLeft: {
    marginLeft: 15,
  },
  outerDot: {
    position: "absolute",
    width: 15,
    height: 15,
    backgroundColor: "#fff",
    borderRadius: 999,
    right: 0,
    top: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  innerDot: {
    width: 10,
    height: 10,
    backgroundColor: "#EF5A56",
    borderRadius: 999,
  },
});
