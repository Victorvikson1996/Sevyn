import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

void SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'NeueMontreal-Regular': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Regular.otf'),
    'NeueMontreal-Light': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Light.otf'),
    'NeueMontreal-Medium': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Medium.otf'),
    'NeueMontreal-Bold': require('./src/assets/fonts/NeueMontreal/NeueMontreal-Bold.otf')
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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
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
