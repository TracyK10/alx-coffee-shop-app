// app/_layout.tsx
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { FavoritesProvider } from '@/contexts/FavoritesContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadFonts } from '@/utils/fonts';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Custom hook for app initialization
function useAppReady() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();
        // Add a small delay to ensure everything is loaded
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsReady(true);
      } catch (e) {
        console.warn('Error initializing app', e);
        setError(e as Error);
      }
    }

    prepare();
  }, []);
  return { isReady, error };
}

function AppContent() {
  const colorScheme = useColorScheme();
  const { isReady, error } = useAppReady();
  const { user, isLoading } = useAuth();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: 'white' }}>Error initializing app. Please restart the app.</Text>
      </View>
    );
  }

  if (isLoading || !isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#D17842" />
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ThemeProvider value={theme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          {user ? (
            <>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen 
                name="screens/OrderScreen" 
                options={{ 
                  presentation: 'modal',
                  animation: 'slide_from_bottom'
                }} 
              />
            </>
          ) : (
            // Auth screens
            <>
              <Stack.Screen name="(auth)/sign-in" />
              <Stack.Screen name="(auth)/sign-up" />
            </>
          )}
          <Stack.Screen 
            name="+not-found" 
            options={{
              title: 'Not Found',
              headerShown: false
            }}
          />
        </Stack>
      </ThemeProvider>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <SafeAreaProvider>
          <AppContent />
        </SafeAreaProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0F14',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C0F14',
  },
});