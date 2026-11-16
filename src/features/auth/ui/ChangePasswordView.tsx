import { BrandMark, Button, Reveal, Screen, Stack, Surface, Text, TextField } from '@/components';
import { ar } from '@/core/strings/ar';
import { useChangePasswordMirror } from '../store/change-password.store';

interface ChangePasswordViewProps {
  onSubmit: () => void;
  onSignOut: () => void;
}

/** First step on a default password: three password fields on a glass surface. ui/ reads the store through the mirror only. */
export function ChangePasswordView({ onSubmit, onSignOut }: ChangePasswordViewProps) {
  const form = useChangePasswordMirror('form');
  const errors = useChangePasswordMirror('errors');
  const generalError = useChangePasswordMirror('generalError');
  const isSubmitting = useChangePasswordMirror('isSubmitting');
  const setField = useChangePasswordMirror('setField');
  const secure = { show: ar.auth.show, hide: ar.auth.hide };

  return (
    <Screen ambient="login">
      <Screen.Body>
        <Reveal index={0}>
          <Stack align="center" gap="md" pt="huge">
            <BrandMark size="xl" glow />
            <Text variant="title" align="center">{ar.auth.changeTitle}</Text>
            <Text tone="secondary" align="center">{ar.auth.changeSubtitle}</Text>
          </Stack>
        </Reveal>
        <Reveal index={1}>
          <Surface variant="hero" padding="xl" gap="lg">
            <TextField
              label={ar.auth.currentPassword} value={form.currentPassword} onChangeText={(v) => setField('currentPassword', v)}
              error={errors.currentPassword || undefined} secure={secure} ltr
            />
            <TextField
              label={ar.auth.newPassword} value={form.newPassword} onChangeText={(v) => setField('newPassword', v)}
              error={errors.newPassword || undefined} secure={secure} ltr
            />
            <TextField
              label={ar.auth.confirmPassword} value={form.confirmPassword} onChangeText={(v) => setField('confirmPassword', v)}
              error={errors.confirmPassword || undefined} secure={secure} ltr
              onSubmitEditing={onSubmit} returnKeyType="go"
            />
            {generalError ? <Text tone="danger" accessibilityRole="alert">{generalError}</Text> : null}
            <Button label={ar.auth.changeSubmit} onPress={onSubmit} variant="accent" loading={isSubmitting} block />
            <Button label={ar.auth.signOut} onPress={onSignOut} variant="ghost" block />
          </Surface>
        </Reveal>
      </Screen.Body>
    </Screen>
  );
}
