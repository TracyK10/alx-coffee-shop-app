import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        await Font.loadAsync({
          'Sora-Regular': require('@/assets/fonts/Sora-Regular.ttf'),
          'Sora-SemiBold': require('@/assets/fonts/Sora-SemiBold.ttf'),
          'Sora-Bold': require('@/assets/fonts/Sora-Bold.ttf'),
        });
        
        setFontsLoaded(true);
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
