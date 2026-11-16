import { common, errors, months, weekdays, weekdaysShort } from './common';
import { auth } from './auth';
import { notifications } from './notifications';
import { exams, marks, more, sections, tabs, timetable, today } from './screens';

/** The single Arabic strings module: every user-facing string lives under `ar`. */
export const ar = {
  common, errors, weekdays, weekdaysShort, months,
  auth, tabs, today, timetable, sections, exams, marks, more, notifications,
} as const;
