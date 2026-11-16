import { SegmentTabs, Surface, Text } from '@/components';
import { ar } from '@/core/strings/ar';
import type { SchemePreference } from '@/core/theme/preference';

const ITEMS = [
  { key: 'system', label: ar.more.schemeSystem },
  { key: 'light', label: ar.more.schemeLight },
  { key: 'dark', label: ar.more.schemeDark },
];

interface Props { value: SchemePreference; onChange: (value: SchemePreference) => void }

/** Light / dark / follow the device. Applies at once and is remembered. */
export function AppearanceCard({ value, onChange }: Props) {
  return (
    <Surface gap="sm">
      <Surface.Header><Text variant="heading" accessibilityRole="header">{ar.more.appearance}</Text></Surface.Header>
      <Text variant="caption" tone="muted">{ar.more.appearanceNote}</Text>
      <SegmentTabs items={ITEMS} value={value} onChange={(key) => onChange(key as SchemePreference)} />
    </Surface>
  );
}
