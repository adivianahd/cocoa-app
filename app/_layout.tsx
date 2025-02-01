import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { InstrumentsProvider } from '@/providers/InstrumentsProvider';
import { PortfolioProvider } from '@/providers/PortfolioProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ToastManager from "toastify-react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <InstrumentsProvider>
        <PortfolioProvider>
          <ThemeProvider value={colorScheme !== 'dark' ? DarkTheme : DefaultTheme}>
            <ToastManager height={100} showProgressBar={false} duration={4000} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PortfolioProvider>
      </InstrumentsProvider>
    </SafeAreaProvider>
  );
}
