import fs from 'fs';
import path from 'path';
import { contrast } from '@/core/theme/color';
import { roleColor } from '@/core/theme/roles';
import { toneColors } from '@/core/theme/tones';
import { darkTokens, lightTokens, type ThemeTokens } from '@/core/theme/tokens';
import { BRAND } from '@/core/brand';

const SCHEMES = { light: lightTokens, dark: darkTokens } as const;

describe('identity tokens (parity with the admin dashboard)', () => {
  it('spot-checks the brand values', () => {
    expect(lightTokens.brandAccent).toBe('#F16726');
    expect(lightTokens.brandPrimary).toBe('#141416');
    expect(lightTokens.bg).toBe('#F5F3F0');
    expect(darkTokens.bg).toBe('#0E0E10');
    expect(darkTokens.brandAccent).toBe('#F16726');
    expect(BRAND.ink).toBe('#141416');
    expect(lightTokens.blobStart).toBe('#F9A272');
    expect(lightTokens.blobEnd).toBe('#D4541A');
  });

  it('keeps the dashboard key names and values for the ported solid colors', () => {
    const file = path.resolve(__dirname, '../../../admin-dashboard/src/theme/tokens.ts');
    if (!fs.existsSync(file)) return; // the dashboard repo is not always checked out next to the app
    const text = fs.readFileSync(file, 'utf8');
    const block = (name: string, next: string) => text.slice(text.indexOf(`export const ${name}`), text.indexOf(next));
    const blocks = { light: block('lightTokens', 'export const darkTokens'), dark: block('darkTokens', 'export const sharedTokens') };
    const keys: (keyof ThemeTokens)[] = [
      'bg', 'surfaceSolid', 'subtle', 'textPrimary', 'textSecondary', 'textOnBrand', 'brandPrimary', 'brandPrimaryHover',
      'brandAccent', 'brandAccentHover', 'brandAccentText', 'brandAccentSoft', 'brandAccentRing', 'blobStart', 'blobMid', 'blobEnd',
      'surface', 'glassBg', 'glassBgStrong', 'glassBorder', 'border',
    ];
    for (const scheme of ['light', 'dark'] as const) {
      for (const key of keys) {
        const m = new RegExp(`\\b${key}:\\s*'([^']+)'`).exec(blocks[scheme]);
        expect(m).not.toBeNull();
        expect(SCHEMES[scheme][key]).toBe(m?.[1]);
      }
    }
  });
});

describe('contrast (WCAG AA)', () => {
  for (const [name, t] of Object.entries(SCHEMES)) {
    describe(name, () => {
      const onCanvas = (fg: string, min: number) => expect(contrast(fg, t.bg)).toBeGreaterThanOrEqual(min);
      const onGlass = (fg: string, min: number) => expect(contrast(fg, t.surface, t.bg)).toBeGreaterThanOrEqual(min);

      it('text on the canvas and on glass cards', () => {
        for (const fg of [t.textPrimary, t.textSecondary, t.textMuted]) {
          onCanvas(fg, 4.5);
          onGlass(fg, 4.5);
        }
      });

      it('tone text on its own soft tint (pills, tiles) and on glass', () => {
        for (const tone of ['success', 'danger', 'info', 'warning', 'accent'] as const) {
          const c = toneColors(t, tone);
          expect(contrast(c.fg, c.bg, t.surfaceSolid)).toBeGreaterThanOrEqual(4.5);
          onCanvas(c.fg, 4.5);
          onGlass(c.fg, 4.5);
        }
      });

      it('text on the ink action fill and on the tab bar button', () => {
        expect(contrast(t.onBrandPrimary, t.brandPrimary)).toBeGreaterThanOrEqual(4.5);
        expect(contrast(t.fabIcon, t.fab)).toBeGreaterThanOrEqual(4.5);
      });

      it('ink label on the orange accent button', () => {
        expect(contrast(roleColor(t, 'ink'), t.brandAccent)).toBeGreaterThanOrEqual(4.5);
      });

      it('white on orange only qualifies for large/bold text (>= 3)', () => {
        expect(contrast(t.textOnBrand, t.brandAccent)).toBeGreaterThanOrEqual(3);
      });
    });
  }
});

describe('tones', () => {
  it('maps late (warning) to the orange accent family and present to success green', () => {
    expect(toneColors(lightTokens, 'warning').solid).toBe('#F16726');
    expect(toneColors(lightTokens, 'warning').fg).toBe('#A94215');
    expect(toneColors(lightTokens, 'success').solid).toBe('#2F8F5B');
    expect(toneColors(lightTokens, 'danger').solid).toBe('#C2412D');
  });
});
