import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigation } from './AuthNavigation';
import { TabNavigation } from './TabNavigation';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};
