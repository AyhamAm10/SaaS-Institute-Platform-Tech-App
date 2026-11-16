import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** Start slot: an avatar, an icon tile or a time. */
export function ListItemLeading({ children }: { children: ReactNode }) {
  return <Row>{children}</Row>;
}
