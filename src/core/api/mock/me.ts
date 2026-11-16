import type { TeacherMe } from '../types';
import { daysFromToday } from './dates';

export const teacherMe: TeacherMe = {
  teacher: { id: 5, fullName: 'سامر الحسن', phone: '0933000000', specialization: 'الرياضيات والفيزياء' },
  institute: { id: 1, timezone: 'Asia/Damascus' },
  branches: [{ id: 2, name: 'فرع المزة' }],
  academicYear: { id: 1, name: '2026 - 2027', startDate: daysFromToday(-60), endDate: daysFromToday(240) },
  schedule: {
    workingDays: [6, 0, 1, 2, 3, 4],
    dayStartTime: '08:00',
    dayEndTime: '14:00',
    periodDurationMinutes: 45,
    lateAfterMinutes: 15,
    breaks: [{ name: 'استراحة', startTime: '10:15', endTime: '10:45' }],
  },
  availability: [
    { dayOfWeek: 6, startTime: '08:00', endTime: '14:00' },
    { dayOfWeek: 0, startTime: '08:00', endTime: '12:00' },
  ],
};
