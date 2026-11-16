import { Children } from 'react';
import type { ReactNode } from 'react';
import { Box } from './Box';
import type { LayoutProps } from './init/layout.types';

interface Props extends Omit<LayoutProps, 'direction' | 'wrap'> {
  /** Equal-width columns (2 or 3). */
  columns?: 2 | 3;
  children?: ReactNode;
}

/** Equal columns that wrap: `<Grid columns={2} gap="md">`. Each child gets its own cell. */
export function Grid({ columns = 2, children, ...props }: Props) {
  return (
    <Box {...props} direction="row" wrap>
      {Children.toArray(children).map((child, i) => (
        <Box key={i} flex={1} minHeight={0} style={{ flexBasis: columns === 2 ? '47%' : '30%' }}>
          {child}
        </Box>
      ))}
    </Box>
  );
}
