import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);

  const menuItems: Array<{
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    rightComponent?: React.ReactNode;
    isDanger?: boolean;
  }> = [
    { icon: 'person-outline', label: 'Edit Profile' },
    { icon: 'card-outline', label: 'Payment Methods' },
    { icon: 'location-outline', label: 'My Addresses' },
    { 
      icon: 'notifications-outline', 
      label: 'Notifications',
      rightComponent: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#C67C4E' }}
        />
      )
    },
    { 
      icon: 'moon-outline', 
      label: 'Dark Mode',
      rightComponent: (
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: '#C67C4E' }}
        />
      )
    },
    { icon: 'help-circle-outline', label: 'Help Center' },
    { icon: 'information-circle-outline', label: 'About Us' },
    { icon: 'log-out-outline', label: 'Sign Out', isDanger: true },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, isDark && styles.darkText]}>My Profile</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image 
            source={require('@/assets/images/placeholders/coffee-1.png')}
            style={styles.profileImage}
          />
          <Text style={[styles.profileName, isDark && styles.darkText]}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={[styles.menuContainer, isDark && styles.darkMenuContainer]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.menuItem}
              onPress={() => {
                if (item.label === 'Sign Out') {
                  // Handle sign out
                  router.replace('/sign-in' as any);
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={item.isDanger ? '#FF3B30' : (isDark ? '#fff' : '#000')} 
                />
                <Text style={[
                  styles.menuItemText, 
                  isDark && styles.darkText,
                  item.isDanger && styles.dangerText
                ]}>
                  {item.label}
                </Text>
              </View>
              {item.rightComponent || (
                <Ionicons 
                  name="chevron-forward" 
                  size={20} 
                  color={isDark ? '#666' : '#999'} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F2ED',
  },
  darkContainer: {
    backgroundColor: '#0C0F14',
  },
  darkText: {
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9B9B9B',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: 'rgba(198, 124, 78, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#C67C4E',
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  darkMenuContainer: {
    backgroundColor: '#1A1D22',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: '#2F2D2C',
  },
  dangerText: {
    color: '#FF3B30',
  },
});
