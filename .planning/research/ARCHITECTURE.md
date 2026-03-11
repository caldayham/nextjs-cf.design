# Architecture Patterns

**Domain:** Programmatic SEO for local service pages (city x service combinations)
**Researched:** 2026-03-10

## Recommended Architecture

### High-Level System

```
data/
  cities.ts          ── City definitions (name, slug, county, coords, landmarks, neighborhoods)
  services.ts        ── Service definitions (name, slug, description, related specialties/case studies)
  pseo-content/
    [city-slug]/
      [service-slug].json   ── Pre-generated AI content per combination

app/(main)/
  [city]/
    [service]/
      page.tsx        ── Dynamic route: /palo-alto/custom-carpentry/
  sitemap/
    [id]/
      route.ts        ── Generated sitemap segments for PSEO pages

components/
  pseo/
    PseoPageLayout.tsx    ── Main layout component for PSEO pages
    ServiceHighlights.tsx ── Service-specific content sections
    CityContext.tsx        ── City-specific context (neighborhoods, landmarks)
    RelatedCaseStudies.tsx ── Links to relevant case studies
    RelatedSpecialties.tsx ── Links to relevant specialty pages
    LocalBusinessSchema.tsx ── JSON-LD structured data
    ServiceAreaMap.tsx      ── Optional: static map image or embed
    PseoBreadcrumbs.tsx     ── Breadcrumb navigation
    PseoCTA.tsx             ── City-aware call to action
```

### Why This Route Structure

**Route: `app/(main)/[city]/[service]/page.tsx`**

This places PSEO pages at the URL root: `cf.design/palo-alto/custom-carpentry/`. This is the correct choice because:

1. **SEO-optimal URL structure.** `/palo-alto/custom-carpentry/` is shorter and more authoritative than `/services/palo-alto/custom-carpentry/`. Local service queries rank better with short, keyword-rich URLs.
2. **Lives inside the existing `(main)` route group.** PSEO pages share the same SiteShell layout (nav, footer) as the rest of the site. No new layout needed.
3. **No collision with existing routes.** Current routes use explicit path segments (`/case-studies/...`, `/specialties/...`, `/thank-you/`, `/inquiries/`). City slugs (`palo-alto`, `menlo-park`) will never collide because they are distinct strings. Add a validation check in `generateStaticParams` to assert no city slug matches an existing route segment.
4. **trailingSlash: true already configured.** The existing `next.config.ts` uses `trailingSlash: true`, so URLs become `/palo-alto/custom-carpentry/` which is clean for SEO.

**Alternative considered: `/services/[city]/[service]/`** -- Rejected because it adds unnecessary URL depth and the `/services/` prefix adds no SEO value for local intent queries.

**Alternative considered: `/[service]/[city]/`** -- Rejected because `city-first` ordering matches how users search ("Palo Alto fence builder") and creates natural city hub pages if you add them later (`/palo-alto/` as a city landing page).

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| `page.tsx` (route) | Data loading, metadata generation, JSON-LD injection, layout composition | All PSEO components, data files |
| `PseoPageLayout` | Page structure: hero, content sections, CTA, related links | Child section components |
| `ServiceHighlights` | Renders service-specific content (what we do, process, materials) | `services.ts` data |
| `CityContext` | Renders city-specific content (neighborhoods served, local references) | `cities.ts` data |
| `RelatedCaseStudies` | Shows 1-3 case studies relevant to this service/city | `case-studies.ts` data |
| `RelatedSpecialties` | Links to the canonical specialty page for this service | `specialties.ts` data |
| `LocalBusinessSchema` | Generates JSON-LD for LocalBusiness + Service schemas | City + service data |
| `PseoBreadcrumbs` | Renders breadcrumb nav: Home > City > Service | Route params |
| `PseoCTA` | City-aware CTA: "Free consultation in [City]" | City data |

### Data Flow

