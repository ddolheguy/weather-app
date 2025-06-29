import { NamedStyles, Theme } from './theme';

export const makeStyles = <T extends NamedStyles<T> | NamedStyles<unknown>>(
  styles: (theme: Theme) => T
) => {
  return (theme: Theme) => {
    return styles(theme);
  };
};
