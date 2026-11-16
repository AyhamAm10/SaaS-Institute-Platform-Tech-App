import type { MarkSheet } from '@/core/api/types';
import type { MarkEdits } from '../utils/marks.utils';

/** Marks sheet page: the synced sheet, what the teacher typed, and the save / leave flags. */
export interface MarksState {
  sheet: MarkSheet | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => unknown;
  /** Typed values per student (starts as a copy of the saved sheet). */
  edits: MarkEdits;
  isSaving: boolean;
  saveError: string | null;
  saved: boolean;
  leaveOpen: boolean;

  setMark: (studentId: number, text: string) => void;
  toggleAbsent: (studentId: number) => void;
  /** A fresh sheet from the server: edits restart from it. */
  loadSheet: (sheet: MarkSheet, edits: MarkEdits) => void;
  syncQuery: (payload: Pick<MarksState, 'isPending' | 'isError' | 'error' | 'refetch'>) => void;
  setSaving: (value: boolean) => void;
  setSaveError: (error: string | null) => void;
  setSaved: (value: boolean) => void;
  setLeaveOpen: (value: boolean) => void;
}
