import type { ReactNode } from 'react';
import {
  Button, EmptyState, ErrorState, Header, Reveal, Screen, SectionHeader, Skeleton, Stack, Surface,
} from '@/components';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import type { InboxDay, InboxItem } from '../utils/inbox.utils';
import { InboxRow } from './InboxRow';

export interface InboxState {
  days: InboxDay[];
  pending: boolean;
  error: unknown;
  hasMore: boolean;
  loadingMore: boolean;
  unread: number;
}

interface Props {
  inbox: InboxState;
  /** Push card and preferences, rendered above the list. */
  top: ReactNode;
  refreshing: boolean;
  onRefresh: () => void;
  onRetry: () => void;
  onBack: () => void;
  onOpen: (item: InboxItem) => void;
  onMarkAll: () => void;
  onMore: () => void;
}

/** Pushed screen: device push state, preferences, then the inbox grouped by day. */
export function NotificationsView({ inbox, top, refreshing, onRefresh, onRetry, onBack, onOpen, onMarkAll, onMore }: Props) {
  return (
    <Screen onRefresh={onRefresh} refreshing={refreshing}>
      <Screen.Header>
        <Header title={ar.notifications.title}>
          <Header.Back label={ar.common.back} onPress={onBack} />
        </Header>
      </Screen.Header>
      <Screen.Body>
        <Reveal index={0}><Stack gap="md">{top}</Stack></Reveal>
        {inbox.unread > 0 ? <Button variant="ghost" label={ar.notifications.markAllRead} onPress={onMarkAll} /> : null}
        {inbox.pending ? (
          <Stack gap="md">{[0, 1].map((i) => <Skeleton key={i} height={96} />)}</Stack>
        ) : inbox.error && inbox.days.length === 0 ? (
          <ErrorState error={inbox.error} onRetry={onRetry} />
        ) : inbox.days.length === 0 ? (
          <EmptyState icon="notifications" title={ar.notifications.empty} hint={ar.notifications.emptyHint} />
        ) : (
          inbox.days.map((d, i) => (
            <Reveal key={d.date} index={i + 1}>
              <SectionHeader title={relativeDay(d.date)} />
              <Surface padding="md" gap="xs">
                {d.items.map((item) => <InboxRow key={item.id} item={item} onPress={() => onOpen(item)} />)}
              </Surface>
            </Reveal>
          ))
        )}
        {inbox.hasMore ? <Button variant="ghost" label={ar.notifications.more} onPress={onMore} loading={inbox.loadingMore} /> : null}
      </Screen.Body>
    </Screen>
  );
}
