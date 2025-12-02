import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function OTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputs = Array(6).fill(0);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = `otpInput${index + 1}`;
      // Focus logic would be implemented with proper refs
    }
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
            <Text style={style.title}>Verify Code 📱</Text>
            <Text style={style.description}>
              Enter the 6-digit code sent to your email
            </Text>
          </View>

          {/* OTP Inputs */}
          <View style={style.otpContainer}>
            {otpInputs.map((_, index) => (
              <TextInput
                key={index}
                style={style.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={otp[index]}
                onChangeText={(value) => handleOtpChange(value, index)}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend Code */}
          <View style={style.resendWrapper}>
            <Text style={style.resendText}>Didn't receive code? </Text>
            <Pressable>
              <Text style={style.resendLink}>Resend</Text>
            </Pressable>
          </View>

          {/* Verify Button */}
          <Pressable style={style.loginBtn}>
            <Text style={style.loginText}>Verify Code</Text>
          </Pressable>

          {/* Back To Login */}
          <View style={style.createWrapper}>
            <Text style={style.smallText}>Wrong email? </Text>
            <Pressable onPress={() => router.push("/Login")}>
              <Text style={style.createText}>Change Email</Text>
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

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  otpInput: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#FAFAFA",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  resendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  resendText: {
    fontSize: 14,
    color: "#555",
  },

  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#54408C",
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

  /* Verify Button */
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
