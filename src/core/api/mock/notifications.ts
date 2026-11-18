import type { NotificationCategory, ServerNotification } from '../types';

const at = (daysAgo: number, hm: string) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const [h, m] = hm.split(':').map(Number);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

const n = (
  id: number, type: ServerNotification['type'], title: string, body: string, data: Record<string, unknown>, when: string, read = false,
): ServerNotification => ({ id, type, title, body, data: { type, ...data }, studentId: null, read, createdAt: when });

/** Mock inbox of the demo teacher, newest first; read state and switches live in memory. */
const inbox: ServerNotification[] = [
  n(5, 'MARKS_REMINDER', 'علامات بانتظار الإدخال', 'المذاكرة الأولى - التاسع - شعبة أ (2026/11/15)', { examId: 18, sectionId: 4 }, at(0, '09:00')),
  n(4, 'TEACHER_ASSIGNED', 'إسناد جديد', 'أُسندت إليك مادة الفيزياء في بكالوريا علمي - شعبة 1', { path: '/sections', sectionId: 2 }, at(0, '08:15')),
  n(3, 'TIMETABLE_CHANGED', 'تعديل في برنامجك', 'تغيّرت حصص في برنامجك الأسبوعي، اطّلع عليه', { path: '/timetable' }, at(1, '17:40')),
  n(2, 'TEACHER_EXAM_CREATED', 'مذاكرة جديدة في مادتك', 'المذاكرة الثانية - التاسع - شعبة أ يوم 2026/11/22', { examId: 21, sectionId: 3 }, at(2, '12:00'), true),
  n(1, 'CLOSURE', 'عطلة: اجتماع الأهالي', 'يوم 2026/11/27', { path: '/notifications' }, at(5, '14:00'), true),
];
let disabled: NotificationCategory[] = [];

const CATEGORIES: NotificationCategory[] = ['ATTENDANCE', 'FINANCE', 'STUDY', 'NOTES', 'GENERAL'];
const settings = () => ({ categories: CATEGORIES.map((key) => ({ key, enabled: !disabled.includes(key) })) });

/** Handles /notifications/* in mock mode (null = not a notifications route). */
export function notificationsRoute(url: string, method: string, body: Record<string, unknown>): unknown {
  if (!url.includes('/notifications')) return null;
  if (url.endsWith('/unread-count')) return { unread: inbox.filter((x) => !x.read).length };
  if (url.endsWith('/read-all')) {
    inbox.forEach((x) => { x.read = true; });
    return { updated: inbox.length };
  }
  const one = url.match(/\/notifications\/(\d+)\/read$/);
  if (one) {
    inbox.forEach((x) => { if (x.id === Number(one[1])) x.read = true; });
    return { updated: 1 };
  }
  if (url.endsWith('/devices')) return method === 'delete' ? { removed: 1 } : { registered: true };
  if (url.endsWith('/settings')) {
    if (method === 'put') disabled = (body.disabledCategories as NotificationCategory[]) ?? [];
    return settings();
  }
  return { data: inbox, total: inbox.length, unread: inbox.filter((x) => !x.read).length, page: 1, limit: 30, totalPages: 1 };
}
