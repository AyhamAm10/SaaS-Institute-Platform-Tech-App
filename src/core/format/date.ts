import { ar } from '@/core/strings/ar';
import type { Weekday } from '@/core/api/types';

const pad = (n: number) => String(n).padStart(2, '0');

const WEEKDAYS: Weekday[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

export function toYmd(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function todayYmd(now: Date = new Date()): string {
  return toYmd(now);
}

/** Parses YYYY-MM-DD as a LOCAL date (never via Date.parse, which assumes UTC). */
export function parseYmd(ymd: string): Date {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function weekdayOf(ymd: string): Weekday {
  return WEEKDAYS[parseYmd(ymd).getDay()];
}

export function weekdayFromIndex(index: number): Weekday {
  return WEEKDAYS[((index % 7) + 7) % 7];
}

/** Whole days from a to b (b - a), DST-safe. */
export function daysBetween(a: string, b: string): number {
  const ms = Date.UTC(...ymdParts(b)) - Date.UTC(...ymdParts(a));
  return Math.round(ms / 86400000);
}

function ymdParts(ymd: string): [number, number, number] {
  const [y, m, d] = ymd.split('-').map(Number);
  return [y, m - 1, d];
}

/** "الأحد، 8 تشرين الثاني" */
export function formatLongDate(ymd: string): string {
  const d = parseYmd(ymd);
  return `${ar.weekdays[weekdayOf(ymd)]}، ${d.getDate()} ${ar.months[d.getMonth()]}`;
}

/** "8 تشرين الثاني" */
export function formatDayMonth(ymd: string): string {
  const d = parseYmd(ymd);
  return `${d.getDate()} ${ar.months[d.getMonth()]}`;
}

/** "8 تشرين الثاني 2026" */
export function formatFullDate(ymd: string): string {
  return `${formatDayMonth(ymd)} ${parseYmd(ymd).getFullYear()}`;
}

/** Relative label for upcoming/past days: اليوم / غداً / أمس / date. */
export function relativeDay(ymd: string, today: string = todayYmd()): string {
  const diff = daysBetween(today, ymd);
  if (diff === 0) return ar.common.today;
  if (diff === 1) return ar.common.tomorrow;
  if (diff === -1) return ar.common.yesterday;
  return formatDayMonth(ymd);
}

/** HH:mm of "now" for lesson comparisons. */
export function nowHm(now: Date = new Date()): string {
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

/** HH:mm for either an "HH:mm" string or an ISO instant (rendered in the device's local time). */
export function formatClock(value: string | null): string {
  if (!value) return '—';
  if (/^\d{2}:\d{2}$/.test(value)) return value;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '—' : nowHm(d);
}
