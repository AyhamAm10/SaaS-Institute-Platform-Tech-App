import { toneColors, type Tone } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Stack } from '../layout';
import { Text } from '../text';

interface Props {
  label: string;
  /** Already formatted (the server computed it). */
  value: string;
  tone?: Tone | 'accent';
}

/** A small KPI: a big number on a tinted tile, its label below. Used in `Module.Stats`. */
export function StatTile({ label, value, tone = 'neutral' }: Props) {
  const c = toneColors(useTheme(), tone);
  return (
    <Stack
      gap="xs" padding="md" align="start" accessible accessibilityLabel={`${label} ${value}`}
      style={{ backgroundColor: c.bg, borderColor: c.border, borderWidth: 1, borderRadius: 20 }}
    >
      <Text variant="number" tone={tone} tabular>{value}</Text>
      <Text variant="caption" tone="secondary">{label}</Text>
    </Stack>
  );
}
