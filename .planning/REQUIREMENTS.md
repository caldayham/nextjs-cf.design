# Requirements: cf.design Programmatic SEO

**Defined:** 2026-03-10
**Core Value:** Generate qualified customer inquiries by showcasing craftsmanship and building trust through real project case studies and service expertise.

## v1 Requirements

Requirements for PSEO milestone. Each maps to roadmap phases.

### Data Foundation

- [x] **DATA-01**: City data system with 15 Peninsula cities including slugs, display names, neighborhoods, and geographic characteristics
- [x] **DATA-02**: Service data system mapping specialties with keywords, descriptions, and category metadata
- [x] **DATA-03**: Local knowledge data with city-specific neighborhood details
- [x] **DATA-04**: Case study proximity mapping linking each case study to nearby cities for photo/project references
- [x] **DATA-05**: Keyword/intent data tracking target keywords per city+service combination for meta tags and SEO optimization
- [x] **DATA-06**: Expanded service taxonomy (16 services split by search intent) with updated helpers and keyword mappings

### Content Generation

- [x] **CONT-01**: Multi-step content generation pipeline (Gemini for research/data, Claude for writing) producing authentic page content per city/service combination
- [ ] **CONT-02**: Generated content committed to repo as JSON files (not generated at build time)
- [ ] **CONT-03**: Content validation that flags thin or overly similar content before deployment
- [x] **CONT-04**: Each generated page reads like it was written by a passionate local craftsperson — natural SEO signals (zip codes, streets, neighborhoods) woven in organically
- [x] **CONT-05**: FAQ content generated per page (3-5 questions with fact-first answers)

### Page Template

- [ ] **PAGE-01**: PSEO route handler at `/[city]/[service]/` using generateStaticParams for all city+service combinations
- [ ] **PAGE-02**: Responsive page layout with hero, content sections, FAQ section, CTA, and relevant case study photos
- [ ] **PAGE-03**: Each page links to the corresponding specialty page (spoke -> pillar) and nearby case studies
- [ ] **PAGE-04**: Each page includes a clear inquiry/consultation CTA
- [ ] **PAGE-05**: Cross-service links per city ("Also in [City]: [related services]")

### SEO Optimization

- [ ] **SEO-01**: LocalBusiness + Service + BreadcrumbList + FAQPage JSON-LD schema markup on every PSEO page
- [ ] **SEO-02**: Unique meta title and description per page optimized for target keywords
- [ ] **SEO-03**: Bidirectional internal linking -- specialty pages link down to city-specific PSEO pages
- [ ] **SEO-04**: Sitemap.ts extended to include all PSEO pages with proper lastmod dates
- [ ] **SEO-05**: Open Graph tags per page for social sharing

### Launch & Monitoring

- [ ] **LNCH-01**: Graduated rollout deploying 20-30 pages per batch with indexing verification between batches
- [ ] **LNCH-02**: Search Console setup and sitemap submission for PSEO pages
- [ ] **LNCH-03**: Cannibalization monitoring -- verify PSEO pages don't steal rankings from existing specialty pages

## v2 Requirements

Deferred to future milestone. Tracked but not in current roadmap.

### Content Enrichment

- **ENRCH-02**: Customer review snippets mapped to relevant city/service pages
- **ENRCH-03**: Seasonal content variations (e.g., "best time to paint in Palo Alto")

### Expansion

- **EXPN-01**: City hub pages at `/[city]/` aggregating all services for that city
- **EXPN-02**: Broader Bay Area cities beyond Peninsula
- **EXPN-03**: Blog posts that link to and support PSEO pages topically

## Out of Scope

| Feature | Reason |
|---------|--------|
| Build-time AI generation | Non-deterministic builds, API costs per deploy, fragile -- pre-generate and commit instead |
| Real-time content updates | Static generation is sufficient; content refreshed manually via regeneration script |
| Paid advertising integration | Organic-first approach for this milestone |
| Mobile app | Web only |
| Permit/regulation content | Reads as forced and inauthentic; natural local signals preferred |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Complete |
| DATA-03 | Phase 1 | Complete |
| DATA-04 | Phase 1 | Complete |
| DATA-05 | Phase 1 | Complete |
| DATA-06 | Phase 1.1 | Complete |
| CONT-01 | Phase 2 | Complete |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Complete |
| CONT-05 | Phase 2 | Complete |
| PAGE-01 | Phase 3 | Pending |
| PAGE-02 | Phase 3 | Pending |
| PAGE-03 | Phase 3 | Pending |
| PAGE-04 | Phase 3 | Pending |
| PAGE-05 | Phase 3 | Pending |
| SEO-01 | Phase 3 | Pending |
| SEO-02 | Phase 3 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 3 | Pending |
| LNCH-01 | Phase 5 | Pending |
| LNCH-02 | Phase 5 | Pending |
| LNCH-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-11 after architecture pivot (service expansion, multi-step pipeline, FAQs to v1)*
