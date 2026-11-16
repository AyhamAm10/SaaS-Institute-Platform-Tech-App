import { Chip } from '../chip';
import { Field } from '../field';
import { Row, Stack } from '../layout';

export interface SelectOption { value: string; label: string }

interface Props {
  label: string;
  options: SelectOption[];
  /** Selected option value, or null. */
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
}

/** Pick one of a few options as chips (sections, subjects, exam types). Not a dropdown: a teacher has a handful. */
export function SelectField({ label, options, value, onChange, error, hint }: Props) {
  return (
    <Stack gap="xs">
      <Field.Label>{label}</Field.Label>
      <Row gap="sm" wrap align="start">
        {options.map((o) => (
          <Chip key={o.value} label={o.label} selected={o.value === value} onPress={() => onChange(o.value)} />
        ))}
      </Row>
      {error ? <Field.Error>{error}</Field.Error> : hint ? <Field.Hint>{hint}</Field.Hint> : null}
    </Stack>
  );
}
