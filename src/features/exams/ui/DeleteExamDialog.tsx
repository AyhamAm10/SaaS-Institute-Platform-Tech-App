import { Button, Dialog, Text } from '@/components';
import { ar } from '@/core/strings/ar';
import { useExamsMirror } from '../store/exams.store';

/** Delete confirmation; warns when the exam already has marks (they are deleted with it). */
export function DeleteExamDialog({ onConfirm }: { onConfirm: () => void }) {
  const target = useExamsMirror('deleteTarget');
  const error = useExamsMirror('deleteError');
  const isDeleting = useExamsMirror('isDeleting');
  const close = useExamsMirror('closeDelete');
  const results = target?._count.results ?? 0;
  return (
    <Dialog visible={target !== null} onClose={close} label={ar.exams.deleteTitle}>
      <Dialog.Title icon="trash" tone="danger">{ar.exams.deleteTitle}</Dialog.Title>
      <Dialog.Body>{target ? (results > 0 ? ar.exams.deleteWithResults(target.title, results) : ar.exams.deleteMessage(target.title)) : ''}</Dialog.Body>
      {error ? <Text tone="danger" accessibilityRole="alert">{error}</Text> : null}
      <Dialog.Actions>
        <Button label={ar.common.cancel} onPress={close} variant="ghost" />
        <Button label={ar.exams.remove} onPress={onConfirm} variant="danger" loading={isDeleting} />
      </Dialog.Actions>
    </Dialog>
  );
}
