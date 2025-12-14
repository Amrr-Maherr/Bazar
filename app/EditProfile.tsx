import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function EditProfile() {
  const navigation = useNavigation();

  // Form states - mock data only
  const [name, setName] = useState('Amr Maher');
  const [email, setEmail] = useState('amrr.maherr24@gmail.com');
  const [phone, setPhone] = useState('+20 123 456 7890');
  const [bio, setBio] = useState('Book lover and Digital Library enthusiast');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Profile',
      headerShown: true,
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 12 }}
        >
          <AntDesign name="arrow-left" size={24} color="#000" />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          onPress={handleSave}
          style={{ paddingHorizontal: 12 }}
        >
          <Ionicons name="checkmark" size={24} color="#54408C" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleSave = () => {
    Alert.alert(
      'Save Changes',
      'Are you sure you want to save these changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          style: 'default',
          onPress: () => {
            // TODO: Save profile API call
            Alert.alert('Success', 'Profile updated successfully!');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleAvatarChange = () => {
    Alert.alert(
      'Change Avatar',
      'Choose how to update your profile picture',
      [
        { text: 'Camera', onPress: () => Alert.alert('Camera', 'Camera option coming soon') },
        { text: 'Gallery', onPress: () => Alert.alert('Gallery', 'Gallery option coming soon') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=12" }}
              style={styles.avatar}
            />
            <Pressable
              style={styles.avatarEditBtn}
              onPress={handleAvatarChange}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </Pressable>
          </View>
          <Pressable
            style={styles.changePhotoBtn}
            onPress={handleAvatarChange}
          >
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Name Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#777"
              />
            </View>
          </View>

          {/* Email Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
                placeholderTextColor="#777"
              />
            </View>
          </View>

          {/* Phone Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="call" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
                placeholderTextColor="#777"
              />
            </View>
          </View>

          {/* Bio Field */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                maxLength={200}
                placeholder="Tell us a bit about yourself..."
                placeholderTextColor="#777"
              />
            </View>
            <Text style={styles.charCount}>{bio.length}/200</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <Pressable
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={styles.saveBtn}
            onPress={handleSave}
          >
            <Ionicons name="checkmark" size={20} color="#fff" />
            <Text style={styles.saveText}>Save Changes</Text>
          </Pressable>
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
    flex: 1,
    paddingHorizontal: 20,
  },

  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#54408C',
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#54408C',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  changePhotoBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 16,
    color: '#54408C',
    fontWeight: '600',
  },

  // Form Section
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  textArea: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },

  // Button Section
  buttonSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#54408C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#54408C',
  },
  saveBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#54408C',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  bottomSpace: {
    height: 20,
  },
});
