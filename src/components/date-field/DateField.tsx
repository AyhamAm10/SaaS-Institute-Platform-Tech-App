import { useState } from 'react';
import { Button } from '../button';
import { CalendarPicker } from '../calendar-picker';
import { Field } from '../field';
import { Icon } from '../icon';
import { Pressable } from '../pressable';
import { Sheet } from '../sheet';
import { Text } from '../text';

interface Props {
  label: string;
  /** `YYYY-MM-DD` or empty. */
  value: string;
  onChange: (ymd: string) => void;
  /** Today's local date: where the calendar opens when there is no value. */
  today: string;
  placeholder: string;
  confirmLabel: string;
  previousLabel: string;
  nextLabel: string;
  error?: string;
}

/** A date input: a field showing the date, a bottom sheet with a month grid to pick it. */
export function DateField({ label, value, onChange, today, placeholder, confirmLabel, previousLabel, nextLabel, error }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Field label={label} error={error}>
        <Pressable label={`${label} ${value || placeholder}`} onPress={() => setOpen(true)} outer={{ flex: 1 }} inner={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, minHeight: 52 }}>
          <Text tone={value ? 'primary' : 'muted'} tabular>{value || placeholder}</Text>
          <Icon name="calendar" tone="muted" size="sm" />
        </Pressable>
      </Field>
      <Sheet visible={open} onClose={() => setOpen(false)} label={label}>
        <Sheet.Header title={label} />
        <CalendarPicker value={value || null} initial={today} onChange={(d) => { onChange(d); setOpen(false); }} previousLabel={previousLabel} nextLabel={nextLabel} />
        <Sheet.Footer><Button label={confirmLabel} onPress={() => setOpen(false)} variant="ghost" /></Sheet.Footer>
      </Sheet>
    </>
  );
}
