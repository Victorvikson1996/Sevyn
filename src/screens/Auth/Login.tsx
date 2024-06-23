import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native';

import {
  ContentWrapper,
  Text,
  Button,
  Input,
  BackHeader
} from '../../components';
import { AuthNavigationProp } from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = {
  navigation: AuthNavigationProp<'Login'>;
};

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [inputs, setInputs] = useState({ phoneOrEmail: '', password: '' });
  const [errors, setErrors] = useState<{
    phoneOrEmail?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.phoneOrEmail) {
      handleError('Please enter your phone number or email', 'phoneOrEmail');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please enter your password', 'password');
      isValid = false;
    }

    if (isValid) {
      login();
    }
  };

  const login = async () => {
    navigation.navigate('MainApp');
  };

  const handleOnchange = (text: string, input: 'phoneOrEmail' | 'password') => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (
    error: string | null,
    input: 'phoneOrEmail' | 'password'
  ) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader showProgress progressValueBlue={2} progressValueGrey={1} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 23,
                fontFamily: 'NeueMontreal-Bold'
              }}
            >
              Welcome Back
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Please sign in to continue
            </Text>
            <Input
              keyboardType='email-address'
              onChangeText={(text) => handleOnchange(text, 'phoneOrEmail')}
              onFocus={() => handleError(null, 'phoneOrEmail')}
              label='Phone number or Email'
              placeholder='Enter your phone number or email'
              error={errors.phoneOrEmail}
              autoCapitalize='none'
            />
            <Input
              secureTextEntry
              onChangeText={(text) => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              label='Password'
              placeholder='Enter your password'
              error={errors.password}
            />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Button text='Login' onPress={validate} />
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 20 }}
            onPress={() => {
              navigation.navigate('Signup');
            }}
          >
            <Text>
              Don't have an account? <Text fontWeight='700'>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30
  }
});
