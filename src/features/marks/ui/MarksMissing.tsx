import { EmptyState, Header, Screen } from '@/components';
import { ar } from '@/core/strings/ar';

/** The exam's section is not among the teacher's sections (old link, reassigned subject): say so instead of loading forever. */
export function MarksMissing({ onBack }: { onBack: () => void }) {
  return (
    <Screen>
      <Screen.Header>
        <Header title={ar.marks.title}>
          <Header.Back label={ar.common.back} onPress={onBack} />
        </Header>
      </Screen.Header>
      <Screen.Body>
        <EmptyState icon="ribbon" title={ar.marks.missing} hint={ar.marks.missingHint} />
      </Screen.Body>
    </Screen>
  );
}
