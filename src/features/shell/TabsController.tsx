import { Tabs } from 'expo-router';
import { useTheme } from '@/core/theme/ThemeProvider';
import { ShellTabBar } from './ui/ShellTabBar';

/** The signed-in tabs (today, timetable, sections, more) with the floating dock. */
export function TabsController() {
  const theme = useTheme();
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: theme.bg } }}
      tabBar={({ state, navigation }) => (
        <ShellTabBar
          activeKey={state.routes[state.index]?.name ?? 'index'}
          onSelect={(key) => navigation.navigate(key)}
        />
      )}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="timetable" />
      <Tabs.Screen name="sections" />
      <Tabs.Screen name="exams" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
