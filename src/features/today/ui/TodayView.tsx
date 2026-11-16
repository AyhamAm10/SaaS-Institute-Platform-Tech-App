import { Header, IconButton, QueryBoundary, Screen, type BoundaryQuery } from '@/components';
import type { Overview } from '@/core/api/types';
import { formatLongDate } from '@/core/format/date';
import { ar } from '@/core/strings/ar';
import { TodayBody } from './TodayBody';
import { TodaySkeleton } from './TodaySkeleton';

interface Props {
  query: BoundaryQuery<Overview>;
  name: string;
  refreshing: boolean;
  onRefresh: () => void;
  onNotifications: () => void;
  onOpenExam: (examId: number, sectionId: number) => void;
}

/** The first tab: greeting header, then the day's blocks (or skeleton / error). */
export function TodayView({ query, name, refreshing, onRefresh, onNotifications, onOpenExam }: Props) {
  return (
    <Screen ambient="warm" withTabBar onRefresh={onRefresh} refreshing={refreshing}>
      <Screen.Header>
        <Header title={`${ar.today.greeting} ${name}`} eyebrow={query.data ? formatLongDate(query.data.date) : undefined}>
          <Header.Actions>
            <IconButton icon="notifications" label={ar.notifications.title} onPress={onNotifications} />
          </Header.Actions>
        </Header>
      </Screen.Header>
      <Screen.Body>
        <QueryBoundary query={query} skeleton={<TodaySkeleton />}>
          {(overview) => <TodayBody overview={overview} onOpenExam={onOpenExam} />}
        </QueryBoundary>
      </Screen.Body>
    </Screen>
  );
}
