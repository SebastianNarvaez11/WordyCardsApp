import React from 'react';
import {DimensionValue, TextProps} from 'react-native';
import {Text as RNText} from 'react-native-ui-lib';

import {useThemeStore} from '../../store';
import {Font} from '../../theme';

interface CustomTextProps extends TextProps {
  text?: string | number;
  font?: Font;
  size?: number;
  color?: string;
  align?: 'center' | 'auto' | 'left' | 'right';
  width?: DimensionValue;
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  text,
  font = 'Quicksand-Regular',
  size = 30,
  color,
  align = undefined,
  width,
  ...props
}) => {
  const {colors} = useThemeStore();
  return (
    <RNText
      {...props}
      color={color || colors.text}
      style={[
        {
          fontFamily: font,
          fontSize: size,
          textAlign: align,
          width: width || 'auto',
          textAlignVertical: 'center',
        },
        props.style,
      ]}>
      {text}
      {children}
    </RNText>
  );
};
