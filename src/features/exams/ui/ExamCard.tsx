import { Icon, IconButton, ListItem, Row, Stack, StatusPill, Surface, Text } from '@/components';
import type { ExamItem } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { examDateLabel, examMarksLabel } from '../utils/exam-days';

interface Props { exam: ExamItem; onOpen: () => void; onEdit: () => void; onDelete: () => void }

/** One exam: the top row opens the marks sheet; edit and delete are separate buttons (no nested buttons). */
export function ExamCard({ exam, onOpen, onEdit, onDelete }: Props) {
  return (
    <Surface gap="sm">
      <ListItem onPress={onOpen} label={`${exam.title} ${ar.marks.title}`}>
        <ListItem.Leading><Icon name="ribbon" tone="accentSolid" /></ListItem.Leading>
        <ListItem.Content title={exam.title} subtitle={`${exam.subject.name} · ${exam.section.name}`} />
        <ListItem.Meta><StatusPill label={examDateLabel(exam)} tone="info" icon="calendar" /></ListItem.Meta>
      </ListItem>
      <Row justify="between" gap="sm">
        <Stack fill gap="xs">
          <Text variant="caption" tone="muted">{examMarksLabel(exam)}</Text>
          {exam.examType ? <Row><StatusPill label={exam.examType.name} tone="neutral" /></Row> : null}
        </Stack>
        <Row gap="xs">
          <IconButton icon="create" label={ar.exams.edit} onPress={onEdit} />
          <IconButton icon="trash" label={ar.exams.remove} onPress={onDelete} />
        </Row>
      </Row>
    </Surface>
  );
}
