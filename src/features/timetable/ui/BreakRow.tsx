import { Icon, ListItem, Surface } from '@/components';

/** A break between lessons: quiet, tinted, no actions. */
export function BreakRow({ name, start, end }: { name: string; start: string; end: string }) {
  return (
    <Surface variant="tinted" tone="neutral" padding="sm">
      <ListItem>
        <ListItem.Leading><Icon name="cafe" tone="muted" /></ListItem.Leading>
        <ListItem.Content title={name} caption={`${start} - ${end}`} />
      </ListItem>
    </Surface>
  );
}
