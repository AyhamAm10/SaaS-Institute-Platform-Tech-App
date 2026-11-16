import type { ExamItem, ExamPayload, ExamUpdatePayload } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

/** Exam form (inputs as strings; ids as the chips' string values). */
export interface ExamForm {
  title: string;
  sectionId: string | null;
  subjectId: string | null;
  examTypeId: string | null;
  examDate: string;
  maxMark: string;
  passMark: string;
}

export type ExamFormErrors = Partial<Record<keyof ExamForm, string>>;

export const EMPTY_EXAM_FORM: ExamForm = { title: '', sectionId: null, subjectId: null, examTypeId: null, examDate: '', maxMark: '100', passMark: '50' };

/** Local date of an exam (the server sends an ISO instant at UTC midnight). */
export const examDay = (exam: Pick<ExamItem, 'examDate'>): string => exam.examDate.slice(0, 10);

export function examFormFrom(exam: ExamItem): ExamForm {
  return {
    title: exam.title,
    sectionId: String(exam.sectionId),
    subjectId: String(exam.subjectId),
    examTypeId: exam.examTypeId === null ? null : String(exam.examTypeId),
    examDate: examDay(exam),
    maxMark: String(Number(exam.maxMark)),
    passMark: String(Number(exam.passMark)),
  };
}

/** A positive number with at most two decimals, or null. Accepts the Arabic decimal comma. */
export function parsePositive(text: string): number | null {
  const normalized = text.trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  const n = Number(normalized);
  return n > 0 ? n : null;
}

/** Field errors of the exam form; empty object = valid. Section and subject are fixed when editing. */
export function validateExamForm(form: ExamForm, isEdit: boolean): ExamFormErrors {
  const errors: ExamFormErrors = {};
  if (!form.title.trim()) errors.title = ar.exams.required;
  if (!isEdit && !form.sectionId) errors.sectionId = ar.exams.pickSection;
  if (!isEdit && !form.subjectId) errors.subjectId = ar.exams.pickSubject;
  if (!form.examDate) errors.examDate = ar.exams.required;
  const max = parsePositive(form.maxMark);
  const pass = parsePositive(form.passMark);
  if (max === null) errors.maxMark = ar.exams.invalidMark;
  if (pass === null) errors.passMark = ar.exams.invalidMark;
  else if (max !== null && pass > max) errors.passMark = ar.exams.passAboveMax;
  return errors;
}

export function toCreatePayload(form: ExamForm): ExamPayload {
  return {
    sectionId: Number(form.sectionId),
    subjectId: Number(form.subjectId),
    ...(form.examTypeId ? { examTypeId: Number(form.examTypeId) } : {}),
    title: form.title.trim(),
    examDate: form.examDate,
    maxMark: parsePositive(form.maxMark) as number,
    passMark: parsePositive(form.passMark) as number,
  };
}

export function toUpdatePayload(form: ExamForm): ExamUpdatePayload {
  return {
    examTypeId: form.examTypeId ? Number(form.examTypeId) : null,
    title: form.title.trim(),
    examDate: form.examDate,
    maxMark: parsePositive(form.maxMark) as number,
    passMark: parsePositive(form.passMark) as number,
  };
}
