import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigation } from './AuthNavigation';
import { TabNavigation } from './TabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../apis/AuthContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name='MainApp' component={TabNavigation} />
        ) : (
          <Stack.Screen name='Auth' component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
