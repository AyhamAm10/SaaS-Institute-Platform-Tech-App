import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { toArabicMessage } from '@/core/api/errors';
import { useSectionsQuery } from '@/core/api/queries/sections.query';
import { useSaveMarks } from './api/marks.api';
import { MarksContext, createMarksStore } from './store/marks.store';
import { MarksQuerySync } from './MarksQuerySync';
import { changedRows, editsFrom, hasInvalid, toPayload } from './utils/marks.utils';
import { MarksView } from './ui/MarksView';

/** Marks sheet of one exam: edits live in the store until saved; leaving with unsaved edits asks first. */
export function MarksController() {
  const params = useLocalSearchParams<{ id: string; sectionId: string }>();
  const examId = Number(params.id);
  const router = useRouter();
  const [store] = useState(createMarksStore);
  const sections = useSectionsQuery();
  const save = useSaveMarks(examId);

  // The section's own branch and year (from /teacher/sections) travel with every sheet request.
  const scope = useMemo(() => {
    const section = sections.data?.find((s) => String(s.sectionId) === params.sectionId);
    return section ? { branchId: section.branchId, academicYearId: section.academicYearId } : null;
  }, [sections.data, params.sectionId]);

  const submit = useCallback(async () => {
    const { sheet, edits, setSaving, setSaveError, setSaved, loadSheet } = store.getState();
    if (!sheet || !scope || hasInvalid(sheet, edits)) return;
    setSaving(true);
    setSaveError(null);
    try {
      const fresh = await save.mutateAsync({ payload: toPayload(sheet, edits), scope });
      loadSheet(fresh, editsFrom(fresh));
      setSaved(true);
    } catch (error: unknown) {
      setSaveError(toArabicMessage(error));
    } finally {
      setSaving(false);
    }
  }, [store, save, scope]);

  // The "saved" notice fades by itself.
  useEffect(() => store.subscribe((s, prev) => {
    if (s.saved && !prev.saved) setTimeout(() => store.getState().setSaved(false), 2500);
  }), [store]);

  const back = useCallback(() => {
    const { sheet, edits, setLeaveOpen } = store.getState();
    if (sheet && changedRows(sheet, edits).length > 0) setLeaveOpen(true);
    else router.back();
  }, [store, router]);

  return (
    <MarksContext.Provider value={store}>
      <MarksQuerySync store={store} examId={examId} scope={scope} />
      <MarksView onBack={back} onSubmit={submit} onLeave={() => router.back()} />
    </MarksContext.Provider>
  );
}
