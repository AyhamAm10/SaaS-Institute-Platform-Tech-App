/**
 * The ONLY place that knows which institute this app is for.
 * A future multi-institute build swaps this module (name, logo, theme tokens) and nothing else.
 * Institute colors/logo/name coming from GET /mobile/me are intentionally NOT used for theming.
 */
export const BRAND = {
  name: 'معهد جيل السلام',
  /** Accessible description of the logo mark. */
  logoLabel: 'شعار معهد جيل السلام',
  /** Background behind the logo (splash, icon, login). */
  ink: '#141416',
} as const;
