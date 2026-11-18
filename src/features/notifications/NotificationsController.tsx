import { useMemo } from 'react';
import { useRouter, type Href } from 'expo-router';
import type { NotificationCategory } from '@/core/api/types';
import {
  useEnablePushMutation, useInboxQuery, useMarkReadMutation, usePushPermissionQuery,
  useSaveSettingsMutation, useSettingsQuery,
} from './api/notifications.api';
import { PrefsCard } from './ui/PrefsCard';
import { PushCard } from './ui/PushCard';
import { NotificationsView } from './ui/NotificationsView';
import { groupByDay, toItem, type InboxItem } from './utils/inbox.utils';

/** Teachers receive teaching and general notices only; the other categories never reach them. */
const TEACHER_CATEGORIES: NotificationCategory[] = ['STUDY', 'GENERAL'];

/** Notifications: the inbox (read state on the server), this device's push and the category switches. */
export function NotificationsController() {
  const router = useRouter();
  const inbox = useInboxQuery();
  const markRead = useMarkReadMutation();
  const settings = useSettingsQuery();
  const saveSettings = useSaveSettingsMutation();
  const permission = usePushPermissionQuery();
  const enable = useEnablePushMutation();

  const days = useMemo(() => groupByDay((inbox.data?.pages ?? []).flatMap((p) => p.data.map(toItem))), [inbox.data]);
  const all = settings.data?.categories ?? [];

  const open = (item: InboxItem) => {
    if (!item.read) markRead.mutate(item.id);
    if (item.target) router.push(item.target as Href);
  };
  const toggle = (key: NotificationCategory, enabled: boolean) =>
    saveSettings.mutate(all.filter((c) => (c.key === key ? !enabled : !c.enabled)).map((c) => c.key));

  return (
    <NotificationsView
      inbox={{
        days,
        pending: inbox.isPending,
        error: inbox.error,
        hasMore: inbox.hasNextPage,
        loadingMore: inbox.isFetchingNextPage,
        unread: inbox.data?.pages[0]?.unread ?? 0,
      }}
      top={
        <>
          <PushCard permission={permission.data ?? null} enabling={enable.isPending} onEnable={() => enable.mutate()} />
          <PrefsCard
            loading={settings.isPending}
            categories={all.filter((c) => TEACHER_CATEGORIES.includes(c.key))}
            onToggle={toggle}
          />
        </>
      }
      refreshing={inbox.isRefetching && !inbox.isFetchingNextPage}
      onRefresh={() => void inbox.refetch()}
      onRetry={() => void inbox.refetch()}
      onBack={() => router.back()}
      onOpen={open}
      onMarkAll={() => markRead.mutate(undefined)}
      onMore={() => void inbox.fetchNextPage()}
    />
  );
}
