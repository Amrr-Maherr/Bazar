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

export default function Privacy() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Privacy Policy',
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
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdate}>Last updated: January 2025</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.text}>
            Bazar collects minimal personal information necessary to provide our digital library services.
            This includes:
          </Text>
          <Text style={styles.bullet}>• Name and email for account creation</Text>
          <Text style={styles.bullet}>• Reading preferences and bookmarks</Text>
          <Text style={styles.bullet}>• App usage analytics (anonymous)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.text}>
            Your information is used solely to:
          </Text>
          <Text style={styles.bullet}>• Provide access to our library services</Text>
          <Text style={styles.bullet}>• Save your bookmarks and reading preferences</Text>
          <Text style={styles.bullet}>• Improve app performance and user experience</Text>
          <Text style={styles.bullet}>• Provide customer support when needed</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.text}>
            We employ industry-standard security measures to protect your personal information:
          </Text>
          <Text style={styles.bullet}>• Encrypted data storage and transmission</Text>
          <Text style={styles.bullet}>• Secure authentication methods</Text>
          <Text style={styles.bullet}>• Regular security audits and updates</Text>
          <Text style={styles.bullet}>• Limited data retention policies</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Third-Party Services</Text>
          <Text style={styles.text}>
            Bazar uses Project Gutenberg's API to provide book content. We do not share your
            personal information with third parties unless required by law or with your explicit consent.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.text}>
            You have the right to:
          </Text>
          <Text style={styles.bullet}>• Access your personal data</Text>
          <Text style={styles.bullet}>• Update or correct your information</Text>
          <Text style={styles.bullet}>• Request deletion of your data</Text>
          <Text style={styles.bullet}>• Opt out of marketing communications</Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.text}>
            If you have questions about our Privacy Policy, please contact us at:
          </Text>
          <Text style={styles.contactEmail}>privacy@bazar.app</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 8,
    textAlign: 'center',
  },
  lastUpdate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#54408C',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 12,
  },
  bullet: {
    fontSize: 15,
    color: '#666',
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: '#54408C',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  contactEmail: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
  bottomSpace: {
    height: 20,
  },
});
