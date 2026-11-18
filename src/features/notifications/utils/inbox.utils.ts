import type { ServerNotification, ServerNotificationType } from '@/core/api/types';
import { nowHm, toYmd } from '@/core/format/date';

/** An inbox row ready for the screen (local date and time of the device). */
export interface InboxItem {
  id: number;
  type: ServerNotificationType;
  title: string;
  body: string;
  /** YYYY-MM-DD (local). */
  date: string;
  /** HH:mm (local). */
  time: string;
  read: boolean;
  /** Screen to open, null = stays in the inbox. */
  target: string | null;
}

export interface InboxDay { date: string; items: InboxItem[] }

/** The push / row data the target is built from (push data arrives as strings). */
export interface TargetData { path?: unknown; examId?: unknown; sectionId?: unknown }

/** Where a notification leads in this app: an exam's marks, the timetable or the sections. */
export function targetOf(data: TargetData | null | undefined): string | null {
  const examId = Number(data?.examId);
  const sectionId = Number(data?.sectionId);
  if (examId > 0 && sectionId > 0) return `/exams/${examId}?sectionId=${sectionId}`;
  if (data?.path === '/timetable' || data?.path === '/sections') return data.path;
  return null;
}

export function toItem(n: ServerNotification): InboxItem {
  const at = new Date(n.createdAt);
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    body: n.body,
    date: toYmd(at),
    time: nowHm(at),
    read: n.read,
    target: targetOf(n.data),
  };
}

/** Groups by date: newest day first, newest item first inside a day. */
export function groupByDay(items: InboxItem[]): InboxDay[] {
  const map = new Map<string, InboxItem[]>();
  for (const item of items) map.set(item.date, [...(map.get(item.date) ?? []), item]);
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, list]) => ({ date, items: [...list].sort((a, b) => b.time.localeCompare(a.time) || b.id - a.id) }));
}
