# Phase 1: Data Foundation - Research

**Researched:** 2026-03-11
**Domain:** TypeScript data modeling for programmatic SEO (city/service combinations)
**Confidence:** HIGH

## Summary

Phase 1 is a pure data-modeling phase with no new dependencies required. The project already uses TypeScript with Next.js 16 and has an established pattern for data files in `data/` (e.g., `specialties.ts`, `case-studies.ts`, `portfolio.ts`). The work is to extend this pattern with new data files for cities, enhanced service metadata, local knowledge, case study proximity mappings, and keyword/intent data.

The 15 Peninsula cities and 11 services are already defined in project documentation. The existing `data/specialties.ts` provides a minimal interface (`title`, `href`, `description`) that needs enrichment with slugs, keywords, category metadata, and SEO-oriented fields. Case studies currently have `location` fields but no structured city mapping. All case studies are currently in Palo Alto.

**Primary recommendation:** Create flat TypeScript data files with typed interfaces and helper lookup functions. No database, no CMS, no build-time fetching. Keep data co-located in `data/` following existing project conventions. Use `as const satisfies` patterns for type-safe data arrays.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | City data system with 15 Peninsula cities including slugs, display names, neighborhoods, and geographic characteristics | New `data/cities.ts` file with `City` interface. 15 cities identified from PROJECT.md context. Each needs slug, display name, county, neighborhoods array, and geographic characteristics. |
| DATA-02 | Service data system mapping 11 specialties with keywords, descriptions, and category metadata | Enhance existing `data/specialties.ts` or create new `data/services.ts` with expanded `Service` interface adding slug, keywords array, category, and long description. Must stay compatible with existing specialty page usage. |
| DATA-03 | Local knowledge data with city-specific regulations, permit requirements, and neighborhood details | New `data/local-knowledge.ts` keyed by city slug. Includes permit info, HOA patterns, housing stock characteristics, notable neighborhoods, and climate/soil notes. This is the manual curation work flagged in STATE.md as a concern. |
| DATA-04 | Case study proximity mapping linking each case study to nearby cities for photo/project references | Extend case study data with `nearbyCities: string[]` (city slugs). All 5 current case studies are in Palo Alto, so nearby cities are geographic neighbors (Menlo Park, Los Altos, Mountain View, etc.). |
| DATA-05 | Keyword/intent data tracking target keywords per city+service combination for meta tags and SEO optimization | New `data/keywords.ts` with keyword templates and a generator function. Pattern: `{service} in {city}`, `{city} {service}`, etc. Generates unique meta title/description templates per combination. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | ^5 | Type-safe data definitions | Already in project, strict mode enabled |
| Next.js | 16.1.6 | Framework (data consumed by pages) | Already in project |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | - | Phase 1 is pure data files, no new dependencies |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| TypeScript files | JSON files | TS gives type safety, intellisense, and helper functions; JSON requires separate schema validation |
| Flat files | SQLite/database | Overkill for 15 cities x 11 services; adds complexity for no benefit at this scale |
| Manual keyword lists | Keyword API (Ahrefs, SEMrush) | Budget constraint; template-based keywords are sufficient for v1 |

**Installation:**
```bash
# No new packages needed
```

## Architecture Patterns

### Recommended Project Structure
```
data/
├── specialties.ts       # EXISTING - keep for backward compat
├── case-studies.ts      # EXISTING - extend with nearbyCities
├── portfolio.ts         # EXISTING - no changes
├── cities.ts            # NEW - City interface + 15 cities array
├── services.ts          # NEW - enriched Service interface + 11 services
├── local-knowledge.ts   # NEW - per-city local knowledge records
├── keywords.ts          # NEW - keyword templates + generator
└── types.ts             # NEW (optional) - shared PSEO types
```

### Pattern 1: Typed Data Arrays with Const Assertions
**What:** Define data as typed arrays with `as const satisfies` for compile-time safety while keeping values as literal types.
**When to use:** For all static data arrays (cities, services).
**Example:**
```typescript
// data/cities.ts
export interface City {
  slug: string
  name: string
  county: 'San Mateo' | 'Santa Clara'
  neighborhoods: string[]
  characteristics: string[] // e.g., "tree-lined streets", "mid-century homes"
  lat: number
  lng: number
}

export const CITIES: City[] = [
  {
    slug: 'palo-alto',
    name: 'Palo Alto',
    county: 'Santa Clara',
    neighborhoods: ['Old Palo Alto', 'Crescent Park', 'Barron Park', 'College Terrace', 'Professorville'],
    characteristics: ['historic craftsman homes', 'mature oak canopy', 'Stanford University proximity'],
    lat: 37.4419,
    lng: -122.1430,
  },
  // ... 14 more cities
]

// Lookup helpers
export const CITY_BY_SLUG = new Map(CITIES.map(c => [c.slug, c]))
export const CITY_SLUGS = CITIES.map(c => c.slug)
```

