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
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ResetPassword() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (params.email) {
      setEmail(params.email as string);
    }
  }, [params.email]);

  const handleUpdatePassword = () => {
    if (!password.trim()) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    // In a real app, you would update the password in Firebase
    // For now, we'll just show success and redirect to login
    Alert.alert(
      "Success",
      "Password updated successfully!",
      [
        {
          text: "OK",
          onPress: () => router.replace("/Login"),
        },
      ]
    );
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
            <Text style={style.title}>Reset Password 🔒</Text>
            <Text style={style.description}>
              Create a new password for your account
            </Text>
          </View>

          {/* New Password */}
          <View style={style.inputWrapper}>
            <Text style={style.label}>New Password</Text>
            <View style={style.passwordWrapper}>
              <TextInput
                style={[style.input, { flex: 1 }]}
                placeholder="Enter new password"
                placeholderTextColor="#777"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={style.eyeBtn}
              >
                <AntDesign
                  name={showPassword ? "eye" : "eye"}
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
                placeholder="Re-enter new password"
                placeholderTextColor="#777"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <Pressable
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={style.eyeBtn}
              >
                <AntDesign
                  name={showConfirmPassword ? "eye" : "eye"}
                  size={20}
                  color="#777"
                />
              </Pressable>
            </View>
          </View>

          {/* Reset Button */}
          <Pressable style={style.loginBtn} onPress={handleUpdatePassword}>
            <Text style={style.loginText}>Update Password</Text>
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
    marginTop: 25,
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

  /* Reset Button */
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
