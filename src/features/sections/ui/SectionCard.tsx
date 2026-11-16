import { Icon, Row, Stack, StatusPill, Surface, Text } from '@/components';
import type { TeacherSection } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

/** A section: name and branch, its student count, and the subjects I teach there. */
export function SectionCard({ section }: { section: TeacherSection }) {
  return (
    <Surface gap="md">
      <Surface.Header>
        <Stack fill gap="none">
          <Text variant="heading" numberOfLines={1}>{section.name}</Text>
          {section.branchName ? <Text variant="caption" tone="secondary">{section.branchName}</Text> : null}
        </Stack>
        <StatusPill label={ar.sections.studentsCount(section.studentCount)} tone="info" icon="people" />
      </Surface.Header>
      <Row gap="sm" wrap align="center">
        <Icon name="book" size="sm" tone="muted" />
        {section.subjects.map((s) => (
          <StatusPill key={s.subjectId} label={s.name} tone="accent" />
        ))}
      </Row>
    </Surface>
  );
}
