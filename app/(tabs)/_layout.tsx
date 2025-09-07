// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [styles.tabBar, { 
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? 10 : 0,
          }],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps) => (
              <View style={styles.tabIcon}>
                <Ionicons 
                  name={focused ? 'home' : 'home-outline'} 
                  size={24} 
                  color={focused ? '#D17842' : '#9CA3AF'} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps) => (
              <View style={styles.tabIcon}>
                <Ionicons 
                  name={focused ? 'heart' : 'heart-outline'} 
                  size={24} 
                  color={focused ? '#D17842' : '#9CA3AF'} 
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps) => (
              <View style={styles.tabIcon}>
                <Ionicons 
                  name={focused ? 'bag' : 'bag-outline'}
                  size={24} 
                  color={focused ? '#D17842' : '#9CA3AF'}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ focused }: TabBarIconProps) => (
              <View style={styles.tabIcon}>
                <Ionicons 
                  name={focused ? 'notifications' : 'notifications-outline'} 
                  size={24} 
                  color={focused ? '#D17842' : '#9CA3AF'} 
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  tabBar: {
    backgroundColor: '#0C0F14',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    paddingHorizontal: 20,
  },
  tabIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    width: '100%',
    maxWidth: 60,
    marginHorizontal: 10,
    borderRadius: 8,
  },
});
