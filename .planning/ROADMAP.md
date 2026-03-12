# Roadmap: cf.design Programmatic SEO

## Overview

This roadmap delivers a programmatic SEO system that generates high-quality, authentic local service pages for 15 Peninsula cities across 16 service specialties (240 pages). Content is generated via a multi-step pipeline (Gemini for research, Claude for writing) in an external project, with JSON output committed to the Next.js repo. Each page should read like it was written by a passionate local craftsperson, not an SEO tool.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (1.1, 2.1): Inserted work

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Data Foundation** - City, service, and local knowledge data systems with case study and keyword mappings
- [ ] **Phase 1.1: Service Taxonomy Expansion** - Expand services from 11 broad categories to 16 intent-specific services
- [ ] **Phase 2: Content Generation Pipeline** - Multi-step AI pipeline (Gemini research + Claude writing) producing authentic, committed JSON content
- [ ] **Phase 3: Page Template and SEO Markup** - PSEO route handler, responsive layout with FAQ section, enhanced schema markup
- [ ] **Phase 4: Internal Linking and Sitemap** - Bidirectional hub-spoke linking and sitemap extension for PSEO pages
- [ ] **Phase 5: Graduated Launch and Monitoring** - Batch deployment, Search Console setup, and cannibalization monitoring

## Phase Details

### Phase 1: Data Foundation
**Goal**: All city, service, and local knowledge data is structured, accessible, and ready for content generation and page rendering
**Depends on**: Nothing (first phase)
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, DATA-05
**Success Criteria** (what must be TRUE):
  1. A TypeScript data file defines all 15 Peninsula cities with slugs, display names, neighborhoods, and geographic characteristics
  2. A TypeScript data file defines service specialties with keywords, descriptions, and category metadata
  3. Local knowledge data (neighborhood details) is queryable per city
  4. Each case study is mapped to nearby cities so pages can reference real completed projects
  5. Target keyword data exists for every city+service combination, usable for meta tag generation
**Plans**: 01-01, 01-02

Plans:
- [x] 01-01: City data (15 cities) + Service data (11 specialties) — Wave 1
- [x] 01-02: Local knowledge, case study proximity, keywords, helpers — Wave 2

### Phase 1.1: Service Taxonomy Expansion (INSERTED)
**Goal**: Services are split from 11 broad categories into 16 intent-specific services, with all data layer dependencies updated
**Depends on**: Phase 1
**Requirements**: DATA-06
**Success Criteria** (what must be TRUE):
  1. services.ts defines 16 services split by search intent (e.g., "New Deck Construction" and "Deck Repair & Refinishing" as separate entries)
  2. Keywords, descriptions, and related services are populated for all new services
  3. helpers.ts generates all 240 city+service combinations correctly
  4. Existing specialty page links (href) are preserved for services that map to current specialty pages
**Plans**: 1 plan

Plans:
- [ ] 01.1-01-PLAN.md — Expand services from 11 to 16 and update all downstream data references

### Phase 2: Content Generation Pipeline
**Goal**: A multi-step pipeline generates authentic, high-quality page content and FAQs for every city/service combination, stored as committed JSON files
**Depends on**: Phase 1.1
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. Running the pipeline produces a JSON content file for every city/service combination (240 files)
  2. Generated content files are committed to the Next.js repo and not generated at build time
  3. Each page reads like a passionate local craftsperson wrote it, with natural local signals (neighborhoods, streets, zip codes)
  4. Each page includes 3-5 FAQs with fact-first answers
  5. Validation flags overly similar content across cities for the same service
**Plans**: 2 plans

Plans:
- [ ] 02-01: Schema + Claude module + prompt refactor (dual-model foundation) — Wave 1
- [ ] 02-02: Pipeline integration + validation + sample generation — Wave 2

### Phase 3: Page Template and SEO Markup
**Goal**: Every city/service combination renders as a complete, responsive PSEO page with FAQ section, structured data, and optimized metadata
**Depends on**: Phase 1.1, Phase 2
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, SEO-01, SEO-02, SEO-05
**Success Criteria** (what must be TRUE):
  1. Visiting /[city]/[service]/ renders a complete page with hero, content sections, FAQ section, nearby case study photos, and consultation CTA
  2. Each page includes valid LocalBusiness + Service + BreadcrumbList + FAQPage JSON-LD schema markup
  3. Each page has a unique meta title and description containing the target city and service keywords
  4. Each page links to the corresponding specialty page, relevant case studies, and related services in the same city
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
Phases execute in numeric order: 1 -> 1.1 -> 2 -> 3 -> 4 -> 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Data Foundation | 2/2 | Complete | 2026-03-11 |
| 1.1. Service Taxonomy Expansion | 0/1 | Not started | - |
| 2. Content Generation Pipeline | 0/0 | Not started | - |
| 3. Page Template and SEO Markup | 0/0 | Not started | - |
| 4. Internal Linking and Sitemap | 0/0 | Not started | - |
| 5. Graduated Launch and Monitoring | 0/0 | Not started | - |
