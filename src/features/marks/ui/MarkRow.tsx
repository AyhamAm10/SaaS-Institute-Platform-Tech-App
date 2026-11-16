import { Chip, Row, ScoreField, Stack, StatusPill, Surface, Text } from '@/components';
import type { ExamItem, SheetRow } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { useMarksMirror } from '../store/marks.store';
import { parseMark, previewStatus, STATUS_TONE } from '../utils/marks.utils';

interface Props { row: SheetRow; exam: ExamItem }

/** One student: name, the mark box, an "absent" toggle and the status the mark will have. */
export function MarkRow({ row, exam }: Props) {
  const edit = useMarksMirror('edits')[row.student.id];
  const setMark = useMarksMirror('setMark');
  const toggleAbsent = useMarksMirror('toggleAbsent');
  const max = Number(exam.maxMark);
  const status = previewStatus(edit, Number(exam.passMark), max);
  const invalid = !!edit && !edit.absent && !parseMark(edit.text, max).valid;
  return (
    <Surface padding="md" gap="sm">
      <Row justify="between" gap="sm" align="center">
        <Stack fill gap="none">
          <Text variant="label" numberOfLines={1}>{row.student.fullName}</Text>
          {row.eligible ? null : <Text variant="caption" tone="muted">{ar.marks.noStudents}</Text>}
        </Stack>
        <StatusPill label={ar.marks.status[status]} tone={STATUS_TONE[status]} />
      </Row>
      <Row gap="md" justify="between">
        <Chip label={ar.marks.absent} selected={!!edit?.absent} tone="danger" onPress={() => toggleAbsent(row.student.id)} />
        <Row gap="sm">
          <Text variant="caption" tone={invalid ? 'danger' : 'muted'}>{invalid ? ar.marks.invalid(String(max)) : ar.marks.outOf(String(max))}</Text>
          <ScoreField
            value={edit?.text ?? ''} onChangeText={(t) => setMark(row.student.id, t)} label={ar.marks.markFor(row.student.fullName)}
            invalid={invalid} disabled={!!edit?.absent}
          />
        </Row>
      </Row>
    </Surface>
  );
}
