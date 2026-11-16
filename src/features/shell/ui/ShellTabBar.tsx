import { TabBar } from '@/components';
import { TAB_ITEMS } from '../static-data/tabs';

interface Props {
  /** Route name of the focused tab. */
  activeKey: string;
  onSelect: (key: string) => void;
}

/** The app's tab bar: the shared dock fed with this app's tabs. */
export function ShellTabBar({ activeKey, onSelect }: Props) {
  return <TabBar items={TAB_ITEMS} activeKey={activeKey} onSelect={onSelect} />;
}
