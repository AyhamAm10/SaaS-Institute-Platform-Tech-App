import { TextInput } from 'react-native';
import { radius, type } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  /** Spoken label (e.g. the student's name). */
  label: string;
  /** Shown faded inside when empty, e.g. the maximum mark. */
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  onSubmitEditing?: () => void;
}

/** Compact numeric entry for a mark: centered digits, decimal keypad, red border when out of range. */
export function ScoreField({ value, onChangeText, label, placeholder, invalid, disabled, onSubmitEditing }: Props) {
  const theme = useTheme();
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      accessibilityLabel={label}
      placeholder={placeholder}
      placeholderTextColor={theme.inputPlaceholder}
      selectionColor={theme.brandAccent}
      keyboardType="decimal-pad"
      returnKeyType="next"
      editable={!disabled}
      onSubmitEditing={onSubmitEditing}
      selectTextOnFocus
      style={[type.number, {
        width: 84, minHeight: 48, textAlign: 'center', color: theme.textPrimary, backgroundColor: theme.inputBg, borderRadius: radius.md,
        borderWidth: 1, borderColor: invalid ? theme.dangerSolid : theme.inputBorder, outlineWidth: 0, opacity: disabled ? 0.45 : 1,
      }]}
    />
  );
}
