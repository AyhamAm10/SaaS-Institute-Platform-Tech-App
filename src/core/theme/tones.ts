import type { ThemeTokens } from './tokens';

export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
export type ToneKey = Tone | 'accent';

export interface ToneColors {
  /** Text / icon color. */
  fg: string;
  /** Soft tinted background. */
  bg: string;
  border: string;
  /** Saturated color for dots, bars and ring strokes. */
  solid: string;
}

/** Maps a semantic tone to token colors. `warning` (late, due soon) is the orange accent family. */
export function toneColors(t: ThemeTokens, tone: ToneKey): ToneColors {
  switch (tone) {
    case 'success': return { fg: t.successText, bg: t.successSoft, border: t.successBorder, solid: t.successSolid };
    case 'danger': return { fg: t.dangerText, bg: t.dangerSoft, border: t.dangerBorder, solid: t.dangerSolid };
    case 'info': return { fg: t.infoText, bg: t.infoSoft, border: t.infoBorder, solid: t.infoSolid };
    case 'warning':
    case 'accent':
      return { fg: t.brandAccentText, bg: t.brandAccentSoft, border: t.brandAccentRing, solid: t.brandAccent };
    default: return { fg: t.textSecondary, bg: t.track, border: t.border, solid: t.textMuted };
  }
}
