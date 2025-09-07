import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useRouter } from 'expo-router';
import { Coffee } from '@/types/coffee';

const { width } = Dimensions.get('window');

interface CoffeeItem extends Omit<Coffee, 'image'> {
  image: ImageSourcePropType;
}

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, removeFromFavorites } = useFavorites();

  // Sample coffee data - in a real app, this would come from your backend
  const sampleCoffees: CoffeeItem[] = [
    {
      id: '1',
      name: 'Cappuccino',
      price: 4.20,
      description: 'With Chocolate',
      image: require('@/assets/images/placeholders/coffee-1.png'),
      rating: 4.8,
      type: 'hot',
      size: 'Medium',
      withChocolate: true,
      withMilk: true,
      isFavorite: true
    },
    {
      id: '2',
      name: 'Latte',
      price: 3.90,
      description: 'With Oat Milk',
      image: require('@/assets/images/placeholders/coffee-2.png'),
      rating: 4.5,
      type: 'hot',
      size: 'Large',
      withOatMilk: true,
      withMilk: true,
      isFavorite: true
    },
    {
      id: '3',
      name: 'Iced Espresso',
      price: 2.50,
      description: 'Single shot',
      image: require('@/assets/images/placeholders/coffee-3.png'),
      rating: 4.7,
      type: 'iced',
      size: 'Small',
      isSingleShot: true,
      isFavorite: true
    }
  ];

  const handleCoffeePress = (coffee: CoffeeItem) => {
    router.push({
      pathname: '/screens/CoffeeDetail',
      params: { coffee: JSON.stringify(coffee) }
    } as any);
  };

  const renderItem = ({ item }: { item: CoffeeItem }) => (
    <View style={styles.coffeeCard}>
      <TouchableOpacity 
        style={styles.cardContent}
        onPress={() => handleCoffeePress(item)}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.coffeeImage} />
        <View style={styles.coffeeInfo}>
          <View style={styles.coffeeHeader}>
            <View style={styles.headerLeft}>
              <Text style={styles.coffeeName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.coffeeDescription} numberOfLines={1}>
                {item.description}
              </Text>
            </View>
            <View style={styles.sizeBadge}>
              <Text style={styles.sizeText}>{item.size || 'M'}</Text>
            </View>
          </View>
          
          <View style={styles.coffeeFooter}>
            <Text style={styles.coffeePrice}>${item.price.toFixed(2)}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.favoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          removeFromFavorites(item.id);
        }}
      >
        <Ionicons name="heart" size={20} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  // Convert favorites to CoffeeItem[] if needed
  const favoritesData = React.useMemo(() => {
    return favorites.map(fav => ({
      ...fav,
      // Ensure image is a valid ImageSourcePropType
      image: typeof fav.image === 'string' ? { uri: fav.image } : fav.image
    })) as CoffeeItem[];
  }, [favorites]);

  const displayData = favoritesData.length > 0 ? favoritesData : sampleCoffees;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorites</Text>
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="heart-outline" size={64} color="#DDDDDD" />
              <Text style={styles.emptyText}>No favorites yet</Text>
              <Text style={styles.emptySubtext}>You haven't added any coffees to your favorites</Text>
            </View>
          }
        />
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
    backgroundColor: '#F9F2ED',
    padding: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 24,
  },
  coffeeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    paddingRight: 40, // Space for the heart icon
  },
  coffeeImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#F3F3F3',
  },
  coffeeInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  coffeeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
    marginRight: 8,
  },
  sizeBadge: {
    backgroundColor: '#F3F3F3',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 36,
    alignItems: 'center',
  },
  coffeeName: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    color: '#2F2D2C',
    marginBottom: 4,
  },
  coffeeType: {
    fontSize: 12,
    color: '#9B9B9B',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  coffeeDescription: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: 'Sora-Regular',
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 12,
    color: '#9B9B9B',
    fontFamily: 'Sora-SemiBold',
  },
  coffeeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  coffeePrice: {
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    color: '#2F4B4E',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#FFC107',
    marginLeft: 4,
    fontFamily: 'Sora-SemiBold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#2F2D2C',
    fontFamily: 'Sora-SemiBold',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9B9B9B',
    fontFamily: 'Sora-Regular',
    textAlign: 'center',
    marginTop: 8,
  },
  browseButtonText: {
    color: 'white',
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
  },
});
