import { EmptyState, Header, IconButton, QueryBoundary, Reveal, Screen, SegmentTabs, Skeleton, Stack, Surface } from '@/components';
import type { ExamItem } from '@/core/api/types';
import { ar } from '@/core/strings/ar';
import type { ExamsTab } from '../api/exams.api';
import { useExamsMirror } from '../store/exams.store';
import { DeleteExamDialog } from './DeleteExamDialog';
import { ExamCard } from './ExamCard';
import { ExamFormSheet } from './ExamFormSheet';

interface Props {
  onSubmit: () => void;
  onConfirmDelete: () => void;
  onOpenMarks: (exam: ExamItem) => void;
}

const TABS = [{ key: 'upcoming', label: ar.exams.upcoming }, { key: 'past', label: ar.exams.past }];

/** Exams tab: upcoming / past, a card per exam, and the sheets for the form and the delete confirmation. */
export function ExamsView({ onSubmit, onConfirmDelete, onOpenMarks }: Props) {
  const tab = useExamsMirror('tab');
  const list = useExamsMirror('list');
  const isPending = useExamsMirror('isPending');
  const isError = useExamsMirror('isError');
  const error = useExamsMirror('error');
  const refetch = useExamsMirror('refetch');
  const sections = useExamsMirror('sections');
  const setTab = useExamsMirror('setTab');
  const openCreate = useExamsMirror('openCreate');
  const openEdit = useExamsMirror('openEdit');
  const openDelete = useExamsMirror('openDelete');

  return (
    <Screen withTabBar onRefresh={() => void refetch()} refreshing={false}>
      <Screen.Header>
        <Header title={ar.exams.title}>
          <Header.Actions>
            {sections.length > 0 ? <IconButton icon="add" label={ar.exams.create} onPress={openCreate} /> : null}
          </Header.Actions>
        </Header>
      </Screen.Header>
      <Screen.Body>
        <SegmentTabs items={TABS} value={tab} onChange={(key) => setTab(key as ExamsTab)} />
        <QueryBoundary
          query={{ data: list, isPending, isError, error, refetch }}
          skeleton={<Stack gap="md"><Surface><Skeleton height={18} width={180} /><Skeleton height={14} /></Surface><Surface><Skeleton height={18} width={180} /><Skeleton height={14} /></Surface></Stack>}
        >
          {(page) =>
            page.data.length === 0 ? (
              <EmptyState icon="ribbon" title={ar.exams.empty} hint={sections.length === 0 ? ar.exams.noSections : ar.exams.emptyHint} action={sections.length > 0 ? { label: ar.exams.create, onPress: openCreate } : undefined} />
            ) : (
              <Stack gap="md">
                {page.data.map((exam, i) => (
                  <Reveal key={exam.id} index={i}>
                    <ExamCard exam={exam} onOpen={() => onOpenMarks(exam)} onEdit={() => openEdit(exam)} onDelete={() => openDelete(exam)} />
                  </Reveal>
                ))}
              </Stack>
            )
          }
        </QueryBoundary>
      </Screen.Body>
      <ExamFormSheet onSubmit={onSubmit} />
      <DeleteExamDialog onConfirm={onConfirmDelete} />
    </Screen>
  );
}
