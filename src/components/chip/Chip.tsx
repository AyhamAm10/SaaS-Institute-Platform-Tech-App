import { radius, space } from '@/core/theme/metrics';
import { toneColors, type Tone } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Pressable } from '../pressable';
import { Text } from '../text';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
  /** Tint when selected (ink by default; `danger` for an "absent" toggle). */
  tone?: Tone | 'ink';
}

/** Small toggle pill: choices in a form, an "absent" switch on a row. */
export function Chip({ label, selected, onPress, tone = 'ink' }: Props) {
  const theme = useTheme();
  const c = tone === 'ink' ? null : toneColors(theme, tone);
  const bg = selected ? (c ? c.bg : theme.brandPrimary) : theme.glassBgStrong;
  const border = selected ? (c ? c.border : theme.brandPrimary) : theme.glassBorder;
  return (
    <Pressable
      role="checkbox" selected={selected} label={label} onPress={onPress} scaleTo={0.95}
      inner={{ minHeight: 36, paddingHorizontal: space.md, borderRadius: radius.pill, borderWidth: 1, backgroundColor: bg, borderColor: border, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text variant="label" tone={selected ? (c ? tone : 'onPrimary') : 'primary'}>{label}</Text>
    </Pressable>
  );
}
