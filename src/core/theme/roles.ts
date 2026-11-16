import { toneColors, type ToneKey } from './tones';
import type { ThemeTokens } from './tokens';

/** Foreground color roles for text and icons. Tones (success, danger...) are accepted as roles too. */
export type ColorRole =
  | 'primary' | 'secondary' | 'muted' | 'onBrand' | 'onPrimary' | 'accentSolid' | 'inverse' | 'ink'
  | ToneKey;

export function roleColor(t: ThemeTokens, role: ColorRole): string {
  switch (role) {
    case 'primary': return t.textPrimary;
    case 'secondary': return t.textSecondary;
    case 'muted': return t.textMuted;
    case 'onBrand': return t.textOnBrand;
    case 'onPrimary': return t.onBrandPrimary;
    case 'accentSolid': return t.brandAccent;
    case 'inverse': return t.fabIcon;
    case 'ink': return t.fab;
    default: return toneColors(t, role).fg;
  }
}
