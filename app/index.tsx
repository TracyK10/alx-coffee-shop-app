import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Redirect to the onboarding screen when the app starts
    router.replace('/onboarding');
  }, []);

  return null;
}
