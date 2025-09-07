import { Coffee } from '@/types/coffee';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { 
  Alert, 
  Image, 
  ImageSourcePropType, 
  ImageStyle, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextStyle, 
  TouchableOpacity, 
  View, 
  ViewStyle 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Style = {
  // Container
  container: ViewStyle;
  scrollView: ViewStyle;
  
  // Header
  header: ViewStyle;
  backButton: ViewStyle;
  headerTitle: TextStyle;
  headerRight: ViewStyle;
  
  // Toggle
  toggleContainer: ViewStyle;
  toggleButton: ViewStyle;
  activeToggle: ViewStyle;
  toggleText: TextStyle;
  activeToggleText: TextStyle;
  
  // Sections
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  
  // Address
  addressContainer: ViewStyle;
  addressTitle: TextStyle;
  addressText: TextStyle;
  errorText: TextStyle;
  
  // Order Item
  orderItemContainer: ViewStyle;
  orderItemImage: ImageStyle;
  orderItemDetails: ViewStyle;
  orderItemName: TextStyle;
  orderItemDescription: TextStyle;
  orderItemFooter: ViewStyle;
  orderItemPrice: TextStyle;
  quantityContainer: ViewStyle;
  quantityButton: ViewStyle;
  quantityText: TextStyle;
  
  // Payment
  paymentContainer: ViewStyle;
  paymentRow: ViewStyle;
  paymentLabel: TextStyle;
  paymentValue: TextStyle;
  deliveryFeeContainer: ViewStyle;
  originalFee: TextStyle;
  discountedFee: TextStyle;
  totalContainer: ViewStyle;
  totalLabel: TextStyle;
  totalValue: TextStyle;
  
  // Order Button
  orderButton: ViewStyle;
  orderButtonText: TextStyle;
};

const OrderScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ coffee?: string }>();
  
  const coffee = params?.coffee ? (JSON.parse(params.coffee) as Coffee) : null;
  
  // Handle image source
  const imageSource = coffee?.image 
    ? typeof coffee.image === 'string' 
      ? { uri: coffee.image } 
      : coffee.image 
    : require('@/assets/images/placeholders/coffee-1.png');
  const [deliveryMethod, setDeliveryMethod] = useState<'deliver' | 'pickup'>('deliver');
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState<{address: string; street: string} | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address.length > 0) {
          setLocation({
            address: `${address[0].street || 'Unknown'}, ${address[0].city || ''}`,
            street: address[0].name || 'Current Location',
          });
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setErrorMsg('Unable to get your location');
      }
    })();
  }, []);

  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>No coffee data found</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Delivery Method Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, deliveryMethod === 'deliver' && styles.activeToggle]}
            onPress={() => setDeliveryMethod('deliver')}
          >
            <Text style={[styles.toggleText, deliveryMethod === 'deliver' && styles.activeToggleText]}>
              Deliver
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.toggleButton, deliveryMethod === 'pickup' && styles.activeToggle]}
            onPress={() => setDeliveryMethod('pickup')}
          >
            <Text style={[styles.toggleText, deliveryMethod === 'pickup' && styles.activeToggleText]}>
              Pick Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Address */}
        <View style={{marginBottom: 20}}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressContainer}>
            <Ionicons name="location" size={20} color="#D17842" style={{marginRight: 10, marginTop: 2}} />
            <View style={{flex: 1}}>
              <Text style={styles.addressTitle} numberOfLines={1} ellipsizeMode="tail">
                {location?.street || 'Getting location...'}
              </Text>
              <Text style={styles.addressText} numberOfLines={2}>
                {location?.address || 'Please enable location services'}
              </Text>
              {errorMsg && (
                <Text style={styles.errorText}>{errorMsg}</Text>
              )}
            </View>
            <TouchableOpacity 
              onPress={async () => {
                // Refresh location
                try {
                  const { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                  }
                  
                  const location = await Location.getCurrentPositionAsync({});
                  const address = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  });

                  if (address.length > 0) {
                    setLocation({
                      address: `${address[0].street || 'Unknown'}, ${address[0].city || ''}`,
                      street: address[0].name || 'Current Location',
                    });
                    setErrorMsg(null);
                  }
                } catch (error) {
                  console.error('Error refreshing location:', error);
                  setErrorMsg('Error getting location');
                }
              }}
              style={{padding: 8, marginLeft: 5}}
            >
              <Ionicons name="refresh" size={20} color="#D17842" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Item */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Order</Text>
          <View style={styles.orderItemContainer}>
            <Image 
              source={imageSource} 
              style={styles.orderItemImage}
              resizeMode="cover"
              defaultSource={require('@/assets/images/placeholders/coffee-1.png')}
            />
            <View style={styles.orderItemDetails}>
              <Text style={styles.orderItemName} numberOfLines={1} ellipsizeMode="tail">
                {coffee.name}
              </Text>
              <Text style={styles.orderItemDescription}>Deep Foam</Text>
              <View style={styles.orderItemFooter}>
                <Text style={styles.orderItemPrice}>${coffee.price.toFixed(2)}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Ionicons name="remove" size={16} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantity}</Text>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Ionicons name="add" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.paymentContainer}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Price</Text>
              <Text style={styles.paymentValue}>${(coffee.price * quantity).toFixed(2)}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Delivery Fee</Text>
              <View style={styles.deliveryFeeContainer}>
                <Text style={styles.originalFee}>$2.0</Text>
                <Text style={styles.discountedFee}>$1.0</Text>
              </View>
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Payment</Text>
              <Text style={styles.totalValue}>${(coffee.price * quantity + 1).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Order Button */}
        <TouchableOpacity 
          style={styles.orderButton}
          onPress={() => {
            // Generate a random order ID for demo purposes
            const orderId = Math.floor(10000 + Math.random() * 90000);
            // Navigate to delivery page with order ID
            router.push(`/delivery?orderId=${orderId}` as any);
          }}
        >
          <Text style={styles.orderButtonText}>Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252A32',
  },
  backButton: {
    padding: 8,
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  headerRight: {
    width: 40,
  },
  
  // Toggle
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: '#D17842',
  },
  toggleText: {
    color: '#A0A5AD',
    fontWeight: '600',
  },
  activeToggleText: {
    color: 'white',
  },
  
  // Sections
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  
  // Address
  addressContainer: {
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressTitle: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    color: '#A0A5AD',
    fontSize: 12,
    lineHeight: 16,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 5,
  },
  
  // Order Item
  orderItemContainer: {
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 15,
  },
  orderItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderItemName: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
  },
  orderItemDescription: {
    color: '#A0A5AD',
    fontSize: 12,
    marginBottom: 8,
  },
  orderItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemPrice: {
    color: '#D17842',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0C0F14',
    borderRadius: 10,
    padding: 2,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#252A32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Payment
  paymentContainer: {
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    padding: 15,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    color: '#A0A5AD',
    fontSize: 14,
  },
  paymentValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  deliveryFeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalFee: {
    color: '#A0A5AD',
    fontSize: 14,
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedFee: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#252A32',
  },
  totalLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: '#D17842',
    fontSize: 16,
    fontWeight: '600',
  },
  // Order Button
  orderButton: {
    backgroundColor: '#D17842',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#D17842',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  }
});

export default OrderScreen;
