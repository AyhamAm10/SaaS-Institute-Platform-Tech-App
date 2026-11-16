import { useQuery } from '@tanstack/react-query';
import { get } from '@/core/api/client';
import type { Timetable } from '@/core/api/types';

export const timetableKeys = { week: ['teacher', 'timetable'] as const };

/** The teacher's weekly grid across all their sections (current year). */
export function useTimetableQuery() {
  return useQuery({ queryKey: timetableKeys.week, queryFn: () => get<Timetable>('/teacher/timetable') });
}
