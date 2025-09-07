import { NavigatorScreenParams } from '@react-navigation/native';

// Coffee type used throughout the app
type Coffee = {
  id: string;
  name: string;
  price: number;
  image: any;
  rating: number;
  description: string;
  type: string;
  isFavorite?: boolean;
  reviewCount?: number;
  preparationMethods?: string[];
};

export type RootStackParamList = {
  // Main tabs
  '(tabs)': NavigatorScreenParams<TabParamList>;
  
  // Direct screen routes
  'order': { id: string };
  'delivery': { orderId: string };
  'profile': undefined;
  'sign-in': undefined;
  
  // Coffee flow screens
  'screens/CoffeeDetail': { 
    coffee: string; // stringified Coffee object
  };
  'screens/OrderScreen': { 
    coffee: string; // stringified Coffee object
  };
  
  // Tab routes (direct access)
  '/(tabs)/favorites': undefined;
  '/(tabs)/orders': undefined;
  '/(tabs)/notifications': undefined;
  
  // Auth routes
  '/(auth)/sign-in': undefined;
  '/(auth)/sign-up': undefined;
  
  // Aliases for direct navigation
  '/sign-in': undefined;
  '/sign-up': undefined;
  
  // Add index signature to allow string access with any parameters
  [key: string]: any;
};

export type TabParamList = {
  'index': undefined;
  'menu': undefined;
  'favorites': undefined;
  'orders': undefined;
  'notifications': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
