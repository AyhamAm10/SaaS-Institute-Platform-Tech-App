import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post, put } from '@/core/api/client';
import type { NotificationCategory, NotificationSettings, NotificationsPage } from '@/core/api/types';
import { pushPermission } from '@/core/push/device';
import { enablePush } from '@/core/push/registration';

const PAGE_SIZE = 30;

export const notificationKeys = {
  all: ['notifications'] as const,
  inbox: ['notifications', 'inbox'] as const,
  unread: ['notifications', 'unread'] as const,
  settings: ['notifications', 'settings'] as const,
  permission: ['push', 'permission'] as const,
};

/** The inbox, newest first, page by page. */
export function useInboxQuery() {
  return useInfiniteQuery({
    queryKey: notificationKeys.inbox,
    queryFn: ({ pageParam }) => get<NotificationsPage>('/notifications', { page: pageParam, limit: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.totalPages ? last.page + 1 : undefined),
    staleTime: 15_000,
    refetchOnWindowFocus: true,
  });
}

/** The unread badge: every minute, on focus and on every push. */
export function useUnreadCountQuery() {
  return useQuery({
    queryKey: notificationKeys.unread,
    queryFn: () => get<{ unread: number }>('/notifications/unread-count'),
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
    staleTime: 15_000,
  });
}

/** Marks one notification (or all of them, without an id) as read. */
export function useMarkReadMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id?: number) => post(id ? `/notifications/${id}/read` : '/notifications/read-all', {}),
    onSettled: () => client.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}

export function useSettingsQuery() {
  return useQuery({ queryKey: notificationKeys.settings, queryFn: () => get<NotificationSettings>('/notifications/settings') });
}

/** Saves the categories turned off (optimistic). */
export function useSaveSettingsMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (disabledCategories: NotificationCategory[]) =>
      put<NotificationSettings>('/notifications/settings', { disabledCategories }),
    onMutate: async (disabled) => {
      await client.cancelQueries({ queryKey: notificationKeys.settings });
      const previous = client.getQueryData<NotificationSettings>(notificationKeys.settings);
      if (previous) {
        client.setQueryData<NotificationSettings>(notificationKeys.settings, {
          categories: previous.categories.map((c) => ({ ...c, enabled: !disabled.includes(c.key) })),
        });
      }
      return { previous };
    },
    onError: (_e, _v, context) => client.setQueryData(notificationKeys.settings, context?.previous),
    onSuccess: (data) => client.setQueryData(notificationKeys.settings, data),
  });
}

/** Push state of this device (re-read on focus: the user may change it in the system settings). */
export function usePushPermissionQuery() {
  return useQuery({ queryKey: notificationKeys.permission, queryFn: pushPermission, staleTime: 0, refetchOnWindowFocus: true });
}

/** The "enable notifications" click (browsers show the prompt only from a click). */
export function useEnablePushMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: enablePush,
    onSuccess: (permission) => client.setQueryData(notificationKeys.permission, permission),
  });
}
