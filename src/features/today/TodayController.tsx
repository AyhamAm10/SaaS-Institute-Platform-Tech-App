import { useRouter } from 'expo-router';
import { useSession } from '@/core/auth/store';
import { useOverviewQuery } from './api/today.api';
import { TodayView } from './ui/TodayView';

/** Today: reads the overview (stateless screen: query + boundary, no page store) and hands props to the view. */
export function TodayController() {
  const router = useRouter();
  const query = useOverviewQuery();
  const name = useSession((s) => s.me?.teacher.fullName ?? '');
  return (
    <TodayView
      query={query}
      name={name}
      refreshing={query.isRefetching}
      onRefresh={() => void query.refetch()}
      onNotifications={() => router.push('/notifications')}
      onOpenExam={(examId, sectionId) => router.push({ pathname: '/exams/[id]', params: { id: String(examId), sectionId: String(sectionId) } })}
    />
  );
}
