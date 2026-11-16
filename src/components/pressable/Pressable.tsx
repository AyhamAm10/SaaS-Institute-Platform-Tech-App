import type { ReactNode } from 'react';
import { Pressable as RNPressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { tapHaptic } from '@/core/layout/haptics';
import { HIT } from '@/core/theme/metrics';

interface Props {
  children: ReactNode;
  onPress?: () => void;
  /** Accessibility label (required: every control is labelled). */
  label: string;
  role?: PressableProps['accessibilityRole'];
  selected?: boolean;
  disabled?: boolean;
  haptic?: boolean;
  /** Scale while pressed (0.97 default). */
  scaleTo?: number;
  /** Style of the outer touch area (layout only). */
  outer?: StyleProp<ViewStyle>;
  /** Style of the scaling surface. */
  inner?: StyleProp<ViewStyle>;
}

const SPRING = { damping: 18, stiffness: 320, mass: 0.6 } as const;

/** Base of every tappable: 44pt target, spring press, light haptic, Reduce Motion aware. */
export function Pressable({ children, onPress, label, role = 'button', selected, disabled, haptic = true, scaleTo = 0.97, outer, inner }: Props) {
  const reduce = useReducedMotion();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <RNPressable
      accessibilityRole={role}
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled, selected }}
      disabled={disabled}
      onPressIn={() => { if (!reduce) scale.set(withSpring(scaleTo, SPRING)); }}
      onPressOut={() => { if (!reduce) scale.set(withSpring(1, SPRING)); }}
      onPress={() => { if (haptic) tapHaptic(); onPress?.(); }}
      style={[{ minHeight: HIT, justifyContent: 'center' }, outer]}
    >
      <Animated.View style={[{ opacity: disabled ? 0.5 : 1 }, animated, inner]}>{children}</Animated.View>
    </RNPressable>
  );
}
