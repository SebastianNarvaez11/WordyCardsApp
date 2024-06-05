import React, {FC} from 'react';
import {type Control, Controller} from 'react-hook-form';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Picker} from 'react-native-ui-lib';
import IconIo from 'react-native-vector-icons/Ionicons';

import {ISelectOption} from '../../../infrastructure/interfaces';
import {useThemeStore} from '../../store';
import {globalStyles} from '../../theme';
import {Text} from '../ui';

interface Props {
  label?: string;
  textInfo?: string;
  placeholder?: string;
  options: ISelectOption[];
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  editable?: boolean;

  control: Control<any>;
  error?: string | undefined;
  name: string;
  required?: boolean;
}

export const SelectFieldIcons: FC<Props> = ({
  textInfo,
  placeholder = 'Seleccione una opción',
  options = [],
  inputStyle,
  label,
  labelStyle,
  containerStyle,
  editable,
  control,
  error,
  name,
  required,
}) => {
  const {colors} = useThemeStore();

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          text={label}
          font={'Quicksand-Bold'}
          size={14}
          style={[globalStyles.inputlabel, labelStyle]}
        />
      )}
      {textInfo && (
        <Text
          text={textInfo}
          font={'Quicksand-Regular'}
          size={12}
          color={colors.gray}
          style={styles.textInfo}
        />
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Picker
            topBarProps={{
              containerStyle: {backgroundColor: colors.backgroundSecondary},
            }}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            searchStyle={{color: colors.text}}
            listProps={{style: {backgroundColor: colors.backgroundSecondary}}}
            charCounterStyle={{backgroundColor: colors.backgroundSecondary}}
            onBlur={onBlur}
            showSearch
            onChange={onChange}
            value={value}
            color={colors.text}
            style={[
              globalStyles.input,
              {backgroundColor: colors.backgroundSecondary},
              styles.input,
              inputStyle,
            ]}>
            {options.map(item => (
              <Picker.Item
                renderItem={() => (
                  <IconIo
                    name={item.value}
                    size={40}
                    color={colors.primary100}
                  />
                )}
                key={item.label}
                label={item.label}
                value={item.value}
                labelStyle={{color: colors.primary}}
              />
            ))}
          </Picker>
        )}
      />

      <IconIo
        name="chevron-down-outline"
        size={15}
        color={colors.gray}
        style={styles.icon}
      />

      {error && (
        <Text color={colors.danger} style={globalStyles.inputError} size={12}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    paddingRight: 10,
  },
  input: {width: '100%'},
  icon: {
    position: 'absolute',
    bottom: 7,
    right: 10,
  },
  textInfo: {
    marginBottom: 5,
  },
});
