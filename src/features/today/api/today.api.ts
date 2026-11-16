import { useQuery } from '@tanstack/react-query';
import { get } from '@/core/api/client';
import type { Overview } from '@/core/api/types';

export const todayKeys = { overview: ['teacher', 'overview'] as const };

/** The teacher's day: lessons, attendance per section, exams. Refreshed every minute while open. */
export function useOverviewQuery() {
  return useQuery({
    queryKey: todayKeys.overview,
    queryFn: () => get<Overview>('/teacher/overview'),
    refetchInterval: 60_000,
  });
}
