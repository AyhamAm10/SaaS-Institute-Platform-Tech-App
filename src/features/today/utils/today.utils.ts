import type { Lesson } from '@/core/api/types';
import { toMinutes } from '@/core/format/week';

export type LessonState = 'done' | 'current' | 'upcoming';

/** Where a lesson stands at institute-local time `now` (HH:mm, from the server). */
export function lessonState(lesson: Pick<Lesson, 'startTime' | 'endTime'>, now: string): LessonState {
  const t = toMinutes(now);
  if (t >= toMinutes(lesson.endTime)) return 'done';
  return t >= toMinutes(lesson.startTime) ? 'current' : 'upcoming';
}
