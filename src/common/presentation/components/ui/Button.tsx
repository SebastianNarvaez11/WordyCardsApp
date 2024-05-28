import React, {FC} from 'react';
import {
  ActivityIndicator,
  DimensionValue,
  Pressable,
  PressableProps,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Text} from '.';
import {useThemeStore} from '../../store';

interface Props extends PressableProps {
  children?: React.ReactNode;
  label?: string;
  color?: string;
  labelColor?: string;
  labelSize?: number;
  height?: DimensionValue;
  width?: DimensionValue;
  labelStyle?: TextStyle;
  outline?: boolean;
  isLoading?: boolean;
}
export const Button: FC<Props> = ({
  children,
  label,
  labelColor,
  labelSize = 18,
  color,
  height = 45,
  width = '100%',
  labelStyle,
  outline,
  isLoading,
  ...props
}) => {
  const {colors} = useThemeStore();

  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        styles.container,
        {
          backgroundColor: outline
            ? 'transparent'
            : color
            ? color
            : colors.primary,
          borderWidth: outline ? 1 : 0,
          borderColor: outline ? (color ? color : colors.primary) : undefined,
          height: height,
          width: width,
          opacity: pressed ? 0.8 : 1,
        },
        props.style as ViewStyle,
      ]}>
      {children}
      {label && (
        <>
          {!isLoading ? (
            <Text
              align="center"
              text={label}
              font={'Lato-Regular'}
              size={labelSize}
              color={
                labelColor ? labelColor : outline ? colors.text : colors.white
              }
              style={[labelStyle]}
            />
          ) : (
            <ActivityIndicator color={colors.white} />
          )}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
