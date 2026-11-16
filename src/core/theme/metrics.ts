/** Scheme-independent shape, spacing, type and motion tokens (ported from the dashboard sharedTokens). */
export const space = { none: 0, xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28, huge: 40 } as const;
export type Space = keyof typeof space;

export const radius = { none: 0, sm: 10, md: 14, lg: 20, xl: 28, pill: 999 } as const;
export type Radius = keyof typeof radius;

export const sizes = { xs: 24, sm: 32, md: 40, lg: 52, xl: 72, xxl: 96 } as const;
export type Size = keyof typeof sizes;

export const durations = { fast: 160, base: 240, slow: 400, sweep: 1100, stagger: 60 } as const;

/** Alexandria weights allowed by the design system: 300, 400, 500, 600 only. */
export const fontFamily = {
  light: 'Alexandria_300Light',
  regular: 'Alexandria_400Regular',
  medium: 'Alexandria_500Medium',
  semibold: 'Alexandria_600SemiBold',
} as const;

export const type = {
  display: { fontSize: 44, lineHeight: 56, fontFamily: fontFamily.semibold },
  title: { fontSize: 26, lineHeight: 36, fontFamily: fontFamily.semibold },
  heading: { fontSize: 18, lineHeight: 28, fontFamily: fontFamily.medium },
  body: { fontSize: 15, lineHeight: 24, fontFamily: fontFamily.regular },
  label: { fontSize: 13, lineHeight: 20, fontFamily: fontFamily.medium },
  caption: { fontSize: 12, lineHeight: 18, fontFamily: fontFamily.regular },
  number: { fontSize: 22, lineHeight: 30, fontFamily: fontFamily.medium },
} as const;

export type TypeVariant = keyof typeof type;

/** Minimum touch target (pt/dp). */
export const HIT = 44;

/** Max content width so tablets and the web preview keep a phone-like column. */
export const MAX_WIDTH = 560;