```
Build time:
  1. cities.ts + services.ts → generateStaticParams() → list of {city, service} combos
  2. For each combo, page.tsx reads:
     a. City data from cities.ts (name, landmarks, neighborhoods, county)
     b. Service data from services.ts (name, description, related specialties)
     c. Pre-generated content from data/pseo-content/[city]/[service].json
     d. Related case studies from case-studies.ts (filtered by service type + city)
     e. Related specialties from specialties.ts (matched by service)
  3. Page renders with all data → static HTML output

Content generation pipeline (separate from build):
  1. Script reads cities.ts + services.ts → generates all combos
  2. For each combo, calls AI API with structured prompt including city data + service data
  3. Writes output to data/pseo-content/[city]/[service].json
  4. Content files committed to repo → built at deploy time
```

## Route File: Detailed Structure

```typescript
// app/(main)/[city]/[service]/page.tsx

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCityBySlug, CITIES } from '@/data/cities'
import { getServiceBySlug, SERVICES } from '@/data/services'
import { getPseoContent } from '@/data/pseo-content'
import { CASE_STUDIES } from '@/data/case-studies'
import { SPECIALTIES } from '@/data/specialties'
import PseoPageLayout from '@/components/pseo/PseoPageLayout'

// Prevent any non-PSEO slugs from matching this route
const RESERVED_SLUGS = ['case-studies', 'specialties', 'thank-you', 'inquiries']

export function generateStaticParams() {
  const params: { city: string; service: string }[] = []
  for (const city of CITIES) {
    for (const service of SERVICES) {
      params.push({ city: city.slug, service: service.slug })
    }
  }
  return params
}

// Disable dynamic params — only pre-generated pages exist
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params
  const city = getCityBySlug(citySlug)
  const service = getServiceBySlug(serviceSlug)
  if (!city || !service) return {}

  return {
    title: `${service.name} in ${city.name}, CA — CF Design`,
    description: `Professional ${service.name.toLowerCase()} services in ${city.name}. Custom craftsmanship by CF Design — serving the San Francisco Peninsula.`,
    alternates: {
      canonical: `https://cf.design/${citySlug}/${serviceSlug}/`,
    },
  }
}

export default async function PseoPage({
  params,
}: {
  params: Promise<{ city: string; service: string }>
}) {
  const { city: citySlug, service: serviceSlug } = await params

  if (RESERVED_SLUGS.includes(citySlug)) notFound()

  const city = getCityBySlug(citySlug)
  const service = getServiceBySlug(serviceSlug)
  if (!city || !service) notFound()

  const content = getPseoContent(citySlug, serviceSlug)
  const relatedCaseStudies = CASE_STUDIES.filter(
    cs => service.relatedCaseStudySlugs?.includes(cs.href.split('/').pop()!)
  )
  const relatedSpecialty = SPECIALTIES.find(
    s => s.href === `/specialties/${service.relatedSpecialtySlug}`
  )

  return (
    <PseoPageLayout
      city={city}
      service={service}
      content={content}
      relatedCaseStudies={relatedCaseStudies}
      relatedSpecialty={relatedSpecialty}
    />
  )
}
```

## Patterns to Follow

### Pattern 1: Pre-Generated Content as Static JSON

**What:** AI-generated content is created by a separate script and stored as JSON files in the repo. Build reads these files at compile time. No AI calls during build.

**When:** Always. This is the only viable approach for this project.

**Why:**
- Deterministic builds (same content every time)
- Content is reviewable in git diffs before deploy
- No API costs on every build/redeploy
- No build failures from API rate limits or outages
- Content can be edited manually after generation

**Structure:**
```
data/pseo-content/
  palo-alto/
    custom-carpentry.json
    fences-gates-decks.json
    ...
  menlo-park/
    custom-carpentry.json
    ...
```

**JSON shape:**
```json
{
  "headline": "Custom Carpentry in Palo Alto",
  "intro": "From built-in bookshelves in College Terrace to...",
  "sections": [
    {
      "heading": "What We Build",
      "body": "..."
    },
    {
      "heading": "Why Palo Alto Homeowners Choose CF Design",
      "body": "..."
    }
  ],
  "localReferences": [
    "Just blocks from Mitchell Park Library...",
    "Serving neighborhoods from Crescent Park to Barron Park..."
  ],
  "faqs": [
    {
      "question": "How much does custom carpentry cost in Palo Alto?",
      "answer": "..."
    }
  ],
  "generatedAt": "2026-03-10T00:00:00Z",
  "model": "gpt-4o-mini",
  "version": 1
}
```

### Pattern 2: JSON-LD Structured Data per Page

**What:** Each PSEO page includes LocalBusiness + Service schema markup as a `<script type="application/ld+json">` tag, following Next.js official guidance.

**When:** Every PSEO page.

**Example:**
```typescript
// components/pseo/LocalBusinessSchema.tsx
import type { City } from '@/data/cities'
import type { Service } from '@/data/services'

