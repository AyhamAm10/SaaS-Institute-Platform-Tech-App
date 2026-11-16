import { Button, Dialog } from '@/components';
import { ar } from '@/core/strings/ar';
import { useMarksMirror } from '../store/marks.store';

/** Shown when leaving the sheet with unsaved marks. */
export function LeaveDialog({ onLeave }: { onLeave: () => void }) {
  const open = useMarksMirror('leaveOpen');
  const setOpen = useMarksMirror('setLeaveOpen');
  return (
    <Dialog visible={open} onClose={() => setOpen(false)} label={ar.marks.leaveTitle}>
      <Dialog.Title icon="alert-circle" tone="warning">{ar.marks.leaveTitle}</Dialog.Title>
      <Dialog.Body>{ar.marks.leaveMessage}</Dialog.Body>
      <Dialog.Actions>
        <Button label={ar.marks.stay} onPress={() => setOpen(false)} variant="ghost" />
        <Button label={ar.marks.leave} onPress={onLeave} variant="danger" />
      </Dialog.Actions>
    </Dialog>
  );
}
