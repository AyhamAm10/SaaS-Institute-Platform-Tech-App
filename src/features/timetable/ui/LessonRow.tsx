import { Icon, ListItem, StatusPill, Surface } from '@/components';
import type { Lesson } from '@/core/api/types';

/** One lesson: times on the start side, subject and section, and the room as a pill. */
export function LessonRow({ lesson }: { lesson: Lesson }) {
  return (
    <Surface padding="md">
      <ListItem>
        <ListItem.Leading><Icon name="book" tone="accentSolid" /></ListItem.Leading>
        <ListItem.Content title={lesson.subjectName} subtitle={lesson.sectionName} caption={`${lesson.startTime} - ${lesson.endTime}`} />
        {lesson.room ? <ListItem.Meta><StatusPill label={lesson.room} tone="neutral" icon="location" /></ListItem.Meta> : null}
      </ListItem>
    </Surface>
  );
}
