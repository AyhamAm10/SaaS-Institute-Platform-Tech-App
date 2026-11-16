import { EmptyState, Header, Icon, ListItem, Reveal, Screen, Stack, StatusPill, Surface, Text } from '@/components';
import { ar } from '@/core/strings/ar';
import type { DemoNotification } from '../static-data/notifications.data';

interface Props { items: DemoNotification[]; onBack: () => void }

/** Pushed screen: a demo list with a clear "demo data" notice. */
export function NotificationsView({ items, onBack }: Props) {
  return (
    <Screen>
      <Screen.Header>
        <Header title={ar.notifications.title}>
          <Header.Back label={ar.common.back} onPress={onBack} />
        </Header>
      </Screen.Header>
      <Screen.Body>
        <StatusPill label={ar.notifications.placeholder} tone="info" icon="information-circle" />
        {items.length === 0 ? (
          <EmptyState icon="notifications" title={ar.notifications.empty} hint={ar.notifications.emptyHint} />
        ) : (
          <Stack gap="md">
            {items.map((n, i) => (
              <Reveal key={n.id} index={i}>
                <Surface padding="md">
                  <ListItem>
                    <ListItem.Leading><Icon name={n.icon} tone="accentSolid" /></ListItem.Leading>
                    <ListItem.Content title={n.title} subtitle={n.body} />
                    <ListItem.Meta><Text variant="caption" tone="muted">{n.when}</Text></ListItem.Meta>
                  </ListItem>
                </Surface>
              </Reveal>
            ))}
          </Stack>
        )}
      </Screen.Body>
    </Screen>
  );
}
