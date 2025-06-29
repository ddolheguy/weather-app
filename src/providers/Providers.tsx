import { StatusBar } from "expo-status-bar";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { WeatherProvider } from "./WeatherProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <WeatherProvider>
        {children}
      </WeatherProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
