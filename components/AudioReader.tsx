import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

export default function AudioReader({ text }: { text: string }) {
  const [isReading, setIsReading] = useState(false);

  const handlePress = () => {
    if (isReading) {
      Speech.stop();
      setIsReading(false);
    } else {
      if (text) {
        setIsReading(true);
        Speech.speak(text, {
          language: "en",
          rate: 1.0,
          pitch: 1.2,
        });
      }
    }
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Pressable
        onPress={handlePress}
        style={{
          backgroundColor: "#54408C",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 25,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-start",
        }}
      >
        <Ionicons
          name={isReading ? "stop" : "play"}
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
        <Text style={{ color: "#fff", fontWeight: "600" }}>
          {isReading ? "Stop Reading" : "Start Reading"}
        </Text>
      </Pressable>
    </View>
  );
}
