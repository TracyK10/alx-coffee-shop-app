import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Sora-Regular': require('@/assets/fonts/Sora-Regular.ttf'),
    'Sora-SemiBold': require('@/assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Bold': require('@/assets/fonts/Sora-Bold.ttf'),
  });
};

export const fontConfig = {
  regular: 'Sora-Regular',
  medium: 'Sora-SemiBold',
  bold: 'Sora-Bold',
};
