import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AuthorDetailsShimmer() {
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
    <View style={styles.container}>
      {/* Author Header */}
      <View style={styles.header}>
        <Animated.View style={[styles.headerIcon, animatedStyle]} />
        <Animated.View style={[styles.authorTitle, animatedStyle]} />
        <Animated.View style={[styles.bookCount, animatedStyle]} />
      </View>

      {/* Section Title */}
      <Animated.View style={[styles.sectionTitle, animatedStyle]} />

      {/* Books Grid */}
      <View style={styles.booksGrid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Animated.View key={index} style={[styles.bookPlaceholder, animatedStyle]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 12,
  },
  authorTitle: {
    height: 24,
    width: '70%',
    borderRadius: 8,
    marginBottom: 4,
  },
  bookCount: {
    height: 14,
    width: '50%',
    borderRadius: 8,
  },
  sectionTitle: {
    height: 18,
    width: '60%',
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 10,
  },
  bookPlaceholder: {
    width: (width - 50) / 2,
    height: 280,
    borderRadius: 12,
  },
});
