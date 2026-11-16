import { ScrollView } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Pressable } from '../pressable';
import { Text } from '../text';

export interface SegmentItem {
  key: string;
  label: string;
  /** Spoken label when different from the visible one. */
  a11yLabel?: string;
}

interface Props {
  items: SegmentItem[];
  value: string;
  onChange: (key: string) => void;
}

/** Horizontal pill tabs (days of the week, appearance): the selected one is an ink pill. */
export function SegmentTabs({ items, value, onChange }: Props) {
  const theme = useTheme();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingVertical: space.xs }}>
      {items.map((it) => {
        const active = it.key === value;
        return (
          <Pressable
            key={it.key} role="tab" selected={active} label={it.a11yLabel ?? it.label} onPress={() => onChange(it.key)}
            inner={{
              minHeight: HIT, minWidth: 64, paddingHorizontal: space.lg, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center',
              borderWidth: 1, backgroundColor: active ? theme.brandPrimary : theme.glassBgStrong,
              borderColor: active ? theme.brandPrimary : theme.glassBorder,
            }}
          >
            <Text variant="label" tone={active ? 'onPrimary' : 'primary'}>{it.label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
