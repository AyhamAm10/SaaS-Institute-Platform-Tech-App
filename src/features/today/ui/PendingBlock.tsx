import { Icon, ListItem, Module, StatusPill, Surface } from '@/components';
import type { ExamBrief } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

/** Recent exams that still wait for marks (the server's `pending` count). */
export function PendingBlock({ items, onOpen }: { items: (ExamBrief & { pending: number })[]; onOpen: (examId: number, sectionId: number) => void }) {
  return (
    <Module>
      <Module.Header title={ar.today.pendingTitle} />
      <Module.Content>
        <Surface variant="tinted" tone="accent" padding="md" gap="xs">
          {items.map((e) => (
            <ListItem key={e.examId} onPress={() => onOpen(e.examId, e.sectionId)} label={e.title}>
              <ListItem.Leading><Icon name="create" tone="accentSolid" /></ListItem.Leading>
              <ListItem.Content title={e.title} subtitle={`${e.subjectName} · ${e.sectionName}`} />
              <ListItem.Meta><StatusPill label={ar.today.pendingCount(e.pending)} tone="warning" /></ListItem.Meta>
            </ListItem>
          ))}
        </Surface>
      </Module.Content>
    </Module>
  );
}
