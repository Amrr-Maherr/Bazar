import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { fontFamilies, fontWeights } from "@/constants/typography";

type Props = {
  coverUrl: string | null;
  title: string;
};

export function BookCover({ coverUrl, title }: Props) {
  return (
    <View style={styles.heroSection}>
      <View style={[styles.heroGradient, { backgroundColor: colors.purple[600] }]}>
        <View style={styles.heroOverlay} />
      </View>
      <View style={styles.coverContainer}>
        {coverUrl ? (
          <Image
            source={{ uri: coverUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholderCover, { backgroundColor: colors.purple[200] }]}>
            <Text style={styles.placeholderText}>
              {title.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    height: 300,
    position: "relative",
  },
  heroGradient: {
    ...StyleSheet.absoluteFill,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  coverContainer: {
    position: "absolute",
    bottom: -40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  coverImage: {
    width: 140,
    height: 210,
    borderRadius: 16,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  placeholderCover: {
    width: 140,
    height: 210,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies["roboto-bold"],
    color: "#FFFFFF",
  },
});
