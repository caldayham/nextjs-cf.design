---
phase: 05-seo-launch
plan: 01
subsystem: seo
tags: [next.js, metadata, open-graph, json-ld, schema.org, sitemap, robots.txt]

# Dependency graph
requires:
  - phase: 04-case-studies
    provides: MDX case study files with caseStudyData.heroImage and heroImageAlt for OG images
  - phase: 02-homepage
    provides: Homepage components (Hero, Purpose, Process, Portfolio, Reviews, FAQ) in app/page.tsx
  - phase: 03-contact-conversion
    provides: Thank-you page at app/thank-you/page.tsx
provides:
  - Root layout with metadataBase + title template + default OG tags
  - Homepage metadata export with LocalBusiness JSON-LD structured data
  - Thank-you page OG tags
  - Case study pages with per-study OG images via generateMetadata
  - app/sitemap.ts serving 3 public routes with trailing slashes
  - app/robots.ts allowing all crawlers with sitemap reference
affects: [deployment, search-engine-indexing, social-sharing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "metadataBase in root layout.tsx enables relative OG image URLs to resolve with full domain"
    - "title.template '%s | CF Design' — child pages set only their title, layout appends brand"
    - "Page-level openGraph completely replaces layout default — include all OG fields per page"
    - "JSON-LD as const object with dangerouslySetInnerHTML + .replace(/</g, '\\u003c') for XSS safety"
    - "generateMetadata imports both metadata and caseStudyData from MDX for per-study OG images"

key-files:
  created:
    - app/sitemap.ts
    - app/robots.ts
  modified:
    - app/layout.tsx
    - app/page.tsx
    - app/thank-you/page.tsx
    - app/case-studies/[slug]/page.tsx

key-decisions:
  - "metadataBase set to https://cf.design so relative image paths resolve for social crawlers"
  - "thank-you page title changed from 'Thank You - CF Design' to 'Thank You' — template handles brand suffix"
  - "JSON-LD XSS protection: .replace(/</g, '\\u003c') prevents injection via user-controlled strings"
  - "og:type 'article' on case study pages vs 'website' on homepage — semantically correct distinction"

patterns-established:
  - "JSON-LD pattern: define as const object above component, inject with dangerouslySetInnerHTML in <main> first child"
  - "OG shallow merge: page-level openGraph must include ALL fields (title, description, url, images, type)"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04, SEO-05]

# Metrics
duration: 2min
completed: 2026-03-02
---

# Phase 5 Plan 01: SEO Metadata and Structured Data Summary

**Next.js Metadata API with metadataBase, title template, OG tags on all pages, LocalBusiness JSON-LD on homepage, sitemap.xml with 3 routes, and robots.txt**

## Performance

- **Duration:** 2 min
- **Started:** 2026-03-02T20:44:31Z
- **Completed:** 2026-03-02T20:46:51Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Root layout now has `metadataBase: new URL('https://cf.design')`, `title.template: '%s | CF Design'`, and default OG fallback image
- Homepage exports metadata with full OG tags plus LocalBusiness JSON-LD structured data (NAP: name, address, phone, email, social)
- Case study `generateMetadata` extended to include per-study OG image from `caseStudyData.heroImage`
- Thank-you page has OG tags; title simplified to 'Thank You' (template appends brand)
- `app/sitemap.ts` serving 3 public routes with trailing slashes at `/sitemap.xml`
- `app/robots.ts` serving `Allow: /` + sitemap URL at `/robots.txt`

## Task Commits

Each task was committed atomically:

1. **Task 1: Add root metadata, sitemap.ts, and robots.ts** - `54b57ec` (feat)
2. **Task 2: Add page-level OG metadata and JSON-LD to homepage** - `3c5e500` (feat)

## Files Created/Modified
- `app/layout.tsx` - Added metadataBase, title template, default openGraph with fallback image
- `app/page.tsx` - Added metadata export + LocalBusiness JSON-LD script as first child of main
- `app/thank-you/page.tsx` - Added openGraph fields, simplified title for template compatibility
- `app/case-studies/[slug]/page.tsx` - Extended generateMetadata to import caseStudyData for per-study OG image
- `app/sitemap.ts` (created) - Returns 3 public routes with trailing slashes, monthly/yearly changeFreq
- `app/robots.ts` (created) - Allow: / for all crawlers, references sitemap.xml URL

## Decisions Made
- `metadataBase` set to `https://cf.design` — without this, social crawlers receive relative image paths that can't be fetched
- Thank-you page title changed from `'Thank You - CF Design'` to `'Thank You'` — the layout title template renders it as "Thank You | CF Design" automatically
- OG type `'article'` on case study pages, `'website'` on homepage and thank-you — semantically correct per Open Graph spec
- JSON-LD XSS protection: `.replace(/</g, '\\u003c')` escapes angle brackets in stringified JSON per Next.js docs pattern
- `/thank-you/` excluded from sitemap — conversion confirmation page, not indexable content

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- All pages have full OG tags visible in HTML source (server-rendered)
- sitemap.xml lists 3 public routes with trailing slashes
- robots.txt allows all crawlers and references sitemap
- Homepage JSON-LD LocalBusiness structured data with correct NAP ready for Google rich results
- Build passes cleanly with no metadata warnings
- Site is SEO-ready for deployment to cf.design

## Self-Check: PASSED

All files verified present on disk. All commits verified in git log.

- FOUND: app/layout.tsx
- FOUND: app/sitemap.ts
- FOUND: app/robots.ts
- FOUND: app/page.tsx
- FOUND: app/thank-you/page.tsx
- FOUND: app/case-studies/[slug]/page.tsx
- FOUND: 05-01-SUMMARY.md
- FOUND commit: 54b57ec
- FOUND commit: 3c5e500

---
*Phase: 05-seo-launch*
*Completed: 2026-03-02*
