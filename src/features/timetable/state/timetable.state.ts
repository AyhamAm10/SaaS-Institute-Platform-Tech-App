import type { Timetable } from '@/core/api/types';

/** Timetable page: the synced query result and the selected weekday. */
export interface TimetableState {
  data: Timetable | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => unknown;
  /** Day of week (0-6) of the open tab; null until the data arrives. */
  selectedDay: number | null;
  setDay: (day: number) => void;
  syncQuery: (payload: Pick<TimetableState, 'data' | 'isPending' | 'isError' | 'error' | 'refetch'>) => void;
}
