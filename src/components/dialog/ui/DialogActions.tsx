import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** Buttons row, aligned to the end (cancel first, the main action last). */
export function DialogActions({ children }: { children: ReactNode }) {
  return <Row justify="end" gap="sm">{children}</Row>;
}
