import { radius, space } from '@/core/theme/metrics';
import { toneColors, type Tone } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Box } from '../layout';
import { Icon, type IconName } from '../icon';
import { Text } from '../text';

interface Props {
  label: string;
  tone?: Tone | 'accent';
  icon?: IconName;
}

/** Tinted status chip by meaning (`tone`), e.g. taken / partial / closed. */
export function StatusPill({ label, tone = 'neutral', icon }: Props) {
  const theme = useTheme();
  const c = toneColors(theme, tone);
  return (
    <Box
      direction="row" align="center" gap="xs" px="md" minHeight={28} radius="pill"
      style={{ backgroundColor: c.bg, borderColor: c.border, borderWidth: 1, paddingVertical: space.xs, borderRadius: radius.pill, alignSelf: 'flex-start' }}
    >
      {icon ? <Icon name={icon} size="xs" tone={tone} /> : null}
      <Text variant="caption" tone={tone}>{label}</Text>
    </Box>
  );
}
