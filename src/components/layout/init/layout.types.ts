import type { ViewProps } from 'react-native';
import type { Radius, Space } from '@/core/theme/metrics';

export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around';
/** Solid backgrounds a layout box may take (token names, never colors). */
export type BoxBg = 'canvas' | 'surface' | 'subtle';

/** Token-typed layout props: values are token KEYS (core.md section 6), never numbers or colors. */
export interface LayoutProps extends ViewProps {
  gap?: Space;
  padding?: Space;
  px?: Space;
  py?: Space;
  pt?: Space;
  pb?: Space;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
  flex?: number;
  /** flex: 1 shortcut. */
  fill?: boolean;
  /** Pixel size for fixed-size pieces (icons, avatars); layout otherwise stays fluid. */
  width?: number | 'full';
  height?: number;
  minHeight?: number;
  radius?: Radius;
  bg?: BoxBg;
  opacity?: number;
  direction?: 'row' | 'column';
}