### Pattern 2: Enriched Service Data (Backward Compatible)
**What:** Create a new `services.ts` with richer data while keeping existing `specialties.ts` untouched for backward compatibility.
**When to use:** For the enhanced service data needed by PSEO pages.
**Example:**
```typescript
// data/services.ts
export interface Service {
  slug: string
  title: string
  href: string // matches existing specialty href
  description: string
  longDescription: string
  category: 'carpentry' | 'outdoor' | 'maintenance' | 'design'
  keywords: string[] // e.g., ['custom fence', 'redwood fence', 'fence installation']
  relatedServices: string[] // slugs of related services
}

export const SERVICES: Service[] = [
  {
    slug: 'garden-boxes',
    title: 'Garden Boxes',
    href: '/specialties/garden-boxes',
    description: 'Custom raised garden beds and planter boxes built to last.',
    longDescription: 'Custom-built raised garden beds and planter boxes...',
    category: 'outdoor',
    keywords: ['raised garden bed', 'planter box', 'garden box', 'raised bed installation'],
    relatedServices: ['landscape-design', 'hardscape'],
  },
  // ... 10 more services
]

export const SERVICE_BY_SLUG = new Map(SERVICES.map(s => [s.slug, s]))
export const SERVICE_SLUGS = SERVICES.map(s => s.slug)
```

### Pattern 3: Local Knowledge as Keyed Records
**What:** Store local knowledge indexed by city slug for O(1) lookup.
**When to use:** For per-city regulation, permit, and neighborhood data.
**Example:**
```typescript
// data/local-knowledge.ts
export interface LocalKnowledge {
  citySlug: string
  permits: string[] // e.g., "Fences over 6ft require permit"
  hoaNotes: string // e.g., "Many HOAs in Atherton require architectural review"
  housingStock: string[] // e.g., "1950s ranch homes", "Mediterranean villas"
  landmarks: string[] // local references for content generation
  climateNotes: string // relevant to outdoor work
}

export const LOCAL_KNOWLEDGE: Record<string, LocalKnowledge> = {
  'palo-alto': {
    citySlug: 'palo-alto',
    permits: [
      'Building permits required for fences over 6 feet',
      'Heritage tree ordinance protects oaks over 11.5" diameter',
    ],
    hoaNotes: 'Most neighborhoods have no HOA; some planned communities have CC&Rs',
    housingStock: ['Craftsman bungalows', 'Eichler mid-century', 'Spanish Colonial Revival'],
    landmarks: ['Stanford University', 'Mitchell Park', 'Gamble Garden'],
    climateNotes: 'Mediterranean climate, mild year-round. Ideal for outdoor work most months.',
  },
  // ... 14 more cities
}
```

### Pattern 4: Keyword Templates with Generator
**What:** Template-based keyword generation rather than hand-writing 165 keyword sets.
**When to use:** For DATA-05 keyword/intent data.
**Example:**
```typescript
// data/keywords.ts
export interface KeywordData {
  primary: string       // main target keyword
  secondary: string[]   // supporting keywords
  metaTitle: string     // meta title template
  metaDescription: string // meta description template
}

const KEYWORD_TEMPLATES = {
  metaTitle: '{service} in {city}, CA | CF Design',
  metaDescription: 'Professional {serviceLower} in {city}. {tagline} Free consultations on the SF Peninsula.',
}

export function getKeywords(cityName: string, service: { title: string; keywords: string[] }): KeywordData {
  return {
    primary: `${service.title.toLowerCase()} in ${cityName}`,
    secondary: service.keywords.map(k => `${k} ${cityName}`),
    metaTitle: KEYWORD_TEMPLATES.metaTitle
      .replace('{service}', service.title)
      .replace('{city}', cityName),
    metaDescription: KEYWORD_TEMPLATES.metaDescription
      .replace('{serviceLower}', service.title.toLowerCase())
      .replace('{city}', cityName)
      .replace('{tagline}', service.description),
  }
}
```

### Pattern 5: Case Study Proximity via City Slugs
**What:** Add `nearbyCities` array to case study data linking projects to geographic neighbors.
**When to use:** For DATA-04, enabling PSEO pages to show "real projects near you."
**Example:**
```typescript
// Extended case study data
export interface CaseStudyWithProximity extends CaseStudy {
  citySlug: string
  nearbyCities: string[] // city slugs within ~10 miles
  serviceCategories: string[] // service slugs this case study demonstrates
}
```

