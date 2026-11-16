import type { IconName } from '@/components';
import { ar } from '@/core/strings/ar';

export interface DemoNotification {
  id: number;
  icon: IconName;
  title: string;
  body: string;
  when: string;
}

/** STATIC demo content: notifications need a server and push, postponed (docs/product/teacher-app-plan.md). */
export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  { id: 1, icon: 'swap-horizontal', title: ar.notifications.types.timetable, body: 'نُقلت حصة الرياضيات للتاسع - أ إلى الحصة الثالثة يوم الأحد', when: 'قبل ساعة' },
  { id: 2, icon: 'ribbon', title: ar.notifications.types.exam, body: 'مذاكرة الدرس الثالث للتاسع - أ بعد يومين', when: 'أمس' },
  { id: 3, icon: 'create', title: ar.notifications.types.marks, body: '7 طلاب بانتظار إدخال علامات التاسع - ب', when: 'أمس' },
  { id: 4, icon: 'megaphone', title: ar.notifications.types.announcement, body: 'اجتماع الهيئة التدريسية يوم الخميس بعد الدوام', when: 'منذ 3 أيام' },
];
