import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
    Image,
KeyboardAvoidingView,
    ScrollView,
  Platform
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
     const router = useRouter();
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <View style={style.container}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Back Button */}
            <View style={style.backWrapper}>
              <Pressable style={style.backBtn} onPress={() => router.back()}>
                <AntDesign name="arrow-left" size={22} color="#000" />
              </Pressable>
            </View>

            {/* Header */}
            <View style={style.header}>
              <Text style={style.title}>Welcome Back 👋</Text>
              <Text style={style.description}>Sign to your account</Text>
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

            {/* Forgot Password */}
            <Pressable style={style.forgotWrapper}>
              <Text style={style.forgotText}>Forgot password?</Text>
            </Pressable>

            {/* Create Account */}
            <View style={style.createWrapper}>
              <Text style={style.smallText}>Don’t have an account? </Text>
              <Pressable onPress={() => router.push("/SignUp")}>
                <Text style={style.createText}>Create Account</Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Pressable style={style.loginBtn}>
              <Text style={style.loginText}>Login</Text>
            </Pressable>

            {/* Divider: Or Continue With */}
            <View style={style.dividerWrapper}>
              <View style={style.line} />
              <Text style={style.dividerText}>Or continue with</Text>
              <View style={style.line} />
            </View>

            {/* Google Button */}
            <Pressable style={style.googleBtn}>
              <Image
                source={require("../assets/images/Google_icon.png")}
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              <Text style={style.socialText}>Continue with Google</Text>
            </Pressable>

            {/* Apple Button */}
            <Pressable style={style.appleBtn}>
              <FontAwesome
                name="apple"
                size={22}
                color="black"
                style={style.icon}
              />
              <Text style={[style.socialText, { color: "black" }]}>
                Continue with Apple
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 60,
    backgroundColor: "#fff",
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

  forgotWrapper: {
    alignItems: "flex-start",
    marginBottom: 25,
  },

  forgotText: {
    color: "#54408C",
    fontSize: 14,
    fontWeight: "500",
  },

  createWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
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

  /* Login Button */
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

  /* Divider */
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#777",
    fontSize: 14,
  },

  googleBtn: {
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  appleBtn: {
    height: 48,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    marginRight: 10,
  },

  socialText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
});
