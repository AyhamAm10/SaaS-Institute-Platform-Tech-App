import { IconButton } from '../../button';

/** Back button; the chevron flips with the layout direction (RTL: points right). */
export function HeaderBack({ onPress, label }: { onPress: () => void; label: string }) {
  return <IconButton icon="chevron-forward" label={label} onPress={onPress} />;
}
