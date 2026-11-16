import type { ViewStyle } from 'react-native';
import type { Theme } from '@/core/theme/ThemeProvider';
import { toneColors, type Tone } from '@/core/theme/tones';
import type { SurfaceVariant } from './surface.types';

/** Variant = data: each entry reads tokens only. Add a variant here, not in a part. */
export function surfaceStyle(variant: SurfaceVariant, theme: Theme, tone: Tone | 'accent' = 'neutral'): ViewStyle {
  switch (variant) {
    case 'solid':
      return { backgroundColor: theme.surfaceSolid, borderColor: theme.border, borderWidth: 1, boxShadow: theme.elev1 };
    case 'hero':
      return { backgroundColor: theme.glassBgStrong, borderColor: theme.glassBorder, borderWidth: 1, boxShadow: theme.elev2 };
    case 'tinted': {
      const c = toneColors(theme, tone);
      return { backgroundColor: c.bg, borderColor: c.border, borderWidth: 1 };
    }
    default:
      return { backgroundColor: theme.glassBg, borderColor: theme.glassBorder, borderWidth: 1, boxShadow: theme.cardShadow };
  }
}

/** Variants that sit on a frosted (blurred) layer. */
export const FROSTED: readonly SurfaceVariant[] = ['glass', 'hero'];
