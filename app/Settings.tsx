import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

export default function Settings() {
  const navigation = useNavigation();
  const router = useRouter();

  // Settings state
  const [notifications, setNotifications] = useState(true);
  const [autoDownloads, setAutoDownloads] = useState(false);
  const [language, setLanguage] = useState('English');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
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

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will remove all cached data. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => Alert.alert('Cache Cleared', 'All cached data has been removed.'),
        },
      ]
    );
  };

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'This will reset all settings to default. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setNotifications(true);
            setAutoDownloads(false);
            setLanguage('English');
            Alert.alert('Settings Reset', 'All settings have been reset to default.');
          },
        },
      ]
    );
  };

  const SettingItem = ({
    title,
    subtitle,
    icon,
    rightElement,
    onPress,
    children
  }: {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    rightElement?: React.ReactNode;
    onPress?: () => void;
    children?: React.ReactNode;
  }) => (
    <Pressable
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        {icon}
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.settingSubtitle}>{subtitle}</Text>
          )}
          {children}
        </View>
      </View>
      {rightElement}
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem
          title="Edit Profile"
          subtitle="Update your personal information"
          icon={<Ionicons name="person" size={22} color="#54408C" />}
          onPress={() => Alert.alert('Coming Soon', 'Edit profile feature coming soon!')}
        />
        <SettingItem
          title="Change Password"
          subtitle="Update your security settings"
          icon={<Ionicons name="lock-closed" size={22} color="#54408C" />}
          onPress={() => Alert.alert('Coming Soon', 'Change password feature coming soon!')}
        />
      </View>

      {/* Appearance */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <SettingItem
          title="RTL Reading"
          subtitle="Enable right-to-left text for Arabic"
          icon={<Ionicons name="text" size={22} color="#54408C" />}
          rightElement={
            <Switch
              value={false}
              onValueChange={() => Alert.alert('RTL', 'RTL reading coming soon!')}
              trackColor={{ false: '#767577', true: '#54408C' }}
              thumbColor={'#f4f3f4'}
            />
          }
        />
        <SettingItem
          title="Font Size"
          subtitle={`Current: Normal`}
          icon={<Ionicons name="text" size={22} color="#54408C" />}
          onPress={() => {
            Alert.alert('Font Size', 'Font size options coming soon!');
          }}
        />
      </View>

      {/* Reading */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reading</Text>
        <SettingItem
          title="Auto Downloads"
          subtitle="Automatically download books for offline reading"
          icon={<Feather name="download" size={22} color="#54408C" />}
          rightElement={
            <Switch
              value={autoDownloads}
              onValueChange={setAutoDownloads}
              trackColor={{ false: '#767577', true: '#54408C' }}
              thumbColor={autoDownloads ? '#f4f3f4' : '#f4f3f4'}
            />
          }
        />

      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <SettingItem
          title="Push Notifications"
          subtitle="Receive notifications about new books and updates"
          icon={<Ionicons name="notifications" size={22} color="#54408C" />}
          rightElement={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#54408C' }}
              thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
            />
          }
        />
      </View>

      {/* Storage */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        <SettingItem
          title="Clear Cache"
          subtitle="Free up space by clearing cached data"
          icon={<Ionicons name="trash-bin" size={22} color="#EF5A56" />}
          onPress={handleClearCache}
        />
        <SettingItem
          title="Downloaded Books"
          subtitle="Manage your offline book collection"
          icon={<Ionicons name="folder-open" size={22} color="#54408C" />}
          onPress={() => Alert.alert('Coming Soon', 'Downloaded books feature coming soon!')}
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingItem
          title="Help & FAQ"
          subtitle="Get help and find answers"
          icon={<Ionicons name="help-circle" size={22} color="#54408C" />}
          onPress={() => router.push('/Help')}
        />
        <SettingItem
          title="About"
          subtitle="App version and information"
          icon={<Ionicons name="information-circle" size={22} color="#54408C" />}
          onPress={() => router.push('/About')}
        />
        <SettingItem
          title="Privacy Policy"
          subtitle="Review our privacy policy"
          icon={<Ionicons name="shield-checkmark" size={22} color="#54408C" />}
          onPress={() => router.push('/Privacy')}
        />
        <SettingItem
          title="Terms of Service"
          subtitle="Review our terms and conditions"
          icon={<Ionicons name="document-text" size={22} color="#54408C" />}
          onPress={() => router.push('/Terms')}
        />
      </View>

      {/* Reset */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reset</Text>
        <SettingItem
          title="Reset All Settings"
          subtitle="Restore default settings and preferences"
          icon={<Ionicons name="refresh" size={22} color="#EF5A56" />}
          onPress={handleResetSettings}
        />
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#54408C',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#121212',
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  bottomSpace: {
    height: 40,
  },
});
