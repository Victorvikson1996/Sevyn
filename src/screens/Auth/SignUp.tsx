import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import {
  ContentWrapper,
  Text,
  Button,
  BackHeader,
  Input,
  Checkbox,
  Loader
} from '../../components';
import {
  apppurple,
  primaryBlue,
  secondaryTextColor
} from '../../constants/colors';
import { normalizePhoneNumber } from '../../utils';
import { FlagNigeriaIcon } from '../../assets/icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessModal, {
  type SuccessModalHandle
} from '../../components/SuccesModal';
import { AuthNavigationProp } from '../../navigation/types';
import { useAuth } from '../../apis/AuthContext';

interface Inputs {
  phone: string;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
}

interface Errors {
  phone?: string | null;
  email?: string | null;
  lastname?: string | null;
  firstname?: string | null;
  password?: string | null;
}

type SignUpScreenProps = {
  navigation: AuthNavigationProp<'Signup'>;
};

export const SignUp = ({ navigation }: SignUpScreenProps) => {
  const { signUpUser } = useAuth();
  const [inputs, setInputs] = useState<Inputs>({
    email: '',
    lastname: '',
    firstname: '',
    phone: '',
    password: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const ref = useRef<SuccessModalHandle>(null);
  const [isChecked, setChecked] = useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!inputs.firstname) {
      handleError('Please input first name', 'firstname');
      isValid = false;
    }

    if (!inputs.lastname) {
      handleError('Please input last name', 'lastname');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }

    if (isValid) {
      register();
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      await signUpUser(
        inputs.email,
        inputs.password,
        inputs.firstname,
        inputs.lastname,
        inputs.phone
      );
      Alert.alert('Success', 'Please verify your email');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleOnchange = (text: string, input: keyof Inputs) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error: string | null, input: keyof Errors) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const hiddenPhone = inputs.phone
    .split('')
    .map((d, i) => (i > 6 && i < 12 ? '*' : d))
    .join('');

  return (
    <ContentWrapper style={styles.container}>
      <BackHeader showProgress progressValueBlue={1} progressValueGrey={2} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text
              style={{
                marginTop: 30,
                fontWeight: 'bold',
                fontSize: 23,
                fontFamily: 'NeueMontreal-Bold'
              }}
            >
              Let’s Get you Started
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Kickstart your experience by providing your details
            </Text>
            <View style={styles.inputRow}>
              <View style={styles.inputCol}>
                <Input
                  onChangeText={(text) => handleOnchange(text, 'firstname')}
                  onFocus={() => handleError(null, 'firstname')}
                  label='First Name'
                  placeholder='Enter your first name'
                  error={errors.firstname}
                />
              </View>
              <View style={styles.inputCol}>
                <Input
                  onChangeText={(text) => handleOnchange(text, 'lastname')}
                  onFocus={() => handleError(null, 'lastname')}
                  label='Last Name'
                  placeholder='Enter your last name'
                  error={errors.lastname}
                />
              </View>
            </View>
            <Input
              keyboardType='email-address'
              onChangeText={(text) => handleOnchange(text, 'email')}
              onFocus={() => handleError(null, 'email')}
              label='Email'
              placeholder='Enter your email address'
              autoCapitalize='none'
              error={errors.email}
            />
            <Input
              keyboardType='phone-pad'
              onChangeText={(text) => handleOnchange(text, 'phone')}
              onFocus={() => handleError(null, 'phone')}
              label='Phone Number'
              placeholder='Enter your phone number'
              error={errors.phone}
              LeftComponent={
                <View style={styles.phone}>
                  <FlagNigeriaIcon />
                  <Text style={styles.phoneText}>+234</Text>
                </View>
              }
            />
            <Input
              secureTextEntry
              onChangeText={(text) => handleOnchange(text, 'password')}
              onFocus={() => handleError(null, 'password')}
              label='Password'
              placeholder='Enter your password'
              error={errors.password}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginVertical: 10
              }}
            >
              <Checkbox
                selected={isChecked}
                onSelect={() => setChecked((prev) => !prev)}
              />
              <Text>
                I hereby agree to the{' '}
                <Text style={{ color: apppurple }}>Terms and Condition</Text> of
                Savyn
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Button text='Continue' onPress={validate} />
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{ marginTop: 10 }}>
            Already have an account? <Text fontWeight='700'>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <SuccessModal
        onPress={() => {
          navigation.navigate('Login');
        }}
        ref={ref}
        title='Registration Successful'
        btnText='Continuew'
        subtitle={hiddenPhone}
        btnColor={apppurple}
      />
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingHorizontal: 20
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputCol: {
    flex: 1,
    marginRight: 10
  },
  phone: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 20,
    paddingRight: 5,
    borderRightColor: secondaryTextColor,
    borderRightWidth: 1
  },
  phoneText: {
    marginLeft: 5
  }
});
