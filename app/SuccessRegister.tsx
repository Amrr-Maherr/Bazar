import { View, Text, StyleSheet, Pressable,Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SuccessRegister() {
  const router = useRouter();

  return (
    <View style={style.container}>
      {/* Check Icon */}
      <View style={style.iconWrapper}>
        <Image style={{width:"100%",height:"100%",objectFit:"contain"}} source={require("../assets/images/Group.png")}/>
      </View>

      {/* Header */}
      <Text style={style.title}>Account Created 🎉</Text>
      <Text style={style.description}>
        Your account has been created successfully.
      </Text>

      {/* Button */}
      <Pressable style={style.loginBtn} onPress={() => router.push("/Login")}>
        <Text style={style.loginText}>Continue to Login</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },

  iconWrapper: {
    width:160,
    height:91,
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },

  loginBtn: {
    height: 48,
    width: "100%",
    borderRadius: 48,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
