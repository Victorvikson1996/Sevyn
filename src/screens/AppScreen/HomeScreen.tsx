import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useAuth } from '../../apis/AuthContext';

export const HomeScreen = () => {
  const { logout, user } = useAuth();

  // useEffect(() => {
  //   logout();
  // }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};
