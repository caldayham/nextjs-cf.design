---
phase: 04-case-studies
plan: 01
subsystem: case-studies
tags: [mdx, case-studies, static-site-generation, next-mdx, layout-extraction]
dependency_graph:
  requires: []
  provides: [case-study-mdx-infrastructure, CaseStudyLayout, case-study-dynamic-route]
  affects: [app/case-studies/[slug], content/case-studies]
tech_stack:
  added: ["@next/mdx", "@mdx-js/loader", "@mdx-js/react", "@types/mdx"]
  patterns: ["MDX exports (metadata + caseStudyData)", "generateStaticParams + generateMetadata", "dynamic import by slug"]
key_files:
  created:
    - next.config.ts (modified — createMDX wrapper)
    - mdx-components.tsx
    - components/case-studies/CaseStudyLayout.tsx
    - content/case-studies/palo-alto-redwood-little-library.mdx
    - content/case-studies/palo-alto-walnut-marble-tables.mdx
    - app/case-studies/[slug]/page.tsx
  modified:
    - tsconfig.json (**/*.mdx added to include)
    - package.json (4 MDX packages added)
decisions:
  - "@next/mdx dynamic import by slug pattern chosen for extensibility — adding a third case study requires only one MDX file + one slug in generateStaticParams"
  - "CaseStudyLayout is a Server Component (no 'use client') — all interactivity is in child Reveal component which handles its own 'use client' boundary"
  - "Gallery uses <Image fill> with real image paths from MDX data (not placeholder divs) — MDX data always provides src values"
  - "quoteAttribution data includes the em-dash unicode — rendered directly in JSX without additional wrapping"
metrics:
  duration: "3 min"
  completed: "2026-03-02"
  tasks_completed: 2
  files_created: 6
  files_modified: 2
---

# Phase 4 Plan 1: Case Study MDX Infrastructure and Layout Summary

**One-liner:** @next/mdx dynamic-import route with CaseStudyLayout server component extracted verbatim from source HTML, serving two static case study pages.

## What Was Built

Set up the MDX compilation infrastructure via @next/mdx, created a shared `CaseStudyLayout` server component with all 8 sections + CTA extracted verbatim from source HTML, defined two MDX content files with typed metadata and caseStudyData exports, and wired a dynamic `app/case-studies/[slug]/page.tsx` route with `generateStaticParams` and `generateMetadata`.

## Tasks Completed

| # | Task | Commit | Key Files |
|---|------|--------|-----------|
| 1 | Install @next/mdx, configure MDX infrastructure, create CaseStudyLayout | ec26db1 | next.config.ts, mdx-components.tsx, tsconfig.json, components/case-studies/CaseStudyLayout.tsx |
| 2 | Create MDX content files and dynamic route page, verify build | ca61cdf | content/case-studies/*.mdx, app/case-studies/[slug]/page.tsx |

## Decisions Made

1. **@next/mdx dynamic import by slug** — `import(\`@/content/case-studies/${slug}.mdx\`)` in both `generateMetadata` and the page component. Adding a third case study requires only one MDX file + one entry in `generateStaticParams`.

2. **CaseStudyLayout as Server Component** — No `'use client'` directive needed. The `Reveal` child component handles its own `'use client'` boundary for intersection observer logic.

3. **Gallery uses real Image components** — MDX data always provides `src` values, so `<Image fill>` is rendered for all gallery items. No placeholder div logic needed in the layout component.

4. **params is Promise<{ slug: string }>** in Next.js 15+ — `await params` before destructuring, as specified in plan.

## Verification Results

- `npx tsc --noEmit`: PASSED — zero TypeScript errors
- `npm run build`: PASSED — zero compilation errors
- Build output confirms both routes prerendered as SSG:
  - `/case-studies/palo-alto-redwood-little-library`
  - `/case-studies/palo-alto-walnut-marble-tables`

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files Created
- [x] components/case-studies/CaseStudyLayout.tsx
- [x] mdx-components.tsx
- [x] content/case-studies/palo-alto-redwood-little-library.mdx
- [x] content/case-studies/palo-alto-walnut-marble-tables.mdx
- [x] app/case-studies/[slug]/page.tsx

### Commits
- [x] ec26db1 — feat(04-01): install @next/mdx and create CaseStudyLayout
- [x] ca61cdf — feat(04-01): create MDX content files and dynamic case study route

## Self-Check: PASSED
