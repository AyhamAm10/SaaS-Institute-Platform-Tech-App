import type { ReactNode } from 'react';
import { Stack } from '../../layout';

/** Main content of a block (a list, a timeline, a table of rows). */
export function ModuleContent({ children }: { children: ReactNode }) {
  return <Stack gap="md">{children}</Stack>;
}
