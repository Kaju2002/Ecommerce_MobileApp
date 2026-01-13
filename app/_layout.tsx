
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/use-color-scheme';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner-native';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      'ProductSans-Regular': require('../assets/fonts/ProductSans-Regular.ttf'),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView>
          {/* <Providers> */}

          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>

          <StatusBar style="auto" />
          {/* </Providers> */}
          <Toaster 
            position="bottom-center"
            richColors
            toastOptions={{
              style: {
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
              },
            }}
          />
        </GestureHandlerRootView>
      </ThemeProvider>
    </AuthProvider>
  );
}
