# tech-app components: compound pattern and catalog (planned)

> The design system of `tech-app`. It is NEW (we do not copy `parents-app`'s component system); it shares only the identity (tokens). Rules that govern it: `core.md` §2, §4, §5. Built so far (2026-11-15): layout (Box/Stack/Row/Grid), Text, Icon, Pressable, Surface, Reveal, Ambient, Screen, Header, Module, TabBar, SegmentTabs, ListItem, Timeline, Field, TextField, Dialog, Button/IconButton, StatusPill, Avatar, BrandMark, ProgressBar, SectionHeader, EmptyState, ErrorState, Skeleton, QueryBoundary, AppRoot, BrandSplash. Added with exams and marks: Sheet, Chip, SelectField, DateField + CalendarPicker, ScoreField, StatTile. Still planned (built when a feature needs them): DataList, Toast, InfoTile, WeekStrip. Each component lives in `src/components/<kebab-name>/`.

## 1. Anatomy of a component folder

```text
card/
  init/
    card.types.ts       props + part props (types only)
    card.variants.ts    maps from token keys to token reads: { glass: t => ..., solid: t => ... }
  ui/
    CardHeader.tsx      one part, <= 100 lines
    CardBody.tsx
  Card.tsx              ROOT: composes, provides context, attaches parts. <= 60 lines
  card.context.ts       (only if parts must share state) createContext + useCardContext
  index.ts              export { Card }
```

Root file shape (documentation of the contract, not code to copy):
```tsx
export function Card({ variant = 'glass', children, ...rest }: CardProps) { /* surface + provider */ }
Card.Header = CardHeader;
Card.Body = CardBody;
```

Rules of the shape:
1. **Root composes, parts render.** The root never contains a part's markup.
2. **Variants are data.** `init/*.variants.ts` maps a variant key to token reads. A part never has `variant === 'x' ? '#...'`. Adding a variant = adding a map entry.
3. **Sharing between parts = context**, created by the root. No prop drilling, no module-level state.
4. **Stateful components** (sheet open state, field focus) hold it in a per-instance store or local hook inside the component folder, never in a global.
5. **Props accept token keys** (`gap="md"`, `tone="success"`, `radius="lg"`), never numbers or colors.
6. **A11y + Reduce Motion + RTL + haptic** are done inside the component once, so every screen inherits them.
7. **One reason to change per file**; when a part passes ~100 lines, split its hook, its sub-parts or its variants into siblings.
8. **Tests**: pure parts of `init/` and any hook have unit tests; each component has a row in this catalog.

## 2. Change the design in ONE place (playbook)

| You want to change | You edit | Everything else follows because |
|---|---|---|
| A color, radius, spacing, shadow, font, duration | `core/theme/tokens.*`, `metrics`, `fonts` | components only read tokens |
| How every card / list row / sheet / field looks | that ONE component folder (`init/*.variants.ts` or the part) | screens only compose it |
| The look of one variant (e.g. `danger` dialog) | its entry in `init/*.variants.ts` | variant = data |
| The whole tab bar | `components/tab-bar` | the shell mounts it once |
| A screen's layout | its `ui/` composition | screens hold no styling |

Smell test: if a design change would require editing more than one screen file, a component is missing. Promote it (`core.md` §2).

## 3. Catalog

Names are the planned public names; the right column maps them to the dashboard idea they play (so the two apps feel like one product).

### 3.1 Foundations
| Component | Compound parts | Purpose | Dashboard analogue |
|---|---|---|---|
| `Box` `Stack` `Row` `Grid` | none | token-typed layout (`gap padding px py align justify wrap flex columns`) | Mantine `Box/Stack/Group` via rules |
| `Text` | none | typography (`variant`: display title heading body label caption number; `tone`) | typography tokens |
| `Icon` | none | one icon set, duotone option, sizes `xs..xl` | `@tabler` icons |
| `Surface` | `.Header` `.Body` `.Footer` | every card / panel: `variant` glass, solid, hero, tinted; `padding`; `onPress` | `AppSurface` |
| `Pressable` (base) | none | 44pt target, spring press, haptic, a11y role; base of every tappable | `AppButton` base |
| `Reveal` | none | staggered entrance (12px, fade, 60ms), Reduce Motion aware | n/a |
| `Divider` `Spacer` | none | structure | n/a |

### 3.2 Page shells
| Component | Compound parts | Purpose | Dashboard analogue |
|---|---|---|---|
| `Screen` | `.Header` `.Body` `.Footer` | canvas + ambient blobs + safe areas + keyboard avoidance + pull-to-refresh | page layout |
| **`Module`** | `.Header` `.Stats` `.Filters` `.Content` `.Footer` | the standard page skeleton: header, KPI strip, filters, content, footer; slots for loading / empty / error | **`AppModule`** |
| `Header` | `.Title` `.Back` `.Actions` | top bar | `AppPageHeader` |
| `TabBar` | `.Item` `.Action` | floating ink dock; fixed equal slots, active tab = icon floating up in an ink bubble (label fades in under it, spring damping 17, Reduce Motion = static) | `Sidebar` |
| `SegmentTabs` | `.List` `.Panel` | in-page tabs (day / week, section filter); `fill` = equal tabs that always fit (selected never off-screen) | `AppTabs` |
| `QueryBoundary` | none | skeleton / error+retry / empty / data switch from a query | `DataModule` states |

### 3.3 Data display
| Component | Compound parts | Purpose | Dashboard analogue |
|---|---|---|---|
| **`DataList`** | `.Header` `.Search` `.Filters` `.Items` `.Empty` `.Footer` | every list: virtualized, search, filter chips, pull to refresh, infinite or paged, selection mode | **`DataModuleController`** |
| `ListItem` | `.Leading` `.Content` `.Meta` `.Trailing` | a row (student, exam, lesson); `.Content subtitleLines` lets messages wrap | table row |
| `StatCard` | `.Icon` `.Title` `.Value` `.Progress` `.Action` | KPI tile | `StatCard` |
| `InfoTile` `DetailList` | none | label + value, label/value grid | `InfoTile`, `DetailList` |
| `StatusPill` | none | tinted status by `tone` (`present`, `late`, `passed`...) | `StatusBadge` |
| `Avatar` | none | initial on soft orange | n/a |
| `Timeline` | `.Item` | vertical rail (lesson rail, today) | n/a |
| `WeekStrip` | `.Day` | week day selector, marks today and closures | n/a |
| `ProgressRing` `ProgressBar` `Sparkline` `MiniBars` | none | numbers the SERVER computed (rate, average, distribution) | `ChartCard` |
| `EmptyState` `ErrorState` `Skeleton` | none | SVG empty scenes, error with retry, shimmer | `AppEmptyState` |

### 3.4 Input and feedback
| Component | Compound parts | Purpose | Dashboard analogue |
|---|---|---|---|
| **`Field`** | `.Label` `.Control` `.Hint` `.Error` | wrapper that gives every input the same label / hint / error layout | `AppInput` frame |
| `TextField` `NumberField` `SelectField` `DateField` `Toggle` | none | inputs built on `Field`; `SelectField` opens a `Sheet`; `DateField` emits `YYYY-MM-DD`; `NumberField` validates range and decimals | `AppInput`, `AppSelect`, `AppDatePicker` |
| `ScoreField` | none | fast numeric entry for marks: range from max, "absent" toggle, next-field on submit | n/a (mobile-specific) |
| **`Sheet`** | `.Header` `.Content` `.Footer` | bottom sheet for forms and details (spring, glass) | **`AppDrawer`** |
| **`Dialog`** | `.Title` `.Body` `.Actions` | confirmation / warning (`variant` default, danger, warning, info, success) | **`AppModal`**, `DeleteConfirmationModal` |
| `Toast` | none | transient result ("تم الحفظ") | notifications |
| `Button` `IconButton` | none | actions (`variant` primary, accent, ghost, danger; `loading`) | `AppButton`, `AppIconButton` |
| `Toggle` | none | switch | n/a |

### 3.5 Domain-generic composites (add only when needed twice)
`RosterRow` (student row with leading avatar and a trailing action slot), `LessonCard`, `ExamCard`, `DayHeader`. They stay in `features/*/ui` until a second feature needs them (`core.md` §2).

## 4. How `Module`, `DataList`, `Sheet` stay small

- `Module` is only slots and state switching; stats and charts are separate components passed in. No data fetching inside.
- `DataList` receives `data`, `renderItem`, `keyExtractor`, query state; it never fetches. Search and filters are parts that call callbacks.
- `Sheet` owns open/close animation and keyboard behavior; the form inside is the feature's. Footer actions are parts.

## 5. Adding a component

1. Check this catalog: does one already do it? Extend it with a variant or a part first.
2. Create `src/components/<kebab>/` with only the layers needed (`init/`, `ui/`, root, `index.ts`).
3. Tokens only; a11y, Reduce Motion, RTL, haptic inside it.
4. Export from `src/components/index.ts` and add/adjust its row here.
5. Keep every file <= 150 lines. Delete components nothing uses.

## 6. Anti-patterns (refuse in review)

- A "God" component with 15 boolean props instead of variants and parts.
- A part reading a feature's store or a query.
- Style numbers inside a part (`marginTop: 12`): use a token key.
- A second `Card` written inside a feature "just for this screen".
- Copying a component from `parents-app`.
