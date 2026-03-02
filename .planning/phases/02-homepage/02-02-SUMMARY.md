---
phase: 02-homepage
plan: 02
subsystem: ui
tags: [next.js, react, typescript, tailwind, portfolio, reviews, faq, accordion, carousel, masonry-scroll]

# Dependency graph
requires:
  - phase: 02-homepage-plan-01
    provides: Hero, Purpose, Process components; ShellContext; Reveal, Icons UI primitives; app/page.tsx scaffold
provides:
  - PORTFOLIO_ITEMS data array (24 items, 15 published) with PortfolioItem interface
  - REVIEWS data array (17 image paths)
  - FAQS data array (4 items with FAQ interface)
  - PortfolioCard component with image carousel and case study navigation
  - Portfolio section with 3-column published-item grid
  - Reviews section with three-column masonry alternating CSS scroll animation
  - FAQ section with single-open accordion
  - Complete homepage with all 6 sections rendered (Hero through FAQ)
affects: [03-inquiry, 04-case-studies, 05-seo]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Client components only when needed: PortfolioCard and FAQ use 'use client'; Portfolio and Reviews are Server Components"
    - "useRouter().push() for programmatic case study navigation; Link for inline anchor links"
    - "CSS-only animation for Reviews scroll columns via animate-scroll-up/animate-scroll-down classes"
    - "Image carousel via index state + opacity-0/opacity-100 crossfade on absolute-positioned Images"

key-files:
  created:
    - data/portfolio.ts
    - data/reviews.ts
    - data/faqs.ts
    - components/home/PortfolioCard.tsx
    - components/home/Portfolio.tsx
    - components/home/Reviews.tsx
    - components/home/FAQ.tsx
  modified:
    - app/page.tsx

key-decisions:
  - "PortfolioCard uses useRouter().push() for card-click nav; Link for 'Read Case Study' anchor — preserves e.stopPropagation() on both"
  - "Portfolio and Reviews kept as Server Components — carousel state in PortfolioCard child, Reviews animation is pure CSS"
  - "Reviews col duplication ratios match source: col1 x2, col2 x3, col3 x2 — ensures seamless infinite scroll at different content densities"

patterns-established:
  - "Extract, don't rewrite: all Tailwind classes, text (including typos), and data values copied verbatim from index.html"
  - "Data files in data/ with typed exports consumed by Server Component parents"

requirements-completed: [HOME-06, HOME-07, HOME-08, HOME-09, HOME-10]

# Metrics
duration: 3min
completed: 2026-03-02
---

# Phase 2 Plan 02: Portfolio, Reviews, FAQ Sections Summary

**Portfolio grid with image carousel, three-column masonry review scroll (up/down/up), and accordion FAQ extracted verbatim from index.html — homepage complete with all 6 sections**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-02T06:24:40Z
- **Completed:** 2026-03-02T06:27:32Z
- **Tasks:** 2 of 3 (Task 3 is checkpoint:human-verify — awaiting visual verification)
- **Files modified:** 8

## Accomplishments
- Created 3 data files: PORTFOLIO_ITEMS (24 items), REVIEWS (17 paths), FAQS (4 items with verbatim text including intentional typos)
- Created 4 components: PortfolioCard (client, carousel + router nav), Portfolio (server), Reviews (server, CSS-only scroll animation), FAQ (client, accordion)
- Wired all 6 sections into app/page.tsx; `next build` passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Extract data files and all four components** - `fc91f8a` (feat)
2. **Task 2: Wire remaining sections into page.tsx and build** - `3f9bd07` (feat)
3. **Task 3: Visual verification** - pending checkpoint

**Plan metadata:** (after checkpoint resolution)

## Files Created/Modified
- `data/portfolio.ts` - PORTFOLIO_ITEMS array (24 items, 15 published) with PortfolioItem interface
- `data/reviews.ts` - REVIEWS array of 17 image paths
- `data/faqs.ts` - FAQS array of 4 items with FAQ interface; text kept verbatim including typos
- `components/home/PortfolioCard.tsx` - 'use client'; image carousel via index+opacity; useRouter for card click; Link for "Read Case Study"
- `components/home/Portfolio.tsx` - Server Component; filters to published items only; Reveal-wrapped cards
- `components/home/Reviews.tsx` - Server Component; three columns with animate-scroll-up/down/up; hover-pause class
- `components/home/FAQ.tsx` - 'use client'; single-open accordion via openIndex state; max-h-0/max-h-96 transition
- `app/page.tsx` - Added Portfolio, Reviews, FAQ imports and render in correct order

## Decisions Made
- PortfolioCard uses `useRouter().push()` for card-click navigation and `<Link>` for the "Read Case Study" anchor — preserves `e.stopPropagation()` on both per source behavior
- Portfolio and Reviews left as Server Components — all interactivity is either in PortfolioCard child or pure CSS animation
- Reviews column duplication ratios preserved from source: col1 doubled, col2 tripled, col3 doubled — maintains seamless infinite scroll

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Homepage is complete with all 6 sections; `next build` passes
- Case study links will 404 until Phase 4 (expected)
- Ready for Phase 3: InquiryModal / Contact form
- Reviews uses CSS-only animation with `hover-pause` class — verify globals.css has the hover-pause pause rule if not already present

## Self-Check: PASSED

All 7 created files confirmed on disk. Both task commits confirmed in git log:
- `fc91f8a` — feat(02-02): extract Portfolio, Reviews, FAQ data files and components
- `3f9bd07` — feat(02-02): wire all 6 homepage sections into page.tsx
