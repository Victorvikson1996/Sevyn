import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigation } from './AuthNavigation';
import { TabNavigation } from './TabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Auth' component={AuthNavigation} />
        <Stack.Screen name='MainApp' component={TabNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
