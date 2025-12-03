import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Linking,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

export default function About() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'About',
      headerShown: true,
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const openGitHub = () => {
    Linking.openURL('https://github.com/Amrr-Maherr/Bazar');
  };

  const openWebsite = () => {
    Linking.openURL('https://bazar.app');
  };

  const sendEmail = () => {
    Linking.openURL('mailto:support@bazar.app');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>📚</Text>
          </View>
          <Text style={styles.appName}>Bazar</Text>
          <Text style={styles.appTagline}>Your Digital Library</Text>
        </View>

        {/* Version Info */}
        <View style={styles.infoCard}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.buildNumber}>Build 2025.01</Text>
          <Text style={styles.description}>
            Bazar is your ultimate digital library companion, providing access to thousands of free books
            from Project Gutenberg with an intuitive and beautiful interface.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Features</Text>

          <View style={styles.feature}>
            <Ionicons name="book-outline" size={24} color="#54408C" />
            <Text style={styles.featureText}>Access to 70,000+ free books</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="bookmark-outline" size={24} color="#54408C" />
            <Text style={styles.featureText}>Personal bookmarks & favorites</Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="search" size={24} color="#54408C" />
            <Text style={styles.featureText}>Smart search & discovery</Text>
          </View>

          <View style={styles.feature}>
            <FontAwesome name="moon-o" size={24} color="#54408C" />
            <Text style={styles.featureText}>Multiple reading formats</Text>
          </View>
        </View>

        {/* Development Info */}
        <View style={styles.devCard}>
          <Text style={styles.sectionTitle}>Developed by</Text>
          <Text style={styles.devName}>Amrr Maherr</Text>
          <Text style={styles.devRole}>Mobile App Developer</Text>

          <View style={styles.devLinks}>
            <Pressable style={styles.linkBtn} onPress={openGitHub}>
              <AntDesign name="github" size={20} color="#333" />
              <Text style={styles.linkText}>GitHub</Text>
            </Pressable>

            <Pressable style={styles.linkBtn} onPress={sendEmail}>
              <Ionicons name="mail" size={20} color="#333" />
              <Text style={styles.linkText}>Email</Text>
            </Pressable>
          </View>
        </View>

        {/* Credits */}
        <View style={styles.creditsCard}>
          <Text style={styles.sectionTitle}>Special Thanks</Text>
          <Text style={styles.creditText}>
            • Project Gutenberg for providing free access to literature{'\n'}
            • React Native & Expo for the amazing development platform{'\n'}
            • The global community of book lovers
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#54408C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 8,
  },
  appTagline: {
    fontSize: 16,
    color: '#666',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  version: {
    fontSize: 18,
    fontWeight: '600',
    color: '#54408C',
    marginBottom: 4,
  },
  buildNumber: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 12,
    flex: 1,
  },
  devCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  devName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 4,
  },
  devRole: {
    fontSize: 15,
    color: '#666',
    marginBottom: 16,
  },
  devLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },
  linkText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  creditsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    elevation: 2,
  },
  creditText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  bottomSpace: {
    height: 20,
  },
});
