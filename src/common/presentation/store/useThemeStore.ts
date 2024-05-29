import {create} from 'zustand';

import {StorageAdapter} from '../../adapters';
import {ThemeColors, darkColors, lightColors} from '../theme';

export type ThemeType = 'light' | 'dark';

interface IThemeStore {
  currentTheme: ThemeType;
  isSystemTheme: boolean;
  colors: ThemeColors;

  setTheme: (theme: ThemeType) => Promise<void>;
  setIsSystemTheme: (status: boolean) => void;
}

export const useThemeStore = create<IThemeStore>()(
  // persist(
  set => ({
    currentTheme: 'light',
    isSystemTheme: false,
    colors: lightColors,

    setTheme: async (theme: ThemeType) => {
      await StorageAdapter.setItem('THEME-WORDY-CARDS', theme);

      set({
        currentTheme: theme,
        colors: theme === 'light' ? lightColors : darkColors,
      });
    },

    setIsSystemTheme: (status: boolean) => {
      set({isSystemTheme: status});
    },
  }),
  //   {
  //     name: 'THEME-WORDY-CARDS',
  //     storage: createJSONStorage(() => AsyncStorage),
  //   },
  // ),
);
