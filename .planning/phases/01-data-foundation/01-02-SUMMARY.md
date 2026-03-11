---
phase: 01-data-foundation
plan: 02
subsystem: database
tags: [typescript, pseo, seo, data-modeling, local-knowledge]

# Dependency graph
requires:
  - phase: 01-data-foundation/01
    provides: "City and Service data arrays with slug-based lookups"
provides:
  - "LOCAL_KNOWLEDGE record with city-specific permits, housing, landmarks, climate for 15 cities"
  - "Extended CaseStudy interface with citySlug, nearbyCities, serviceCategories"
  - "getKeywords function for city-qualified SEO meta tags"
  - "getAllCityServiceParams returning 165 city+service combinations for generateStaticParams"
  - "getPageData assembling complete PSEO page data in one call"
  - "PageData type for downstream consumers"
affects: [02-content-generation, 03-page-templates, 05-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [record-keyed-by-slug, proximity-mapping, keyword-template-generation, data-assembly-helper]

key-files:
  created:
    - data/local-knowledge.ts
    - data/keywords.ts
    - data/helpers.ts
  modified:
    - data/case-studies.ts

key-decisions:
  - "All nearbyCities limited to valid city slugs from cities.ts (removed 'stanford' from plan suggestion)"
  - "Runtime validation assertion in local-knowledge.ts ensures every city slug has data"
  - "getKeywords uses lowercase city name in primary keyword for SEO consistency"

patterns-established:
  - "Record<string, T> keyed by city slug for city-specific data lookups"
  - "Proximity mapping via nearbyCities arrays on case studies"
  - "getPageData as single entry point for assembling all PSEO page data"

requirements-completed: [DATA-03, DATA-04, DATA-05]

# Metrics
duration: 4min
completed: 2026-03-11
---

# Phase 1 Plan 2: Extended Data & Helpers Summary

**Local knowledge for 15 cities, case study proximity mapping, keyword generator, and getPageData helper assembling 165 PSEO page combinations**

## Performance

- **Duration:** 4 min
- **Started:** 2026-03-11T22:19:23Z
- **Completed:** 2026-03-11T22:23:32Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Local knowledge data for all 15 Peninsula cities with genuinely city-specific details (permits, HOA notes, housing stock, landmarks, climate)
- Case studies extended with proximity mapping (citySlug + nearbyCities) and service category tags
- Keyword generator produces city-qualified meta titles and descriptions preventing SEO cannibalization
- Helper functions wire all data together: getAllCityServiceParams (165 combos), getCaseStudiesForCity, getCaseStudiesForService, getPageData

## Task Commits

Each task was committed atomically:

1. **Task 1: Create local knowledge data for 15 cities** - `5903e86` (feat)
2. **Task 2: Extend case studies with proximity mapping and create keyword generator** - `956efc6` (feat)
3. **Task 3: Create PSEO data helper functions** - `137f841` (feat)

## Files Created/Modified
- `data/local-knowledge.ts` - LocalKnowledge interface and LOCAL_KNOWLEDGE record for 15 cities
- `data/case-studies.ts` - Extended CaseStudy interface with citySlug, nearbyCities, serviceCategories
- `data/keywords.ts` - KeywordData interface and getKeywords function for city-qualified SEO
- `data/helpers.ts` - getAllCityServiceParams, getCaseStudiesForCity, getCaseStudiesForService, getPageData, PageData type

## Decisions Made
- Removed 'stanford' from Perry's Little Library nearbyCities (not one of the 15 valid city slugs)
- Added runtime validation assertion in local-knowledge.ts to catch missing city data at module load
- Keywords use lowercase city in primary keyword ("garden boxes in palo alto") for natural search query matching

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Complete data foundation ready for Phase 2 content generation
- getPageData provides single-call data assembly for any of 165 city+service pages
- All data files compile cleanly with TypeScript (tsc --noEmit passes)

---
*Phase: 01-data-foundation*
*Completed: 2026-03-11*
