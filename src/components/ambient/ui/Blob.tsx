import { useEffect, useId } from 'react';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { useTheme } from '@/core/theme/ThemeProvider';
import type { BlobSpec } from '../init/ambient.variants';

interface Props { spec: BlobSpec; width: number; height: number }

/** One soft orange glow: a radial gradient that fades to nothing (no edge); drifts slowly. */
export function Blob({ spec, width, height }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const drift = useSharedValue(0);
  useEffect(() => {
    if (reduce) return;
    drift.set(withRepeat(withSequence(
      withTiming(1, { duration: 9000, easing: Easing.inOut(Easing.sin) }),
      withTiming(0, { duration: 9000, easing: Easing.inOut(Easing.sin) }),
    ), -1));
  }, [reduce, drift]);
  const move = useAnimatedStyle(() => ({ transform: [{ translateY: drift.value * spec.drift }, { translateX: drift.value * -spec.drift * 0.6 }] }));
  const color = spec.color === 'start' ? theme.blobStart : spec.color === 'mid' ? theme.blobMid : theme.blobEnd;
  const r = spec.size;
  return (
    <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: spec.x * width, top: spec.y * height, opacity: theme.blobOpacity }, move]}>
      <Svg width={r * 2} height={r * 2}>
        <Defs>
          <RadialGradient id={id} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={color} stopOpacity={0.9} />
            <Stop offset="1" stopColor={color} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Circle cx={r} cy={r} r={r} fill={`url(#${id})`} />
      </Svg>
    </Animated.View>
  );
}
