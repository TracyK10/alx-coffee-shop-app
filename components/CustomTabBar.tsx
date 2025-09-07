import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

type TabBarIconProps = {
  name: string;
  focused: boolean;
};

const TabBarIcon = ({ name, focused }: TabBarIconProps) => {
  const iconName = focused ? name : `${name}-outline`;
  const iconColor = focused ? '#FFFFFF' : '#9CA3AF';
  const iconSize = focused ? 24 : 22;
  
  return (
    <Animated.View 
      entering={FadeInDown.duration(200)}
      exiting={FadeOutDown.duration(150)}
    >
      <Ionicons 
        name={iconName as any} 
        size={iconSize} 
        color={iconColor} 
      />
    </Animated.View>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName = '';
          switch (route.name) {
            case 'index':
              iconName = 'home';
              break;
            case 'favorites':
              iconName = 'heart';
              break;
            case 'orders':
              iconName = 'bag';
              break;
            case 'notifications':
              iconName = 'notifications';
              break;
            default:
              iconName = 'home';
          }

          return (
            <View key={route.key} style={styles.tab}>
              {isFocused && <View style={styles.tabFocused} />}
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={`tab-${route.name}`}
                onPress={onPress}
                style={{ zIndex: 2 }}
                activeOpacity={0.7}
              >
                <TabBarIcon name={iconName} focused={isFocused} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: 8,
    position: 'relative',
  },
  tabFocused: {
    position: 'absolute',
    top: -15,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;
