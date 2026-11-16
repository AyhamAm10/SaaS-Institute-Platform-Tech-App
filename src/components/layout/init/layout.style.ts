import type { ViewStyle } from 'react-native';
import { radius as radii, space } from '@/core/theme/metrics';
import type { Theme } from '@/core/theme/ThemeProvider';
import type { Align, BoxBg, Justify, LayoutProps } from './layout.types';

const ALIGN: Record<Align, ViewStyle['alignItems']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline',
};
const JUSTIFY: Record<Justify, ViewStyle['justifyContent']> = {
  start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around',
};

const bgOf = (t: Theme, bg: BoxBg): string => (bg === 'canvas' ? t.bg : bg === 'surface' ? t.surfaceSolid : t.subtle);

/** Pure mapping from layout props to a style (the only place layout keys become numbers). */
export function layoutStyle(p: LayoutProps, t: Theme): ViewStyle {
  return {
    flexDirection: p.direction,
    ...(p.gap !== undefined && { gap: space[p.gap] }),
    ...(p.padding !== undefined && { padding: space[p.padding] }),
    ...(p.px !== undefined && { paddingHorizontal: space[p.px] }),
    ...(p.py !== undefined && { paddingVertical: space[p.py] }),
    ...(p.pt !== undefined && { paddingTop: space[p.pt] }),
    ...(p.pb !== undefined && { paddingBottom: space[p.pb] }),
    ...(p.align && { alignItems: ALIGN[p.align] }),
    ...(p.justify && { justifyContent: JUSTIFY[p.justify] }),
    ...(p.wrap && { flexWrap: 'wrap' as const }),
    ...(p.fill && { flex: 1 }),
    ...(p.flex !== undefined && { flex: p.flex }),
    ...(p.width !== undefined && { width: p.width === 'full' ? ('100%' as const) : p.width }),
    ...(p.height !== undefined && { height: p.height }),
    ...(p.minHeight !== undefined && { minHeight: p.minHeight }),
    ...(p.radius !== undefined && { borderRadius: radii[p.radius] }),
    ...(p.bg && { backgroundColor: bgOf(t, p.bg) }),
    ...(p.opacity !== undefined && { opacity: p.opacity }),
  };
}

/** Props that are layout (and must not reach the native View). */
export const LAYOUT_KEYS = [
  'gap', 'padding', 'px', 'py', 'pt', 'pb', 'align', 'justify', 'wrap', 'flex', 'fill', 'width',
  'height', 'minHeight', 'radius', 'bg', 'opacity', 'direction',
] as const;

export function splitLayout<T extends LayoutProps>(props: T): { layout: LayoutProps; rest: Omit<T, (typeof LAYOUT_KEYS)[number]> } {
  const layout: Record<string, unknown> = {};
  const rest: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if ((LAYOUT_KEYS as readonly string[]).includes(k)) layout[k] = v;
    else rest[k] = v;
  }
  return { layout: layout as LayoutProps, rest: rest as Omit<T, (typeof LAYOUT_KEYS)[number]> };
}
