import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from 'expo-router';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';

// Mock notifications data - static for UI demonstration
const mockNotifications = [
  {
    id: '1',
    type: 'book_added',
    title: 'New Book Available',
    message: '"The Art of Programming" has been added to your library',
    time: '2 min ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book1',
    read: false,
  },
  {
    id: '2',
    type: 'author_follow',
    title: 'Author Update',
    message: 'Shakespeare published a new collection',
    time: '15 min ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book2',
    read: false,
  },
  {
    id: '3',
    type: 'reading_reminder',
    title: 'Reading Reminder',
    message: 'Don\'t forget to continue "Digital Design Principles"',
    time: '1 hour ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book3',
    read: true,
  },
  {
    id: '4',
    type: 'wish_list',
    title: 'Wishlist Item Available',
    message: '"Machine Learning Basics" is now available for download',
    time: '2 hours ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book4',
    read: true,
  },
  {
    id: '5',
    type: 'library_update',
    title: 'Library Updated',
    message: 'Your uploaded books have been synchronized',
    time: '5 hours ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book5',
    read: true,
  },
  {
    id: '6',
    type: 'recommendation',
    title: 'Recommended for You',
    message: 'Based on your reading history, you might enjoy "Web Development Guide"',
    time: '1 day ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book6',
    read: true,
  },
  {
    id: '7',
    type: 'achievement',
    title: 'Reading Achievement!',
    message: 'Congratulations! You completed reading 10 books this month',
    time: '2 days ago',
    bookImage: 'https://via.placeholder.com/60x90?text=Book7',
    read: true,
  },
];

export default function Notifications() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Notifications',
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
          style={{ paddingHorizontal: 12 }}
        >
          <Ionicons name="settings-outline" size={24} color="#54408C" />
        </Pressable>
      ),
    });
  }, [navigation]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'book_added':
        return <Ionicons name="book" size={20} color="#54408C" />;
      case 'author_follow':
        return <FontAwesome name="user" size={18} color="#28a745" />;
      case 'reading_reminder':
        return <Ionicons name="time-outline" size={18} color="#ffc107" />;
      case 'wish_list':
        return <Ionicons name="heart" size={20} color="#dc3545" />;
      case 'library_update':
        return <Ionicons name="cloud-upload" size={20} color="#17a2b8" />;
      case 'recommendation':
        return <Ionicons name="thumbs-up" size={20} color="#6f42c1" />;
      case 'achievement':
        return <Ionicons name="trophy" size={20} color="#fd7e14" />;
      default:
        return <Ionicons name="notifications" size={20} color="#54408C" />;
    }
  };

  const formatTime = (timeStr: string) => {
    // Simple formatting for demo
    if (timeStr.includes('min')) return timeStr;
    if (timeStr.includes('hour')) return timeStr;
    if (timeStr.includes('day')) return timeStr;
    return timeStr;
  };

  const renderNotificationItem = ({ item }: { item: typeof mockNotifications[0] }) => (
    <Pressable
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
    >
      <View style={styles.notificationIcon}>
        <View style={styles.iconBackground}>
          {getNotificationIcon(item.type)}
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>

      <Pressable style={styles.notificationContent}>
        <Text style={styles.notificationTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>
          {formatTime(item.time)}
        </Text>
      </Pressable>

      {item.bookImage && (
        <Image
          source={{ uri: item.bookImage }}
          style={styles.bookImage}
          resizeMode="cover"
        />
      )}

      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </Pressable>
  );

  const unreadCount = mockNotifications.filter(notification => !notification.read).length;

  return (
    <View style={styles.container}>
      {/* Header Stats */}
      <View style={styles.headerStats}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{mockNotifications.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#54408C' }]}>{unreadCount}</Text>
          <Text style={styles.statLabel}>Unread</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: '#28a745' }]}>{mockNotifications.length - unreadCount}</Text>
          <Text style={styles.statLabel}>Read</Text>
        </View>
      </View>

      {/* Notifications List */}
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={80} color="#ccc" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>
              You don't have any notifications yet
            </Text>
          </View>
        )}
      />

      {/* Mark All Read Button */}
      {unreadCount > 0 && (
        <View style={styles.actionsContainer}>
          <Pressable style={styles.markAllBtn}>
            <Text style={styles.markAllText}>Mark All as Read</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  // Header Stats
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 10,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // List
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 1,
    marginBottom: 4,
  },
  unreadNotification: {
    backgroundColor: '#f0f7ff',
    borderLeftWidth: 4,
    borderLeftColor: '#54408C',
  },

  // Icon Section
  notificationIcon: {
    position: 'relative',
    marginRight: 12,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#dc3545',
    borderWidth: 2,
    borderColor: '#fff',
  },

  // Content
  notificationContent: {
    flex: 1,
    paddingRight: 12,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121212',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },

  // Book Image
  bookImage: {
    width: 45,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },

  // Actions
  actionsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  markAllBtn: {
    backgroundColor: '#54408C',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  markAllText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Separator
  separator: {
    height: 8,
  },
});
