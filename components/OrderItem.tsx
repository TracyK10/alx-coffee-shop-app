import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type OrderItemProps = {
  id: string;
  date: string;
  status: 'Delivered' | 'Preparing' | 'Cancelled';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: any;
    size?: string;
  }>;
  total: number;
  trackingNumber: string;
};

const OrderItem = ({ id, date, status, items, total, trackingNumber }: OrderItemProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Delivered':
        return '#4CAF50';
      case 'Preparing':
        return '#FFA000';
      case 'Cancelled':
        return '#F44336';
      default:
        return '#9B9B9B';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>Order #{id}</Text>
        <Text style={[styles.status, { color: getStatusColor() }]}>{status}</Text>
      </View>
      
      <Text style={styles.date}>{date}</Text>
      
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
              <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.trackingContainer}>
          <Ionicons name="barcode-outline" size={16} color="#9B9B9B" />
          <Text style={styles.trackingNumber}>{trackingNumber}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
  },
  status: {
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
  },
  date: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 12,
    fontFamily: 'Sora-Regular',
  },
  itemsContainer: {
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F3F3F3',
  },
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
    marginBottom: 2,
  },
  itemSize: {
    fontSize: 12,
    color: '#9B9B9B',
    marginBottom: 2,
    fontFamily: 'Sora-Regular',
  },
  itemPrice: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: 'Sora-Regular',
  },
  itemTotal: {
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F3F3',
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingNumber: {
    fontSize: 12,
    color: '#9B9B9B',
    marginLeft: 4,
    fontFamily: 'Sora-Regular',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    color: '#9B9B9B',
    marginRight: 8,
    fontFamily: 'Sora-Regular',
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
  },
});

export default OrderItem;
