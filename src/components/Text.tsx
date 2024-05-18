import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';

import { primaryTextColor } from '../constants/colors';

type FontWeight = '300' | '400' | '600' | '700';

type FontFamily =
  | 'NeueMontreal-Regular'
  | 'NeueMontreal-Light'
  | 'NeueMontreal-Medium'
  | 'NeueMontreal-Bold';

export type TextPropTypes = {
  children?: string | React.ReactNode;
  fontWeight?: FontWeight;
  style?: TextStyle; // Update TextProps to TextStyle for style
};

export const Text = ({
  children,
  style,
  fontWeight = '400',
  ...props
}: TextPropTypes) => {
  const getFontFamily = (fontWeight: FontWeight): FontFamily => {
    switch (fontWeight) {
      case '300':
        return 'NeueMontreal-Light';
      case '400':
        return 'NeueMontreal-Regular';
      case '600':
        return 'NeueMontreal-Medium';
      case '700':
        return 'NeueMontreal-Bold';
      default:
        return 'NeueMontreal-Regular';
    }
  };

  const fontSize = 13;

  return (
    <RNText
      maxFontSizeMultiplier={1.3}
      minimumFontScale={0.7}
      style={[
        {
          color: primaryTextColor,
          fontSize,
          lineHeight: (style?.fontSize ?? fontSize) * 1.5
        },
        { fontFamily: getFontFamily(fontWeight) },
        style as TextStyle // Use type assertion to TextStyle
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
