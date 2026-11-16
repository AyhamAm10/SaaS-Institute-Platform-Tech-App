import { useRouter } from 'expo-router';
import { DEMO_NOTIFICATIONS } from './static-data/notifications.data';
import { NotificationsView } from './ui/NotificationsView';

/** Notifications: static demo list until a server and push exist. */
export function NotificationsController() {
  const router = useRouter();
  return <NotificationsView items={DEMO_NOTIFICATIONS} onBack={() => router.back()} />;
}
