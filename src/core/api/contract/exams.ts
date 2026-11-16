/** Exams and marks (existing /exams endpoints, already limited to the teacher's own section + subject pairs). */
export type ResultStatus = 'PENDING' | 'PASSED' | 'FAILED' | 'ABSENT';

export interface ExamType { id: number; name: string }

export interface ExamItem {
  id: number;
  sectionId: number;
  subjectId: number;
  examTypeId: number | null;
  title: string;
  /** ISO instant at UTC midnight: use the first 10 characters as the local date. */
  examDate: string;
  /** Decimals come as strings or numbers depending on the layer: always read with Number(). */
  maxMark: string | number;
  passMark: string | number;
  section: { id: number; name: string; academicYearId: number };
  subject: { id: number; name: string };
  examType: ExamType | null;
  _count: { results: number };
}

export interface Paged<T> { data: T[]; total: number; page: number; limit: number; totalPages: number }

export interface ExamPayload {
  sectionId: number;
  subjectId: number;
  examTypeId?: number | null;
  title: string;
  examDate: string;
  maxMark: number;
  passMark: number;
}

/** Section and subject never change after creation. */
export type ExamUpdatePayload = Partial<Omit<ExamPayload, 'sectionId' | 'subjectId'>>;

export interface SheetRow {
  student: { id: number; fullName: string; familyName: string | null };
  /** false = not on the sheet any more (e.g. transferred) but kept because they have a mark. */
  eligible: boolean;
  result: { id: number; mark: number | null; status: ResultStatus } | null;
}

export interface SheetStats {
  students: number;
  graded: number;
  passed: number;
  failed: number;
  absent: number;
  pending: number;
  average: number | null;
}

export interface MarkSheet { exam: ExamItem; rows: SheetRow[]; stats: SheetStats }

export interface SaveResultsPayload {
  results: { studentId: number; mark?: number | null; absent?: boolean }[];
}
