import type { ExamItem, ExamPayload, ExamType, ExamUpdatePayload, MarkSheet, Paged, ResultStatus, SaveResultsPayload, SheetRow } from '../types';
import { daysFromToday } from './dates';

/** In-memory exams of the mock backend: edits survive navigation until the page reloads. */
export const examTypes: ExamType[] = [{ id: 1, name: 'مذاكرة' }, { id: 2, name: 'اختبار قصير' }, { id: 3, name: 'امتحان نصفي' }];

const SECTIONS: Record<number, string> = { 3: 'التاسع - أ', 4: 'التاسع - ب', 6: 'العاشر - علمي' };
const SUBJECTS: Record<number, string> = { 5: 'الرياضيات', 6: 'الفيزياء' };
const NAMES = ['ليلى الخالد', 'سامي العمر', 'رنا الحسن', 'كريم يوسف', 'هبة النجار', 'عمر داود', 'دانا صالح', 'مازن حداد'];

type Entry = { mark: number | null; absent: boolean };
const marks = new Map<number, Map<number, Entry>>();

const item = (id: number, title: string, days: number, sectionId: number, subjectId: number, max = 100, pass = 50): ExamItem => ({
  id, sectionId, subjectId, examTypeId: 1, title, examDate: `${daysFromToday(days)}T00:00:00.000Z`, maxMark: String(max), passMark: String(pass),
  section: { id: sectionId, name: SECTIONS[sectionId], academicYearId: 1 }, subject: { id: subjectId, name: SUBJECTS[subjectId] },
  examType: examTypes[0], _count: { results: 0 },
});

let exams: ExamItem[] = [
  item(21, 'مذاكرة الدرس الثالث', 2, 3, 5), item(22, 'مذاكرة الحركة', 6, 6, 6),
  item(18, 'مذاكرة الدرس الثاني', -4, 4, 5), item(15, 'مذاكرة الدرس الأول', -18, 3, 5),
];
marks.set(15, new Map(NAMES.map((_, i) => [i + 1, { mark: 40 + i * 7, absent: false }])));
marks.set(18, new Map(NAMES.slice(0, 5).map((_, i) => [i + 1, { mark: 55 + i * 6, absent: false }])));
let nextId = 30;

export const statusOf = (e: Entry | undefined, pass: number): ResultStatus =>
  !e ? 'PENDING' : e.absent ? 'ABSENT' : e.mark === null ? 'PENDING' : e.mark >= pass ? 'PASSED' : 'FAILED';

const withCount = (e: ExamItem): ExamItem => ({ ...e, _count: { results: marks.get(e.id)?.size ?? 0 } });

export function listExams(params: Record<string, unknown>): Paged<ExamItem> {
  const from = params.from ? String(params.from) : '0000';
  const to = params.to ? String(params.to) : '9999';
  const data = exams.filter((e) => e.examDate.slice(0, 10) >= from && e.examDate.slice(0, 10) <= to)
    .sort((a, b) => b.examDate.localeCompare(a.examDate)).map(withCount);
  return { data, total: data.length, page: 1, limit: 50, totalPages: 1 };
}

export function createExam(body: ExamPayload): ExamItem {
  const e = { ...item(nextId++, body.title, 0, body.sectionId, body.subjectId, body.maxMark, body.passMark), examDate: `${body.examDate}T00:00:00.000Z` };
  exams = [e, ...exams];
  return e;
}

export function updateExam(id: number, body: ExamUpdatePayload): ExamItem {
  exams = exams.map((e) => (e.id !== id ? e : {
    ...e, ...(body.title && { title: body.title }), ...(body.examDate && { examDate: `${body.examDate}T00:00:00.000Z` }),
    ...(body.maxMark && { maxMark: String(body.maxMark) }), ...(body.passMark && { passMark: String(body.passMark) }),
  }));
  return withCount(exams.find((e) => e.id === id) as ExamItem);
}

export const deleteExam = (id: number): { deleted: true } => {
  exams = exams.filter((e) => e.id !== id);
  marks.delete(id);
  return { deleted: true };
};

export function sheetOf(id: number): MarkSheet {
  const exam = withCount(exams.find((e) => e.id === id) as ExamItem);
  const pass = Number(exam.passMark);
  const rows: SheetRow[] = NAMES.map((fullName, i) => {
    const entry = marks.get(id)?.get(i + 1);
    return { student: { id: i + 1, fullName, familyName: fullName.split(' ')[1] }, eligible: true, result: entry ? { id: i + 1, mark: entry.mark, status: statusOf(entry, pass) } : null };
  });
  const graded = rows.filter((r) => r.result?.mark != null);
  const count = (s: ResultStatus) => rows.filter((r) => r.result?.status === s).length;
  const sum = graded.reduce((n, r) => n + (r.result?.mark ?? 0), 0);
  return { exam, rows, stats: { students: rows.length, graded: graded.length, passed: count('PASSED'), failed: count('FAILED'), absent: count('ABSENT'), pending: rows.length - graded.length - count('ABSENT'), average: graded.length ? Math.round((sum / graded.length) * 100) / 100 : null } };
}

export function saveSheet(id: number, body: SaveResultsPayload): MarkSheet {
  const store = marks.get(id) ?? new Map<number, Entry>();
  for (const r of body.results) store.set(r.studentId, { mark: r.absent ? null : (r.mark ?? null), absent: !!r.absent });
  marks.set(id, store);
  return sheetOf(id);
}
