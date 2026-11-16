import { useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { type } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Field } from '../field';
import { IconButton } from '../button';

interface Props extends Pick<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'keyboardType' | 'autoCapitalize' | 'onSubmitEditing' | 'returnKeyType'> {
  label: string;
  error?: string;
  hint?: string;
  /** Password field with a show/hide toggle (labels come from the caller's strings). */
  secure?: { show: string; hide: string };
  /** Latin digits and URLs read left to right even in an RTL form (phone numbers, codes). */
  ltr?: boolean;
}

/** Text input on the shared `Field` frame. */
export function TextField({ label, error, hint, secure, ltr, ...input }: Props) {
  const theme = useTheme();
  const [hidden, setHidden] = useState(true);
  return (
    <Field label={label} error={error} hint={hint}>
      <TextInput
        {...input}
        accessibilityLabel={label}
        secureTextEntry={!!secure && hidden}
        placeholderTextColor={theme.inputPlaceholder}
        selectionColor={theme.brandAccent}
        style={[type.body, { flex: 1, color: theme.textPrimary, paddingVertical: 10, outlineWidth: 0, textAlign: ltr ? 'left' : 'right' }]}
      />
      {secure ? <IconButton icon={hidden ? 'eye' : 'eye-off'} label={hidden ? secure.show : secure.hide} onPress={() => setHidden((v) => !v)} /> : null}
    </Field>
  );
}
