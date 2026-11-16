import type { ReactNode } from 'react';
import { Stack } from '../../layout';

/** A small stack on the end side (a pill, a value with its caption). */
export function ListItemMeta({ children }: { children: ReactNode }) {
  return <Stack align="end" gap="xs">{children}</Stack>;
}
