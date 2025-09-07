import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type NotificationType = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'promo' | 'system';
};

const { width } = Dimensions.get('window');

const sampleNotifications: NotificationType[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    message: 'Your order #12345 has been confirmed and is being prepared.',
    time: '2 min ago',
    read: false,
    type: 'order',
  },
  {
    id: '2',
    title: 'Special Offer',
    message: 'Get 20% off on your next order with code COFFEELOVER',
    time: '1 hour ago',
    read: true,
    type: 'promo',
  },
  {
    id: '3',
    title: 'Order Shipped',
    message: 'Your order #12344 has been shipped and will arrive soon!',
    time: '3 hours ago',
    read: true,
    type: 'order',
  },
  {
    id: '4',
    title: 'New Feature',
    message: 'Check out our new coffee subscription service!',
    time: '1 day ago',
    read: true,
    type: 'system',
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = React.useState(sampleNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const renderItem = ({ item }: { item: NotificationType }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.notificationIcon}>
        {item.type === 'order' && (
          <Ionicons name="bag" size={20} color="#C67C4E" />
        )}
        {item.type === 'promo' && (
          <Ionicons name="pricetag" size={20} color="#FF6B6B" />
        )}
        {item.type === 'system' && (
          <Ionicons name="notifications" size={20} color="#6C5CE7" />
        )}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {!item.read && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="notifications-off-outline" size={64} color="#9B9B9B" />
        <Text style={styles.emptyTitle}>No Notifications</Text>
        <Text style={styles.emptySubtitle}>Your notifications will appear here</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Mark all as read</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F2ED',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F2ED',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 10,
    backgroundColor: '#F9F2ED',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  markAllRead: {
    color: '#C67C4E',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F2ED',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2F2D2C',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#9B9B9B',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#C67C4E',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(198, 124, 78, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C67C4E',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#2F2D2C',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9B9B9B',
  },
});
