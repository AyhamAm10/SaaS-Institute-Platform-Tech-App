import { useState } from 'react';
import { monthCells, monthTitle, shiftMonth, weekHeader, ymOf } from '@/core/format/calendar';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { IconButton } from '../button';
import { Row, Stack } from '../layout';
import { Pressable } from '../pressable';
import { Text } from '../text';

interface Props {
  /** Selected local date `YYYY-MM-DD`, or null. */
  value: string | null;
  onChange: (ymd: string) => void;
  /** Month shown first when there is no value (usually today). */
  initial: string;
  /** Spoken labels of the two month arrows. */
  previousLabel: string;
  nextLabel: string;
}

/** Month grid (Saturday first) with month arrows. The caller supplies today's date: no clock inside. */
export function CalendarPicker({ value, onChange, initial, previousLabel, nextLabel }: Props) {
  const theme = useTheme();
  const [view, setView] = useState(() => ymOf(value ?? initial));
  const cells = monthCells(view.year, view.month);
  const weeks = Array.from({ length: Math.ceil(cells.length / 7) }, (_, i) => cells.slice(i * 7, i * 7 + 7));
  return (
    <Stack gap="md">
      <Row justify="between">
        <IconButton icon="chevron-forward" label={previousLabel} onPress={() => setView((v) => shiftMonth(v.year, v.month, -1))} />
        <Text variant="heading">{monthTitle(view.year, view.month)}</Text>
        <IconButton icon="chevron-back" label={nextLabel} onPress={() => setView((v) => shiftMonth(v.year, v.month, 1))} />
      </Row>
      <Row justify="between">
        {weekHeader().map((d) => (
          <Stack key={d} flex={1} align="center"><Text variant="caption" tone="muted">{d}</Text></Stack>
        ))}
      </Row>
      {weeks.map((week, wi) => (
        <Row key={wi}>
          {Array.from({ length: 7 }, (_, i) => week[i] ?? null).map((cell, i) => (
            <Stack key={i} flex={1} align="center">
              {cell ? (
                <Pressable
                  label={cell.ymd} role="button" selected={cell.ymd === value} onPress={() => onChange(cell.ymd)} scaleTo={0.9}
                  inner={{ width: 40, height: 40, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: cell.ymd === value ? theme.brandPrimary : 'transparent' }}
                >
                  <Text variant="label" tone={cell.ymd === value ? 'onPrimary' : 'primary'} tabular>{cell.day}</Text>
                </Pressable>
              ) : null}
            </Stack>
          ))}
        </Row>
      ))}
    </Stack>
  );
}
