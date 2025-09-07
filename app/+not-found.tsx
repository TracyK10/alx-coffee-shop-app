import { Link, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useLayoutEffect } from 'react';
import { Stack } from 'expo-router/stack';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const router = useRouter();

  // Automatically redirect to home when this screen mounts
  useLayoutEffect(() => {
    // Use replace to prevent going back to the not-found screen
    router.replace('/');
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Oops!', headerShown: false }} />
      <ThemedView style={styles.content}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <Link href="/" style={styles.link} asChild>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 20,
    padding: 15,
  },
});