export default function LocalBusinessSchema({
  city,
  service,
}: {
  city: City
  service: Service
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'CF Design',
    description: `Professional ${service.name.toLowerCase()} in ${city.name}, CA`,
    url: `https://cf.design/${city.slug}/${service.slug}/`,
    telephone: '+1-650-XXX-XXXX',
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'California',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            areaServed: city.name,
          },
        },
      ],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Palo Alto',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  )
}
```

**Confidence: HIGH** -- This follows Next.js 16 official docs exactly.

### Pattern 3: Internal Linking Web

**What:** Every PSEO page links to related content in three directions:
1. **Up to specialty page:** "Learn more about our custom carpentry" links to `/specialties/custom-carpentry/`
2. **Sideways to case studies:** "See our work in Palo Alto" links to relevant case studies
3. **Across to neighboring cities:** "Also serving Menlo Park" links to `/menlo-park/custom-carpentry/`

**When:** Every PSEO page. This is critical for SEO value distribution.

**Why:** Google uses internal links to discover pages and distribute PageRank. A PSEO page with no inbound/outbound links is an orphan that won't rank. The linking web also prevents pages from appearing "thin" because they connect to real, detailed content.

**Reverse direction too:** Existing specialty pages and case study pages should link DOWN to PSEO pages. Add a "Cities We Serve" section to each specialty page listing the city-specific PSEO pages.

### Pattern 4: Sitemap Strategy

**What:** Use Next.js `generateSitemaps` to create a separate sitemap segment for PSEO pages, keeping the main sitemap clean.

**Why:** With 150-500 new pages, a single sitemap.xml is still under Google's 50,000 URL limit, but splitting by type keeps things organized and makes it easy to monitor crawl patterns in Google Search Console.

**Implementation:**
```typescript
// app/(main)/[city]/sitemap.ts
import type { MetadataRoute } from 'next'
import { CITIES } from '@/data/cities'
import { SERVICES } from '@/data/services'

export async function generateSitemaps() {
  // One sitemap per city for clean organization
  return CITIES.map((city, index) => ({ id: index }))
}

