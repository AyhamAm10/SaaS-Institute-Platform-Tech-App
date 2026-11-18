import { groupByDay, targetOf, toItem } from '@/features/notifications/utils/inbox.utils';

describe('notification targets', () => {
  it('opens the marks of an exam when the notice names one', () => {
    expect(targetOf({ examId: '5', sectionId: '2', path: '/notifications' })).toBe('/exams/5?sectionId=2');
  });
  it('opens the timetable or sections, and stays in the inbox otherwise', () => {
    expect(targetOf({ path: '/timetable' })).toBe('/timetable');
    expect(targetOf({ path: '/sections' })).toBe('/sections');
    expect(targetOf({ path: '/attendance' })).toBeNull();
    expect(targetOf(null)).toBeNull();
  });
});

describe('inbox grouping', () => {
  it('maps to local time and groups newest day first', () => {
    const row = (id: number, at: Date) => toItem({
      id, type: 'CLOSURE', title: 't', body: 'b', data: {}, studentId: null, read: false, createdAt: at.toISOString(),
    });
    const days = groupByDay([row(1, new Date(2026, 10, 16, 9, 0)), row(2, new Date(2026, 10, 17, 8, 5)), row(3, new Date(2026, 10, 17, 10, 0))]);
    expect(days.map((d) => d.date)).toEqual(['2026-11-17', '2026-11-16']);
    expect(days[0].items.map((i) => [i.id, i.time])).toEqual([[3, '10:00'], [2, '08:05']]);
  });
});
