import type { ComponentProps } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { roleColor, type ColorRole } from '@/core/theme/roles';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Box } from '../layout';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const PX: Record<IconSize, number> = { xs: 14, sm: 18, md: 22, lg: 28, xl: 40 };

interface Props {
  /** Outline Ionicons name WITHOUT the `-outline` suffix (e.g. "home"). */
  name: IconName;
  size?: IconSize;
  tone?: ColorRole;
  /** Filled glyph instead of outline (active states). */
  filled?: boolean;
}

/** Decorative icon (hidden from screen readers; the parent control carries the label). */
export function Icon({ name, size = 'md', tone = 'primary', filled = false }: Props) {
  const theme = useTheme();
  const glyph = (filled ? name : `${name}-outline`) as IconName;
  return (
    <Box width={PX[size]} height={PX[size]} align="center" justify="center" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Ionicons name={glyph} size={PX[size]} color={roleColor(theme, tone)} />
    </Box>
  );
}
