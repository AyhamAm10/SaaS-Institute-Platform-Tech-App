import { Text } from '../../text';

export function FieldLabel({ children }: { children: string }) {
  return <Text variant="label" tone="secondary">{children}</Text>;
}
