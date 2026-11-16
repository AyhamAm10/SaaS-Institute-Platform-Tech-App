import { Button, Header, QueryBoundary, Reveal, Screen, Skeleton, Stack, StatusPill, Surface } from '@/components';
import { ar } from '@/core/strings/ar';
import { changedRows, hasInvalid } from '../utils/marks.utils';
import { useMarksMirror } from '../store/marks.store';
import { LeaveDialog } from './LeaveDialog';
import { MarkRow } from './MarkRow';
import { MarksStats } from './MarksStats';

interface Props { onBack: () => void; onSubmit: () => void; onLeave: () => void }

/** The marks sheet: exam header, server statistics, a row per student, and the save button. */
export function MarksView({ onBack, onSubmit, onLeave }: Props) {
  const sheet = useMarksMirror('sheet');
  const isPending = useMarksMirror('isPending');
  const isError = useMarksMirror('isError');
  const error = useMarksMirror('error');
  const refetch = useMarksMirror('refetch');
  const edits = useMarksMirror('edits');
  const isSaving = useMarksMirror('isSaving');
  const saveError = useMarksMirror('saveError');
  const saved = useMarksMirror('saved');
  const dirty = sheet ? changedRows(sheet, edits).length : 0;

  return (
    <Screen>
      <Screen.Header>
        <Header title={sheet?.exam.title ?? ar.marks.title} eyebrow={sheet ? `${sheet.exam.subject.name} · ${sheet.exam.section.name}` : undefined}>
          <Header.Back label={ar.common.back} onPress={onBack} />
        </Header>
      </Screen.Header>
      <Screen.Body>
        <QueryBoundary query={{ data: sheet, isPending, isError, error, refetch }} skeleton={<Stack gap="md"><Skeleton height={64} /><Surface><Skeleton height={14} /><Skeleton height={14} width={200} /></Surface></Stack>}>
          {(s) => (
            <Stack gap="md">
              <Reveal index={0}><MarksStats sheet={s} /></Reveal>
              {s.rows.map((row, i) => (
                <Reveal key={row.student.id} index={Math.min(i + 1, 8)}><MarkRow row={row} exam={s.exam} /></Reveal>
              ))}
              <Stack gap="sm" pt="sm">
                {saved ? <StatusPill label={ar.marks.saved} tone="success" icon="checkmark-circle" /> : dirty > 0 ? <StatusPill label={ar.marks.unsaved} tone="warning" icon="create" /> : null}
                {saveError ? <StatusPill label={saveError} tone="danger" icon="alert-circle" /> : null}
                <Button label={isSaving ? ar.marks.saving : ar.marks.save} onPress={onSubmit} variant="accent" loading={isSaving} disabled={dirty === 0 || hasInvalid(s, edits)} block />
              </Stack>
            </Stack>
          )}
        </QueryBoundary>
      </Screen.Body>
      <LeaveDialog onLeave={onLeave} />
    </Screen>
  );
}
