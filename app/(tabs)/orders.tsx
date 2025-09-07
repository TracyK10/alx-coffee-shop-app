import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderItem from '@/components/OrderItem';

export default function OrdersScreen() {
  // Sample order data
  const sampleOrder = {
    id: '12345',
    date: 'Today, 2:30 PM',
    status: 'Delivered' as const,
    items: [
      {
        id: '1',
        name: 'Cappuccino',
        price: 4.20,
        quantity: 2,
        size: 'Medium',
        image: require('@/assets/images/placeholders/coffee-1.png')
      },
      {
        id: '2',
        name: 'Latte',
        price: 3.90,
        quantity: 1,
        size: 'Large',
        image: require('@/assets/images/placeholders/coffee-2.png')
      }
    ],
    total: 12.30,
    trackingNumber: 'NYC123456789'
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.header}>My Orders</Text>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <OrderItem {...sampleOrder} />
          
          {/* Empty state for when there are no orders */}
          {/* <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>Your order history will appear here</Text>
          </View> */}
        </ScrollView>
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
    padding: 16,
    backgroundColor: '#F9F2ED',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9B9B9B',
    textAlign: 'center',
    fontFamily: 'Sora-Regular',
  },
});
