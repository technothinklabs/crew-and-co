# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical: Next.js Version Warning

**Read `node_modules/next/dist/docs/` before writing any Next.js code.** This project uses Next.js 16.2.6 — APIs and conventions may differ significantly from training data. Heed all deprecation notices.

## Commands

```bash
npm run dev      # Start Turbopack dev server at localhost:3000
npm run build    # Production build (also validates TypeScript)
npm run lint     # ESLint (no test suite exists)
```

There are no tests. TypeScript errors surface via `npm run build`.

## Architecture

### Pages (App Router)
Three Server Components by default. Only the Menu page uses `"use client"` for tab state.

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Server Component |
| `/menu` | `app/menu/page.tsx` | Client Component (Intersection Observer + tab state) |
| `/about` | `app/about/page.tsx` | Server Component |

All pages share `app/layout.tsx` → `PageLayout` (client wrapper that owns modal state).

### Modal State Pattern
The Reserve Table modal lives in `PageLayout.tsx` (client). Any component — including Server Components — triggers it by dispatching a custom DOM event:

```ts
window.dispatchEvent(new CustomEvent("crew:open-reserve-modal"));
```

`PageLayout` listens for this event and sets `isModalOpen = true`. `ReserveButton.tsx` is the convenience wrapper that does this dispatch. This avoids React context across Server/Client boundaries.

### Design System

All design tokens are in `docs/design/tokens.css` and imported into `app/globals.css`. This file **must** be imported before any `coffee-*`, `gold-*`, `cream-*`, or `spice-*` Tailwind classes will work — they are defined there as `@theme` blocks, not in a `tailwind.config.js`.

Key color roles:
- `coffee-800` (#2F1100) — primary button background, nav
- `coffee-900` (#1E0900) — dark section backgrounds
- `gold-500` (#D4920A) — accent, prices, gold CTA button
- `cream-100` (#FAF4EC) — default page background
- `spice-500` (#C04B0A) — alert/new badges

Fonts are loaded via `next/font/google` in `app/layout.tsx` and injected as CSS variables `--font-display` (Playfair Display) and `--font-sans` (DM Sans). Use `font-display` and `font-sans` Tailwind classes, not hardcoded font names.

All buttons use `rounded-pill` (9999px radius). The `Button` component renders as `<Link>` when an `href` prop is passed, otherwise as `<button>`.

Full specs: `docs/design/style-guide.md` and `docs/design/component-specs.md`.

### Data Layer
- `app/data/menu.ts` — 23 typed `MenuItem` objects. Key exports: `CATEGORIES`, `CATEGORY_SUBTITLES`, `getPopularItems(limit)`, `getItemsByCategory(category)`.
- `app/data/events.ts` — 3 hardcoded events (Open Mic Night, Coffee Tasting, Barista Masterclass).

### Images
All images are from Pexels CDN (`images.pexels.com`), allowed via `remotePatterns` in `next.config.ts`. Always use `next/image` with explicit `width`/`height` (or `fill` + a sized parent). The helper pattern used in data files:

```ts
const PEXELS = (id: number, w = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
```
