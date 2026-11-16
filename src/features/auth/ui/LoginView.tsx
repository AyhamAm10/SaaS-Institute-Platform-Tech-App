import { BrandMark, Button, Reveal, Screen, Stack, Surface, Text, TextField } from '@/components';
import { BRAND } from '@/core/brand';
import { ar } from '@/core/strings/ar';
import { useLoginMirror } from '../store/login.store';

/** Branded login: logo, welcome line and the form on a glass surface. ui/ reads the store through the mirror only. */
export function LoginView({ onSubmit }: { onSubmit: () => void }) {
  const form = useLoginMirror('form');
  const errors = useLoginMirror('errors');
  const needsCode = useLoginMirror('needsCode');
  const generalError = useLoginMirror('generalError');
  const isSubmitting = useLoginMirror('isSubmitting');
  const setField = useLoginMirror('setField');

  return (
    <Screen ambient="login">
      <Screen.Body>
        <Reveal index={0}>
          <Stack align="center" gap="md" pt="huge">
            <BrandMark size="xl" glow />
            <Text variant="title" align="center">{BRAND.name}</Text>
            <Text tone="secondary" align="center">{ar.auth.subtitle}</Text>
          </Stack>
        </Reveal>
        <Reveal index={1}>
          <Surface variant="hero" padding="xl" gap="lg">
            <TextField
              label={ar.auth.phone} value={form.phone} onChangeText={(v) => setField('phone', v)}
              error={errors.phone || undefined} keyboardType="phone-pad" autoCapitalize="none" ltr
            />
            <TextField
              label={ar.auth.password} value={form.password} onChangeText={(v) => setField('password', v)}
              error={errors.password || undefined} secure={{ show: ar.auth.show, hide: ar.auth.hide }} ltr
              onSubmitEditing={onSubmit} returnKeyType="go"
            />
            {needsCode ? (
              <TextField
                label={ar.auth.instituteCode} hint={ar.auth.instituteCodeHint} value={form.instituteCode}
                onChangeText={(v) => setField('instituteCode', v)} error={errors.instituteCode || undefined}
                autoCapitalize="characters" ltr
              />
            ) : null}
            {generalError ? <Text tone="danger" accessibilityRole="alert">{generalError}</Text> : null}
            <Button label={ar.auth.submit} onPress={onSubmit} variant="accent" loading={isSubmitting} block />
          </Surface>
        </Reveal>
      </Screen.Body>
    </Screen>
  );
}
