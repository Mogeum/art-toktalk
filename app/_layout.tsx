import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('hasLaunched').then((value) => {
      if (!value) {
        AsyncStorage.setItem('hasLaunched', 'true');
        router.replace('/login');
      }
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}