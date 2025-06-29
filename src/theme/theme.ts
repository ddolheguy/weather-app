import { ImageStyle, TextStyle, ViewStyle } from "react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const lightColors = {
  text: '#11181C',
  error: '#FF0000',
  highlight: '#000000',
  textInverse: '#fff',
  border: '#11181C',
  background: '#fff',
  inverseBackground: '#11181C',
  tint: tintColorLight,
  placeholder: '#687076',
  icon: '#687076',
};

const darkColors = {
  text: '#ECEDEE',
  error: '#FF0000',
  highlight: '#FFFFFF',
  textInverse: '#11181C',
  border: '#ECEDEE',
  background: '#151718',
  inverseBackground: '#fff',
  tint: tintColorDark,
  placeholder: '#9BA1A6',
  icon: '#9BA1A6',
};

export type ThemeColors = typeof lightColors;
export type Theme = {
  colors: ThemeColors;
};

export type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const theme = {  
  colors: {
    light: lightColors,
    dark: darkColors,
  },
};