### Anti-Patterns to Avoid
- **Over-normalizing the data:** This is not a database. Flat arrays with lookup Maps are simpler and sufficient for 15 cities x 11 services. Don't create a relational schema.
- **Generating data at import time:** Keep all data as literal values, not computed. Helper functions are fine but the source-of-truth arrays should be static.
- **Modifying existing data files in-place:** The existing `specialties.ts` is imported by current components. Create new `services.ts` with enriched data rather than breaking the existing interface.
- **Using enums for categories:** String literal unions are more flexible and don't generate runtime code.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Slug generation | Custom slugify function | Hand-write slugs in data | Only 15 cities and 11 services; hand-written slugs ensure URL stability |
| Geo distance calculation | Haversine formula | Hand-curate `nearbyCities` arrays | Only 15 cities; manual mapping is more accurate for business proximity |
| Keyword research | Scraping tools | Template patterns + manual refinement | Budget constraint; templates cover 80% of value |
| Data validation | Custom runtime checks | TypeScript compiler + interfaces | TS strict mode catches type errors at build time |

**Key insight:** At the scale of 15 cities x 11 services, manual curation beats automation. The data set is small enough that hand-written values will be higher quality than any automated approach, and changes are infrequent.

## Common Pitfalls

### Pitfall 1: Slug Mismatch Between Data Files
**What goes wrong:** City slugs in `cities.ts` don't match keys in `local-knowledge.ts` or `nearbyCities` arrays.
**Why it happens:** Manual entry across multiple files with no compile-time cross-checking.
**How to avoid:** Export `CITY_SLUGS` and `SERVICE_SLUGS` as const tuples and use them as the source of truth for slug types across all files. Example: `type CitySlug = typeof CITY_SLUGS[number]`.
**Warning signs:** Runtime `undefined` when looking up city by slug.

### Pitfall 2: Breaking Existing Specialty Pages
**What goes wrong:** Modifying the `Specialty` interface or `SPECIALTIES` array breaks the 11 existing specialty pages that import from `data/specialties.ts`.
**Why it happens:** Trying to "enhance" the existing file instead of creating a new one.
**How to avoid:** Leave `data/specialties.ts` untouched. Create `data/services.ts` with enriched data. If cross-referencing is needed, match on `href` or `slug`.
**Warning signs:** TypeScript errors in specialty page files after data changes.

### Pitfall 3: Thin Local Knowledge Data
**What goes wrong:** Local knowledge entries are generic (could apply to any Bay Area city), making AI-generated content indistinguishable between cities.
**Why it happens:** Rushing through the manual curation step; using the same boilerplate for similar cities.
**How to avoid:** Each city's local knowledge should have at least 2-3 genuinely unique details (specific neighborhoods, specific housing styles, specific permit quirks). Test: if you swap city names and the data still reads correctly, it's too generic.
**Warning signs:** Multiple cities with identical `housingStock` or `landmarks` arrays.

### Pitfall 4: Missing generateStaticParams Compatibility
**What goes wrong:** Data structures don't align with what `generateStaticParams` needs in Phase 3 (an array of `{ city: string, service: string }` params).
**Why it happens:** Designing data for human readability without considering the page generation consumer.
**How to avoid:** Include helper functions that produce the params format: `getAllCityServiceParams(): { city: string; service: string }[]`.
**Warning signs:** Needing to restructure data in Phase 3.

### Pitfall 5: Keyword Cannibalization by Design
**What goes wrong:** Target keywords for PSEO pages overlap with existing specialty page keywords, causing Google to rank the wrong page.
**Why it happens:** PSEO page title = "Custom Carpentry" matches the existing `/specialties/custom-carpentry` page.
**How to avoid:** PSEO keywords MUST include the city name. Pattern: "{service} in {city}" not just "{service}". The city qualifier differentiates from the specialty pillar page.
**Warning signs:** Meta titles that don't contain a city name.

## Code Examples

### All City+Service Combinations (for generateStaticParams)
```typescript
// data/helpers.ts
import { CITIES } from './cities'
import { SERVICES } from './services'

export function getAllCityServiceParams() {
  return CITIES.flatMap(city =>
    SERVICES.map(service => ({
      city: city.slug,
      service: service.slug,
    }))
  )
}
// Returns 165 param objects (15 cities x 11 services)
```

