import type { ReactNode } from 'react';
import type { TextProps as RNTextProps } from 'react-native';
import type { ColorRole } from '@/core/theme/roles';
import type { TypeVariant } from '@/core/theme/metrics';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  variant?: TypeVariant;
  tone?: ColorRole;
  align?: 'start' | 'center' | 'end';
  /** Equal-width digits (times, counters). */
  tabular?: boolean;
  strike?: boolean;
  children?: ReactNode;
}
