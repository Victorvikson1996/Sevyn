import React from 'react';
import {
  Text as RNText,
  TextStyle,
  TextProps as RNTextProps
} from 'react-native';

import { primaryTextColor } from '../constants/colors';

type FontWeight = '300' | '400' | '600' | '700';

type FontFamily =
  | 'NeueMontreal-Regular'
  | 'NeueMontreal-Light'
  | 'NeueMontreal-Medium'
  | 'NeueMontreal-Bold';

export type TextPropTypes = RNTextProps & {
  children?: string | React.ReactNode;
  fontWeight?: FontWeight;
  style?: TextStyle;
};

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

export const Text: React.FC<TextPropTypes> = ({
  children,
  style,
  fontWeight = '400',
  ...props
}) => {
  const computedFontSize = style?.fontSize ?? fontSize;
  const lineHeight = computedFontSize * 1.5;

  return (
    <RNText
      maxFontSizeMultiplier={1.3}
      minimumFontScale={0.7}
      style={[
        {
          color: primaryTextColor,
          fontSize: computedFontSize,
          lineHeight,
          fontFamily: getFontFamily(fontWeight)
        },
        style as TextStyle
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
