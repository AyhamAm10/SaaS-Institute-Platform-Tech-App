import { createControllerStore, createMirror } from '@/core/mirror';
import type { TimetableState } from '../state/timetable.state';

/** Isolated store of the timetable page (core.md section 3). */
export function createTimetableStore() {
  return createControllerStore<TimetableState>((set) => ({
    data: undefined,
    isPending: true,
    isError: false,
    error: null,
    refetch: () => undefined,
    selectedDay: null,
    setDay: (selectedDay) => set({ selectedDay }),
    syncQuery: (payload) => set(payload),
  }));
}

export const { Context: TimetableContext, useMirror: useTimetableMirror } = createMirror<TimetableState>('Timetable');
