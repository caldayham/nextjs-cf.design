# Roadmap: cf.design Programmatic SEO

## Overview

This roadmap delivers a programmatic SEO system that generates high-quality, unique local service pages for 15 Peninsula cities across 11 service specialties. The journey moves from structured data foundation through AI content generation, page rendering, site-wide linking, and graduated deployment -- with content quality as the gating concern at every stage. Each phase produces a verifiable, independent capability that builds toward the full PSEO system.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Data Foundation** - City, service, and local knowledge data systems with case study and keyword mappings
- [ ] **Phase 2: Content Generation Pipeline** - AI-powered content generation script producing unique, committed JSON content per city/service
- [ ] **Phase 3: Page Template and SEO Markup** - PSEO route handler, responsive layout, schema markup, and per-page metadata
- [ ] **Phase 4: Internal Linking and Sitemap** - Bidirectional hub-spoke linking and sitemap extension for PSEO pages
- [ ] **Phase 5: Graduated Launch and Monitoring** - Batch deployment, Search Console setup, and cannibalization monitoring

## Phase Details

### Phase 1: Data Foundation
**Goal**: All city, service, and local knowledge data is structured, accessible, and ready for content generation and page rendering
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05
**Success Criteria** (what must be TRUE):
  1. A TypeScript data file defines all 15 Peninsula cities with slugs, display names, neighborhoods, and geographic characteristics
  2. A TypeScript data file defines all 11 service specialties with keywords, descriptions, and category metadata
  3. Local knowledge data (regulations, permit info, neighborhood details) is queryable per city
  4. Each case study is mapped to nearby cities so pages can reference real completed projects
  5. Target keyword data exists for every city+service combination, usable for meta tag generation
**Plans**: 01-01, 01-02

Plans:
- [x] 01-01: City data (15 cities) + Service data (11 specialties) — Wave 1
- [ ] 01-02: Local knowledge, case study proximity, keywords, helpers — Wave 2

### Phase 2: Content Generation Pipeline
**Goal**: A standalone script generates unique, high-quality page content for every city/service combination, stored as committed JSON files
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Running the generation script produces a JSON content file for every city/service combination (~165 files)
  2. Generated content files are committed to the repo and not generated at build time
  3. Each generated page contains at least 200-300 words of city-specific prose with local references (neighborhoods, landmarks, housing stock)
  4. A validation step flags any page pair with less than 40% unique content for the same service across different cities
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Page Template and SEO Markup
**Goal**: Every city/service combination renders as a complete, responsive PSEO page with structured data and optimized metadata
**Depends on**: Phase 1, Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, SEO-01, SEO-02, SEO-05
**Success Criteria** (what must be TRUE):
  1. Visiting /[city]/[service]/ renders a complete page with hero, content sections, nearby case study photos, and consultation CTA
  2. Each page includes valid LocalBusiness + Service JSON-LD schema markup
  3. Each page has a unique meta title and description containing the target city and service keywords
  4. Each page links to the corresponding specialty page and relevant case studies
  5. Open Graph tags render correctly for social sharing previews
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Internal Linking and Sitemap
**Goal**: PSEO pages are fully integrated into the site's link structure and discoverable by search engines
**Depends on**: Phase 3
**Requirements**: SEO-03, SEO-04
**Success Criteria** (what must be TRUE):
  1. Each specialty page links down to its city-specific PSEO pages (pillar links to spokes)
  2. Each PSEO page links up to its parent specialty page (spoke links to pillar)
  3. The sitemap includes all PSEO pages with correct lastmod dates and self-referencing canonical URLs
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Graduated Launch and Monitoring
**Goal**: PSEO pages are deployed in controlled batches with indexing verification and cannibalization monitoring
**Depends on**: Phase 4
**Requirements**: LNCH-01, LNCH-02, LNCH-03
**Success Criteria** (what must be TRUE):
  1. Pages are deployed in batches of 20-30 with indexing verification between each batch
  2. Search Console is configured with PSEO sitemap submitted and indexing requests made
  3. Monitoring confirms PSEO pages are not stealing rankings from existing specialty pages or case studies
**Plans**: TBD

Plans:
- [ ] 05-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Foundation | 1/2 | In Progress | - |
| 2. Content Generation Pipeline | 0/0 | Not started | - |
| 3. Page Template and SEO Markup | 0/0 | Not started | - |
| 4. Internal Linking and Sitemap | 0/0 | Not started | - |
| 5. Graduated Launch and Monitoring | 0/0 | Not started | - |
