import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";


export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Navigate directly to Reset Password screen with email parameter
    router.push({
      pathname: "/ResetPassword",
      params: { email: email }
    });
  };

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
            <Text style={style.title}>Forgot Password 🔐</Text>
            <Text style={style.description}>
              Enter your email to reset your password
            </Text>
          </View>

          {/* Email Input */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>Email</Text>
            <TextInput
              style={style.input}
              placeholder="Enter your email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Reset Button */}
          <Pressable
            style={({ pressed }) => [style.loginBtn, loading && style.disabledBtn, pressed && !loading && { opacity: 0.8 }]}
            onPress={handleResetPassword}
            disabled={loading}
          >
            <Text style={style.loginText}>
              {loading ? "Sending..." : "Reset Password"}
            </Text>
          </Pressable>

          {/* Back To Login */}
          <View style={style.createWrapper}>
            <Text style={style.smallText}>Remember the password? </Text>
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

  createWrapper: {
    flexDirection: "row",
    alignItems: "center",
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

  loginBtn: {
    height: 48,
    borderRadius: 48,
    backgroundColor: "#54408C",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
    elevation: 5,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  disabledBtn: {
    opacity: 0.6,
  },
});
