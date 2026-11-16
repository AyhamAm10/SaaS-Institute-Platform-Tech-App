import { EmptyState, Reveal, Stack } from '@/components';
import type { Timetable } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { weekLessonCount, rowsOfDay } from '../utils/timetable.utils';
import { BreakRow } from './BreakRow';
import { LessonRow } from './LessonRow';

interface Props { timetable: Timetable; dayOfWeek: number | null }

/** The rows of the selected day; a friendly empty state for an empty day or an unbuilt timetable. */
export function DayList({ timetable, dayOfWeek }: Props) {
  if (weekLessonCount(timetable) === 0) {
    return <EmptyState icon="calendar-clear" title={ar.timetable.noTimetable} hint={ar.timetable.noTimetableHint} />;
  }
  const day = timetable.days.find((d) => d.dayOfWeek === dayOfWeek);
  const rows = rowsOfDay(day, timetable.breaks);
  if (rows.length === 0) return <EmptyState icon="cafe" title={ar.timetable.empty} hint={ar.timetable.emptyHint} />;
  return (
    <Stack gap="sm" key={dayOfWeek}>
      {rows.map((row, i) => (
        <Reveal key={row.key} index={i}>
          {row.kind === 'lesson' ? <LessonRow lesson={row.lesson} /> : <BreakRow name={row.name} start={row.startTime} end={row.endTime} />}
        </Reveal>
      ))}
    </Stack>
  );
}
