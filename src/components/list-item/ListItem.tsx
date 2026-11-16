import type { ReactNode } from 'react';
import { Row } from '../layout';
import { Pressable } from '../pressable';
import { ListItemContent } from './ui/ListItemContent';
import { ListItemLeading } from './ui/ListItemLeading';
import { ListItemMeta } from './ui/ListItemMeta';
import { ListItemTrailing } from './ui/ListItemTrailing';

interface Props {
  /** Makes the row a button (then `label` is required). */
  onPress?: () => void;
  label?: string;
  children: ReactNode;
}

/**
 * One row: `<ListItem><ListItem.Leading>..</ListItem.Leading><ListItem.Content title=".." subtitle=".." />
 * <ListItem.Meta>..</ListItem.Meta><ListItem.Trailing>..</ListItem.Trailing></ListItem>`.
 */
export function ListItem({ onPress, label, children }: Props) {
  const row = <Row gap="md" minHeight={56} py="xs">{children}</Row>;
  return onPress ? <Pressable onPress={onPress} label={label ?? ''} scaleTo={0.98}>{row}</Pressable> : row;
}

ListItem.Leading = ListItemLeading;
ListItem.Content = ListItemContent;
ListItem.Meta = ListItemMeta;
ListItem.Trailing = ListItemTrailing;
