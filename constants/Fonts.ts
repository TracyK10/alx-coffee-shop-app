import { Platform } from 'react-native';

export const fontConfig = {
  regular: {
    fontFamily: Platform.select({
      ios: 'Sora-Regular',
      android: 'Sora-Regular',
      default: 'System',
    }),
    fontWeight: '400' as const,
  },
  medium: {
    fontFamily: Platform.select({
      ios: 'Sora-SemiBold',
      android: 'Sora-SemiBold',
      default: 'System',
    }),
    fontWeight: '600' as const,
  },
  bold: {
    fontFamily: Platform.select({
      ios: 'Sora-Bold',
      android: 'Sora-Bold',
      default: 'System',
    }),
    fontWeight: 'bold' as const,
  },
};

export const typography = {
  h1: {
    ...fontConfig.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    ...fontConfig.bold,
    fontSize: 28,
    lineHeight: 36,
  },
  h3: {
    ...fontConfig.medium,
    fontSize: 24,
    lineHeight: 32,
  },
  h4: {
    ...fontConfig.medium,
    fontSize: 20,
    lineHeight: 28,
  },
  body1: {
    ...fontConfig.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    ...fontConfig.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    ...fontConfig.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  button: {
    ...fontConfig.medium,
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'uppercase' as const,
  },
};
