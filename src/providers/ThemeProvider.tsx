import { Theme, theme } from "@/theme/theme";
import { createContext, useMemo } from "react";
import { useColorScheme } from "react-native";

export const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const deviceTheme = useColorScheme() ?? 'light';

  const values = useMemo(() => ({ colors: theme.colors[deviceTheme] }), [deviceTheme]);
  return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>;
}
