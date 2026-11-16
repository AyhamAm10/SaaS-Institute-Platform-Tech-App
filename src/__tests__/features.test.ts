import { toMinutes, dayOfWeekOf } from '@/core/format/week';
import { createControllerStore } from '@/core/mirror';
import { toArabicMessage } from '@/core/api/errors';
import { validateLogin, EMPTY_LOGIN } from '@/features/auth/utils/login.utils';
import { lessonState } from '@/features/today/utils/today.utils';
import { dayTabs, initialDay, rowsOfDay, weekLessonCount } from '@/features/timetable/utils/timetable.utils';
import { createTimetableStore } from '@/features/timetable/store/timetable.store';
import { timetable as mockTimetable } from '@/core/api/mock/study';
import { ar } from '@/core/strings/ar';
import { AxiosError, type AxiosResponse } from 'axios';

describe('week helpers', () => {
  it('reads minutes and the weekday of a date without time zone shifts', () => {
    expect(toMinutes('08:45')).toBe(525);
    expect(dayOfWeekOf('2026-11-15')).toBe(0); // a Sunday
    expect(dayOfWeekOf('2026-11-14')).toBe(6); // a Saturday
  });
});

describe('login validation', () => {
  it('asks for a phone and a password', () => {
    expect(Object.keys(validateLogin(EMPTY_LOGIN, false)).sort()).toEqual(['password', 'phone']);
  });
  it('rejects a malformed phone and accepts local and international forms', () => {
    expect(validateLogin({ ...EMPTY_LOGIN, phone: '12ab', password: 'x' }, false).phone).toBe(ar.auth.phoneInvalid);
    expect(validateLogin({ ...EMPTY_LOGIN, phone: '0933000000', password: 'x' }, false)).toEqual({});
    expect(validateLogin({ ...EMPTY_LOGIN, phone: '+963933000000', password: 'x' }, false)).toEqual({});
  });
  it('requires the institute code only when the server asked for it', () => {
    const form = { ...EMPTY_LOGIN, phone: '0933000000', password: 'x' };
    expect(validateLogin(form, false)).toEqual({});
    expect(validateLogin(form, true).instituteCode).toBe(ar.auth.codeRequired);
  });
});

describe('today helpers', () => {
  const lesson = { startTime: '09:30', endTime: '10:15' };
  it('knows where a lesson stands at the institute-local time', () => {
    expect(lessonState(lesson, '09:00')).toBe('upcoming');
    expect(lessonState(lesson, '09:30')).toBe('current');
    expect(lessonState(lesson, '10:14')).toBe('current');
    expect(lessonState(lesson, '10:15')).toBe('done');
  });
});

describe('timetable helpers (mock grid)', () => {
  it('opens today when it is a day of the grid, else the first day', () => {
    expect(initialDay(mockTimetable, 0)).toBe(0);
    expect(initialDay(mockTimetable, 5)).toBe(6); // Friday is not a working day: first day is Saturday
  });
  it('lists the days in institute order, Saturday first', () => {
    expect(dayTabs(mockTimetable)[0].key).toBe('6');
    expect(dayTabs(mockTimetable)).toHaveLength(6);
  });
  it('merges lessons and breaks in time order', () => {
    const rows = rowsOfDay(mockTimetable.days[0], mockTimetable.breaks);
    const starts = rows.map((r) => toMinutes(r.startTime));
    expect([...starts].sort((a, b) => a - b)).toEqual(starts);
    expect(rows.some((r) => r.kind === 'break')).toBe(true);
  });
  it('treats an empty grid as an unbuilt timetable', () => {
    expect(weekLessonCount({ ...mockTimetable, days: mockTimetable.days.map((d) => ({ ...d, lessons: [] })) })).toBe(0);
  });
});

describe('controller stores', () => {
  it('keeps two timetable stores isolated', () => {
    const a = createTimetableStore();
    const b = createTimetableStore();
    a.getState().setDay(3);
    expect(b.getState().selectedDay).toBeNull();
  });
  it('creates independent generic stores', () => {
    const make = () => createControllerStore<{ n: number; inc: () => void }>((set) => ({ n: 0, inc: () => set((s) => ({ n: s.n + 1 })) }));
    const a = make();
    a.getState().inc();
    expect(a.getState().n).toBe(1);
    expect(make().getState().n).toBe(0);
  });
});

describe('deactivated accounts', () => {
  it('shows the deactivated message for the backend text in both languages', () => {
    const fail = (message: string) => {
      const response = { status: 401, data: { statusCode: 401, message } } as AxiosResponse;
      return new AxiosError(message, undefined, undefined, undefined, response);
    };
    expect(toArabicMessage(fail('This account is deactivated. Please contact the institute administration'))).toBe(ar.errors.accountDeactivated);
    expect(toArabicMessage(fail('هذا الحساب معطّل. يرجى التواصل مع إدارة المعهد'))).toBe(ar.errors.accountDeactivated);
  });
});