### Getting Nearby Case Studies for a City
```typescript
import { CASE_STUDIES_WITH_PROXIMITY } from './case-studies'

export function getCaseStudiesForCity(citySlug: string) {
  return CASE_STUDIES_WITH_PROXIMITY.filter(
    cs => cs.citySlug === citySlug || cs.nearbyCities.includes(citySlug)
  )
}
```

### Complete Data for a Single PSEO Page
```typescript
import { CITY_BY_SLUG } from './cities'
import { SERVICE_BY_SLUG } from './services'
import { LOCAL_KNOWLEDGE } from './local-knowledge'
import { getKeywords } from './keywords'
import { getCaseStudiesForCity } from './helpers'

export function getPageData(citySlug: string, serviceSlug: string) {
  const city = CITY_BY_SLUG.get(citySlug)
  const service = SERVICE_BY_SLUG.get(serviceSlug)
  if (!city || !service) return null

  return {
    city,
    service,
    localKnowledge: LOCAL_KNOWLEDGE[citySlug],
    keywords: getKeywords(city.name, service),
    nearbyCaseStudies: getCaseStudiesForCity(citySlug),
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JSON data files | TypeScript data files with interfaces | Standard in Next.js App Router era | Type safety at compile time, no runtime parsing |
| CMS-driven PSEO | Git-committed data + AI generation | 2024+ trend for small sites | No CMS dependency, version-controlled, free hosting |
| Keyword stuffing | Natural language with keyword intent | Google helpful content updates (2022-2024) | Each page must be genuinely useful, not just keyword-targeted |

**Deprecated/outdated:**
- `getStaticProps`/`getStaticPaths`: Replaced by `generateStaticParams` in App Router (Next.js 13+). This project uses App Router.

## Open Questions

1. **Exact 15 Cities List**
   - What we know: PROJECT.md mentions "Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley, Los Altos, Los Altos Hills, Mountain View, Redwood City, San Carlos, etc."
   - What's unclear: The "etc." leaves 5-6 cities unspecified. Likely candidates: Belmont, San Mateo, Burlingame, Hillsborough, Foster City, Half Moon Bay, East Palo Alto.
   - Recommendation: The planner should define all 15 cities explicitly. Suggest: Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley, Los Altos, Los Altos Hills, Mountain View, Redwood City, San Carlos, Belmont, San Mateo, Burlingame, Hillsborough, Foster City. These are all within the SF Peninsula service area and represent real demand.

2. **Local Knowledge Data Quality**
   - What we know: STATE.md flags "City-specific local data needs manual curation" as a concern.
   - What's unclear: How much detail is needed per city for Phase 2's AI content generation to produce genuinely differentiated content.
   - Recommendation: Aim for 5-8 unique data points per city minimum (neighborhoods, housing stock, permit details, landmarks, notable characteristics). The AI content generator in Phase 2 will use this as input, so richer data = better differentiation.

3. **Service Slug Alignment with Existing URLs**
   - What we know: Existing specialty pages use paths like `/specialties/garden-boxes`. PSEO pages will use `/[city]/[service]/`.
   - What's unclear: Should the service slug in PSEO URLs match the specialty page slug exactly? E.g., `/palo-alto/garden-boxes/` matches `/specialties/garden-boxes`.
   - Recommendation: Yes, use the same slugs. This maintains semantic consistency and simplifies internal linking in Phase 4 (specialty pillar -> PSEO spoke).

## Sources

### Primary (HIGH confidence)
- Project codebase analysis: `data/specialties.ts`, `data/case-studies.ts`, `data/portfolio.ts` - existing data patterns
- `package.json` - Next.js 16.1.6, React 19.2.3, TypeScript ^5
- `tsconfig.json` - strict mode, path aliases (`@/*`), bundler module resolution
- `.planning/REQUIREMENTS.md` - DATA-01 through DATA-05 specifications
- `.planning/ROADMAP.md` - Phase 1 success criteria
- `.planning/STATE.md` - Project decisions and blockers
- `.planning/PROJECT.md` - Business context, constraints, 15 cities mention

### Secondary (MEDIUM confidence)
- SF Peninsula geography knowledge - cities list and neighborhoods (general knowledge, verifiable via maps)
- Next.js App Router `generateStaticParams` pattern - standard documented pattern

### Tertiary (LOW confidence)
- None - this phase is straightforward data modeling with no uncertain technical elements

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies; TypeScript data files following existing project patterns
- Architecture: HIGH - Extending established `data/` directory pattern; straightforward interfaces and arrays
- Pitfalls: HIGH - Pitfalls are domain-specific (SEO, data consistency) not technology-specific; well-understood from PSEO best practices

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable - pure data modeling, no fast-moving dependencies)
