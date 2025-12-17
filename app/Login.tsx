import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { signIn } from "../Api/auth";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const user = await signIn(data.email, data.password);
      console.log('User logged in:', user);
      // Optionally store user data
      const UserData = JSON.stringify({ email: user.email, uid: user.uid });
      await AsyncStorage.setItem("UserData", UserData);
      router.push("/(tabs)");
    } catch (error: any) {
      Alert.alert('Login Error', error.message);
    }
  };
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
            <Text style={style.description}>Sign in to your account</Text>
          </View>

          {/* Email */}

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={style.inputWrapper}>
                <Text style={style.label}>Email</Text>
                <TextInput
                  style={style.input}
                  placeholder="Your email"
                  placeholderTextColor="#777"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
          />
          {errors.email && (
            <Text style={style.error}>{errors.email.message}</Text>
          )}

          {/* Password */}
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={style.inputWrapper}>
                <Text style={style.label}>Password</Text>
                <View style={style.passwordWrapper}>
                  <TextInput
                    style={[style.input, { flex: 1 }]}
                    placeholder="Your password"
                    placeholderTextColor="#777"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
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
            )}
          />
          {errors.password && (
            <Text style={style.error}>{errors.password.message}</Text>
          )}

          {/* Forgot Password */}
          <Pressable
            style={style.forgotWrapper}
            onPress={() => router.push("/ForgotPassword")}
          >
            <Text style={style.forgotText}>Forgot password?</Text>
          </Pressable>

          {/* Create Account */}
          <View style={style.createWrapper}>
            <Text style={style.smallText}>Don't have an account? </Text>
            <Pressable onPress={() => router.push("/SignUp")}>
              <Text style={style.createText}>Create Account</Text>
            </Pressable>
          </View>

          {/* Login Button */}
          <Pressable style={style.loginBtn} onPress={handleSubmit(onSubmit)}>
            <Text style={style.loginText}>Login</Text>
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
    // paddingHorizontal: 10,
  },

  error: {
    color: "red",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 6,
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
    elevation: 5,
  },

  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});
