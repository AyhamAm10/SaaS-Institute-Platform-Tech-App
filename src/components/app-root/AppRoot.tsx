import type { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from '@/core/api/query-client';
import { ThemeProvider, useTheme } from '@/core/theme/ThemeProvider';

function ThemedStatusBar() {
  return <StatusBar style={useTheme().scheme === 'dark' ? 'light' : 'dark'} />;
}

/** Providers of the whole app: gestures, safe area, server cache and the theme. */
export function AppRoot({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ThemedStatusBar />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
