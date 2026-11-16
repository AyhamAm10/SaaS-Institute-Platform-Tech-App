import { useCallback, useState } from 'react';
import { useRouter } from 'expo-router';
import { toArabicMessage } from '@/core/api/errors';
import type { ExamItem, TeacherSection } from '@/core/api/types';
import { useCreateExam, useDeleteExam, useUpdateExam } from './api/exams.api';
import { ExamsContext, createExamsStore } from './store/exams.store';
import { ExamsQuerySync } from './ExamsQuerySync';
import { toCreatePayload, toUpdatePayload, validateExamForm } from './utils/exam-form.utils';
import { ExamsView } from './ui/ExamsView';

/** The scope headers of an exam: the branch of its section and the year of the exam. */
const scopeOf = (sections: TeacherSection[], exam: ExamItem) => ({
  branchId: sections.find((s) => s.sectionId === exam.sectionId)?.branchId,
  academicYearId: exam.section.academicYearId,
});

/** Exams: list by tab, create / edit in a sheet, delete with confirmation, open the marks sheet. */
export function ExamsController() {
  const [store] = useState(createExamsStore);
  const router = useRouter();
  const create = useCreateExam();
  const update = useUpdateExam();
  const remove = useDeleteExam();

  const submit = useCallback(async () => {
    const { form, editing, sections, setFormErrors, setGeneralError, setSubmitting, closeForm } = store.getState();
    const errors = validateExamForm(form, editing !== null);
    if (Object.keys(errors).length > 0) return setFormErrors(errors);
    setGeneralError(null);
    setSubmitting(true);
    try {
      if (editing) await update.mutateAsync({ id: editing.id, payload: toUpdatePayload(form), scope: scopeOf(sections, editing) });
      else {
        const section = sections.find((s) => String(s.sectionId) === form.sectionId);
        await create.mutateAsync({ payload: toCreatePayload(form), scope: { branchId: section?.branchId, academicYearId: section?.academicYearId } });
      }
      closeForm();
    } catch (error: unknown) {
      setGeneralError(toArabicMessage(error));
    } finally {
      setSubmitting(false);
    }
  }, [store, create, update]);

  const confirmDelete = useCallback(async () => {
    const { deleteTarget, sections, setDeleteError, setDeleting, closeDelete } = store.getState();
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await remove.mutateAsync({ id: deleteTarget.id, force: deleteTarget._count.results > 0, scope: scopeOf(sections, deleteTarget) });
      closeDelete();
    } catch (error: unknown) {
      setDeleteError(toArabicMessage(error));
    } finally {
      setDeleting(false);
    }
  }, [store, remove]);

  return (
    <ExamsContext.Provider value={store}>
      <ExamsQuerySync store={store} />
      <ExamsView
        onSubmit={submit}
        onConfirmDelete={confirmDelete}
        onOpenMarks={(exam) => router.push({ pathname: '/exams/[id]', params: { id: String(exam.id), sectionId: String(exam.sectionId) } })}
      />
    </ExamsContext.Provider>
  );
}
