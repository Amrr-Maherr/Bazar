import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getCurrentUser } from "../Api/auth";

export default function Splash() {
  const Router = useRouter();
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Check Firebase auth state first
        const user = getCurrentUser();
        if (user) {
          // User is authenticated with Firebase, go to main app
          Router.replace("/(tabs)");
          return;
        }

        // Fallback to AsyncStorage check
        const UserData = await AsyncStorage.getItem("UserData");
        if (UserData) {
          Router.replace("/(tabs)");
        } else {
          setTimeout(() => {
            Router.replace("/Onboarding");
          }, 3000);
        }
      } catch (error) {
        // If there's any error, go to onboarding
        setTimeout(() => {
          Router.replace("/Onboarding");
        }, 3000);
      }
    };
    checkAuthState();
  }, []);
  return (
    <>
      <View style={style.container}>
        <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row-reverse",gap:10}}>
          <Text style={style.title}>Bazar.</Text>
          <Image
            style={style.logo}
            source={require("../assets/images/Logo.png")}
          />
        </View>
        <Text style={style.version}>Version 1.0.0</Text>
        <Image
          style={style.image}
          source={require("../assets/images/Logo.png")}
        />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 10,
    position: "relative",
  },
  logo: {
    width: 37.94,
    height: 37.94,
  },
  title: {
    fontSize: 31,
    fontWeight: "bold",
    color: "white",
  },
  version: {
    fontSize: 16,
    color: "#ffffffaa",
    marginTop: 5,
  },
  image: {
    position: "absolute",
    bottom: 0,
    left: -30,
    width: 316.61,
    height: 316.61,
    opacity: 0.2,
  },
});