export default async function sitemap(props: {
  id: Promise<string>
}): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id)
  const city = CITIES[id]
  if (!city) return []

  return SERVICES.map((service) => ({
    url: `https://cf.design/${city.slug}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
}
```

Update the existing `app/sitemap.ts` to also include specialty pages (currently missing) and keep it for non-PSEO pages only.

**Confidence: HIGH** -- Uses official Next.js 16 `generateSitemaps` API, verified in docs.

### Pattern 5: City and Service Data as TypeScript Constants

**What:** Define cities and services as typed arrays in `data/` files, consistent with existing patterns (`CASE_STUDIES`, `SPECIALTIES`, `PORTFOLIO_ITEMS`).

**When:** This is the data foundation for the entire PSEO system.

```typescript
// data/cities.ts
export interface City {
  name: string
  slug: string
  county: string
  neighborhoods: string[]
  landmarks: string[]
  zipCodes: string[]
  lat: number
  lng: number
}

export const CITIES: City[] = [
  {
    name: 'Palo Alto',
    slug: 'palo-alto',
    county: 'Santa Clara',
    neighborhoods: ['College Terrace', 'Crescent Park', 'Old Palo Alto', 'Barron Park', 'Midtown', 'Professorville'],
    landmarks: ['Mitchell Park', 'Hoover Park', 'Stanford University', 'University Avenue'],
    zipCodes: ['94301', '94303', '94304', '94306'],
    lat: 37.4419,
    lng: -122.1430,
  },
  // ... more cities
]

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find(c => c.slug === slug)
}
```

```typescript
// data/services.ts
export interface PseoService {
  name: string
  slug: string
  description: string
  relatedSpecialtySlug: string
  relatedCaseStudySlugs: string[]
  keywords: string[]       // For content generation prompts
  materials: string[]      // Common materials for this service
}

export const SERVICES: PseoService[] = [
  {
    name: 'Custom Carpentry',
    slug: 'custom-carpentry',
    description: 'One-of-a-kind woodwork — furniture, built-ins, and bespoke projects.',
    relatedSpecialtySlug: 'custom-carpentry',
    relatedCaseStudySlugs: ['perry-little-library', 'michelle-speaker-tables', 'tina-potting-station'],
    keywords: ['custom woodwork', 'built-in cabinets', 'bespoke furniture'],
    materials: ['redwood', 'walnut', 'oak', 'cedar'],
  },
  // ... more services mapping to specialties
]
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Dynamic Rendering for PSEO Pages
**What:** Using server-side rendering or ISR instead of full static generation.
**Why bad:** PSEO pages have fixed content. SSR adds latency, server cost, and complexity for zero benefit. With `dynamicParams = false` and `generateStaticParams`, every page is a static HTML file served from Vercel's CDN.
**Instead:** Full SSG with `generateStaticParams` + `dynamicParams = false`.

### Anti-Pattern 2: AI Content Generation at Build Time
**What:** Calling an AI API during `next build` to generate content for each page.
**Why bad:** Builds become slow (API calls for 300+ pages), non-deterministic (different content each build), expensive (API costs on every deploy), and fragile (API outages break deploys).
**Instead:** Pre-generate content with a separate script, commit JSON files to repo, build reads static files.

### Anti-Pattern 3: Single Template with City Name Swapped
**What:** Using one template and only changing "Custom Carpentry in {CITY}" across pages.
**Why bad:** Google will deindex these as near-duplicate/thin content. The travel site case study (50,000 hotels pages, 98% deindexed) is a cautionary tale. Each page needs genuinely unique content.
**Instead:** Pre-generated AI content with city-specific local references (neighborhoods, landmarks, nearby parks), service-specific details, unique FAQs per combination, and links to real case studies from that area.

### Anti-Pattern 4: Deeply Nested URL Structure
**What:** URLs like `/services/california/san-mateo-county/palo-alto/custom-carpentry/`
**Why bad:** Longer URLs dilute keyword relevance, are harder to share, and signal lower page importance to crawlers.
**Instead:** `/palo-alto/custom-carpentry/` -- flat, keyword-dense, clean.

### Anti-Pattern 5: PSEO Pages as an Island
**What:** PSEO pages that don't link to or from existing site content.
**Why bad:** Orphan pages get poor crawl priority and won't inherit domain authority from the rest of the site.
**Instead:** Bidirectional linking -- PSEO pages link up to specialties/case studies, and specialty pages link down to city-specific PSEO pages.

## Integration Points with Existing Architecture

### Files to Modify

| File | Change | Reason |
|------|--------|--------|
| `app/sitemap.ts` | Add specialty pages to existing sitemap; PSEO gets its own sitemap via `generateSitemaps` | Specialty pages currently missing from sitemap |
| `components/specialties/SpecialtyLayout.tsx` | Add "Cities We Serve" section linking to PSEO pages for that specialty | Bidirectional internal linking |
| `components/case-studies/CaseStudyLayout.tsx` | Add "See more work in [City]" links to relevant PSEO pages | Connect case studies to PSEO network |
| `data/specialties.ts` | No change needed; PSEO `services.ts` references these via `relatedSpecialtySlug` | Data stays clean, linking at component level |

### New Files

| File | Purpose |
|------|---------|
| `data/cities.ts` | City definitions with neighborhoods, landmarks, coordinates |
| `data/services.ts` | PSEO service definitions linking to specialties and case studies |
| `data/pseo-content/*.json` | Pre-generated AI content per city/service combination |
| `app/(main)/[city]/[service]/page.tsx` | Dynamic route for PSEO pages |
| `app/(main)/[city]/sitemap.ts` | PSEO sitemap segments using `generateSitemaps` |
| `components/pseo/PseoPageLayout.tsx` | Main layout component |
| `components/pseo/LocalBusinessSchema.tsx` | JSON-LD structured data |
| `components/pseo/PseoBreadcrumbs.tsx` | Breadcrumb navigation |
| `components/pseo/RelatedCaseStudies.tsx` | Links to relevant case studies |
| `components/pseo/RelatedSpecialties.tsx` | Links to specialty pages |
| `components/pseo/PseoCTA.tsx` | City-aware call to action |
| `scripts/generate-pseo-content.ts` | AI content generation script (run manually, not during build) |

### What Does NOT Change

- Existing case study pages and their co-located MDX files
- Existing specialty page content and routes
- Homepage components
- Root layout, fonts, global CSS
- Inquiry form and thank-you page
- `next.config.ts` (trailingSlash already correct)
- `robots.ts` (already allows all)

## Build Strategy and Page Count

### Vercel Free Tier Constraint

Vercel free tier supports 10,000 static pages per deployment. With ~20 existing pages + 150-500 PSEO pages, this is well within limits.

**Math for maximum scope:**
- 15 cities x 11 services = 165 pages (conservative)
- 25 cities x 15 service variations = 375 pages (aggressive)
- Current pages: ~20
- Total: 185-395 pages -- safely under 10,000

### Build Order (Dependencies)

```
Phase 1: Data Foundation
  1. Create data/cities.ts (no dependencies)
  2. Create data/services.ts (depends on: specialties.ts for mapping)

Phase 2: Content Generation
  3. Create scripts/generate-pseo-content.ts
  4. Run content generation → data/pseo-content/*.json
  5. Review and commit generated content

Phase 3: Route and Components
  6. Create components/pseo/* (depends on: city/service types from Phase 1)
  7. Create app/(main)/[city]/[service]/page.tsx (depends on: data + components)
  8. Verify no route collisions with existing pages

Phase 4: SEO Integration
  9. Create PSEO sitemap (app/(main)/[city]/sitemap.ts)
  10. Update main sitemap to include specialty pages
  11. Add JSON-LD structured data component

Phase 5: Internal Linking
  12. Modify SpecialtyLayout.tsx — add "Cities We Serve" section
  13. Modify CaseStudyLayout.tsx — add city-specific links
  14. Verify all links work bidirectionally

Phase 6: Validation
  15. Build and verify page count
  16. Test JSON-LD with Google Rich Results Test
  17. Verify sitemap accessibility
  18. Spot-check content quality across pages
```

## Scalability Considerations

| Concern | At 150 pages | At 500 pages | At 2,000+ pages |
|---------|--------------|--------------|-----------------|
| Build time | ~30s, no issue | ~1-2min, fine | May need ISR or on-demand SSG |
| Sitemap | Single sitemap fine | Split by city with `generateSitemaps` | Split by city, consider sitemap index |
| Content quality | Easy to review all | Spot-check + automated quality checks | Need automated quality scoring |
| Vercel limits | Well under 10K | Well under 10K | Approaching limit, may need paid tier |
| Internal linking | Manual mapping works | Automated by data relationships | Need link graph analysis tools |

## Sources

- [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- HIGH confidence
- [Next.js generateSitemaps docs](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- HIGH confidence
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) -- HIGH confidence
- [Next.js sitemap.xml file convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- HIGH confidence
- [Programmatic SEO best practices (seomatic.ai)](https://seomatic.ai/blog/programmatic-seo-best-practices) -- MEDIUM confidence
- [Programmatic SEO: Scale content with templates 2026 (digitalapplied.com)](https://www.digitalapplied.com/blog/programmatic-seo-scale-content-templates-2026) -- MEDIUM confidence
- [How I Built 500+ SEO-Optimized Pages with Next.js (dev.to)](https://dev.to/kaomojiya/how-i-built-500-seo-optimized-pages-with-nextjs-14-and-edge-runtime-2mpg) -- MEDIUM confidence
- [Programmatic SEO traffic cliff guide (getpassionfruit.com)](https://www.getpassionfruit.com/blog/programmatic-seo-traffic-cliff-guide) -- MEDIUM confidence
