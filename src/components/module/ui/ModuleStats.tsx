import type { ReactNode } from 'react';
import { Grid } from '../../layout';

/** KPI strip: two equal columns of stat tiles / cards. */
export function ModuleStats({ children }: { children: ReactNode }) {
  return <Grid columns={2} gap="md">{children}</Grid>;
}
