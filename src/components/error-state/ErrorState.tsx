import { toArabicMessage } from '@/core/api/errors';
import { ar } from '@/core/strings/ar';
import { Button } from '../button';
import { Icon } from '../icon';
import { Stack } from '../layout';
import { Text } from '../text';

interface Props { error: unknown; onRetry: () => void }

/** A failed load: the Arabic message of the error and a retry button. */
export function ErrorState({ error, onRetry }: Props) {
  return (
    <Stack align="center" gap="md" py="xxl" px="lg" accessibilityRole="alert">
      <Icon name="cloud-offline" size="xl" tone="muted" />
      <Text variant="heading" align="center">{ar.errors.loadFailed}</Text>
      <Text tone="secondary" align="center">{toArabicMessage(error)}</Text>
      <Button label={ar.common.retry} onPress={onRetry} variant="ghost" icon="refresh" />
    </Stack>
  );
}
