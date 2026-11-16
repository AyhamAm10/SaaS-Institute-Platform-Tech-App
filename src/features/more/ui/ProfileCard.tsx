import { Avatar, Row, Stack, StatusPill, Surface, Text } from '@/components';
import type { TeacherMe } from '@/core/api/types';
import { ar } from '@/core/strings/ar';

/** Who I am: name, specialization, phone, branches and the current academic year. */
export function ProfileCard({ me }: { me: TeacherMe }) {
  const { teacher, branches, academicYear } = me;
  return (
    <Surface variant="hero" gap="md">
      <Row gap="md">
        <Avatar name={teacher.fullName} size="lg" />
        <Stack fill gap="none">
          <Text variant="heading" numberOfLines={1}>{teacher.fullName}</Text>
          {teacher.specialization ? <Text variant="caption" tone="secondary">{teacher.specialization}</Text> : null}
          <Text variant="caption" tone="muted" tabular>{teacher.phone}</Text>
        </Stack>
      </Row>
      <Row gap="sm" wrap>
        {branches.map((b) => <StatusPill key={b.id} label={b.name} tone="info" icon="location" />)}
        {academicYear ? <StatusPill label={`${ar.more.year} ${academicYear.name}`} tone="accent" icon="school" /> : null}
      </Row>
    </Surface>
  );
}
