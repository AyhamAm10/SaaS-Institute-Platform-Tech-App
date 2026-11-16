import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** End-side action buttons of a header (notifications, filters). */
export function HeaderActions({ children }: { children: ReactNode }) {
  return <Row gap="sm">{children}</Row>;
}
