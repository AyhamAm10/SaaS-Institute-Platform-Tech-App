import type { ReactNode } from 'react';
import type { Radius, Space } from '@/core/theme/metrics';
import type { Tone } from '@/core/theme/tones';

export type SurfaceVariant = 'glass' | 'solid' | 'hero' | 'tinted';

export interface SurfaceProps {
  variant?: SurfaceVariant;
  /** Tint of the `tinted` variant. */
  tone?: Tone | 'accent';
  padding?: Space;
  gap?: Space;
  radius?: Radius;
  /** Makes the whole surface a button. `label` is then required. */
  onPress?: () => void;
  label?: string;
  children?: ReactNode;
}
