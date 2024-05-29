import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Switch} from 'react-native-ui-lib';
import IconFe from 'react-native-vector-icons/Feather';

import {useThemeStore} from '../../store';

export const SwitchTheme = () => {
  const {currentTheme, setTheme, colors} = useThemeStore();

  const onChangeTheme = async (value: boolean) => {
    await setTheme(value ? 'dark' : 'light');
  };

  return (
    <View style={styles.container}>
      <IconFe name="sun" color={colors.text} size={20} />

      <Switch
        onColor={colors.primary}
        value={currentTheme === 'dark' ? true : false}
        onValueChange={onChangeTheme}
      />

      <IconFe name="moon" color={colors.text} size={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
});
