import type { ReactNode } from 'react';
import { SectionHeader } from '../../section-header';
import { Stack } from '../../layout';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

/** Title row of a block (optionally with an action link) and any extra line under it. */
export function ModuleHeader({ title, actionLabel, onAction, children }: Props) {
  return (
    <Stack gap="sm">
      <SectionHeader title={title} actionLabel={actionLabel} onAction={onAction} />
      {children}
    </Stack>
  );
}
