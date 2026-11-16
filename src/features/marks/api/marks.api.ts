import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, put, type RequestScope } from '@/core/api/client';
import type { MarkSheet, SaveResultsPayload } from '@/core/api/types';

export const marksKeys = { sheet: (id: number) => ['teacher', 'exams', 'sheet', id] as const };

/** The mark sheet of one exam (students, marks, statuses, server statistics). Waits for the section scope. */
export function useSheetQuery(id: number, scope: RequestScope | null) {
  return useQuery({
    queryKey: marksKeys.sheet(id),
    queryFn: () => get<MarkSheet>(`/exams/${id}/results`, undefined, scope ?? undefined),
    enabled: scope !== null,
    staleTime: 0,
  });
}

/** Saves the changed rows; the answer is the refreshed sheet (statuses and stats computed by the server). */
export function useSaveMarks(id: number) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, scope }: { payload: SaveResultsPayload; scope: RequestScope }) => put<MarkSheet>(`/exams/${id}/results`, payload, scope),
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: marksKeys.sheet(id) });
      void client.invalidateQueries({ queryKey: ['teacher', 'exams'] });
      void client.invalidateQueries({ queryKey: ['teacher', 'overview'] });
    },
  });
}
