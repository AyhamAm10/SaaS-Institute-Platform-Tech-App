import { toneColors } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Button } from '../button';
import { Icon, type IconName } from '../icon';
import { Box, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  icon: IconName;
  title: string;
  hint?: string;
  action?: { label: string; onPress: () => void };
}

/** Friendly empty list: a tinted icon disc, a title, a hint and an optional action. */
export function EmptyState({ icon, title, hint, action }: Props) {
  const c = toneColors(useTheme(), 'accent');
  return (
    <Stack align="center" gap="md" py="xxl" px="lg">
      <Box width={72} height={72} align="center" justify="center" style={{ borderRadius: 36, backgroundColor: c.bg, borderColor: c.border, borderWidth: 1 }}>
        <Icon name={icon} size="lg" tone="accent" />
      </Box>
      <Text variant="heading" align="center">{title}</Text>
      {hint ? <Text tone="secondary" align="center">{hint}</Text> : null}
      {action ? <Button label={action.label} onPress={action.onPress} variant="ghost" /> : null}
    </Stack>
  );
}
