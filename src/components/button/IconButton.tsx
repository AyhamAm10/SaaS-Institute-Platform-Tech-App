import { View } from 'react-native';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Icon, type IconName } from '../icon';
import { Pressable } from '../pressable';

interface Props {
  icon: IconName;
  label: string;
  onPress: () => void;
  /** Small accent dot (e.g. unread notifications). */
  dot?: boolean;
}

/** Round 48pt glass icon button. */
export function IconButton({ icon, label, onPress, dot }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      label={label} onPress={onPress} scaleTo={0.92}
      inner={{
        width: 48, height: 48, borderRadius: radius.pill, backgroundColor: theme.glassBgStrong, borderColor: theme.glassBorder,
        borderWidth: 1, alignItems: 'center', justifyContent: 'center', boxShadow: theme.elev1,
      }}
    >
      <Icon name={icon} />
      {dot ? <View style={{ position: 'absolute', top: 11, end: 12, width: 9, height: 9, borderRadius: 5, backgroundColor: theme.brandAccent }} /> : null}
    </Pressable>
  );
}
