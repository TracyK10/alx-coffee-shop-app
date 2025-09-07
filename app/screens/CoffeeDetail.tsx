import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Coffee } from '@/types/coffee';

type CoffeeSize = 'S' | 'M' | 'L';

export default function CoffeeDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ coffee?: string }>();
  
  // Parse coffee data from URL parameters
  const coffee = React.useMemo(() => {
    try {
      return params?.coffee ? JSON.parse(decodeURIComponent(params.coffee)) as Coffee : null;
    } catch (error) {
      console.error('Error parsing coffee data:', error);
      return null;
    }
  }, [params?.coffee]);
  
  // State management
  const [selectedSize, setSelectedSize] = useState<CoffeeSize>('M');
  const [isFavorite, setIsFavorite] = useState(coffee?.isFavorite || false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!coffee) {
    return (
      <View style={styles.container}>
        <Text>No coffee data found</Text>
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Update favorite status in the backend
  };

  const handleBuyNow = () => {
    // Navigate to OrderScreen with coffee data as URL parameter
    if (!coffee) return;
    
    router.push({
      pathname: '/screens/OrderScreen',
      params: { coffee: JSON.stringify(coffee) }
    } as any);
  };

  const getPriceBySize = (size: CoffeeSize): number => {
    const basePrice = coffee.price;
    switch (size) {
      case 'S':
        return basePrice - 0.5;
      case 'M':
        return basePrice;
      case 'L':
        return basePrice + 0.5;
      default:
        return basePrice;
    }
  };

  const price = getPriceBySize(selectedSize);
  const description = "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the foam.";
  const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#D17842' : 'white'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Coffee Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={typeof coffee.image === 'string' ? { uri: coffee.image } : require('@/assets/images/placeholders/coffee-1.png')} 
            style={styles.coffeeImage}
            resizeMode="contain"
            defaultSource={require('@/assets/images/placeholders/coffee-1.png')}
          />
        </View>

        {/* Coffee Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.coffeeName} numberOfLines={2} ellipsizeMode="tail">
                {coffee.name}
              </Text>
              <Text style={styles.coffeeType}>
                {coffee.type === 'both' ? 'Ice/Hot' : coffee.type === 'hot' ? 'Hot' : 'Iced'}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#D17842" />
              <Text style={styles.ratingText}>
                {coffee.rating?.toFixed(1) || '4.5'}
              </Text>
              <Text style={styles.reviewCount}>
                ({coffee.reviewCount || 0} {coffee.reviewCount === 1 ? 'review' : 'reviews'})
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText} numberOfLines={isExpanded ? undefined : 3}>
              {isExpanded ? description : truncatedDescription}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.readMoreText}>
                {isExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptions}>
              {(['S', 'M', 'L'] as CoffeeSize[]).map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.sizeOptionSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Now Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>${price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#252A32',
    position: 'relative',
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
  },
  favoriteButton: {
    padding: 8,
    position: 'absolute',
    right: 15,
    zIndex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  coffeeImage: {
    width: 250,
    height: 250,
    borderRadius: 16,
    alignSelf: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  coffeeName: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    maxWidth: '70%',
    marginBottom: 4,
  },
  coffeeType: {
    color: '#AEAEAE',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1F25',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 10,
    minWidth: 100,
    justifyContent: 'center',
  },
  ratingText: {
    color: 'white',
    marginLeft: 5,
    marginRight: 3,
    fontWeight: '600',
    fontSize: 14,
    minWidth: 25,
    textAlign: 'right',
  },
  reviewCount: {
    color: '#A0A5AD',
    fontSize: 12,
    marginLeft: 0,
    flexShrink: 1,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionText: {
    color: '#AEAEAE',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  readMoreText: {
    color: '#D17842',
    fontWeight: '600',
  },
  sizeContainer: {
    marginBottom: 30,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeOption: {
    width: '30%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#393C42',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeOptionSelected: {
    backgroundColor: '#D17842',
    borderColor: '#D17842',
  },
  sizeText: {
    color: 'white',
    fontWeight: '600',
  },
  sizeTextSelected: {
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#252A32',
    backgroundColor: '#0C0F14',
  },
  priceContainer: {},
  priceLabel: {
    color: '#AEAEAE',
    fontSize: 14,
  },
  priceValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  buyButton: {
    backgroundColor: '#D17842',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
