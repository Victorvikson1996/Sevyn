import React from 'react';
import {
  HomeScreen,
  CardScreen,
  Settings,
  TransactionScreen,
  BudgetScreen
} from '../screens/AppScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { apppurple, borderGrey, lightGrey } from '../constants';
import { TabIcon } from '../components';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            routeName={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: apppurple,
        tabBarInactiveTintColor: lightGrey,
        headerShown: false,

        tabBarStyle: {}
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Transactions' component={TransactionScreen} />
      <Tab.Screen name='Budget' component={BudgetScreen} />
      <Tab.Screen name='Card' component={CardScreen} />
      <Tab.Screen name='Settings' component={Settings} />
    </Tab.Navigator>
  );
};
