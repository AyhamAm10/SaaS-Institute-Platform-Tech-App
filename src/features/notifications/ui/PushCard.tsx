import { Button, Icon, Row, Stack, StatusPill, Surface, Text, type IconName } from '@/components';
import type { PushPermission } from '@/core/push/types';
import { ar } from '@/core/strings/ar';

const ICON: Record<Exclude<PushPermission, 'granted'>, IconName> = {
  default: 'notifications',
  needsInstall: 'phone-portrait',
  expoGo: 'phone-portrait',
  denied: 'notifications-off',
  unsupported: 'notifications-off',
};

interface Props {
  permission: PushPermission | null;
  enabling: boolean;
  onEnable: () => void;
}

/** This device's push state: enable button, iPhone install steps, or how to unblock. */
export function PushCard({ permission, enabling, onEnable }: Props) {
  if (permission === null) return null;
  if (permission === 'granted') return <StatusPill label={ar.notifications.push.granted} tone="success" icon="checkmark-circle" />;
  const text = ar.notifications.push[permission];
  return (
    <Surface padding="lg" gap="md">
      <Row gap="md" align="start">
        <Icon name={ICON[permission]} tone="accentSolid" size="lg" />
        <Stack gap="xs" flex={1}>
          <Text variant="heading">{text.title}</Text>
          <Text variant="caption" tone="muted">{text.hint}</Text>
        </Stack>
      </Row>
      {permission === 'default' ? (
        <Button label={ar.notifications.push.enable} icon="notifications" onPress={onEnable} loading={enabling} block />
      ) : null}
    </Surface>
  );
}
