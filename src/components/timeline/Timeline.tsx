import type { ReactNode } from 'react';
import { Stack } from '../layout';
import { TimelineItem } from './ui/TimelineItem';

/** Vertical rail of events (today's lessons): `<Timeline><Timeline.Item state="current">..</Timeline.Item></Timeline>`. */
export function Timeline({ children }: { children: ReactNode }) {
  return <Stack>{children}</Stack>;
}

Timeline.Item = TimelineItem;
