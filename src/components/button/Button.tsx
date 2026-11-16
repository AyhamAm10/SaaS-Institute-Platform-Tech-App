import { ActivityIndicator } from 'react-native';
import { HIT, radius, space } from '@/core/theme/metrics';
import { roleColor } from '@/core/theme/roles';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Icon, type IconName } from '../icon';
import { Pressable } from '../pressable';
import { Text } from '../text';
import { buttonLook, type ButtonVariant } from './init/button.variants';

interface Props {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  /** Fill the available width (forms). */
  block?: boolean;
}

/** Every action button. Loading shows a spinner and blocks presses. */
export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, block }: Props) {
  const theme = useTheme();
  const look = buttonLook(variant, theme);
  return (
    <Pressable
      label={label} onPress={onPress} disabled={disabled || loading} scaleTo={0.97}
      outer={block ? { alignSelf: 'stretch' } : { alignSelf: 'flex-start' }}
      inner={{
        minHeight: HIT + 8, borderRadius: radius.pill, backgroundColor: look.bg, borderColor: look.border, borderWidth: 1,
        paddingHorizontal: space.xl, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: space.sm,
      }}
    >
      {loading ? <ActivityIndicator color={roleColor(theme, look.text)} /> : icon ? <Icon name={icon} tone={look.text} size="sm" /> : null}
      <Text variant="label" tone={look.text}>{label}</Text>
    </Pressable>
  );
}
