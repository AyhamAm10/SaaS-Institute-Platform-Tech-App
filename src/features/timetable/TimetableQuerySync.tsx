import { useEffect } from 'react';
import type { ControllerStore } from '@/core/mirror';
import { useTimetableQuery } from './api/timetable.api';
import type { TimetableState } from './state/timetable.state';
import { initialDay } from './utils/timetable.utils';

/** The ONLY place with the query: bridges server data into the store and opens today's tab once. */
export function TimetableQuerySync({ store }: { store: ControllerStore<TimetableState> }) {
  const { data, isPending, isError, error, refetch } = useTimetableQuery();
  useEffect(() => {
    store.getState().syncQuery({ data, isPending, isError, error, refetch });
    if (data && store.getState().selectedDay === null) {
      const day = initialDay(data, new Date().getDay());
      if (day !== null) store.getState().setDay(day);
    }
  }, [data, isPending, isError, error, refetch, store]);
  return null;
}
