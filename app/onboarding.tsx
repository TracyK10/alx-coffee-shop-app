import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// Import background image with proper typing
const backgroundImage: ImageSourcePropType = require('../assets/images/placeholders/onboarding-coffee.png');

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Top half: Image container */}
      <View style={styles.topSection}>
        <Image
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Bottom content area with gradient overlay */}
      <View style={styles.bottomSection}>
        <LinearGradient
          colors={['transparent', '#0C0F14']}
          style={styles.contentGradient}
        >
          <View style={styles.contentContainer}>
            <SafeAreaView edges={['bottom']} style={styles.content}>
              {/* Title */}
              <Text style={styles.title}>
                Find Your Perfect
                <Text style={styles.highlight}> Coffee</Text>
              </Text>
              
              {/* Subtitle */}
              <Text style={styles.subtitle}>
                The best grain, the finest roast, the most powerful flavor.
              </Text>
              
              {/* Pagination Dots */}
              <View style={styles.pagination}>
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
              
              {/* Get Started Button */}
              <TouchableOpacity 
                style={styles.getStartedButton}
                onPress={() => router.replace('/(tabs)')}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
                <Image 
                  source={require('../assets/images/icons/Arrow-Right 2.png')} 
                  style={styles.arrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    position: 'relative',
  },
  topSection: {
    height: '65%', // Increased from 55%
    width: '100%',
    backgroundColor: '#0C0F14',
    justifyContent: 'center', // Changed from flex-end
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%', // Changed from 90%
    height: '100%', // Changed from 90%
    resizeMode: 'cover', // Changed from contain
    marginTop: 0, // Removed margin
  },
  contentGradient: {
    flex: 1,
    paddingTop: 10, // Reduced from 20
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#0C0F14',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40, // Increased overlap
    paddingTop: 20, // Reduced from 30
    paddingBottom: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 20, // Reduced from 40
    paddingBottom: 20, // Reduced from 40
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around', // Changed from space-between for better distribution
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sora-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8, // Reduced from 12
    lineHeight: 40,
  },
  highlight: {
    color: '#D17842',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 20, // Reduced from 30
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10, // Reduced from 30
    marginBottom: 20, // Reduced from 40
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#D17842',
    width: 24,
  },
  getStartedButton: {
    backgroundColor: '#D17842',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    marginRight: 8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});