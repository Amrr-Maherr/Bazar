import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import * as Speech from "expo-speech";

export default function AudioReader({ text }: { text: string }) {
  const [isReading, setIsReading] = useState(false);

  const startReading = () => {
    if (text) {
      setIsReading(true);
      Speech.speak(text, {
        language: "en",
        rate: 1.0,
        pitch: 1.2,
      });
    }
  };

  const stopReading = () => {
    Speech.stop();
    setIsReading(false);
  };
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <Pressable
          onPress={startReading}
          style={{
            backgroundColor: "#54408C",
            padding: 15,
            borderRadius: 30,
            display: isReading ? "none" : "flex",
          }}
        >
          <Text style={{ color: "#fff" }}>Start Reading</Text>
        </Pressable>

        <Pressable
          onPress={stopReading}
          style={{
            backgroundColor: "#FF3B30",
            padding: 15,
            borderRadius: 10,
            display: isReading ? "flex" : "none",
          }}
        >
          <Text style={{ color: "#fff" }}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}
