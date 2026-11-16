import { Stack } from '../../layout';
import { Text } from '../../text';

interface Props { title: string; subtitle?: string }

export function SheetHeader({ title, subtitle }: Props) {
  return (
    <Stack gap="xs">
      <Text variant="heading" accessibilityRole="header">{title}</Text>
      {subtitle ? <Text variant="caption" tone="secondary">{subtitle}</Text> : null}
    </Stack>
  );
}
