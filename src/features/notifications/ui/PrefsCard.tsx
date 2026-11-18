import { Chip, ListItem, Skeleton, Stack, Surface, Text } from '@/components';
import type { NotificationCategory } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

interface Props {
  loading: boolean;
  categories: { key: NotificationCategory; enabled: boolean }[];
  onToggle: (key: NotificationCategory, enabled: boolean) => void;
}

/** The kinds of notifications a teacher receives, each switchable (saved on the server). */
export function PrefsCard({ loading, categories, onToggle }: Props) {
  return (
    <Surface padding="lg" gap="sm">
      <Stack gap="xs">
        <Text variant="heading" accessibilityRole="header">{ar.notifications.prefs}</Text>
        <Text variant="caption" tone="muted">{ar.notifications.prefsNote}</Text>
      </Stack>
      {loading ? <Skeleton height={96} /> : null}
      {categories.map((c) => {
        const text = ar.notifications.categories[c.key as keyof typeof ar.notifications.categories];
        return (
          <ListItem key={c.key}>
            <ListItem.Content title={text.title} subtitle={text.hint} />
            <ListItem.Trailing>
              <Chip
                label={c.enabled ? ar.notifications.on : ar.notifications.off}
                selected={c.enabled}
                tone="success"
                onPress={() => onToggle(c.key, !c.enabled)}
              />
            </ListItem.Trailing>
          </ListItem>
        );
      })}
    </Surface>
  );
}
