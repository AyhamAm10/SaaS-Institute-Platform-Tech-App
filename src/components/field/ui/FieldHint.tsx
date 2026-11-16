import { Text } from '../../text';

export function FieldHint({ children }: { children: string }) {
  return <Text variant="caption" tone="muted">{children}</Text>;
}
