import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
     const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={style.container}>
          {/* Back Button */}
          <View style={style.backWrapper}>
            <Pressable style={style.backBtn} onPress={() => router.back()}>
              <AntDesign name="arrow-left" size={22} color="#000" />
            </Pressable>
          </View>

          {/* Header */}
          <View style={style.header}>
            <Text style={style.title}>Create Account 👋</Text>
            <Text style={style.description}>Sign up to get started</Text>
          </View>

          {/* Name */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>Name</Text>
            <TextInput style={style.input} placeholder="Your name" />
          </View>

          {/* Email */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>Email</Text>
            <TextInput style={style.input} placeholder="Your email" />
          </View>

          {/* Password */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>Password</Text>
            <View style={style.passwordWrapper}>
              <TextInput
                style={[style.input, { flex: 1 }]}
                placeholder="Your password"
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={style.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#777"
                />
              </Pressable>
            </View>
          </View>

          {/* Sign Up Button */}
          <Pressable style={style.loginBtn}>
            <Text style={style.loginText}>Sign Up</Text>
          </Pressable>

          {/* Already have account */}
          <View style={style.createWrapper}>
            <Text style={style.smallText}>Already have an account? </Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text style={style.createText}>Login</Text>
            </Pressable>
          </View>
        </View>
        <View style={style.bottomTextWrapper}>
          <Text style={style.smallText}>
            By clicking Register, you agree to our
          </Text>
          <Pressable>
            <Text style={style.createText}>Terms and Data Policy.</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },

  backWrapper: {
    marginBottom: 16,
  },

  backBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  header: {
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 6,
  },

  inputWrapper: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#121212",
  },

  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
  },

  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
  },

  eyeBtn: {
    padding: 5,
  },

  createWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  bottomTextWrapper: {
    alignItems: "center",
    padding: 20,
  },

  smallText: {
    fontSize: 14,
    color: "#555",
  },

  createText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#54408C",
  },

  loginBtn: {
    height: 48,
    borderRadius: 48,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
