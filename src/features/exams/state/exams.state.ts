import type { ExamItem, ExamType, Paged, TeacherSection } from '@/core/api/types';
import type { ExamsTab } from '../api/exams.api';
import type { ExamForm, ExamFormErrors } from '../utils/exam-form.utils';

/** Exams tab: the synced list, the form sheet and the delete dialog. */
export interface ExamsState {
  tab: ExamsTab;
  list: Paged<ExamItem> | undefined;
  isPending: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => unknown;
  sections: TeacherSection[];
  examTypes: ExamType[];
  /** Local date of today and the current academic year (from the session). */
  today: string;
  academicYearId: number | null;

  formOpen: boolean;
  editing: ExamItem | null;
  form: ExamForm;
  formErrors: ExamFormErrors;
  generalError: string | null;
  isSubmitting: boolean;

  deleteTarget: ExamItem | null;
  deleteError: string | null;
  isDeleting: boolean;

  setTab: (tab: ExamsTab) => void;
  openCreate: () => void;
  openEdit: (exam: ExamItem) => void;
  closeForm: () => void;
  setField: <K extends keyof ExamForm>(key: K, value: ExamForm[K]) => void;
  setFormErrors: (errors: ExamFormErrors) => void;
  setGeneralError: (error: string | null) => void;
  setSubmitting: (value: boolean) => void;
  openDelete: (exam: ExamItem) => void;
  closeDelete: () => void;
  setDeleteError: (error: string | null) => void;
  setDeleting: (value: boolean) => void;
  sync: (payload: Partial<Pick<ExamsState, 'list' | 'isPending' | 'isError' | 'error' | 'refetch' | 'sections' | 'examTypes' | 'today' | 'academicYearId'>>) => void;
}
