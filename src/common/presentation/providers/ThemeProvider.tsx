import React, {PropsWithChildren, useEffect} from 'react';

// import {useColorScheme} from 'react-native';
import {StorageAdapter} from '../../adapters';
import {ThemeType, useThemeStore} from '../store';

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const {setTheme} = useThemeStore();
  // const colorScheme = useColorScheme();

  // useEffect(() => {
  //   if (isSystemTheme) {
  //     if (colorScheme === 'light') {
  //       setTheme('light');
  //     } else {
  //       setTheme('dark');
  //     }
  //   }
  // }, [isSystemTheme, colorScheme, setTheme]);

  useEffect(() => {
    const getSavedTheme = async () => {
      const theme =
        (await StorageAdapter.getItem('THEME-WORDY-CARDS')) || 'light';
      await setTheme((theme as ThemeType) || 'light');
    };
    getSavedTheme();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
