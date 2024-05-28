import React, {FC} from 'react';
import {type Control, Controller} from 'react-hook-form';
import {TextInputProps, TextStyle, View, ViewStyle} from 'react-native';
import {TextField as UITextField} from 'react-native-ui-lib';

import {useThemeStore} from '../../store';
import {globalStyles} from '../../theme';
import {Text} from '../ui';

interface Props extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;

  control: Control<any>;
  error?: string | undefined;
  name: string;
  required?: boolean;
}

export const TextField: FC<Props> = ({
  label,
  labelStyle,
  containerStyle,
  control,
  error,
  name,
  required,
  editable = true,
  ...props
}) => {
  const {colors} = useThemeStore();

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          text={label}
          font={'Lato-Bold'}
          size={14}
          style={[globalStyles.inputlabel, labelStyle]}
        />
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <UITextField
            {...props}
            placeholderTextColor={colors.gray100}
            color={editable ? colors.text : colors.gray}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            containerStyle={[
              globalStyles.input,
              {backgroundColor: colors.backgroundSecondary},
              props.style,
            ]}
          />
        )}
      />
      {error && (
        <Text color={colors.danger} style={globalStyles.inputError} size={12}>
          {error}
        </Text>
      )}
    </View>
  );
};
