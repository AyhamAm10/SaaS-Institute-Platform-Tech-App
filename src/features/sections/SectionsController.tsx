import { useRouter } from 'expo-router';
import { useUnreadCount } from '@/features/notifications';
import { useSectionsQuery } from '@/core/api/queries/sections.query';
import { SectionsView } from './ui/SectionsView';

/** Sections: a read-only list (stateless screen: query + boundary, no page store). */
export function SectionsController() {
  const router = useRouter();
  const unread = useUnreadCount();
  const query = useSectionsQuery();
  return (
    <SectionsView
      query={query}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
      unread={unread}
      onNotifications={() => router.push('/notifications')}
    />
  );
}
