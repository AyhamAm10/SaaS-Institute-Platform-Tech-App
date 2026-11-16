import { EmptyState, Header, IconButton, QueryBoundary, Reveal, Screen, Skeleton, Stack, Surface, type BoundaryQuery } from '@/components';
import type { TeacherSection } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import { SectionCard } from './SectionCard';

interface Props {
  query: BoundaryQuery<TeacherSection[]>;
  refreshing: boolean;
  onRefresh: () => void;
  onNotifications: () => void;
}

/** Sections tab: one card per section I teach. */
export function SectionsView({ query, refreshing, onRefresh, onNotifications }: Props) {
  return (
    <Screen withTabBar onRefresh={onRefresh} refreshing={refreshing}>
      <Screen.Header>
        <Header title={ar.sections.title}>
          <Header.Actions>
            <IconButton icon="notifications" label={ar.notifications.title} onPress={onNotifications} />
          </Header.Actions>
        </Header>
      </Screen.Header>
      <Screen.Body>
        <QueryBoundary
          query={query}
          skeleton={<Stack gap="md"><Surface><Skeleton height={18} width={160} /><Skeleton height={14} /></Surface><Surface><Skeleton height={18} width={160} /><Skeleton height={14} /></Surface></Stack>}
        >
          {(sections) =>
            sections.length === 0 ? (
              <EmptyState icon="people" title={ar.sections.empty} hint={ar.sections.emptyHint} />
            ) : (
              <Stack gap="md">
                {sections.map((s, i) => (
                  <Reveal key={s.sectionId} index={i}><SectionCard section={s} /></Reveal>
                ))}
              </Stack>
            )
          }
        </QueryBoundary>
      </Screen.Body>
    </Screen>
  );
}
