import { Text as RNText } from 'react-native';
import { type } from '@/core/theme/metrics';
import { roleColor } from '@/core/theme/roles';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { TextProps } from './init/text.types';

/** The app is Arabic-only (always RTL): the END of a line is physically on the left. */
const ALIGN = { start: 'auto', center: 'center', end: 'left' } as const;

/** The only text primitive. Alexandria weights come from `variant`; never set fontWeight. */
export function Text({ variant = 'body', tone = 'primary', align, tabular, strike, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <RNText
      {...props}
      style={[
        type[variant],
        { writingDirection: 'rtl' },
        { color: roleColor(theme, tone) },
        align && { textAlign: ALIGN[align] },
        tabular && { fontVariant: ['tabular-nums'] },
        strike && { textDecorationLine: 'line-through' },
      ]}
    />
  );
}
