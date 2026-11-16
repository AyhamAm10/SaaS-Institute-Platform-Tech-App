import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useSectionsQuery } from '@/core/api/queries/sections.query';
import { useSession } from '@/core/auth/store';
import type { ControllerStore } from '@/core/mirror';
import { useExamTypesQuery, useExamsQuery } from './api/exams.api';
import type { ExamsState } from './state/exams.state';
import { localToday } from './utils/exam-days';

/** The ONLY place with queries: exams of the open tab, my sections and the exam types go into the store. */
export function ExamsQuerySync({ store }: { store: ControllerStore<ExamsState> }) {
  const tab = useStore(store, (s) => s.tab);
  const yearId = useSession((s) => s.me?.academicYear?.id ?? null);
  const today = localToday();
  const exams = useExamsQuery(tab, today, yearId);
  const sections = useSectionsQuery();
  const types = useExamTypesQuery();

  useEffect(() => {
    store.getState().sync({ list: exams.data, isPending: exams.isPending, isError: exams.isError, error: exams.error, refetch: exams.refetch, today, academicYearId: yearId });
  }, [exams.data, exams.isPending, exams.isError, exams.error, exams.refetch, today, yearId, store]);
  useEffect(() => {
    store.getState().sync({ sections: sections.data ?? [] });
  }, [sections.data, store]);
  useEffect(() => {
    store.getState().sync({ examTypes: types.data ?? [] });
  }, [types.data, store]);
  return null;
}
