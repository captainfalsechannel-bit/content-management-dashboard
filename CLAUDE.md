@AGENTS.md

# Content Management Dashboard

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Charts | Chart.js + react-chartjs-2 |
| UI Components | shadcn/ui (manual install, Radix UI primitives) |
| Icons | lucide-react |
| Font | Geist Sans / Geist Mono (next/font/google) |

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Sidebar + main wrapper, #0f0f11 bg
│   ├── page.tsx                # Dashboard home (section overview cards)
│   ├── globals.css             # Tailwind import + CSS custom properties
│   ├── instagram/page.tsx      # Kanban board with CRUD modal
│   ├── analytics/page.tsx      # KPI cards + 3 Chart.js charts + top posts table
│   ├── calendar/page.tsx       # Monthly calendar grid with platform filters
│   ├── competitors/page.tsx    # Sortable table with sparklines + expand panel
│   └── news/page.tsx           # Masonry news grid with search + category filter
├── components/
│   ├── layout/
│   │   ├── sidebar.tsx         # Shared nav (client component, usePathname)
│   │   └── page-header.tsx     # Reusable page title + optional action slot
│   └── ui/                     # shadcn/ui primitives
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       └── separator.tsx
└── lib/
    └── utils.ts                # cn() helper (clsx + tailwind-merge)
```

## Theme

Forced dark theme. All pages use hardcoded hex values directly on style props — **do not** use CSS variables for page-level colors; keep them consistent with this palette:

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0f0f11` | Page background |
| Cards | `#1c1c24` | Card / panel surfaces |
| Nav | `#13131a` | Sidebar background |
| Border | `#2a2a2e` | All borders and dividers |
| Text primary | `#f1f1f3` | Headings, body |
| Text muted | `#8b8b9a` | Labels, secondary text |
| Purple accent | `#8b5cf6` | Active nav, CTAs, primary brand |
| Blue | `#3b82f6` | Facebook, info |
| Green | `#22c55e` | Success, Published status |
| Amber | `#f59e0b` | Warning, Draft status, Story type |
| Red | `#ef4444` | Destructive, errors |
| Pink | `#ec4899` | Instagram |

## Page Architecture

### `/instagram` — Kanban Board
- `"use client"` — all state in `useState`
- 4 columns: Scheduled / Drafts / Published / Backlog
- Post cards: gradient thumbnail, type badge, caption, date, edit/delete
- Overlay modal for add/edit (no external library — fixed inset backdrop + centered card)
- Type colors: Reel=purple, Carousel=blue, Single=green, Story=amber

### `/analytics` — Analytics Dashboard
- `"use client"` with Chart.js registered at module level
- Date range quick-select (7d/14d/30d/90d) + custom date inputs
- 4 KPI cards with delta vs previous period (green ↑ / red ↓)
- Chart 1: Multi-line impressions (Instagram/Facebook/TikTok) — full width
- Chart 2: Bar — engagement by content type (half width)
- Chart 3: Bar — daily follower growth (half width)
- Top 8 posts table with type badge and engagement rate
- "via Metricool" badge in header

### `/calendar` — Content Calendar
- `"use client"` — month navigation via `useState<Date>`
- Platform filter pills (Instagram/YouTube/TikTok/Facebook/Twitter) with colored dots
- Day cells: up to 3 status-colored chips + "+N more" overflow
- Chip colors: Scheduled=purple tint, Published=green tint, Draft=amber tint
- Clicking a day opens a detail panel below the grid
- 20 pre-populated posts across June 2026

### `/competitors` — Competitor Tracker
- `"use client"` — sortable by clicking column headers (asc/desc toggle)
- Add competitor form (name, handles, niche) generates random stats
- Platform filter pills filter table by platforms present
- Inline SVG sparkline component (8-bar trend)
- Expand row shows 4 stat cards + recent posts list
- Engagement rate color-coded: green ≥7%, amber 4–7%, red <4%
- 6 pre-populated competitors across diverse niches

### `/news` — News Consolidator
- `"use client"` — live search + category filter + sort mode
- Category pills: All / Marketing / Social Media / SEO / AI / Creator Economy / Platform Updates
- Sort: Latest (by date) or Most Relevant (by relevanceScore field)
- Masonry-style layout via CSS `columns`
- Article cards: source favicon circle, headline, summary (line-clamp-3), read time, "Read more" link
- 12 pre-populated 2026 articles across all categories

## Component Conventions

- **`"use client"` only when needed**: all 5 section pages use client components for interactivity. `layout.tsx`, `page.tsx`, and `page-header.tsx` are server components.
- **shadcn/ui primitives** in `src/components/ui/`. Add new ones following forwardRef + CVA pattern.
- **No external modal/dialog library** — the Instagram kanban modal is a plain `fixed inset-0` overlay.
- **Chart.js**: register all required scales/elements once at the top of `analytics/page.tsx`. Use `"use client"` because Chart.js requires browser canvas.

## Routing

| Route | Section |
|-------|---------|
| `/` | Dashboard overview |
| `/instagram` | Instagram Manager (Kanban) |
| `/analytics` | Analytics + Charts |
| `/calendar` | Content Calendar |
| `/competitors` | Competitor Tracker |
| `/news` | News Consolidator |

## Key Decisions

- **Tailwind v4 syntax**: `@import "tailwindcss"` at top of `globals.css`. The `@theme inline` block is still present for any utilities that rely on CSS vars, but page-level colors use inline `style` props with hex values for reliability.
- **shadcn/ui manual install**: `npx shadcn init` was skipped; components are hand-written to avoid interactive CLI prompts in CI.
- **No `Instagram` icon in lucide-react**: The installed version doesn't export it. `Camera` is used as a stand-in for Instagram-related icons.
- **Seeded random data for charts**: `generateSeries` uses `Math.sin`-based seeding so chart data is deterministic across renders (avoids hydration mismatches).
- **All data is mock/hardcoded**: no API integrations yet. Each page file owns its data array.
