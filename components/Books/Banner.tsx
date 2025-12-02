import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';



export default function Banner({ featuredProducts = [] }: { featuredProducts?: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = Dimensions.get('window');
  const router = useRouter();

  return (
    <Carousel
      loop
      width={width}
      height={200}
      autoPlay
      autoPlayInterval={4000}
      data={featuredProducts.slice(0, 5)}
      onSnapToItem={(index) => setCurrentIndex(index)}
      renderItem={({ item }) => (
        <View style={styles.bannerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.specialOfferText}>{item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title}</Text>
            <TouchableOpacity style={styles.orderButtonContainer} onPress={() => router.push(`/book-details?id=${item.id}`)}>
              <Text style={styles.orderButtonText}>Read Now</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: item.formats?.["image/jpeg"] }} style={styles.bannerImage} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    flexDirection: "row",
    backgroundColor: "#FAF9FD",
    borderRadius: 8,
    padding: 25,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  specialOfferText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 5,
  },
  discountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
    marginBottom: 10,
  },
  orderButtonContainer: {
    backgroundColor: "#54408C",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 40,
    marginTop: 10,
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerImage: {
    width: 99,
    height: 145,
    borderRadius: 10,
    overflow: "hidden",
    resizeMode: "contain",
  },
  productsList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
