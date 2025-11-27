import { SliderData } from "@/Data/Slider";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <Pressable
        style={styles.skipContainer}
        onPress={() => router.push("/Login")}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Carousel */}
      <Carousel
        loop
        width={width}
        height={550}
        autoPlay
        autoPlayInterval={4000}
        data={SliderData}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={item.Image}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.description}>{item.Description}</Text>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {SliderData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.buttonText}>
            {currentIndex !== 1 ? "Continue" : " Get Started"}
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  skipContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: { fontSize: 16, color: "#54408C", fontWeight: "600" },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: { width: 250, height: 350, marginBottom: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#121212",
  },
  description: { fontSize: 16, textAlign: "center", color: "#A6A6A6" },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 6,
    backgroundColor: "#E8E8E8",
    margin: 5,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#54408C",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  primaryButton: {
    backgroundColor: "#54408C",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#54408C",
  },
  secondaryButtonText: {
    color: "#54408C",
    fontSize: 16,
    fontWeight: "800",
  },
});
