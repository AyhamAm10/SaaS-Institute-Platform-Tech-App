import { Icon, ListItem, StatusPill, Text, type IconName } from '@/components';
import type { ServerNotificationType } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import type { ColorRole } from '@/core/theme/roles';
import type { InboxItem } from '../utils/inbox.utils';

const META: Partial<Record<ServerNotificationType, { icon: IconName; tone: ColorRole }>> = {
  TEACHER_ASSIGNED: { icon: 'school', tone: 'info' },
  TIMETABLE_CHANGED: { icon: 'swap-horizontal', tone: 'info' },
  TEACHER_EXAM_CREATED: { icon: 'document-text', tone: 'accentSolid' },
  MARKS_REMINDER: { icon: 'create', tone: 'warning' },
  LESSON_REMINDER: { icon: 'alarm', tone: 'accentSolid' },
  EXAM_REMINDER: { icon: 'document-text', tone: 'warning' },
  CLOSURE: { icon: 'cafe', tone: 'success' },
};

interface Props { item: InboxItem; onPress: () => void }

/** One notification: type icon, title + body, time; an "unread" pill (color is never the only signal). */
export function InboxRow({ item, onPress }: Props) {
  const meta = META[item.type] ?? { icon: 'notifications', tone: 'accentSolid' };
  return (
    <ListItem onPress={onPress} label={`${item.read ? '' : `${ar.notifications.unread}، `}${item.title}، ${item.body}، ${item.time}`}>
      <ListItem.Leading><Icon name={meta.icon} tone={meta.tone} filled={!item.read} /></ListItem.Leading>
      <ListItem.Content title={item.title} subtitle={item.body} subtitleLines={3} />
      <ListItem.Meta>
        {item.read ? <Text variant="caption" tone="muted">{item.time}</Text> : <StatusPill label={item.time} tone="accent" />}
      </ListItem.Meta>
    </ListItem>
  );
}
