import type { Theme } from '@/core/theme/ThemeProvider';
import type { ColorRole } from '@/core/theme/roles';

export type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'danger';

export interface ButtonLook { bg: string; border: string; text: ColorRole }

/** Variant = data: token reads only. Primary is ink (the identity's action color), accent is orange. */
export function buttonLook(variant: ButtonVariant, t: Theme): ButtonLook {
  switch (variant) {
    case 'accent': return { bg: t.brandAccent, border: t.brandAccent, text: 'ink' };
    case 'ghost': return { bg: t.glassBgStrong, border: t.glassBorder, text: 'primary' };
    case 'danger': return { bg: t.dangerSoft, border: t.dangerBorder, text: 'danger' };
    default: return { bg: t.brandPrimary, border: t.brandPrimary, text: 'onPrimary' };
  }
}
