import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
  type TextStyle,
  type TouchableOpacityProps,
  View
} from 'react-native';

import {
  apppurple,
  lightGrey,
  primaryBlue,
  whiteText
} from '../constants/colors';
import { Text, type TextPropTypes } from './Text';

type FontWeight = '300' | '400' | '600' | '700';

type ButtonProps = TouchableOpacityProps & {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  outlineColor?: string;
  textProps?: TextPropTypes;
  loading?: boolean;
  icon?: JSX.Element;
  fontWeight?: FontWeight;
  // fontWeight?: TextStyle['fontWeight']
};

export const Button = ({
  text,
  onPress,
  icon,
  backgroundColor = apppurple,
  textColor = whiteText,
  style,
  outlineColor,
  textStyle,
  textProps,
  loading,
  disabled,
  fontWeight = '600',
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.button,
        {
          backgroundColor: disabled ? lightGrey : backgroundColor,
          borderColor: outlineColor,
          borderWidth: outlineColor ? 1 : 0
        },
        style as ViewStyle
      ]}
      disabled={disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size='small' animating color={textColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && <View style={{ paddingRight: 7 }}>{icon}</View>}
          <Text
            fontWeight={fontWeight}
            style={[
              styles.buttonText,
              { color: disabled ? whiteText : textColor, fontWeight },
              textStyle
            ]}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingHorizontal: 48,
    height: 48,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 13
  }
});
