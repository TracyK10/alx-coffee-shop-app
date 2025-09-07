import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ImageSourcePropType, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Coffee } from '@/types/coffee';

type CoffeeCardProps = Omit<Coffee, 'preparationMethods'> & {
  image: ImageSourcePropType | string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export const CoffeeCard: React.FC<CoffeeCardProps> = ({
  id,
  name,
  description,
  price,
  rating,
  reviewCount = 0,
  image,
  type = 'hot',
  isFavorite = false,
  style,
  onPress,
}) => {
  // Handle different image source types
  const imageSource = typeof image === 'string' 
    ? { uri: image } 
    : image;

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }
    
    // Navigate to CoffeeDetail screen with coffee data as URL parameter
    const coffeeData = {
      id: id || Date.now().toString(),
      name,
      description,
      price,
      rating,
      reviewCount: reviewCount || 0,
      image: typeof image === 'string' ? image : '',
      type: type || 'hot',
      isFavorite: isFavorite || false,
      preparationMethods: []
    };
    
    router.push({
      pathname: '/screens/CoffeeDetail',
      params: { coffee: JSON.stringify(coffeeData) }
    } as any);
  };

  const handleAddPress = (e: any) => {
    e.stopPropagation();
    handlePress();
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.8}
        style={styles.cardContent}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={imageSource} 
            style={styles.image}
            resizeMode="contain"
            defaultSource={require('@/assets/images/placeholders/coffee-1.png')}
          />
        </View>
        
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.description} numberOfLines={1}>{description}</Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.rating}>{rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddPress}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: '#252A32',
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#AEAEAE',
    marginBottom: 12,
  },
  cardContent: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D17842',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 18,
    color: '#2F2D2C',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(198, 124, 78, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rating: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});
