# tech-app

Expo (SDK 57) app for the **teachers** of the institute platform (role `TEACHER`). Arabic only, RTL, one institute (معهد جيل السلام). **Status: foundation, login, Today, Timetable, Sections, More and Notifications (static) are built and verified on web in mock mode. Roll call, exams and marks are next.**

## Read first
1. `docs/rules/core.md`: the binding rules (layers, page controller pattern, 150-line files, tokens, ESLint).
2. `docs/rules/components.md`: the compound component system and the catalog we will build (new, NOT copied from `parents-app`).
3. Workspace `../docs/product/teacher-app-plan.md`: features, backend gaps, phases, open decisions, and what we reuse from `parents-app`.
4. Workspace `../CLAUDE.md` and `../docs/INDEX.md`.

## Identity
Same visual identity as the dashboard and `parents-app` (orange `#F16726` accent, ink `#141416`, warm canvas, glass, Alexandria), shared through tokens only.

## Run
`npm install`, then `npx expo start`. Without a backend: put `EXPO_PUBLIC_USE_MOCK=1` in `.env.local` (demo login `0933000000`, any password). Real backend: `EXPO_PUBLIC_API_URL` (see `.env.example`). Checks: `npx tsc --noEmit`, `npx expo lint` (0/0), `npm test`.

## Git
Remote: `https://github.com/AyhamAm10/SaaS-Institute-Platform-Tech-App.git`. The owner publishes; never commit or push from here.
