import {StyleSheet} from 'react-native';

export interface ThemeColors {
  primary: string;
  primary900: string;
  primary100: string;
  secondary: string;
  success: string;
  success100: string;
  warning: string;
  warning100: string;
  danger: string;
  danger100: string;
  info: string;
  info100: string;
  dark: string;
  text: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  background: string;
  white: string;
  black: string;
  gray: string;
  gray50: string;
  gray100: string;
  green: string;
  selected: string;
  skeleton1: string;
  skeleton2: string;
  skeleton3: string;
}

export const lightColors: ThemeColors = {
  primary: '#6461DB',
  primary900: '#5A60B9',
  primary100: '#868ACB',
  secondary: '#6461DB',
  success: '#7aae30',
  success100: 'rgba(121, 174, 48, 0.16)',
  warning: '#F19816',
  warning100: '#F1981616',
  danger: '#e71d36',
  danger100: '#e71d3616',
  info: '#10CDEE',
  info100: '#10CDEE16',
  text: '#181734 ',
  dark: '#22223b',
  backgroundPrimary: '#ffffff',
  backgroundSecondary: '#f7f7f7',
  background: '#f7f7f7',
  white: '#ffffff',
  black: '#1e1e1e',
  gray: '#858585',
  gray50: '#E6E6E7',
  gray100: '#c2c2c2',
  green: '#0D6E30',
  selected: '#F8EFF4',
  skeleton1: '#ECECEC',
  skeleton2: '#F0F0F0',
  skeleton3: '#F1F1F1',
};

export const darkColors: ThemeColors = {
  primary: '#6461DB',
  primary900: '#5A57C5',
  primary100: '#B1B1EC33',
  secondary: '#6461DB',
  success: '#7aae30',
  success100: 'rgba(121, 174, 48, 0.16)',
  warning: '#F19816',
  warning100: '#F1981616',
  danger: '#e71d36',
  danger100: 'rgba(231, 29, 53, 0.16)',
  info: '#10CDEE',
  info100: '#10CDEE16',
  text: '#ffffff',
  dark: '#22223b',
  backgroundSecondary: '#171818',
  backgroundPrimary: '#1B1C1D',
  background: '#f7f7f7',
  white: '#ffffff',
  black: '#1e1e1e',
  gray: '#858585',
  gray50: 'rgba(230, 230, 231, 0.28)',
  gray100: '#c2c2c2',
  green: '#0D6E30',
  selected: '#1B1C1D',
  skeleton1: '#171818',
  skeleton2: '#1f2022',
  skeleton3: '#1B1C1D',
};

export const globalStyles = StyleSheet.create({
  input: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  inputlabel: {
    marginBottom: 5,
  },
  inputError: {
    marginTop: 5,
  },
});
