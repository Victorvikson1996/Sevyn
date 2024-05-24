import { View, Text } from 'react-native';
import React from 'react';
import { OnBoardScreen } from '../screens/onBoardingScreen';
import { LoginScreen, SignUp } from '../screens/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='Splash'
        component={OnBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignUp} />
    </Stack.Navigator>
  );
};
