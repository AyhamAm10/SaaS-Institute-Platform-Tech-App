import { useRouter } from 'expo-router';
import { useSectionsQuery } from '@/core/api/queries/sections.query';
import { SectionsView } from './ui/SectionsView';

/** Sections: a read-only list (stateless screen: query + boundary, no page store). */
export function SectionsController() {
  const router = useRouter();
  const query = useSectionsQuery();
  return (
    <SectionsView
      query={query}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
      onNotifications={() => router.push('/notifications')}
    />
  );
}
