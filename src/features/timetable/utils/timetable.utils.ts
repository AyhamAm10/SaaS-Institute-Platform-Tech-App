import type { BreakSlot, Lesson, Timetable, TimetableDay } from '@/core/api/types';
import { toMinutes } from '@/core/format/week';
import { ar } from '@/core/strings/ar';

export type DayRow =
  | { kind: 'lesson'; key: string; startTime: string; endTime: string; lesson: Lesson }
  | { kind: 'break'; key: string; startTime: string; endTime: string; name: string };

/** Lessons and breaks of one day in time order (breaks come from the institute schedule). */
export function rowsOfDay(day: TimetableDay | undefined, breaks: BreakSlot[]): DayRow[] {
  if (!day || day.lessons.length === 0) return [];
  const rows: DayRow[] = [
    ...day.lessons.map((lesson): DayRow => ({ kind: 'lesson', key: `l${lesson.id}`, startTime: lesson.startTime, endTime: lesson.endTime, lesson })),
    ...breaks.map((b, i): DayRow => ({ kind: 'break', key: `b${i}`, startTime: b.startTime, endTime: b.endTime, name: b.name })),
  ];
  return rows.sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
}

/** Day tabs in institute order with the short weekday name and the lesson count for the spoken label. */
export function dayTabs(timetable: Timetable) {
  return timetable.days.map((d) => ({
    key: String(d.dayOfWeek),
    label: ar.weekdaysShort[d.weekday],
    a11yLabel: `${ar.weekdays[d.weekday]}، ${ar.timetable.lessonsCount(d.lessons.length)}`,
  }));
}

/** The tab to open first: today if it is a working day of the grid, else the first day. */
export function initialDay(timetable: Timetable, todayDow: number): number | null {
  if (timetable.days.some((d) => d.dayOfWeek === todayDow)) return todayDow;
  return timetable.days[0]?.dayOfWeek ?? null;
}

/** Lessons in the whole week (an empty grid means the timetable was not built yet). */
export const weekLessonCount = (timetable: Timetable): number =>
  timetable.days.reduce((n, d) => n + d.lessons.length, 0);
