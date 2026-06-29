@AGENTS.md

# Content Management Dashboard

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (manual install, Radix UI primitives) |
| Icons | lucide-react |
| Font | Geist Sans / Geist Mono (next/font/google) |

## Folder Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — includes Sidebar + main wrapper
│   ├── page.tsx                # Dashboard home (section overview cards)
│   ├── globals.css             # CSS variables (dark theme tokens) + Tailwind import
│   ├── instagram/page.tsx      # Instagram Manager section
│   ├── analytics/page.tsx      # Analytics section
│   ├── calendar/page.tsx       # Content Calendar section
│   ├── competitors/page.tsx    # Competitor Tracker section
│   └── news/page.tsx           # News Consolidator section
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # Shared sidebar nav (client component)
│   │   └── page-header.tsx     # Reusable page title + action slot
│   └── ui/                     # shadcn/ui primitives (manually installed)
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts                # cn() helper (clsx + tailwind-merge)
```

## Theme

The app uses a **forced dark theme** — the `<html>` element has the `dark` class applied unconditionally in `layout.tsx`. There is no light mode toggle; all colors are defined as CSS custom properties in `globals.css` using HSL values.

All color usage follows the token pattern: `hsl(var(--token-name))`. Do not hardcode color values — always use a CSS variable.

Key tokens:
- `--background` / `--foreground` — page background and primary text
- `--card` / `--card-foreground` — card surfaces
- `--primary` — brand blue, used for active nav items and CTAs
- `--muted` / `--muted-foreground` — subdued backgrounds and secondary text
- `--border` — borders and dividers
- `--sidebar` / `--sidebar-*` — sidebar-specific surface and text tokens

## Component Conventions

- **Server components by default.** Only add `"use client"` when the component needs browser APIs, hooks, or event handlers (e.g., `sidebar.tsx` needs `usePathname`).
- **shadcn/ui components** live in `src/components/ui/`. Add new primitives there following the existing pattern (forwardRef, CVA variants, `cn()` for className merging).
- **Page layout**: each page uses `<PageHeader>` at the top, then section content. The `children` prop on `PageHeader` renders action buttons (e.g., "New Post").
- **Card-based layout**: content is organized into `<Card>` / `<CardHeader>` / `<CardContent>` blocks with consistent padding.

## Routing

All five sections are top-level App Router routes:

| Route | Section |
|-------|---------|
| `/` | Dashboard (overview) |
| `/instagram` | Instagram Manager |
| `/analytics` | Analytics |
| `/calendar` | Content Calendar |
| `/competitors` | Competitor Tracker |
| `/news` | News Consolidator |

## Key Decisions

- **Tailwind v4 syntax**: `@import "tailwindcss"` replaces the v3 `@tailwind` directives. The `@theme inline` block maps CSS variables to Tailwind color utilities.
- **shadcn/ui manual install**: The interactive `npx shadcn init` CLI was skipped in favor of hand-writing component files to avoid prompt-based friction in CI/automated environments. Add new components following the same pattern.
- **No `Instagram` icon in lucide-react**: The installed version does not export `Instagram`. `Camera` is used as a placeholder for Instagram-related icons.
- **All pages are placeholder/mock data**: No real API integrations exist yet. Data is hardcoded in each page file for scaffolding purposes.
