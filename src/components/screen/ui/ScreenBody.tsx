import type { ReactNode } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_WIDTH, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TAB_BAR_HEIGHT } from '../../tab-bar/init/tab-bar.types';
import { useScreen } from '../screen.context';

/** Scrollable content column: 16dp gutters, phone-width on large screens, room for the tab bar. */
export function ScreenBody({ children }: { children: ReactNode }) {
  const { withTabBar, onRefresh, refreshing } = useScreen();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const bottom = insets.bottom + space.lg + (withTabBar ? TAB_BAR_HEIGHT + space.xl : 0);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: bottom }}
      refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.brandAccent} /> : undefined}
    >
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, paddingHorizontal: space.lg, gap: space.lg }}>{children}</View>
    </ScrollView>
  );
}
