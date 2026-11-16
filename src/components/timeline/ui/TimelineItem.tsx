import type { ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Row, Stack } from '../../layout';
import { Text } from '../../text';

export type TimelineState = 'done' | 'current' | 'upcoming';

interface Props {
  /** Start time shown on the rail (HH:mm). */
  time: string;
  state?: TimelineState;
  last?: boolean;
  children: ReactNode;
}

/** One stop on the rail: time, a dot (orange when current, faded when done) and the content. */
export function TimelineItem({ time, state = 'upcoming', last, children }: Props) {
  const theme = useTheme();
  const dot = state === 'current' ? theme.brandAccent : state === 'done' ? theme.textMuted : theme.glassBorder;
  return (
    <Row align="start" gap="md" opacity={state === 'done' ? 0.7 : 1}>
      <Stack width={44} align="center" pt="xs">
        <Text variant="label" tone={state === 'current' ? 'accent' : 'secondary'} tabular>{time}</Text>
      </Stack>
      <Stack align="center" height={undefined} style={{ alignSelf: 'stretch' }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, marginTop: 8, backgroundColor: dot, borderColor: theme.glassBorder, borderWidth: 2 }} />
        {last ? null : <View style={{ flex: 1, width: 2, backgroundColor: theme.track, marginVertical: 4 }} />}
      </Stack>
      <Stack fill pb="md">{children}</Stack>
    </Row>
  );
}
