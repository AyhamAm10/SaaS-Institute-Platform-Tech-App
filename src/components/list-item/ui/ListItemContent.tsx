import { Stack } from '../../layout';
import { Text } from '../../text';

interface Props {
  title: string;
  subtitle?: string;
  caption?: string;
  /** Lines the subtitle may take before it is cut (1 by default; messages use more). */
  subtitleLines?: number;
}

/** Title with optional subtitle and caption; takes the free width of the row. */
export function ListItemContent({ title, subtitle, caption, subtitleLines = 1 }: Props) {
  return (
    <Stack fill gap="none">
      <Text variant="label" numberOfLines={1}>{title}</Text>
      {subtitle ? <Text variant="caption" tone="secondary" numberOfLines={subtitleLines}>{subtitle}</Text> : null}
      {caption ? <Text variant="caption" tone="muted" numberOfLines={1}>{caption}</Text> : null}
    </Stack>
  );
}
