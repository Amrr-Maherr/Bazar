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

export default function Terms() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Terms of Service',
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
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.lastUpdate}>Effective Date: January 2025</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using Bazar, you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to abide by the above,
            please do not use this service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Use License</Text>
          <Text style={styles.text}>
            Permission is granted to temporarily use Bazar for personal, non-commercial transitory
            viewing only. This is the grant of a license, not a transfer of title, and under this license:
          </Text>
          <Text style={styles.bullet}>• You may not modify or copy any content from the app</Text>
          <Text style={styles.bullet}>• You may not use the app for any commercial purpose</Text>
          <Text style={styles.bullet}>• You may not attempt to decompile or reverse engineer the app</Text>
          <Text style={styles.bullet}>• You may not remove any copyright or other proprietary notations</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content and Copyright</Text>
          <Text style={styles.text}>
            All content provided through Bazar is sourced from Project Gutenberg.
            All books are in the public domain and free to use. Bazar does not claim
            ownership of any book content or materials provided through our service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Responsibilities</Text>
          <Text style={styles.text}>
            By using our service, you agree to:
          </Text>
          <Text style={styles.bullet}>• Provide accurate and complete registration information</Text>
          <Text style={styles.bullet}>• Maintain the security of your password and account</Text>
          <Text style={styles.bullet}>• Accept responsibility for all activities under your account</Text>
          <Text style={styles.bullet}>• Not use the service for any illegal or unauthorized purpose</Text>
          <Text style={styles.bullet}>• Respect copyright laws and author rights where applicable</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Termination</Text>
          <Text style={styles.text}>
            We reserve the right to terminate or suspend access to our service immediately,
            without prior notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.text}>
            In no event shall Bazar or its developers be liable for any damages (including,
            without limitation, damages for loss of data or profit, or due to business interruption)
            arising out of the use or inability to use the mobile application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Changes to Terms</Text>
          <Text style={styles.text}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
            If a revision is material, we will try to provide at least 30 days notice prior to
            any new terms taking effect.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Questions About Terms?</Text>
          <Text style={styles.text}>
            If you have any questions about these Terms of Service, please contact us at:
          </Text>
          <Text style={styles.contactEmail}>legal@bazar.app</Text>
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
