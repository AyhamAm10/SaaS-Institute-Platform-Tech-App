import { Box } from './Box';
import type { LayoutProps } from './init/layout.types';

/** Horizontal row. Mirrors automatically in RTL: the first child sits on the right. */
export function Row({ align = 'center', ...props }: Omit<LayoutProps, 'direction'>) {
  return <Box {...props} align={align} direction="row" />;
}
