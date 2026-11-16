import { Icon, ListItem, Module, StatusPill, Surface } from '@/components';
import type { ExamBrief } from '@/core/api/types';
import { relativeDay } from '@/core/format/date';
import { ar } from '@/core/strings/ar';

/** Exams of the next two weeks: title, section and subject, and how soon. */
export function ExamsBlock({ exams, onOpen }: { exams: ExamBrief[]; onOpen: (examId: number, sectionId: number) => void }) {
  return (
    <Module>
      <Module.Header title={ar.today.examsTitle} />
      <Module.Content>
        {exams.length === 0 ? (
          <Surface padding="md"><ListItem><ListItem.Leading><Icon name="ribbon" tone="muted" /></ListItem.Leading><ListItem.Content title={ar.today.noExams} /></ListItem></Surface>
        ) : (
          <Surface padding="md" gap="xs">
            {exams.map((e) => (
              <ListItem key={e.examId} onPress={() => onOpen(e.examId, e.sectionId)} label={e.title}>
                <ListItem.Leading><Icon name="ribbon" tone="accentSolid" /></ListItem.Leading>
                <ListItem.Content title={e.title} subtitle={`${e.subjectName} · ${e.sectionName}`} />
                <ListItem.Meta><StatusPill label={relativeDay(e.date)} tone="info" /></ListItem.Meta>
              </ListItem>
            ))}
          </Surface>
        )}
      </Module.Content>
    </Module>
  );
}
