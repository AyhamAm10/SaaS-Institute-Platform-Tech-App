import { ar } from '@/core/strings/ar';
import { WEEK_ORDER } from './week';

const pad = (n: number) => String(n).padStart(2, '0');

export interface DayCell { ymd: string; day: number }

/** Cells of a month grid starting on Saturday: `null` pads the days before the 1st. Month is 0-11. */
export function monthCells(year: number, month: number): (DayCell | null)[] {
  const first = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const lead = WEEK_ORDER.indexOf(first as (typeof WEEK_ORDER)[number]);
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, i) => ({ ymd: `${year}-${pad(month + 1)}-${pad(i + 1)}`, day: i + 1 })),
  ];
}

/** "تشرين الثاني 2026". */
export const monthTitle = (year: number, month: number): string => `${ar.months[month]} ${year}`;

/** Year and month after moving `delta` months (month 0-11). */
export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const d = new Date(Date.UTC(year, month + delta, 1));
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

/** Short weekday names in institute order (Saturday first). */
export const weekHeader = (): string[] =>
  WEEK_ORDER.map((d) => ar.weekdaysShort[(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'] as const)[d]]);

/** Year and month (0-11) of a `YYYY-MM-DD` date. */
export function ymOf(ymd: string): { year: number; month: number } {
  const [y, m] = ymd.split('-').map(Number);
  return { year: y, month: m - 1 };
}
