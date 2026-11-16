import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { clampPercent } from '@/core/format/number';
import { durations } from '@/core/theme/metrics';
import { toneColors, type Tone } from '@/core/theme/tones';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Box, Row, Stack } from '../layout';
import { Text } from '../text';

interface Props {
  label: string;
  valueText: string;
  /** 0-100, computed by the server (never from a page of data). */
  percent: number;
  tone?: Tone | 'accent';
}

/** Labelled bar that fills with a short animation. */
export function ProgressBar({ label, valueText, percent, tone = 'accent' }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const fill = useSharedValue(reduce ? clampPercent(percent) : 0);
  useEffect(() => {
    fill.set(reduce ? clampPercent(percent) : withTiming(clampPercent(percent), { duration: durations.slow }));
  }, [percent, reduce, fill]);
  const bar = useAnimatedStyle(() => ({ width: `${fill.value}%` }));
  return (
    <Stack gap="xs" accessible accessibilityRole="progressbar" accessibilityLabel={`${label} ${valueText}`}>
      <Row justify="between">
        <Text variant="label" tone="secondary">{label}</Text>
        <Text variant="label" tabular>{valueText}</Text>
      </Row>
      <Box height={8} style={{ borderRadius: 4, backgroundColor: theme.track, overflow: 'hidden' }}>
        <Animated.View style={[{ height: 8, borderRadius: 4, backgroundColor: toneColors(theme, tone).solid }, bar]} />
      </Box>
    </Stack>
  );
}
