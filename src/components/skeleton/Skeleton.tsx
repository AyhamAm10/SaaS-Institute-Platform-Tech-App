import { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';

interface Props { height?: number; width?: number | 'full'; round?: boolean }

/** Shimmering placeholder block (a soft pulse; static under Reduce Motion). */
export function Skeleton({ height = 16, width = 'full', round }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const pulse = useSharedValue(0);
  useEffect(() => {
    if (reduce) return;
    pulse.set(withRepeat(withSequence(withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }), withTiming(0, { duration: 900, easing: Easing.inOut(Easing.ease) })), -1));
  }, [reduce, pulse]);
  const style = useAnimatedStyle(() => ({ opacity: 0.55 + pulse.value * 0.45 }));
  return (
    <Animated.View
      accessibilityElementsHidden
      style={[{ height, width: width === 'full' ? '100%' : width, borderRadius: round ? height / 2 : radius.sm, backgroundColor: theme.track }, style]}
    />
  );
}
