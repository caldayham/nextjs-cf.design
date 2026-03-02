---
phase: 03-contact-conversion
plan: 01
subsystem: ui
tags: [react, formspree, next.js, modal, tailwind]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: SiteShell with showInquiry state stub and ShellContext.openInquiry
  - phase: 02-homepage
    provides: Nav/Hero/Footer components that trigger openInquiry via ShellContext
provides:
  - Full-screen InquiryModal overlay extracted verbatim from index.html
  - InquiryUrlWatcher Suspense-isolated useSearchParams detection
  - Body-scroll-lock wired into SiteShell on showInquiry state
  - Modal open trigger from Nav/Hero/sticky CTA via ShellContext
  - Escape-key and X-button modal close
  - Phone auto-formatting as (NXX) NXX-XXXX
  - ?inquire URL parameter auto-opens modal on page load
affects:
  - 03-02 (thank-you page, GA4 — depend on modal being wired in SiteShell)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Suspense-isolated useSearchParams: isolate useSearchParams into a minimal wrapper component wrapped in <Suspense fallback={null}> to prevent production build failure
    - Body-scroll-lock via useEffect: document.body.style.overflow = 'hidden' on modal open, '' on close, cleanup on unmount
    - Modal conditional render: return null when !isOpen — no CSS display:none

key-files:
  created:
    - components/layout/InquiryModal.tsx
    - components/layout/InquiryUrlWatcher.tsx
  modified:
    - components/layout/SiteShell.tsx

key-decisions:
  - "select defaultValue on the <select> element (not selected on <option>) — required React adaptation, not a rewrite"
  - "InquiryUrlWatcher useEffect uses empty dependency array [] — matches source lazy initializer behavior; onInquiry excluded from deps intentionally"
  - "Suspense wraps InquiryUrlWatcher in SiteShell — prevents next build failure with Missing Suspense boundary with useSearchParams"

patterns-established:
  - "Pattern: Suspense-isolated useSearchParams — isolate into tiny wrapper component, wrap in <Suspense fallback={null}> in parent layout component"
  - "Pattern: Modal in SiteShell — modal state at layout level persists across page navigations and is accessible from Nav"

requirements-completed: [CONV-01, CONV-02, CONV-03, CONV-04]

# Metrics
duration: 7min
completed: 2026-03-02
---

# Phase 3 Plan 01: Inquiry Modal and URL Watcher Summary

**Full-screen InquiryModal extracted verbatim from index.html with formatPhone, Escape handler, Formspree POST, and Suspense-isolated ?inquire URL detection wired into SiteShell**

## Performance

- **Duration:** 7 min
- **Started:** 2026-03-02T18:33:48Z
- **Completed:** 2026-03-02T18:35:39Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- InquiryModal extracted verbatim from index.html lines 694-784 with all fields, formatPhone function, and Escape-key listener
- InquiryUrlWatcher created with Suspense-safe useSearchParams detection (empty dep array matches source lazy initializer)
- SiteShell updated: void closeInquiry removed, body-scroll-lock useEffect added, modal and watcher mounted in correct render order
- Production build succeeds with all static routes pre-rendered (Suspense boundary prevents build failure)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create InquiryModal and InquiryUrlWatcher components** - `5b41772` (feat)
2. **Task 2: Wire InquiryModal and InquiryUrlWatcher into SiteShell** - `7593351` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `components/layout/InquiryModal.tsx` - Full-screen inquiry form overlay with all 5 fields, formatPhone, Escape handler
- `components/layout/InquiryUrlWatcher.tsx` - Suspense-safe ?inquire URL detection; fires openInquiry once on mount
- `components/layout/SiteShell.tsx` - Body-scroll-lock, InquiryModal/InquiryUrlWatcher mounted, void closeInquiry removed

## Decisions Made
- Used `defaultValue=""` on the `<select>` element instead of `selected` on `<option>` — required React adaptation (React ignores `selected` on options)
- Empty dependency array `[]` in InquiryUrlWatcher useEffect — intentional, matches source lazy initializer (fires once on mount only)
- Suspense wraps InquiryUrlWatcher — mandatory for production next build with static routes

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None — TypeScript compiled cleanly, next build succeeded on first attempt with all routes static.

## User Setup Required
None - no external service configuration required for this plan. Formspree endpoint is already in source (mpqlvore).

## Next Phase Readiness
- InquiryModal is wired and functional — Nav, Hero, and sticky CTA all open it via ShellContext.openInquiry
- ?inquire URL parameter auto-opens modal on page load
- Body scroll locked while modal is open
- Form POSTs to Formspree and redirects to https://cf.design/thank-you
- Ready for Plan 02: thank-you page and GA4 integration

---
*Phase: 03-contact-conversion*
*Completed: 2026-03-02*

## Self-Check: PASSED

- FOUND: components/layout/InquiryModal.tsx
- FOUND: components/layout/InquiryUrlWatcher.tsx
- FOUND: components/layout/SiteShell.tsx
- FOUND: .planning/phases/03-contact-conversion/03-01-SUMMARY.md
- FOUND: Task 1 commit 5b41772
- FOUND: Task 2 commit 7593351
