import { useEffect } from 'react';
import type { RequestScope } from '@/core/api/client';
import type { ControllerStore } from '@/core/mirror';
import { useSheetQuery } from './api/marks.api';
import type { MarksState } from './state/marks.state';
import { changedRows, editsFrom } from './utils/marks.utils';

interface Props { store: ControllerStore<MarksState>; examId: number; scope: RequestScope | null }

/**
 * The ONLY place with the query. A sheet arriving from the server restarts the edits from it,
 * unless the teacher has unsaved typing (a background refetch must never erase it).
 */
export function MarksQuerySync({ store, examId, scope }: Props) {
  const { data, isPending, isError, error, refetch } = useSheetQuery(examId, scope);
  useEffect(() => {
    const state = store.getState();
    state.syncQuery({ isPending, isError, error, refetch });
    if (!data) return;
    const dirty = state.sheet ? changedRows(state.sheet, state.edits).length > 0 : false;
    if (!dirty) state.loadSheet(data, editsFrom(data));
  }, [data, isPending, isError, error, refetch, store]);
  return null;
}
