import { Children, isValidElement, type ReactNode } from 'react';
import { Row, Stack } from '../layout';
import { Text } from '../text';
import { HeaderContext } from './header.context';
import { HeaderActions } from './ui/HeaderActions';
import { HeaderBack } from './ui/HeaderBack';

interface Props {
  title: string;
  /** Small line above the title (greeting, date). */
  eyebrow?: string;
  children?: ReactNode;
}

/**
 * Page header: `<Header title=".." eyebrow=".."><Header.Back .. /><Header.Actions>..</Header.Actions></Header>`.
 * `Header.Back` always sits at the START of the row (right in RTL), the other parts at the end.
 */
export function Header({ title, eyebrow, children }: Props) {
  const parts = Children.toArray(children);
  const isBack = (node: ReactNode) => isValidElement(node) && node.type === HeaderBack;
  return (
    <HeaderContext.Provider value>
      <Row gap="md" minHeight={56}>
        {parts.filter(isBack)}
        <Stack fill>
          {eyebrow ? <Text variant="caption" tone="muted">{eyebrow}</Text> : null}
          <Text variant="title" accessibilityRole="header" numberOfLines={1}>{title}</Text>
        </Stack>
        {parts.filter((p) => !isBack(p))}
      </Row>
    </HeaderContext.Provider>
  );
}

Header.Back = HeaderBack;
Header.Actions = HeaderActions;
