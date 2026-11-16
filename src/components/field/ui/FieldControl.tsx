import type { ReactNode } from 'react';
import { View } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

/** The input box: glass fill, hairline border, danger border when invalid. */
export function FieldControl({ invalid, children }: { invalid?: boolean; children: ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={{
        minHeight: HIT + 8, borderRadius: radius.md, backgroundColor: theme.inputBg, borderWidth: 1,
        borderColor: invalid ? theme.dangerSolid : theme.inputBorder, paddingHorizontal: space.lg,
        flexDirection: 'row', alignItems: 'center', gap: space.sm,
      }}
    >
      {children}
    </View>
  );
}
