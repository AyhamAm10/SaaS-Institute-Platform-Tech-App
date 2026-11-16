import { Button, Dialog } from '@/components';
import { ar } from '@/core/strings/ar';
import { useMoreMirror } from '../store/more.store';

/** Logout confirmation. */
export function LogoutDialog({ onConfirm }: { onConfirm: () => void }) {
  const open = useMoreMirror('logoutOpen');
  const signingOut = useMoreMirror('isSigningOut');
  const close = useMoreMirror('closeLogout');
  return (
    <Dialog visible={open} onClose={close} label={ar.more.logoutTitle}>
      <Dialog.Title icon="log-out" tone="danger">{ar.more.logoutTitle}</Dialog.Title>
      <Dialog.Body>{ar.more.logoutMessage}</Dialog.Body>
      <Dialog.Actions>
        <Button label={ar.common.cancel} onPress={close} variant="ghost" />
        <Button label={ar.more.logout} onPress={onConfirm} variant="danger" loading={signingOut} />
      </Dialog.Actions>
    </Dialog>
  );
}
