---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [react, nextjs, tailwind, svg-icons, intersection-observer, mobile-menu, scroll-detection]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Next.js scaffold, Tailwind v4 design tokens (arch-* colors, animations), globals.css utility classes, data/case-studies.ts, app/layout.tsx skeleton"

provides:
  - "16 named SVG icon components in components/ui/Icons.tsx"
  - "Reveal fade-in animation wrapper using IntersectionObserver in components/ui/Reveal.tsx"
  - "Fixed nav with scroll transition (transparent → frosted dark at 50px), mobile menu, case study dropdown in components/layout/Nav.tsx"
  - "Footer with contact info, social links, copyright in components/layout/Footer.tsx"
  - "SiteShell client wrapper holding inquiry modal state, rendering Nav + children + Footer in components/layout/SiteShell.tsx"
  - "app/layout.tsx updated to wrap children in SiteShell"

affects: [02-homepage, 03-case-studies, 04-about, 05-seo]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Server Component default for pure-render files (Icons.tsx, Footer.tsx)"
    - "'use client' only when browser APIs needed (Nav.tsx, SiteShell.tsx, Reveal.tsx)"
    - "IntersectionObserver fire-once pattern for scroll animations"
    - "Scroll-based style transition via useEffect + window.addEventListener('scroll')"
    - "Inquiry modal state hoisted to SiteShell so Nav and future modal share one source of truth"
    - "pathname-aware logo: <span> with scroll on /, <Link> on other routes"

key-files:
  created:
    - components/ui/Icons.tsx
    - components/ui/Reveal.tsx
    - components/layout/Nav.tsx
    - components/layout/Footer.tsx
    - components/layout/SiteShell.tsx
  modified:
    - app/layout.tsx

key-decisions:
  - "Nav extracted verbatim from original HTML (CLAUDE.md extract-don't-rewrite rule) to guarantee pixel-level fidelity — separate fix commit 147a63a"
  - "SiteShell holds showInquiry state at layout level so Phase 3 modal can be mounted without restructuring component tree"
  - "Icons.tsx is a Server Component (no 'use client') — SVGs are pure render, no browser APIs needed"

patterns-established:
  - "Pattern: extract-don't-rewrite — copy UI logic verbatim from original site HTML rather than rebuilding from description"
  - "Pattern: modal state in SiteShell — shared state that crosses Nav (trigger) and modal (consumer) lives in their common ancestor"

requirements-completed: [COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06]

# Metrics
duration: 30min
completed: 2026-03-02
---

# Phase 1 Plan 02: Layout Shell Summary

**Fixed nav with scroll-based frosted transition, 16 SVG icons, IntersectionObserver Reveal animation, Footer with contact/social links, and SiteShell inquiry-modal state wrapper — all wired into app/layout.tsx**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-03-02
- **Completed:** 2026-03-02
- **Tasks:** 3 (Tasks 1-2 auto, Task 3 human-verify checkpoint)
- **Files modified:** 6

## Accomplishments
- Ported 16 SVG icon components verbatim from original site into a single Server Component
- Built Reveal fade-in wrapper using IntersectionObserver (threshold 0.1, fires once) with configurable delay
- Created Nav with scroll detection (transparent → frosted dark at 50px), mobile full-screen overlay menu, case study dropdown, pathname-aware logo, and "Start Project" inquiry trigger
- Created Footer with MapPin/Mail/Instagram/Home icons, correct SMS/email/social links, and copyright
- SiteShell wraps Nav + children + Footer with inquiry modal state — layout is ready for Phase 3 modal mount
- Human verification confirmed nav, footer, fonts, colors, scroll transition, mobile menu, and 404 page all match original site

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Icons and Reveal components** - `50c8e66` (feat)
2. **Task 2: Create Nav, Footer, SiteShell and wire into layout** - `3cbeee9` (feat) + `147a63a` (fix — Nav extracted verbatim per CLAUDE.md rule)
3. **Task 3: Verify layout shell renders correctly** - checkpoint approved by human (no code commit)

**Plan metadata:** _(docs commit created after this summary)_

## Files Created/Modified
- `components/ui/Icons.tsx` - 16 named SVG icon Server Components (Menu, X, ArrowRight, ArrowDown, ArrowLeft, Check, MapPin, Mail, ChevronDown, Layout, PenTool, FileText, Hammer, Smile, Instagram, Home)
- `components/ui/Reveal.tsx` - Client Component; IntersectionObserver fade-in wrapper with configurable delay prop
- `components/layout/Nav.tsx` - Client Component; fixed nav with 50px scroll threshold, mobile overlay menu, case study dropdown, pathname-aware logo
- `components/layout/Footer.tsx` - Server Component; contact info (SMS/email), social links (Instagram/Nextdoor), copyright with cf-icon.png
- `components/layout/SiteShell.tsx` - Client Component; showInquiry state, renders Nav + children + Footer, placeholder comment for Phase 3 modal
- `app/layout.tsx` - Added SiteShell import and wraps children in SiteShell

## Decisions Made
- Nav was initially rebuilt from description but did not match original. Per CLAUDE.md "extract-don't-rewrite" rule, it was re-extracted verbatim from original HTML source to guarantee fidelity (fix commit 147a63a).
- SiteShell holds inquiry modal state at layout level so Nav (trigger) and the future InquiryModal (Phase 3 consumer) share one source of truth without prop drilling through page components.
- Icons.tsx is a Server Component — SVG rendering requires no browser APIs, so no 'use client' needed, reducing client bundle size.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Nav rebuilt from description did not match original site — re-extracted verbatim**
- **Found during:** Task 2 (Create Nav, Footer, SiteShell)
- **Issue:** Initial Nav implementation was written from the plan description and deviated from the original site's structure and styling. CLAUDE.md extract-don't-rewrite rule requires verbatim extraction from source HTML.
- **Fix:** Re-extracted Nav.tsx verbatim from original site HTML to guarantee pixel-level fidelity
- **Files modified:** components/layout/Nav.tsx
- **Verification:** npm run build passed; human visual inspection confirmed match
- **Committed in:** 147a63a (fix commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Necessary for fidelity requirement. No scope creep.

## Issues Encountered
None beyond the Nav re-extraction deviation noted above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Layout shell is complete and human-verified against the original site
- All 6 component files exist and build cleanly
- SiteShell is ready for Phase 3 InquiryModal mount (placeholder comment in place)
- Phase 2 (Homepage) can build page content directly inside the shell — Nav and Footer will appear automatically on all routes

---
*Phase: 01-foundation*
*Completed: 2026-03-02*
