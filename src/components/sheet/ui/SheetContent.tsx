import type { ReactNode } from 'react';
import { Stack } from '../../layout';

/** The form or details body of a sheet. */
export function SheetContent({ children }: { children: ReactNode }) {
  return <Stack gap="lg">{children}</Stack>;
}
