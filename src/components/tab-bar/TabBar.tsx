import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAX_WIDTH, radius, space } from '@/core/theme/metrics';
import { useTheme } from '@/core/theme/ThemeProvider';
import { TAB_BAR_HEIGHT, type TabBarProps } from './init/tab-bar.types';
import { TabItem } from './ui/TabItem';

/** Floating solid ink dock. Generic: the app shell maps router state to `items` / `activeKey`. */
export function TabBar({ items, activeKey, onSelect }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', start: 0, end: 0, bottom: 0, alignItems: 'center' }}>
      <View style={{ width: '100%', maxWidth: MAX_WIDTH, paddingHorizontal: space.lg, marginBottom: insets.bottom + space.sm }}>
        <View
          accessibilityRole="tablist"
          style={{
            height: TAB_BAR_HEIGHT, borderRadius: radius.pill, backgroundColor: theme.dockBg, borderWidth: 1,
            borderColor: theme.dockBorder, boxShadow: theme.elev3, flexDirection: 'row', alignItems: 'center',
            justifyContent: 'space-around', paddingHorizontal: space.sm,
          }}
        >
          {items.map((item) => (
            <TabItem key={item.key} item={item} focused={item.key === activeKey} onPress={() => onSelect(item.key)} />
          ))}
        </View>
      </View>
    </View>
  );
}
