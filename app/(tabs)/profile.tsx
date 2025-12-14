import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("UserData");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadUserData();
  }, []);

  const name = userData.name || "Amr Maher";
  const email = userData.email || "amrr.maherr24@gmail.com";

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <Pressable
          style={styles.optionBtn}
          onPress={() => router.push('/EditProfile')}
        >
          <Text style={styles.optionText}>Edit Profile</Text>
        </Pressable>

        <Pressable
          style={styles.optionBtn}
          onPress={() => router.push('/Notifications')}
        >
          <Text style={styles.optionText}>Notifications</Text>
        </Pressable>

        <Pressable style={styles.optionBtn}>
          <Text style={styles.optionText}>My Orders</Text>
        </Pressable>

        <Pressable style={styles.optionBtn} onPress={() => router.push('/Favorites')}>
          <Text style={styles.optionText}>Favorites</Text>
        </Pressable>

        <Pressable style={styles.optionBtn} onPress={() => router.push('/Settings')}>
          <Text style={styles.optionText}>Settings</Text>
        </Pressable>

        <Pressable style={[styles.optionBtn, styles.logoutBtn]}>
          <Text style={[styles.optionText, { color: "#fff" }]}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  userInfo: {
    alignItems: "center",
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },

  options: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  optionBtn: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontSize: 16,
    color: "#111",
  },

  logoutBtn: {
    backgroundColor: "#54408C",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
});
