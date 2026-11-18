import type { ReactNode } from 'react';
import { View } from 'react-native';
import { MAX_WIDTH, space } from '@/core/theme/metrics';

/** Fixed top slot of a screen (the page header); stays put while the body scrolls. */
export function ScreenHeader({ children }: { children: ReactNode }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, paddingHorizontal: space.lg, paddingTop: space.md, paddingBottom: space.sm }}>{children}</View>
    </View>
  );
}
