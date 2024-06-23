import React, { type ReactNode, useRef, useState } from 'react';
import {
  type TextStyle,
  View,
  StyleSheet,
  type ViewStyle,
  I18nManager,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
  type TextInputProps
} from 'react-native';

import { Text } from './Text';

interface InputProps {
  value: string;
  codeLength: number;
  cellSize?: number;
  cellSpacing?: number;
  placeholder?: string;
  password?: boolean;
  mask: ReactNode;
  autoFocus: boolean;
  containerStyle?: ViewStyle;
  cellStyle?: ViewStyle;
  cellStyleFocused?: ViewStyle;
  textStyle?: TextStyle;
  restrictToNumbers: boolean;
  testID?: string | number;
  editable: boolean;
  MaskDelay?: number;
  inputProps?: TextInputProps;
  disableFullscreenUI?: boolean;
  onTextChange: (code: string) => void;
  onFulfill?: (code: string) => void;
  onBackspace?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const PinInput = ({
  onTextChange,
  value = '',
  codeLength = 4,
  cellSize = 48,
  cellSpacing = 4,
  placeholder = '',
  password = false,
  mask = '*',
  MaskDelay = 200,
  autoFocus = false,
  restrictToNumbers = false,
  containerStyle,
  cellStyle,
  cellStyleFocused,
  textStyle,
  editable = true,
  inputProps = {},
  disableFullscreenUI = true,
  onFulfill,
  onFocus,
  onBackspace,
  onBlur
}: InputProps) => {
  const [maskDelay, setMaskDelay] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef(null);

  const _inputCode = (code: string) => {
    if (restrictToNumbers) {
      code = (code.match(/[0-9]/g) ?? []).join('');
    }

    if (onTextChange) {
      onTextChange(code);
    }
    if (code.length === codeLength && onFulfill) {
      onFulfill(code);
    }

    // handle password mask
    const maskDelay = password && code.length > value.length; // only when input new char
    setMaskDelay(maskDelay);

    if (maskDelay) {
      // mask password after delay
      //  clearTimeout(maskTimeout);
      const maskTimeout = setTimeout(() => {
        setMaskDelay(true);
      }, MaskDelay);
      clearTimeout(maskTimeout);
    }
  };

  const _keyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (value === '') {
        onBackspace?.();
      }
    }
  };

  const _onFocused = () => {
    setFocused(true);
    onFocus?.();
  };

  const _onBlurred = () => {
    setFocused(false);
    onBlur?.();
  };

  return (
    <View
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          height: cellSize
        },
        styles.containerDefault,
        containerStyle
      ]}
    >
      <View
        style={{
          position: 'absolute',
          margin: 0,
          height: '100%',
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          alignItems: 'center'
        }}
      >
        {[...Array(codeLength)].map((_, idx) => {
          const cellFocused = focused && idx === value.length;
          const filled = idx < value.length;
          const last = idx === value.length - 1;
          const showMask = filled && password && (!maskDelay || !last);
          const isPlaceholderText = typeof placeholder === 'string';
          const isMaskText = typeof mask === 'string';
          const pinCodeChar = value.charAt(idx);

          let cellText = null;
          if (filled || placeholder !== null) {
            if (showMask && isMaskText) {
              cellText = mask;
            } else if (!filled && isPlaceholderText) {
              cellText = placeholder;
            } else if (pinCodeChar) {
              // cellText = pinCodeChar
              cellText = '\u2022';
            }
          }

          const placeholderComponent = !isPlaceholderText ? placeholder : null;
          const maskComponent = showMask && !isMaskText ? mask : null;
          const isCellText = typeof cellText === 'string';

          return (
            <View
              key={idx}
              style={[
                {
                  width: cellSize,
                  height: cellSize,
                  marginLeft: cellSpacing / 2,
                  marginRight: cellSpacing / 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center'
                },

                styles.cellDefault,
                cellStyle,
                cellFocused && styles.cellFocusedDefault
                // filled && cellStyleFilled : {}
              ]}
            >
              {isCellText && !maskComponent && (
                <Text
                  style={[
                    styles.textStyleDefault,
                    textStyle,
                    cellFocused && [
                      styles.textStyleFocusedDefault,
                      cellStyleFocused
                    ]
                  ]}
                >
                  {cellText}
                  {/* {maskComponent} */}
                </Text>
              )}

              {!isCellText && !maskComponent && placeholderComponent}
              {isCellText && maskComponent}
            </View>
          );
        })}
      </View>
      <TextInput
        disableFullscreenUI={disableFullscreenUI}
        value={value}
        ref={inputRef}
        onChangeText={_inputCode}
        onKeyPress={_keyPress}
        onFocus={_onFocused}
        onBlur={_onBlurred}
        spellCheck={false}
        secureTextEntry
        autoFocus={autoFocus}
        keyboardType={'number-pad'}
        numberOfLines={1}
        caretHidden
        maxLength={codeLength}
        selection={{
          start: value.length,
          end: value.length
        }}
        style={{
          flex: 1,
          opacity: 0,
          textAlign: 'center'
        }}
        editable={editable}
        {...inputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerDefault: {},
  cellDefault: {
    borderColor: 'gray',
    borderWidth: 1
  },
  cellFocusedDefault: {
    borderColor: 'black',
    borderWidth: 2
  },
  textStyleDefault: {
    color: 'black',
    fontSize: 24
  },
  textStyleFocusedDefault: {
    color: 'black'
  }
});
