import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type DeliveryParams = {
  orderId: string;
};

export default function DeliveryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<DeliveryParams>();
  const { width } = Dimensions.get('window');
  const progressWidth = width * 0.7; // 70% of screen width
  
  // Get order ID from params or use a default
  const orderId = params?.orderId || '12345';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order #{orderId}</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: progressWidth }]} />
          <View style={styles.progressDot}>
            <View style={styles.activeDot} />
          </View>
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressLabel}>Ordered</Text>
          <Text style={[styles.progressLabel, styles.activeProgressLabel]}>Preparing</Text>
          <Text style={styles.progressLabel}>On the way</Text>
          <Text style={styles.progressLabel}>Delivered</Text>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7C40.7128,-74.0060&key=YOUR_API_KEY' }}
          style={styles.mapImage}
          resizeMode="cover"
          defaultSource={require('@/assets/images/placeholders/coffee-1.png')}
        />
        <View style={styles.riderInfo}>
          <Image 
            source={require('@/assets/images/placeholders/coffee-1.png')}
            style={styles.riderAvatar}
          />
          <View style={styles.riderDetails}>
            <Text style={styles.riderName}>John D.</Text>
            <Text style={styles.riderStatus}>Your Rider</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Order Details */}
      <View style={styles.orderDetails}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        
        <View style={styles.orderItem}>
          <View style={styles.orderItemInfo}>
            <Text style={styles.orderItemName}>Cappuccino</Text>
            <Text style={styles.orderItemPrice}>$4.53</Text>
          </View>
          <Text style={styles.orderItemQuantity}>x1</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>$4.53</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.trackButton]}
          onPress={() => {
            // Track order action
          }}
        >
          <Ionicons name="navigate" size={20} color="#D17842" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, styles.trackButtonText]}>Track Order</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Ionicons name="home" size={20} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonText, styles.homeButtonText]}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0C0F14',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 24,
  },
  progressContainer: {
    padding: 20,
    backgroundColor: '#1A1F25',
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#2A2F35',
    borderRadius: 2,
    marginBottom: 15,
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D17842',
    borderRadius: 2,
  },
  progressDot: {
    position: 'absolute',
    top: -6,
    left: '70%',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D17842',
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D17842',
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  activeProgressLabel: {
    color: '#D17842',
    fontWeight: '600',
  },
  mapContainer: {
    height: 200,
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  riderInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(26, 31, 37, 0.9)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  riderDetails: {
    flex: 1,
  },
  riderName: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 2,
  },
  riderStatus: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  callButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetails: {
    backgroundColor: '#1A1F25',
    borderRadius: 12,
    marginHorizontal: 20,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    color: 'white',
    fontSize: 14,
    marginBottom: 4,
  },
  orderItemPrice: {
    color: '#D17842',
    fontSize: 14,
    fontWeight: '600',
  },
  orderItemQuantity: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2F35',
    marginVertical: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  totalAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  trackButton: {
    backgroundColor: 'rgba(209, 120, 66, 0.2)',
    borderWidth: 1,
    borderColor: '#D17842',
  },
  homeButton: {
    backgroundColor: '#D17842',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  trackButtonText: {
    color: '#D17842',
  },
  homeButtonText: {
    color: 'white',
  },
});
