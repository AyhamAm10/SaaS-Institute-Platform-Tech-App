import { Text } from '../../text';

export function DialogBody({ children }: { children: string }) {
  return <Text tone="secondary">{children}</Text>;
}
