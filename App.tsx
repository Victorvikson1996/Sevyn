import 'expo-asset';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, Navigation } from './src/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'NeueMontreal-Regular': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Regular.otf'),
    'NeueMontreal-Light': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Light.otf'),
    'NeueMontreal-Medium': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Medium.otf'),
    'NeueMontreal-Bold': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Bold.otf'),
    'NeueMontreal-Italic': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Italic.otf'),
    'NeueMontreal-LightItalic': require('./src/assets/fonts/NeueMontreal/NeueMontreal-LightItalic.otf'),
    'NeueMontreal-BoldItalic': require('./src/assets/fonts/NeueMontreal/NeueMontreal-BoldItalic.otf'),
    'NeueMontreal-MediumItalic': require('./src/assets/fonts/NeueMontreal/NeueMontreal-MediumItalic.otf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <StatusBar backgroundColor='#fff' barStyle='dark-content' />
      <Navigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
