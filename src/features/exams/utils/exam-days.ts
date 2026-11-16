import type { ExamItem } from '@/core/api/types';
import { formatDayMonth } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { examDay } from './exam-form.utils';

const pad = (n: number) => String(n).padStart(2, '0');

/** Today as `YYYY-MM-DD` on the device clock (the institute shares the teacher's day in practice). */
export function localToday(now: Date = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** "12 تشرين الثاني" for an exam. */
export const examDateLabel = (exam: Pick<ExamItem, 'examDate'>): string => formatDayMonth(examDay(exam));

/** "العلامة العظمى 100 · النجاح 50". */
export function examMarksLabel(exam: Pick<ExamItem, 'maxMark' | 'passMark'>): string {
  return ar.exams.marks(String(Number(exam.maxMark)), String(Number(exam.passMark)));
}

/** Subjects the teacher teaches in the chosen section (the chips of the subject field). */
export function subjectOptions(sections: { sectionId: number; subjects: { subjectId: number; name: string }[] }[], sectionId: string | null) {
  const section = sections.find((s) => String(s.sectionId) === sectionId);
  return (section?.subjects ?? []).map((s) => ({ value: String(s.subjectId), label: s.name }));
}
