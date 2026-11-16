import type { ReactNode } from 'react';
import { Row } from '../../layout';

/** Actions row at the end of a sheet (cancel, save). */
export function SheetFooter({ children }: { children: ReactNode }) {
  return <Row justify="end" gap="sm">{children}</Row>;
}
