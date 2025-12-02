import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';

export default function HomeShimmer() {
  const fadeAnim = new Animated.Value(0.3);

  React.useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.3, duration: 500, useNativeDriver: true }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const animatedStyle = {
    opacity: fadeAnim,
    backgroundColor: '#e0e0e0',
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <Animated.View style={[styles.bannerPlaceholder, animatedStyle]} />

      {/* BooksList sections */}
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <View key={item} style={styles.section}>
          <Animated.View style={[styles.titlePlaceholder, animatedStyle]} />
          <View style={styles.booksRow}>
            {[1, 2, 3, 4, 5, 6].map((book) => (
              <Animated.View key={book} style={[styles.bookCardPlaceholder, animatedStyle]} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  bannerPlaceholder: {
    height: 200,
    margin: 20,
    borderRadius: 12,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  titlePlaceholder: {
    height: 20,
    width: 150,
    borderRadius: 4,
    marginBottom: 10,
  },
  booksRow: {
    flexDirection: 'row',
    gap: 10,
  },
  bookCardPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
