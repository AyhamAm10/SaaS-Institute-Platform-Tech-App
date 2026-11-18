import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withSpring } from 'react-native-reanimated';
import { radius } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Icon } from '../../icon';
import { Pressable } from '../../pressable';
import { Text } from '../../text';
import { TAB_BAR_HEIGHT, type TabBarItem } from '../init/tab-bar.types';

interface Props { item: TabBarItem; focused: boolean; onPress: () => void }

/** Active bubble size and how far it floats above the dock. */
const BUBBLE = 50;
const LIFT = 22;
/** Damping ratio ~0.57: a light bounce (same feel as the guardians' app). */
const SPRING = { damping: 17, stiffness: 210 } as const;

/**
 * One tab in a fixed, equal slot (neighbours never move). Inactive: an outline icon. Active: the icon rises in
 * an ink bubble ringed with the page colour (a notch in the dock) and the label fades in under it.
 */
export function TabItem({ item, focused, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  const lift = useSharedValue(focused ? 1 : 0);
  useEffect(() => {
    lift.set(reduce ? (focused ? 1 : 0) : withSpring(focused ? 1 : 0, SPRING));
  }, [focused, reduce, lift]);
  const bubble = useAnimatedStyle(() => ({
    transform: [{ translateY: -LIFT * lift.value }],
    borderWidth: 4 * lift.value,
    backgroundColor: lift.value > 0.05 ? theme.dockBg : 'transparent',
  }));
  const caption = useAnimatedStyle(() => ({ opacity: lift.value, transform: [{ translateY: 6 * (1 - lift.value) }] }));

  return (
    <Pressable
      role="tab" label={item.label} selected={focused} onPress={onPress} scaleTo={0.92}
      outer={{ flex: 1 }}
      inner={{ height: TAB_BAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.View
        style={[{
          width: BUBBLE, height: BUBBLE, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center',
          borderColor: theme.bg, boxShadow: focused ? theme.brandGlow : undefined,
        }, bubble]}
      >
        <Icon name={item.icon} tone={focused ? 'accentSolid' : 'inverse'} filled={focused} />
      </Animated.View>
      <Animated.View pointerEvents="none" style={[{ position: 'absolute', bottom: 8, start: 0, end: 0, alignItems: 'center' }, caption]}>
        <View><Text variant="caption" tone="inverse" numberOfLines={1}>{item.label}</Text></View>
      </Animated.View>
    </Pressable>
  );
}
