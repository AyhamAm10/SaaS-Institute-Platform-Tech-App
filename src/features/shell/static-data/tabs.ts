import type { TabBarItem } from '@/components';
import { ar } from '@/core/strings/ar';

/** Route name -> tab. The route names are the file names under src/app/(app)/(tabs). */
export const TAB_ITEMS: TabBarItem[] = [
  { key: 'index', label: ar.tabs.today, icon: 'home' },
  { key: 'timetable', label: ar.tabs.timetable, icon: 'calendar' },
  { key: 'sections', label: ar.tabs.sections, icon: 'people' },
  { key: 'exams', label: ar.tabs.exams, icon: 'ribbon' },
  { key: 'more', label: ar.tabs.more, icon: 'person-circle' },
];
