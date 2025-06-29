import { ErrorBoundaryProps, ErrorBoundary as ExpoErrorBoundary, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Providers } from '@/providers/Providers';
import React from 'react';

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <ExpoErrorBoundary {...props} />;
};

export const unstable_settings = {
  initialRouteName: 'index',
};

function App() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <Providers>
      <App />
      <StatusBar style="auto" />
    </Providers>
  );
}
