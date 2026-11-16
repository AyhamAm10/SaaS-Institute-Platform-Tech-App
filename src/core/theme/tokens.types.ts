/**
 * Semantic design tokens, ported from admin-dashboard/src/theme/tokens.ts (same key names).
 * Identity: Jeel Al-Salam (orange #F16726 + ink #141416). Light = warm canvas + frosted glass,
 * dark = smoked glass. Orange is an accent, ink is the primary action color.
 * This file and core/brand are the only places allowed to hold color literals.
 */
export interface ThemeTokens {
  bg: string;
  surface: string;
  surfaceSolid: string;
  subtle: string;
  border: string;
  borderSubtle: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnBrand: string;
  brandPrimary: string;
  brandPrimaryHover: string;
  /** Text/icon color on a brandPrimary fill. */
  onBrandPrimary: string;
  brandAccent: string;
  brandAccentHover: string;
  brandAccentText: string;
  brandAccentSoft: string;
  brandAccentRing: string;
  successText: string;
  successSoft: string;
  successBorder: string;
  successSolid: string;
  dangerText: string;
  dangerSoft: string;
  dangerBorder: string;
  dangerSolid: string;
  infoText: string;
  infoSoft: string;
  infoBorder: string;
  infoSolid: string;
  glassBg: string;
  glassBgStrong: string;
  glassBorder: string;
  glassHighlight: string;
  glassBlur: number;
  overlay: string;
  inputBg: string;
  inputBorder: string;
  inputFocusBorder: string;
  inputPlaceholder: string;
  track: string;
  cardShadow: string;
  elev1: string;
  elev2: string;
  elev3: string;
  brandGlow: string;
  blobStart: string;
  blobMid: string;
  blobEnd: string;
  blobOpacity: number;
  /** Gradient stops of the hero ring stroke (same in both schemes). */
  ringStart: string;
  ringMid: string;
  ringEnd: string;
  /** Ink circle of the tab bar center button. */
  fab: string;
  fabIcon: string;
  /** Floating tab bar (a solid ink dock in both schemes). */
  dockBg: string;
  dockBorder: string;
  dockActive: string;
}
