import { createControllerStore, createMirror } from '@/core/mirror';
import type { ExamsState } from '../state/exams.state';
import { EMPTY_EXAM_FORM, examFormFrom } from '../utils/exam-form.utils';

const freshForm = { formErrors: {}, generalError: null, isSubmitting: false };
const closedDelete = { deleteTarget: null, deleteError: null, isDeleting: false };

/** Isolated store of the exams tab (core.md section 3). */
export function createExamsStore() {
  return createControllerStore<ExamsState>((set) => ({
    tab: 'upcoming',
    list: undefined,
    isPending: true,
    isError: false,
    error: null,
    refetch: () => undefined,
    sections: [],
    examTypes: [],
    today: '',
    academicYearId: null,

    formOpen: false,
    editing: null,
    form: EMPTY_EXAM_FORM,
    ...freshForm,
    ...closedDelete,

    setTab: (tab) => set({ tab }),
    openCreate: () => set({ formOpen: true, editing: null, form: EMPTY_EXAM_FORM, ...freshForm }),
    openEdit: (exam) => set({ formOpen: true, editing: exam, form: examFormFrom(exam), ...freshForm }),
    closeForm: () => set({ formOpen: false }),
    // '' clears a field error; picking another section drops the subject (it belongs to the section)
    setField: (key, value) =>
      set((s) => ({
        form: { ...s.form, [key]: value, ...(key === 'sectionId' ? { subjectId: null } : {}) },
        formErrors: { ...s.formErrors, [key]: '' },
      })),
    setFormErrors: (formErrors) => set({ formErrors }),
    setGeneralError: (generalError) => set({ generalError }),
    setSubmitting: (isSubmitting) => set({ isSubmitting }),
    openDelete: (deleteTarget) => set({ ...closedDelete, deleteTarget }),
    closeDelete: () => set(closedDelete),
    setDeleteError: (deleteError) => set({ deleteError }),
    setDeleting: (isDeleting) => set({ isDeleting }),
    sync: (payload) => set(payload),
  }));
}

export const { Context: ExamsContext, useMirror: useExamsMirror } = createMirror<ExamsState>('Exams');
