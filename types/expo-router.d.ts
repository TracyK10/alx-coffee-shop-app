// Type definitions for expo-router

declare module 'expo-router' {
  import { ComponentType } from 'react';
  import { TextProps, ViewStyle, TextStyle, ImageStyle } from 'react-native';
  
  // Define route parameters
  export type RootStackParamList = {
    'index': undefined;
    '/': undefined;
    '/(tabs)': undefined;
    '(tabs)': {
      screen?: 'index' | 'orders' | 'favorites' | 'cart' | 'notifications';
    };
    'screens/CoffeeDetail': { coffee: string };
    'screens/OrderScreen': { coffee: string };
    'delivery': { orderId: string };
    '+not-found': undefined;
  };
  
  export interface LinkProps<T = string> {
    href: T;
    asChild?: boolean;
    replace?: boolean;
    push?: boolean;
    style?: ViewStyle | TextStyle | ImageStyle;
    children: React.ReactNode;
  }
  
  export const Link: <T extends string = string>(props: LinkProps<T>) => JSX.Element;
  
  export function useRouter(): {
    push: <T extends keyof RootStackParamList>(
      path: T,
      params?: RootStackParamList[T]
    ) => void;
    replace: <T extends keyof RootStackParamList>(
      path: T,
      params?: RootStackParamList[T]
    ) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params: Record<string, string>) => void;
  };
  
  export function useLocalSearchParams<T = {}>(): T;
  
  export function useNavigation(): {
    navigate: (name: string, params?: Record<string, any>) => void;
    goBack: () => void;
    canGoBack: () => boolean;
  };
  
  export function useFocusEffect(effect: () => void): void;
  
  export const router: {
    push: <T extends keyof RootStackParamList>(
      path: T | { pathname: T; params?: RootStackParamList[T] },
      params?: RootStackParamList[T]
    ) => void;
    replace: <T extends keyof RootStackParamList>(
      path: T | { pathname: T; params?: RootStackParamList[T] },
      params?: RootStackParamList[T]
    ) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params: Record<string, string>) => void;
  };
  
  export const usePathname: () => string;
  export const useSegments: () => string[];
}
