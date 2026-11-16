# tech-app rules (binding, read first, always)

Expo app for the **teachers** (`TEACHER`) of ONE institute (معهد جيل السلام). Arabic only, RTL. Before any work read, in the workspace `docs/`: `product/teacher-app-plan.md` (what we build and why), then `INDEX.md` and the feature doc of the area. Expo changed: check https://docs.expo.dev/versions/v57.0.0/ when unsure. The architecture mirrors `admin-dashboard` (page controllers + compound components). The visual identity is the dashboard's and is shared with `parents-app` through tokens only.

> These rules are a contract. If a task seems to need a break, STOP and ask; never bend a rule silently. Never `git commit` / `git push`: the owner publishes.

## 1. The one idea

**Design changes happen in ONE place.** A color, radius, spacing, font or motion value lives in `src/core/theme` and nowhere else. A visual primitive (card, list row, sheet, field, tab bar...) lives in ONE component under `src/components/`. Screens only compose components. So restyling the app means editing tokens or one component folder, never hunting through screens.

## 2. Layers (top to bottom; a layer imports only from layers BELOW it)

| # | Layer | Path | Holds | Never holds |
|---|---|---|---|---|
| 1 | Entry | `src/app/**` (expo-router) | one `<XScreen />` per route, layouts render a shell | logic, styles, queries |
| 2 | Features | `src/features/<f>/` | screen, controller, store, queries, `ui/` | raw RN primitives, style values, colors |
| 3 | Components | `src/components/<name>/` | the design system: compound components | knowledge of any feature or API |
| 4 | Core | `src/core/{theme,brand,api,auth,storage,format,strings,layout}` | tokens, infrastructure | UI |

- Only layer 3 may import `View Text Pressable ScrollView FlatList Image TextInput StyleSheet`, reanimated, svg, blur, linear-gradient, icons, gesture-handler and may write style values (always read from tokens).
- Only `core/theme` + `core/brand` may contain color literals (`#hex`, `rgb(`, `rgba(`).
- A feature never imports another feature's internals. Shared need = promote to `components/` (UI) or `core/` (logic).
- **Promotion rule**: the first use may live in `features/<f>/ui`; the SECOND feature that needs it moves it to `components/`. A component that knows a domain word (exam, mark, lesson) is a feature part, not a component, unless it is generic underneath.

## 3. Page pattern (feature = page controller), same as the dashboard

```text
src/features/<feature>/
  <X>Screen.tsx        entry: renders <XController /> only (what the route file renders)
  <X>Controller.tsx    creates the per-instance store, provides it, owns mutations, mounts <XQuerySync />
  <X>QuerySync.tsx     the ONLY place with query hooks; syncs server data into the store (effects)
  api/                 axios calls + query keys + query / mutation hooks (no UI)
  state/               <x>.state.ts: types and action signatures only
  store/               <x>.store.ts (factory + context) and use<X>Mirror.ts
  ui/                  pure presentation: composes components, reads the store ONLY through use<X>Mirror
  utils/               pure helpers (tested)
  static-data/         constants and labels' keys (text itself lives in core/strings)
```
Create only the folders the feature needs; no empty layers.

- `ui/` has ZERO `useState` (except purely visual, e.g. a pressed flag), ZERO `useEffect`, ZERO `useQuery` / `useMutation`, ZERO fetch calls. State = store; reads = mirror hooks; actions = props from the controller or store actions.
- A stateless screen (read-only list) may skip store + QuerySync: controller = `useQuery` + `QueryBoundary` + `ui/`. The moment it has filters, drafts, selection or a form, it gets the full pattern.
- Every controller instance owns an isolated store (`createXStore()`); no global singleton for page state. Global stores are allowed ONLY for: session, theme preference, app-wide sheets.
- Mutations with orchestration live in `use<X>Actions.ts` called by the controller. `ui/` receives callbacks.

## 4. Size and shape

- **Every file <= 150 lines** (blank lines and comments skipped), one responsibility, enforced by ESLint. Split by concern (parts, hooks, variants), not by cutting a file in the middle.
- Targets: component root <= 60 lines; component part <= 100; a screen's `ui/` file <= 100.
- Named exports only. Barrel `index.ts` ONLY at the component folder and feature folder level.
- File names: `PascalCase.tsx` for components/screens/controllers, `camelCase.ts` for hooks/utils (`useXMirror.ts`), `kebab-case` folders.

## 5. Compound components (see `components.md` for the catalog and the exact shape)

A component with more than one visual part is compound: `Card` + `Card.Header` + `Card.Body`. Parts share state through a small React context created by the root, never through prop drilling. Variants are maps in `init/` keyed by token names, never inline conditionals with literals. The root only composes; parts live in `ui/`; the props types live in `init/`.

## 6. Tokens and identity

