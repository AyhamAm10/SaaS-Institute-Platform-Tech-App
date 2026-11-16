import type { BreakSlot, Weekday } from './base';

export interface Lesson {
  id: number;
  startTime: string;
  endTime: string;
  periodNumber: number | null;
  sectionId: number;
  sectionName: string;
  subjectId: number;
  subjectName: string;
  room: string | null;
}

export interface TimetableDay { dayOfWeek: number; weekday: Weekday; lessons: Lesson[] }

export interface Timetable {
  academicYearId: number | null;
  breaks: BreakSlot[];
  days: TimetableDay[];
}

export interface TeacherSection {
  sectionId: number;
  name: string;
  grade: string | null;
  branchId: number;
  branchName: string | null;
  academicYearId: number;
  studentCount: number;
  subjects: { subjectId: number; name: string }[];
}

export interface ExamBrief {
  examId: number;
  title: string;
  date: string;
  sectionId: number;
  sectionName: string;
  subjectId: number;
  subjectName: string;
}

export interface Overview {
  date: string;
  /** Institute-local time HH:mm, so the app needs no time zone math. */
  now: string;
  dayOfWeek: number;
  isWorkingDay: boolean;
  lessons: Lesson[];
  upcomingExams: ExamBrief[];
  pendingMarks: (ExamBrief & { pending: number })[];
}
