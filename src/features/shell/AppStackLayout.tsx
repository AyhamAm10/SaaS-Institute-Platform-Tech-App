import { Stack } from 'expo-router';
import { useTheme } from '@/core/theme/ThemeProvider';
import { usePushBridge } from '@/features/notifications';

/** Signed-in navigator: the tabs, with pushed screens (notifications) above them. */
export function AppStackLayout() {
  const theme = useTheme();
  usePushBridge();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.bg } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="exams/[id]" />
    </Stack>
  );
}
