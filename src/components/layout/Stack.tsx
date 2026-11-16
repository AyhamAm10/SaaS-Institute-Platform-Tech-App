import { Box } from './Box';
import type { LayoutProps } from './init/layout.types';

/** Vertical stack: `<Stack gap="md">`. */
export function Stack(props: Omit<LayoutProps, 'direction'>) {
  return <Box {...props} direction="column" />;
}
