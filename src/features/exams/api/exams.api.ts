import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, patch, post, remove, type RequestScope } from '@/core/api/client';
import type { ExamItem, ExamPayload, ExamType, ExamUpdatePayload, Paged } from '@/core/api/types';

export const examsKeys = {
  all: ['teacher', 'exams'] as const,
  list: (tab: string, year: number | null) => ['teacher', 'exams', 'list', tab, year] as const,
  types: ['teacher', 'exam-types'] as const,
};

export type ExamsTab = 'upcoming' | 'past';

/** Exams of the year: upcoming = from today on, past = before today (the server limits them to my own subjects). */
export function useExamsQuery(tab: ExamsTab, today: string, academicYearId: number | null) {
  const params = tab === 'upcoming' ? { from: today, limit: 100 } : { to: shiftBack(today), limit: 100 };
  return useQuery({
    queryKey: examsKeys.list(tab, academicYearId),
    queryFn: () => get<Paged<ExamItem>>('/exams', { ...params, page: 1 }, { academicYearId: academicYearId ?? undefined }),
    enabled: academicYearId !== null,
  });
}

/** The day before `ymd` (past exams end yesterday). */
function shiftBack(ymd: string): string {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function useExamTypesQuery() {
  return useQuery({ queryKey: examsKeys.types, queryFn: () => get<ExamType[]>('/teacher/exam-types'), staleTime: 10 * 60_000 });
}

/** Lists, the sheet and Today's pending / upcoming blocks all change with an exam. */
function useRefresh() {
  const client = useQueryClient();
  return () => {
    void client.invalidateQueries({ queryKey: examsKeys.all });
    void client.invalidateQueries({ queryKey: ['teacher', 'overview'] });
  };
}

export function useCreateExam() {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: ({ payload, scope }: { payload: ExamPayload; scope: RequestScope }) => post<ExamItem>('/exams', payload, scope),
    onSuccess: refresh,
  });
}

export function useUpdateExam() {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: ({ id, payload, scope }: { id: number; payload: ExamUpdatePayload; scope: RequestScope }) => patch<ExamItem>(`/exams/${id}`, payload, scope),
    onSuccess: refresh,
  });
}

/** `force` is needed when the exam already has marks (the dialog tells the teacher first). */
export function useDeleteExam() {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: ({ id, force, scope }: { id: number; force: boolean; scope: RequestScope }) =>
      remove<{ deleted: true }>(`/exams/${id}`, force ? { force: 'true' } : undefined, scope),
    onSuccess: refresh,
  });
}
