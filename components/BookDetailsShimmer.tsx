import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function BookDetailsShimmer() {
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
      {/* Header */}
      <View style={styles.header}>
        <Animated.View style={[styles.backBtn, animatedStyle]} />
        <Animated.View style={[styles.headerTitle, animatedStyle]} />
      </View>

      <View style={styles.content}>
        {/* Image */}
        <Animated.View style={[styles.imagePlaceholder, animatedStyle]} />

        {/* Title */}
        <Animated.View style={[styles.titlePlaceholder, animatedStyle]} />
        <Animated.View style={[styles.authorPlaceholder, animatedStyle]} />

        {/* Sections */}
        <View style={styles.section}>
          <Animated.View style={[styles.sectionTitlePlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
        </View>

        <View style={styles.section}>
          <Animated.View style={[styles.sectionTitlePlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
        </View>

        <View style={styles.section}>
          <Animated.View style={[styles.sectionTitlePlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
          <Animated.View style={[styles.detailPlaceholder, animatedStyle]} />
        </View>

        {/* Button */}
        <Animated.View style={[styles.buttonPlaceholder, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 20,
  },
  headerTitle: {
    height: 24,
    width: 150,
    borderRadius: 8,
  },
  content: {
    padding: 20,
  },
  imagePlaceholder: {
    width: 160,
    height: 220,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 30,
  },
  titlePlaceholder: {
    height: 30,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  authorPlaceholder: {
    height: 20,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitlePlaceholder: {
    height: 20,
    width: '40%',
    borderRadius: 8,
    marginBottom: 12,
  },
  detailPlaceholder: {
    height: 16,
    width: '80%',
    borderRadius: 8,
    marginBottom: 8,
  },
  buttonPlaceholder: {
    height: 50,
    width: 150,
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 30,
  },
});
