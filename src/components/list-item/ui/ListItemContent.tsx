import { Stack } from '../../layout';
import { Text } from '../../text';

interface Props { title: string; subtitle?: string; caption?: string }

/** Title with optional subtitle and caption; takes the free width of the row. */
export function ListItemContent({ title, subtitle, caption }: Props) {
  return (
    <Stack fill gap="none">
      <Text variant="label" numberOfLines={1}>{title}</Text>
      {subtitle ? <Text variant="caption" tone="secondary" numberOfLines={1}>{subtitle}</Text> : null}
      {caption ? <Text variant="caption" tone="muted" numberOfLines={1}>{caption}</Text> : null}
    </Stack>
  );
}
