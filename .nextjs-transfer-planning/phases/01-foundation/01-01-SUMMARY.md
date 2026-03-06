---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [nextjs, tailwind, typescript, next-font, design-tokens]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.6 App Router project with TypeScript, Tailwind v4, Turbopack
  - Tailwind v4 @theme inline block with 7 arch-* colors, 7 animations, bg-noise
  - Inter (300-600) and Playfair Display (400-700+italic) via next/font/google
  - 79+ image assets in public/assets/ (jobs/, jobs/mobile/, reviews/, mobile/)
  - CASE_STUDIES data module with CaseStudy interface
  - Branded 404 page at app/not-found.tsx
  - Homepage stub verifying design tokens render correctly
affects: [01-02, 02-components, 03-homepage, 04-case-studies, 05-production]

# Tech tracking
tech-stack:
  added:
    - next@16.1.6
    - react@19.2.3
    - tailwindcss@4
    - "@tailwindcss/postcss@4"
    - typescript@5
  patterns:
    - Tailwind v4 CSS-only config in globals.css @theme inline block
    - next/font/google for zero-layout-shift self-hosted fonts via CSS variables
    - Root-relative /assets/* paths for all public assets
    - @keyframes defined outside @theme block (v4 requirement)

key-files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/page.tsx
    - app/not-found.tsx
    - data/case-studies.ts
    - next.config.ts
    - tsconfig.json
    - postcss.config.mjs
    - public/assets/ (79+ images)
  modified: []

key-decisions:
  - "Scaffold created in /tmp then files copied to project root due to create-next-app conflict detection with existing files"
  - "App directory at project root (not src/) to match plan spec; tsconfig @/* paths updated to .//* accordingly"
  - "layout.tsx renders children directly without SiteShell wrapper in Plan 01; SiteShell added in Plan 02"
  - "trailingSlash: true in next.config.ts preserves existing URL structure for SEO continuity"

patterns-established:
  - "Pattern 1: All Tailwind design tokens live in app/globals.css @theme inline block"
  - "Pattern 2: Font CSS variables injected on <html> element via next/font variable option"
  - "Pattern 3: All assets served from /assets/* (public/assets/ directory)"
  - "Pattern 4: @keyframes blocks defined outside @theme{} in globals.css"

requirements-completed: [SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05]

# Metrics
duration: 3min
completed: 2026-03-02
---

# Phase 1 Plan 01: Foundation Scaffold Summary

**Next.js 16 + Tailwind v4 project with arch-* design tokens, next/font self-hosted Inter/Playfair Display, 79+ image assets migrated to public/, and a branded 404 page**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-02T05:10:48Z
- **Completed:** 2026-03-02T05:13:48Z
- **Tasks:** 2
- **Files modified:** 92 (10 config/app files + 81 image assets + 1 data module)

## Accomplishments
- Next.js 16.1.6 with Turbopack bootstrapped and building with zero errors
- Complete Tailwind v4 design system: 7 arch-* colors, 7 animations, 6 keyframes, bg-noise, utility classes
- Inter (300/400/500/600) and Playfair Display (400/500/600/700 + italic) self-hosted via next/font/google
- All 79+ image assets migrated to public/assets/ preserving subdirectory structure (jobs/, jobs/mobile/, reviews/, mobile/)
- Case study data module and branded 404 page created and building cleanly

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 16 with Tailwind v4 design tokens and fonts** - `416ce73` (feat)
2. **Task 2: Migrate assets, case study data module, branded 404** - `325e5a9` (feat)

**Plan metadata:** (docs commit below)

## Files Created/Modified
- `app/globals.css` - Tailwind v4 @theme inline with all arch-* tokens, 7 animations, 6 keyframes, utility classes
- `app/layout.tsx` - Root layout with Inter + Playfair Display next/font, metadata, scroll-smooth html
- `app/page.tsx` - Homepage stub rendering arch-* color swatches and font-serif
- `app/not-found.tsx` - Branded 404 page with arch-* colors and font-serif
- `data/case-studies.ts` - CaseStudy interface and CASE_STUDIES array (2 entries)
- `next.config.ts` - Image AVIF/WebP formats, trailingSlash: true
- `tsconfig.json` - TypeScript config with @/* path mapped to ./* (non-src layout)
- `postcss.config.mjs` - @tailwindcss/postcss plugin
- `public/assets/` - 79+ images across jobs/ (33), jobs/mobile/ (21), reviews/ (17), mobile/ (1), root (6)

## Decisions Made
- **create-next-app workaround:** The tool refused to scaffold in-place due to existing files (.planning/, assets/, case-studies/, index.html). Scaffolded to /tmp/cf-next-scaffold then copied config files and ran `npm install` fresh. This avoided any file conflicts while preserving existing project files.
- **Non-src layout:** The scaffold defaults to `src/` directory; plan spec requires app at project root. Updated tsconfig `@/*` paths from `./src/*` to `./*`.
- **SiteShell deferred:** Plan 01 task action explicitly states SiteShell is NOT imported in layout.tsx — children render directly. SiteShell added in Plan 02.
- **trailingSlash: true:** Set conservatively to match existing site URL structure, preventing SEO 301 redirects.

## Deviations from Plan

None — plan executed exactly as written. The create-next-app in-place conflict was resolved by scaffolding to /tmp first (Rule 3 workaround for blocking issue), which is within normal execution variation.

## Issues Encountered
- `create-next-app` refused to run in the project root due to existing files. Resolved by scaffolding to /tmp/cf-next-scaffold, copying config files, and running `npm install` in the project root. No files were lost or overwritten.
- Initial `node_modules` copy from /tmp was corrupt (binary file symlinks broken). Fixed by running `rm -rf node_modules && npm install` — resolved immediately.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Design system foundation is complete and verified via `npm run build`
- All arch-* color tokens, animations, and fonts are ready for component development
- All image assets accessible at /assets/* paths
- Plan 02 can immediately begin building Nav, Footer, SiteShell, Icons, and Reveal components
- No blockers

---
*Phase: 01-foundation*
*Completed: 2026-03-02*
