import { Header, IconButton, QueryBoundary, Screen, SegmentTabs, Skeleton, Stack, Surface } from '@/components';
import { ar } from '@/core/strings/ar';
import { useTimetableMirror } from '../store/timetable.store';
import { dayTabs } from '../utils/timetable.utils';
import { DayList } from './DayList';

/** Timetable tab: day tabs in institute order and the selected day's lessons and breaks. */
export function TimetableView({ onNotifications }: { onNotifications: () => void }) {
  const data = useTimetableMirror('data');
  const isPending = useTimetableMirror('isPending');
  const isError = useTimetableMirror('isError');
  const error = useTimetableMirror('error');
  const refetch = useTimetableMirror('refetch');
  const selectedDay = useTimetableMirror('selectedDay');
  const setDay = useTimetableMirror('setDay');

  return (
    <Screen withTabBar>
      <Screen.Header>
        <Header title={ar.timetable.title}>
          <Header.Actions>
            <IconButton icon="notifications" label={ar.notifications.title} onPress={onNotifications} />
          </Header.Actions>
        </Header>
      </Screen.Header>
      <Screen.Body>
        <QueryBoundary
          query={{ data, isPending, isError, error, refetch }}
          skeleton={<Stack gap="md"><Skeleton height={44} /><Surface><Skeleton height={14} /><Skeleton height={14} width={180} /></Surface></Stack>}
        >
          {(timetable) => (
            <Stack gap="md">
              <SegmentTabs fill items={dayTabs(timetable)} value={String(selectedDay)} onChange={(key) => setDay(Number(key))} />
              <DayList timetable={timetable} dayOfWeek={selectedDay} />
            </Stack>
          )}
        </QueryBoundary>
      </Screen.Body>
    </Screen>
  );
}
