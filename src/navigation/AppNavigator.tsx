import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthNavigation } from './AuthNavigation'
import { TabNavigation } from './TabNavigation'

export const AppNavigator = () => {
  return (
      <NavigationContainer>
        <TabNavigation/>
    </NavigationContainer>
  )
}
