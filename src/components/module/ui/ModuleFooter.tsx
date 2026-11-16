import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** Closing row of a block (a link, a note). */
export function ModuleFooter({ children }: { children: ReactNode }) {
  return <Row justify="center" gap="sm">{children}</Row>;
}
