import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
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
