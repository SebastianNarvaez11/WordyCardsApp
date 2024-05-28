import React from 'react';
import {DimensionValue, TextProps} from 'react-native';
import {Text as RNText} from 'react-native-ui-lib';

import {useThemeStore} from '../../store';
import {Font} from '../../theme';

interface CustomTextProps extends TextProps {
  text?: string;
  font?: Font;
  size?: number;
  color?: string;
  align?: 'center' | 'auto' | 'left' | 'right';
  width?: DimensionValue;
}

export const Text: React.FC<CustomTextProps> = ({
  children,
  text,
  font = 'Lato-Regular',
  size = 30,
  color,
  align = undefined,
  width = '100%',
  ...props
}) => {
  const {colors} = useThemeStore();
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: font,
          fontSize: size,
          color: color ? color : colors.text,
          textAlign: align,
          width: width,
        },
        props.style,
      ]}>
      {text}
      {children}
    </RNText>
  );
};
