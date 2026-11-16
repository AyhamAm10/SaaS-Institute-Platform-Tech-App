import type { Lesson, Overview, TeacherSection, Timetable } from '../types';
import { daysFromToday, nowHm } from './dates';
import { teacherMe } from './me';

const WEEK_ORDER = [6, 0, 1, 2, 3, 4];
const WEEKDAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] as const;

const SECTIONS = { a: { id: 3, name: 'التاسع - أ' }, b: { id: 4, name: 'التاسع - ب' }, c: { id: 6, name: 'العاشر - علمي' } };
const SUBJECTS = { math: { id: 5, name: 'الرياضيات' }, phys: { id: 6, name: 'الفيزياء' } };
const SLOTS = [['08:00', '08:45'], ['08:45', '09:30'], ['09:30', '10:15'], ['10:45', '11:30'], ['11:30', '12:15'], ['12:15', '13:00']];

type Cell = [slot: number, section: keyof typeof SECTIONS, subject: keyof typeof SUBJECTS, room: string | null];
const PLAN: Record<number, Cell[]> = {
  6: [[0, 'a', 'math', 'قاعة 1'], [2, 'b', 'math', 'قاعة 2'], [3, 'c', 'phys', 'مخبر الفيزياء']],
  0: [[1, 'c', 'math', 'قاعة 4'], [2, 'a', 'phys', null], [4, 'b', 'phys', 'قاعة 2']],
  1: [[0, 'b', 'math', 'قاعة 2'], [3, 'a', 'math', 'قاعة 1']],
  2: [[1, 'a', 'math', 'قاعة 1'], [2, 'c', 'phys', 'مخبر الفيزياء'], [5, 'b', 'math', 'قاعة 2']],
  3: [[0, 'c', 'math', 'قاعة 4'], [4, 'a', 'phys', 'قاعة 1']],
  4: [[2, 'b', 'phys', 'قاعة 2']],
};

function lessonsOf(day: number): Lesson[] {
  return (PLAN[day] ?? []).map(([slot, s, sub, room], i) => ({
    id: day * 10 + i,
    startTime: SLOTS[slot][0],
    endTime: SLOTS[slot][1],
    periodNumber: slot + 1,
    sectionId: SECTIONS[s].id,
    sectionName: SECTIONS[s].name,
    subjectId: SUBJECTS[sub].id,
    subjectName: SUBJECTS[sub].name,
    room,
  }));
}

export const timetable: Timetable = {
  academicYearId: 1,
  breaks: teacherMe.schedule.breaks,
  days: WEEK_ORDER.map((d) => ({ dayOfWeek: d, weekday: WEEKDAYS[d], lessons: lessonsOf(d) })),
};

export const sections: TeacherSection[] = [
  { sectionId: 3, name: SECTIONS.a.name, grade: '9', branchId: 2, branchName: 'فرع المزة', academicYearId: 1, studentCount: 28, subjects: [SUBJECTS.math, SUBJECTS.phys].map((s) => ({ subjectId: s.id, name: s.name })) },
  { sectionId: 4, name: SECTIONS.b.name, grade: '9', branchId: 2, branchName: 'فرع المزة', academicYearId: 1, studentCount: 26, subjects: [SUBJECTS.math, SUBJECTS.phys].map((s) => ({ subjectId: s.id, name: s.name })) },
  { sectionId: 6, name: SECTIONS.c.name, grade: '10', branchId: 2, branchName: 'فرع المزة', academicYearId: 1, studentCount: 24, subjects: [SUBJECTS.math, SUBJECTS.phys].map((s) => ({ subjectId: s.id, name: s.name })) },
];

const exam = (id: number, title: string, days: number, s: keyof typeof SECTIONS, sub: keyof typeof SUBJECTS) => ({
  examId: id, title, date: daysFromToday(days), sectionId: SECTIONS[s].id, sectionName: SECTIONS[s].name,
  subjectId: SUBJECTS[sub].id, subjectName: SUBJECTS[sub].name,
});

export function overview(): Overview {
  const now = new Date();
  const day = now.getDay();
  return {
    date: daysFromToday(0),
    now: nowHm(now),
    dayOfWeek: day,
    isWorkingDay: teacherMe.schedule.workingDays.includes(day),
    lessons: lessonsOf(day),
    upcomingExams: [exam(21, 'مذاكرة الدرس الثالث', 2, 'a', 'math'), exam(22, 'مذاكرة الحركة', 6, 'c', 'phys')],
    pendingMarks: [{ ...exam(18, 'مذاكرة الدرس الثاني', -4, 'b', 'math'), pending: 7 }],
  };
}
