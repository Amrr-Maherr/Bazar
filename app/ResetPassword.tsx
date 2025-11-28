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

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            <Text style={style.title}>Reset Password 🔐</Text>
            <Text style={style.description}>Enter your new password below</Text>
          </View>

          {/* New Password */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>New Password</Text>
            <View style={style.passwordWrapper}>
              <TextInput
                style={[style.input, { flex: 1 }]}
                placeholder="Enter new password"
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

          {/* Confirm Password */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>Confirm Password</Text>
            <View style={style.passwordWrapper}>
              <TextInput
                style={[style.input, { flex: 1 }]}
                placeholder="Confirm password"
                secureTextEntry={!showConfirm}
              />
              <Pressable
                onPress={() => setShowConfirm(!showConfirm)}
                style={style.eyeBtn}
              >
                <Ionicons
                  name={showConfirm ? "eye-off" : "eye"}
                  size={20}
                  color="#777"
                />
              </Pressable>
            </View>
          </View>

          {/* Reset Button */}
          <Pressable style={style.loginBtn}>
            <Text style={style.loginText}>Update Password</Text>
          </Pressable>

          {/* Back to login */}
          <View style={style.createWrapper}>
            <Text style={style.smallText}>Back to </Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text style={style.createText}>Login</Text>
            </Pressable>
          </View>
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

  loginBtn: {
    height: 48,
    borderRadius: 48,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  createWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
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
});
