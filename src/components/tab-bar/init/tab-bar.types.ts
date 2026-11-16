import type { IconName } from '../../icon';

export const TAB_BAR_HEIGHT = 72;

export interface TabBarItem { key: string; label: string; icon: IconName }

export interface TabBarProps {
  items: TabBarItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}
