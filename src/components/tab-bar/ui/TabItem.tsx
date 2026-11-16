import Animated, { LinearTransition, useReducedMotion } from 'react-native-reanimated';
import { radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { Icon } from '../../icon';
import { Pressable } from '../../pressable';
import { Text } from '../../text';
import type { TabBarItem } from '../init/tab-bar.types';

interface Props { item: TabBarItem; focused: boolean; onPress: () => void }

const SLIDE = LinearTransition.springify().damping(18).stiffness(220);

/** Inactive: a bare outline icon. Active: grows into a soft pill holding the filled icon and its label. */
export function TabItem({ item, focused, onPress }: Props) {
  const theme = useTheme();
  const reduce = useReducedMotion();
  return (
    <Animated.View layout={reduce ? undefined : SLIDE}>
      <Pressable
        role="tab" label={item.label} selected={focused} onPress={onPress} scaleTo={0.92}
        inner={{
          height: 46, minWidth: 44, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
          gap: space.xs, paddingHorizontal: focused ? space.md : 0, backgroundColor: focused ? theme.dockActive : 'transparent',
        }}
      >
        <Icon name={item.icon} tone={focused ? 'accentSolid' : 'inverse'} filled={focused} />
        {focused ? <Text variant="label" tone="inverse" numberOfLines={1}>{item.label}</Text> : null}
      </Pressable>
    </Animated.View>
  );
}
