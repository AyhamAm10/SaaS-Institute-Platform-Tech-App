import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** Far-end slot: a chevron or an action. */
export function ListItemTrailing({ children }: { children: ReactNode }) {
  return <Row>{children}</Row>;
}