- Tokens use the dashboard's key names (`bg surface surfaceSolid subtle border textPrimary/Secondary/Muted brandPrimary brandAccent brandAccentText brandAccentSoft success* danger* info* glass* blob* ...`, plus `ring*`, `fab`, `dock*`). Light = warm canvas `#F5F3F0` + frosted glass + ink actions; dark = `#0E0E10` smoked glass. Orange `#F16726` is an ACCENT; ink `#141416` is the primary action color.
- Spacing keys `none xs sm md lg xl xxl huge`; radius keys `none sm md lg xl pill`; tones `success warning danger info neutral accent`. Components accept these KEYS, never numbers or colors.
- A token-parity test (`src/__tests__/theme.test.ts`) pins identity against `admin-dashboard/src/theme/tokens.ts` and AA contrast pairs. Run it after touching tokens.
- Font: Alexandria 300/400/500/600 via `expo-font`; never set `fontWeight` with it. Western digits (`core/format`). Dynamic Type stays on (capped).
- Institute name/logo/colors from the API are NOT used for theming (one institute). A future multi-institute build swaps only `core/brand` + `core/theme/tokens.*`.

## 7. Data

- One axios instance (`core/api/client.ts`): auth header, single-flight refresh, `Accept-Language: ar`, and the operational context headers `X-Branch-Id` / `X-Academic-Year-Id` (from `/teacher/me`; the server validates them). Features never create their own client or read tokens.
- Server state = TanStack Query only. Query keys include the context (branch, year) and ids. `keepPreviousData` when switching days / sections.
- Tokens live in `expo-secure-store` only (`core/storage`); web localStorage is a dev fallback.
- Statistics, rankings and "needs attention" lists come from the server; never compute them from the page of data you hold.
- Marks and attendance forms: edits live in the page store until saved; protect unsaved changes (confirm on leave); keep a local draft for flaky networks. The server stays the source of truth for statuses.
- Errors: `getApiErrorMessage` from `core/api/errors` (English/Arabic text mapping); show the server's Arabic message as-is.
- Never mix SYP and USD (no money in this app today; keep the rule if it appears).

## 8. Text and language

All user-facing text is professional Arabic from `core/strings` (grouped by feature). No literal strings in `ui/` or components (except `accessibilityLabel` keys that also come from strings). RTL always: `start/end` instead of left/right; rows mirror automatically; chevrons from `BACK_ICON` / `FORWARD_ICON`.

## 9. Accessibility, motion, feedback

- Role + label on every control, targets >= 44pt (the `Pressable` base component guarantees it), color never the only signal.
- Reduce Motion respected in every animated component (`useReducedMotion`). Light haptic on press. Motion never blocks interaction.
- Every async screen has loading (skeleton), empty, error (with retry) states through `QueryBoundary`/`Module` slots.

## 10. ESLint enforcement (`npx expo lint` must show 0 errors and 0 warnings)

- `no-restricted-imports` in `src/features/**` and `src/app/**`: from `react-native` only `Linking Share Alert Keyboard Platform`; reanimated, svg, blur, linear-gradient, icons, gesture-handler, expo-image are banned. In `src/components/**` features may not be imported. In `src/core/**` components and features may not be imported.
- `no-restricted-syntax` in features/app: no `style` JSX attribute; no `#hex`, `rgb(`, `rgba(` literals (strings or templates). In `src/components/**`: the same color rule (colors only from tokens).
- `max-lines` 150 everywhere in `src`; `@typescript-eslint/no-explicit-any`: error; no `@ts-ignore`.
- Shared values: `sv.set(x)` (not `sv.value = x`) for the React Compiler.
- Hooks in `ui/` files: a custom ESLint rule or review checklist item forbids `useEffect`, `useQuery`, `useMutation` there.

## 11. Mock mode (no server yet)

`EXPO_PUBLIC_USE_MOCK=1` swaps the axios adapter for `core/api/mock/` fixtures (gated by `__DEV__`) so every screen can be built and viewed on web. Fixtures mirror the real contract; never invent fields the backend does not return.

## 12. Verification before finishing a task

`npx tsc --noEmit`, `npx expo lint` (0/0), `npm test`, `npx expo export --platform web`; open EVERY touched screen in the browser at 390x844 in light and dark; update the feature doc and `docs/INDEX.md` in the workspace and run `node docs/scripts/docs-tools.cjs check`. A task is not done until docs match the code. Report what was NOT verified (native device, real backend, haptics, blur).

## 13. Prohibitions (each one has bitten us before)

1. A color, size or font literal outside `core/theme`.
2. A raw RN primitive or `style` in `features/**` or `src/app/**`.
3. State, effects or queries in `ui/`.
4. A file over 150 lines, or a component that mixes root and parts in one file.
5. A feature importing another feature's internals; a component importing a feature.
6. A global store for page state; prop drilling beyond one level (use the mirror / context).
7. `any`, `@ts-ignore`, silent `catch`.
8. Business statistics computed in the app.
9. Copying a screen or component instead of promoting it.
10. Copying `parents-app`'s component system. We take its FEATURES and core pieces only (see `docs/product/teacher-app-plan.md` §6).
