import type { ReactNode } from 'react';
import { Stack } from '../layout';
import { ModuleContent } from './ui/ModuleContent';
import { ModuleFooter } from './ui/ModuleFooter';
import { ModuleHeader } from './ui/ModuleHeader';
import { ModuleStats } from './ui/ModuleStats';

/**
 * The standard page skeleton (like the dashboard's AppModule): header, a KPI strip, the main content and a footer.
 * `<Module><Module.Header title=".." /><Module.Stats>..</Module.Stats><Module.Content>..</Module.Content></Module>`.
 */
export function Module({ children }: { children: ReactNode }) {
  return <Stack gap="lg">{children}</Stack>;
}

Module.Header = ModuleHeader;
Module.Stats = ModuleStats;
Module.Content = ModuleContent;
Module.Footer = ModuleFooter;
