import { useEffect } from 'react';
import { useRouter, type Href } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { listenPush } from '@/core/push/device';
import { notificationKeys, useUnreadCountQuery } from './api/notifications.api';
import { targetOf } from './utils/inbox.utils';

/**
 * Connects pushes to the app while signed in (mounted once by the shell):
 * a push refreshes the inbox and badge; tapping one opens its screen. A web
 * push opens the app at its link directly (service worker).
 */
export function usePushBridge(): void {
  const router = useRouter();
  const client = useQueryClient();
  useEffect(
    () =>
      listenPush({
        onReceive: () => void client.invalidateQueries({ queryKey: notificationKeys.all }),
        onTap: (tap) => {
          void client.invalidateQueries({ queryKey: notificationKeys.all });
          router.push((targetOf(tap) ?? '/notifications') as Href);
        },
      }),
    [client, router],
  );
}

/** Unread notifications count for the header bells. */
export function useUnreadCount(): number {
  return useUnreadCountQuery().data?.unread ?? 0;
}
