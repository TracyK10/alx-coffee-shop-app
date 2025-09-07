// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

export default function HomeScreen() {
  const coffees = [
    {
      id: '1',
      name: 'Cappuccino',
      description: 'With Chocolate',
      price: 4.53,
    },
    {
      id: '2',
      name: 'Cappuccino',
      description: 'With Low Fat Milk',
      price: 3.99,
    },
    {
      id: '3',
      name: 'Cappuccino',
      description: 'With Skim Milk',
      price: 4.25,
    },
    {
      id: '4',
      name: 'Espresso',
      description: 'Single Shot',
      price: 2.99,
    },
    {
      id: '5',
      name: 'Latte',
      description: 'With Oat Milk',
      price: 4.75,
    },
    {
      id: '6',
      name: 'Mocha',
      description: 'With Whipped Cream',
      price: 5.25,
    },
  ];

  const [location, setLocation] = useState<{city: string, region: string} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        if (geocode.length > 0) {
          setLocation({
            city: geocode[0].city || 'Unknown',
            region: geocode[0].region || 'Unknown'
          });
        }
      } catch (error) {
        setErrorMsg('Error getting location');
        console.error('Location error:', error);
      }
    })();
  }, []);

  const handleLocationPress = () => {
    if (errorMsg) {
      Alert.alert('Location Error', errorMsg);
    }
  };

  const navigateToProfile = () => {
    router.push('/profile' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header with location and profile */}
        <View style={styles.header}>
          <View style={styles.locationWrapper}>
            <TouchableOpacity onPress={handleLocationPress}>
              <Text style={styles.locationLabel}>Location</Text>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  {location ? `${location.city}, ${location.region}` : 'Getting location...'}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#DDDDDD" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            onPress={navigateToProfile} 
            style={styles.profileButton}
          >
            <Image 
              source={require('@/assets/images/placeholders/coffee-1.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#989898" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search coffee"
              placeholderTextColor="#989898"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Text style={styles.promoText}>Promo</Text>
          <View style={styles.promoImages}>
            <Image 
              source={require('@/assets/images/placeholders/coffee-2.png')}
              style={styles.promoImage}
            />
            <Image 
              source={require('@/assets/images/placeholders/coffee-3.png')}
              style={styles.promoImage}
            />
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {['All Coffee', 'Cappuccino', 'Latte', 'Americano'].map((category, index) => (
            <TouchableOpacity
              key={index} 
              style={[
                styles.categoryTab,
                index === 0 && styles.activeCategoryTab
              ]}
            >
              <Text 
                style={[
                  styles.categoryText,
                  index === 0 && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Coffee Grid */}
        <View style={styles.coffeeGrid}>
          {coffees.map((coffee) => (
            <TouchableOpacity 
              key={coffee.id} 
              style={styles.coffeeCard}
              onPress={() => router.push({
                pathname: '/screens/CoffeeDetail',
                params: { coffee: JSON.stringify(coffee) }
              } as any)}
            >
              <View style={styles.coffeeImage}>
                <Image 
                  source={require('@/assets/images/placeholders/coffee-1.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}
                />
              </View>
              <View style={styles.coffeeInfo}>
                <Text style={styles.coffeeName}>{coffee.name}</Text>
                <Text style={styles.coffeeDescription}>{coffee.description}</Text>
                <View style={styles.coffeeFooter}>
                  <Text style={styles.coffeePrice}>$ {coffee.price.toFixed(2)}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation();
router.push({
                        pathname: 'screens/OrderScreen',
                        params: { coffee: JSON.stringify(coffee) }
                      } as any);
                    }}
                  >
                    <Ionicons name="add" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
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
    backgroundColor: '#0C0F14',
  },
  scrollView: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationWrapper: {
    flex: 1,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 16,
  },
  locationLabel: {
    fontSize: 12,
    color: '#B7B7B7',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    marginRight: 4,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#252A32',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoBanner: {
    backgroundColor: '#D17842',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  promoImages: {
    flexDirection: 'row',
  },
  promoImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#252A32',
  },
  activeCategoryTab: {
    backgroundColor: '#D17842',
  },
  categoryText: {
    color: 'white',
    fontSize: 14,
  },
  activeCategoryText: {
    fontWeight: '600',
  },
  coffeeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  coffeeCard: {
    width: '48%',
    backgroundColor: '#252A32',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
  },
  coffeeImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#3B3F46',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  coffeeInfo: {
    flex: 1,
  },
  coffeeName: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  coffeeDescription: {
    color: '#AEAEAE',
    fontSize: 12,
    marginBottom: 12,
  },
  coffeeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coffeePrice: {
    color: '#D17842',
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
  },
});