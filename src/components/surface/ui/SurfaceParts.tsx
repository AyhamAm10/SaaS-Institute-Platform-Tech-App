import type { ReactNode } from 'react';
import { Row, Stack } from '../../layout';

/** Top row of a surface: title on the start side, an action or pill on the end side. */
export function SurfaceHeader({ children }: { children: ReactNode }) {
  return <Row justify="between" gap="sm">{children}</Row>;
}

/** Main content column of a surface. */
export function SurfaceBody({ children }: { children: ReactNode }) {
  return <Stack gap="sm">{children}</Stack>;
}

/** Bottom row of a surface (actions, a link). */
export function SurfaceFooter({ children }: { children: ReactNode }) {
  return <Row justify="end" gap="sm">{children}</Row>;
}
