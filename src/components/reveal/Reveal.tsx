import { useEffect, type ReactNode } from 'react';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { durations } from '@/core/theme/metrics';

interface Props {
  /** Position in the list: delays the entrance by `index * 60ms`. */
  index?: number;
  children: ReactNode;
}

const RISE = 12;

/** Staggered entrance (fade + 12px rise). Instant under Reduce Motion. */
export function Reveal({ index = 0, children }: Props) {
  const reduce = useReducedMotion();
  const progress = useSharedValue(reduce ? 1 : 0);
  useEffect(() => {
    if (!reduce) progress.set(withDelay(index * durations.stagger, withTiming(1, { duration: durations.base })));
  }, [index, reduce, progress]);
  const style = useAnimatedStyle(() => ({ opacity: progress.value, transform: [{ translateY: (1 - progress.value) * RISE }] }));
  return <Animated.View style={style}>{children}</Animated.View>;
}
