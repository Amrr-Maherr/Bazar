import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';

export default function Help() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Help & FAQ',
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Frequently Asked Questions</Text>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I add books to my bookmarks?</Text>
          <Text style={styles.answer}>
            Navigate to any book details page and tap the favorite/bookmark button at the bottom of the screen.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How can I read books?</Text>
          <Text style={styles.answer}>
            Tap on "Read Book" button in any book details page to start reading.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How do I reset my password?</Text>
          <Text style={styles.answer}>
            Go to Login → Forgot Password → Enter your email → Check OTP → Reset Password.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>Can I change app language?</Text>
          <Text style={styles.answer}>
            Language options will be available in Settings → Appearance section soon.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={styles.question}>How to change font size?</Text>
          <Text style={styles.answer}>
            Font size settings can be adjusted in Settings → Appearance → Font Size.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Still need help?</Text>
          <Text style={styles.contactText}>
            Contact our support team at support@bazar.app
          </Text>
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 30,
    textAlign: 'center',
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#54408C',
    marginBottom: 10,
  },
  answer: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  contactSection: {
    backgroundColor: '#54408C',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
