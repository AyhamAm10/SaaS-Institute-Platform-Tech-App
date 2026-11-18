import { ScrollView, View } from 'react-native';
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
  /**
   * Equal-width tabs in one row that always fit the screen (no scrolling, so the selected one is never
   * hidden off-screen). Use with short labels (weekday abbreviations).
   */
  fill?: boolean;
}

/** Horizontal pill tabs (days of the week, appearance): the selected one is an ink pill. */
export function SegmentTabs({ items, value, onChange, fill = false }: Props) {
  const theme = useTheme();
  const tabs = items.map((it) => {
    const active = it.key === value;
    return (
      <Pressable
        key={it.key} role="tab" selected={active} label={it.a11yLabel ?? it.label} onPress={() => onChange(it.key)}
        outer={fill ? { flex: 1, minWidth: 0 } : undefined}
        inner={{
          minHeight: HIT, minWidth: fill ? 0 : 64, paddingHorizontal: fill ? space.xs : space.lg, borderRadius: radius.pill,
          alignItems: 'center', justifyContent: 'center', borderWidth: 1,
          backgroundColor: active ? theme.brandPrimary : theme.glassBgStrong,
          borderColor: active ? theme.brandPrimary : theme.glassBorder,
        }}
      >
        <Text variant={fill ? 'caption' : 'label'} tone={active ? 'onPrimary' : 'primary'} numberOfLines={1}>{it.label}</Text>
      </Pressable>
    );
  });
  if (fill) return <View style={{ flexDirection: 'row', gap: space.xs, paddingVertical: space.xs }}>{tabs}</View>;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm, paddingVertical: space.xs }}>
      {tabs}
    </ScrollView>
  );
}
