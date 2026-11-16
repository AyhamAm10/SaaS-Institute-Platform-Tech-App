import { createControllerStore, createMirror } from '@/core/mirror';
import type { MarksState } from '../state/marks.state';

/** Isolated store of one marks sheet (core.md section 3). */
export function createMarksStore() {
  return createControllerStore<MarksState>((set) => ({
    sheet: undefined,
    isPending: true,
    isError: false,
    error: null,
    refetch: () => undefined,
    edits: {},
    isSaving: false,
    saveError: null,
    saved: false,
    leaveOpen: false,

    // typing clears the "saved" notice and any save error
    setMark: (studentId, text) =>
      set((s) => ({ edits: { ...s.edits, [studentId]: { ...(s.edits[studentId] ?? { absent: false }), text } }, saved: false, saveError: null })),
    toggleAbsent: (studentId) =>
      set((s) => {
        const current = s.edits[studentId] ?? { text: '', absent: false };
        return { edits: { ...s.edits, [studentId]: { text: current.absent ? current.text : '', absent: !current.absent } }, saved: false, saveError: null };
      }),
    loadSheet: (sheet, edits) => set({ sheet, edits }),
    syncQuery: (payload) => set(payload),
    setSaving: (isSaving) => set({ isSaving }),
    setSaveError: (saveError) => set({ saveError }),
    setSaved: (saved) => set({ saved }),
    setLeaveOpen: (leaveOpen) => set({ leaveOpen }),
  }));
}

export const { Context: MarksContext, useMirror: useMarksMirror } = createMirror<MarksState>('Marks');
