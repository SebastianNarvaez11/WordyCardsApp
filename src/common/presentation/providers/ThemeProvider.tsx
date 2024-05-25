import React, {PropsWithChildren, useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {useThemeStore} from '../store/useThemeStore';

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const {setTheme, isSystemTheme} = useThemeStore();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (isSystemTheme) {
      if (colorScheme === 'light') {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
  }, [isSystemTheme, colorScheme, setTheme]);

  return <>{children}</>;
};
