import { Header, Icon, ListItem, Reveal, Screen, Surface } from '@/components';
import type { TeacherMe } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import type { SchemePreference } from '@/core/theme/preference';
import { useMoreMirror } from '../store/more.store';
import { AppearanceCard } from './AppearanceCard';
import { LogoutDialog } from './LogoutDialog';
import { ProfileCard } from './ProfileCard';

interface Props {
  me: TeacherMe | null;
  version: string;
  preference: SchemePreference;
  onPreference: (value: SchemePreference) => void;
  onNotifications: () => void;
  onConfirmLogout: () => void;
}

/** More tab: profile, appearance, notifications entry, about and logout. */
export function MoreView({ me, version, preference, onPreference, onNotifications, onConfirmLogout }: Props) {
  const openLogout = useMoreMirror('openLogout');
  return (
    <Screen ambient="warm" withTabBar>
      <Screen.Header><Header title={ar.more.title} /></Screen.Header>
      <Screen.Body>
        {me ? <Reveal index={0}><ProfileCard me={me} /></Reveal> : null}
        <Reveal index={1}><AppearanceCard value={preference} onChange={onPreference} /></Reveal>
        <Reveal index={2}>
          <Surface padding="md" gap="xs">
            <ListItem onPress={onNotifications} label={ar.more.notifications}>
              <ListItem.Leading><Icon name="notifications" tone="accentSolid" /></ListItem.Leading>
              <ListItem.Content title={ar.more.notifications} />
              <ListItem.Trailing><Icon name="chevron-back" tone="muted" size="sm" /></ListItem.Trailing>
            </ListItem>
            <ListItem>
              <ListItem.Leading><Icon name="information-circle" tone="muted" /></ListItem.Leading>
              <ListItem.Content title={ar.more.about} subtitle={`${ar.more.version} ${version}`} />
            </ListItem>
            <ListItem onPress={openLogout} label={ar.more.logout}>
              <ListItem.Leading><Icon name="log-out" tone="danger" /></ListItem.Leading>
              <ListItem.Content title={ar.more.logout} />
            </ListItem>
          </Surface>
        </Reveal>
      </Screen.Body>
      <LogoutDialog onConfirm={onConfirmLogout} />
    </Screen>
  );
}
