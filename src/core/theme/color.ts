/** Pure color math used by tests (hex and rgba strings). */
type Rgba = [number, number, number, number];

export function parseColor(value: string): Rgba {
  const rgba = /^rgba?\(([^)]+)\)$/.exec(value);
  if (rgba) {
    const p = rgba[1].split(',').map((x) => Number(x.trim()));
    return [p[0], p[1], p[2], p[3] ?? 1];
  }
  const n = parseInt(value.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255, 1];
}

type Rgb = [number, number, number];

/** Composites `fg` (may carry alpha) over an opaque `bg`. */
export function over(fg: string, bg: Rgb): Rgb {
  const [r, g, b, a] = parseColor(fg);
  return [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a)];
}

function lum([r, g, b]: Rgb): number {
  const [x, y, z] = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * x + 0.7152 * y + 0.0722 * z;
}

/** WCAG contrast of `fg` on `bg`; translucent colors are composited over the opaque `base` canvas. */
export function contrast(fg: string, bg: string, base: string = bg): number {
  const back = over(bg, parseColor(base).slice(0, 3) as Rgb);
  const front = over(fg, back);
  const a = lum(front);
  const b = lum(back);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
