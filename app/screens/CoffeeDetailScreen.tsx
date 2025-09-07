import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Coffee, CoffeeSize, RootStackParamList } from '@/types/coffee';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function CoffeeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ coffee?: string }>();
  
  if (!params?.coffee) {
    return (
      <View style={styles.container}>
        <Text>Error: Coffee data not found</Text>
      </View>
    );
  }
  
  const coffee = JSON.parse(params.coffee) as Coffee;
  const [selectedSize, setSelectedSize] = useState<CoffeeSize>('M');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(coffee.isFavorite);
  const colorScheme = useColorScheme() as keyof typeof Colors;
  const insets = useSafeAreaInsets();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Update favorite status in the backend
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBuyNow = () => {
    // @ts-ignore - expo-router types are not perfect
    router.push(`/screens/OrderScreen?coffee=${encodeURIComponent(JSON.stringify(coffee))}`);
  };

  const getPriceBySize = (size: CoffeeSize): number => {
    const basePrice = coffee.price;
    switch (size) {
      case 'S':
        return basePrice;
      case 'M':
        return basePrice + 0.5;
      case 'L':
        return basePrice + 1.0;
      default:
        return basePrice;
    }
  };

  const price = getPriceBySize(selectedSize);

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail</Text>
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
            source={{ uri: coffee.image }}
            style={styles.coffeeImage}
            resizeMode="contain"
          />
        </View>

        {/* Coffee Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={[styles.coffeeName, { color: Colors[colorScheme].text }]}>
                {coffee.name}
              </Text>
              <Text style={styles.coffeeType}>
                {coffee.type === 'both' ? 'Ice/Hot' : coffee.type === 'hot' ? 'Hot' : 'Iced'}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#D17842" />
              <Text style={styles.ratingText}>
                {coffee.rating} <Text style={styles.reviewCount}>({coffee.reviewCount} reviews)</Text>
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text
              style={[styles.descriptionText, { color: 'white' }]}
              numberOfLines={isExpanded ? undefined : 3}>
              {coffee.description}
            </Text>
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={styles.readMoreText}>
                {isExpanded ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Size Selection */}
          <View style={styles.sizeContainer}>
            <Text style={[styles.sectionTitle, { color: 'white' }]}>
              Size
            </Text>
            <View style={styles.sizeOptions}>
              {(['S', 'M', 'L'] as CoffeeSize[]).map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.sizeOptionSelected,
                  ]}
                  onPress={() => setSelectedSize(size)}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextSelected,
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Now Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
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
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#0C0F14',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  favoriteButton: {
    padding: 8,
  },
  imageContainer: {
    height: width * 0.6,
    backgroundColor: '#0C0F14',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  coffeeImage: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  coffeeName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  coffeeType: {
    fontSize: 14,
    color: '#AEAEAE',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141921',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '600',
  },
  reviewCount: {
    color: '#AEAEAE',
    fontWeight: 'normal',
  },
  descriptionContainer: {
    marginBottom: 25,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  readMoreText: {
    color: '#D17842',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  sizeContainer: {
    marginBottom: 30,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeOption: {
    width: 100,
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
    padding: 16,
    backgroundColor: '#0C0F14',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  priceContainer: {
    flex: 1,
    marginRight: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#9B9B9B',
    marginBottom: 4,
    fontFamily: 'Sora-Regular',
  },
  priceValue: {
    fontSize: 20,
    fontFamily: 'Sora-SemiBold',
    color: 'white',
  },
  buyButton: {
    backgroundColor: '#D17842',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#D17842',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buyButtonText: {
    color: 'white',
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
  },
});
