# Project Research Summary

**Project:** cf.design Programmatic SEO
**Domain:** Programmatic SEO for local home improvement service pages (city x service combinations)
**Researched:** 2026-03-10
**Confidence:** HIGH

## Executive Summary

This project adds a programmatic SEO system to an existing Next.js 16 portfolio site for a SF Peninsula home improvement business. The approach is well-established: generate static pages for every city-service combination (~165 pages for 15 cities x 11 services), each with genuinely unique AI-generated content enriched with real local data. The existing stack (Next.js 16 + React 19 + TypeScript + Tailwind 4 on Vercel) requires minimal additions -- only the Vercel AI SDK for content generation and schema-dts for JSON-LD type safety, both as dev dependencies with zero runtime cost.

The recommended architecture follows a pre-generated content model: a standalone script generates unique content per city/service combination using Gemini Flash-Lite (total cost under $0.15 for 500 pages), stores it as JSON files committed to the repo, and the Next.js build consumes these static files via `generateStaticParams`. Pages live at `/[city]/[service]/` inside the existing `(main)` route group, sharing the site's navigation and footer. This is the only viable approach given the constraints of Vercel free tier, deterministic builds, and content reviewability.

The dominant risk is Google penalties. Google's December 2025 core update and August 2025 spam update specifically target two patterns this project could fall into: doorway pages (city-name-swap templates) and scaled content abuse (generic AI content at scale). Both carry site-wide ranking consequences that would damage existing specialty page and case study rankings. Prevention requires genuine content uniqueness per page (>40% unique content between any two city pages for the same service), structured local data injection (neighborhoods, landmarks, housing stock, regulations), and a graduated rollout strategy (batches of 20-30 pages, not all 165 at once). A secondary risk is Vercel Hobby plan commercial use violation -- the site needs to upgrade to Pro ($20/month) before PSEO pages go live.

## Key Findings

### Recommended Stack

The existing stack is unchanged. Only three dev dependencies are needed, all with zero runtime/bundle impact.

**Core additions:**
- **Vercel AI SDK (`ai` + `@ai-sdk/google`):** Unified LLM interface for batch content generation -- provider-agnostic, swap models with one line change
- **schema-dts:** Google-maintained TypeScript types for Schema.org JSON-LD -- compile-time validation of structured data, zero runtime cost
- **Built-in Next.js `generateSitemaps`:** Already using `sitemap.ts`, extend with multi-sitemap support for PSEO pages -- no new dependency

**Explicitly rejected:** next-seo (superseded by metadata API), next-sitemap (already using built-in), headless CMS (cost/complexity for static data), LangChain (massive over-engineering), databases (overkill for 500 pages of JSON).

**AI model choice:** Gemini 2.0 Flash-Lite at $0.14 total for 500 pages. GPT-4o-mini as fallback at $0.28. Cost is negligible -- model quality matters less than prompt quality and local data richness for templated content.

### Expected Features

**Must have (table stakes):**
- Unique city-specific content per page (>300 words genuinely unique prose with local references)
- LocalBusiness + Service JSON-LD schema markup on every page
- City-specific title tags and meta descriptions
- Internal linking to specialty pages, case studies, and inquiry form (hub-spoke model)
- Sitemap inclusion of all PSEO pages with self-referencing canonicals
- Mobile-responsive layout with prominent CTA

**Should have (differentiators):**
- Real project photos from nearby case studies (mapped by proximity)
- Case study cross-linking with distance context ("completed 2 miles away")
- FAQ sections with FAQPage schema targeting People Also Ask
- Breadcrumb navigation with BreadcrumbList schema
- Service-to-city relevance scoring (not every service equally relevant in every city)

**Defer (v2+):**
- Local regulation/permit content per city (HIGH manual research cost, but is the long-term content moat)
- Neighborhood-level housing stock content
- Before/after photo galleries, video testimonials
- Multi-language support, expanded service area

**Anti-features to actively avoid:** Separate pages per intent variation (doorway pages), city-name-swap templates, fake testimonials, targeting cities outside service area, "near me" pages.

### Architecture Approach

Pages use flat URL structure `/[city]/[service]/` inside the existing `(main)` route group, with `dynamicParams = false` for full SSG. Content is pre-generated JSON files organized as `data/pseo-content/[city-slug]/[service-slug].json`. City and service definitions are TypeScript constants in `data/` files, consistent with existing data patterns (CASE_STUDIES, SPECIALTIES). Components are split into focused responsibilities under `components/pseo/`.

**Major components:**
1. **Data layer** (`data/cities.ts`, `data/services.ts`, `data/pseo-content/`) -- city definitions, service definitions, pre-generated AI content
2. **Route handler** (`app/(main)/[city]/[service]/page.tsx`) -- data loading, metadata generation, JSON-LD injection, layout composition
3. **PSEO components** (`components/pseo/`) -- PseoPageLayout, LocalBusinessSchema, RelatedCaseStudies, RelatedSpecialties, PseoBreadcrumbs, PseoCTA
4. **Content generation script** (`scripts/generate-pseo-content.ts`) -- standalone build-time script using Vercel AI SDK, runs separately from `next build`
5. **Sitemap extension** (`app/(main)/[city]/sitemap.ts`) -- per-city sitemap segments via `generateSitemaps`

### Critical Pitfalls

1. **Doorway pages penalty** -- City-swap templates trigger site-wide ranking penalties. Prevent by requiring >40% unique content between any two city pages for the same service. Diff-test during content generation.
2. **Scaled content abuse** -- Generic AI content at scale triggers algorithmic demotion with 3-6 month recovery. Prevent by injecting real local data (neighborhoods, landmarks, housing stock) into prompts, manual review of 10% sample, automated similarity scoring.
3. **Keyword cannibalization** -- PSEO pages competing with existing specialty pages for the same queries. Prevent by defining clear content hierarchy (specialty = pillar, PSEO = spoke), distinct keyword targeting, and bidirectional internal linking.
4. **Vercel Hobby plan violation** -- Commercial use on free tier risks termination. Upgrade to Pro ($20/month) before PSEO deployment.
5. **Crawl budget exhaustion** -- Deploying 165+ pages at once overwhelms Google's crawl allocation for a small site. Launch in batches of 20-30 pages, submit sitemaps incrementally.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Data Foundation and Infrastructure
**Rationale:** Everything depends on the city/service data layer. Architecture research confirms this is the foundation with no upstream dependencies. Also addresses Vercel plan upgrade (critical pitfall).
**Delivers:** TypeScript data files for 15 cities and 11 services with full local metadata (neighborhoods, landmarks, coordinates, housing stock notes). Service-to-specialty and service-to-case-study mappings.
**Addresses:** City/service data system (P1), generateStaticParams routing (P1)
**Avoids:** Hardcoded city data anti-pattern; Vercel Hobby plan violation

### Phase 2: Content Generation Pipeline
**Rationale:** Content quality is the single most important factor for success or failure. Both top critical pitfalls (doorway pages, scaled content abuse) are content problems. This phase must be completed and validated before any pages go live.
**Delivers:** Content generation script using Vercel AI SDK + Gemini Flash-Lite, structured prompt templates with local data injection, uniqueness validation pipeline, pre-generated JSON content files for all city/service combinations.
**Uses:** Vercel AI SDK, @ai-sdk/google, city/service data from Phase 1
**Avoids:** Doorway pages penalty, scaled content abuse

### Phase 3: PSEO Page Template and Components
**Rationale:** With data and content ready, build the rendering layer. Architecture research provides detailed component boundaries and patterns.
**Delivers:** PseoPageLayout, LocalBusinessSchema (JSON-LD), PseoBreadcrumbs, RelatedCaseStudies, RelatedSpecialties, PseoCTA. The `[city]/[service]/page.tsx` route handler with generateStaticParams and generateMetadata.
**Addresses:** PSEO page template (P1), LocalBusiness + Service schema (P1), title tags/meta descriptions (P1), clear CTA (P1)
**Avoids:** Over-optimized schema markup, poor mobile UX

### Phase 4: Internal Linking and Sitemap
**Rationale:** Pages must be discoverable and connected before launch. Orphan PSEO pages will not rank. This phase modifies existing pages (specialty layouts, case study layouts) to create bidirectional links.
**Delivers:** Hub-spoke internal linking (PSEO -> specialty, PSEO -> case studies, specialty -> PSEO city list), sitemap extension with `generateSitemaps`, canonical URL setup.
**Addresses:** Internal linking (P1), sitemap inclusion (P1)
**Avoids:** PSEO pages as an island anti-pattern, keyword cannibalization

### Phase 5: Graduated Launch and Monitoring
**Rationale:** Crawl budget research shows deploying all pages at once is counterproductive. Graduated rollout with monitoring catches issues early before they affect the whole site.
**Delivers:** Batch deployment plan (20-30 pages per batch), Search Console monitoring setup, indexing verification, content quality spot-checks, cannibalization monitoring.
**Avoids:** Crawl budget exhaustion, undetected indexing failures

### Phase 6: Content Enrichment (Post-Validation)
**Rationale:** After initial pages are indexed and traffic data is available, deepen content quality based on real performance data.
**Delivers:** FAQ sections with FAQPage schema, review snippets, service-city relevance scoring, local regulation content for top-performing pages.
**Addresses:** P2 features (FAQ, reviews, relevance scoring, regulation content)

### Phase Ordering Rationale

- Phases 1-2 must be sequential: content generation depends on the data layer
- Phases 3-4 depend on content existing but can overlap slightly
- Phase 5 is a launch gate, not a build phase -- it dictates HOW pages go live
- Phase 6 is explicitly deferred until real indexing and traffic data validates the approach
- This ordering ensures the highest-risk items (content quality, Google penalties) are addressed earliest, with validation checkpoints before scaling

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Content Generation):** AI prompt engineering for local content quality is the highest-risk, least-documented area. Needs experimentation with prompt templates, local data structures, and uniqueness scoring thresholds. No standard pattern exists for this specific domain.
- **Phase 5 (Graduated Launch):** Batch rollout timing and Search Console monitoring cadence depend on the site's specific crawl budget, which is unknown until pages exist.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Data Foundation):** TypeScript data files following existing codebase patterns. Well-documented, trivial.
- **Phase 3 (Template and Components):** Next.js `generateStaticParams`, `generateMetadata`, JSON-LD -- all follow official Next.js 16 docs exactly.
- **Phase 4 (Internal Linking and Sitemap):** `generateSitemaps` API is well-documented. Internal linking is component modification, not novel architecture.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All additions are official Next.js patterns or Vercel-maintained libraries. Verified against Next.js 16 docs. |
| Features | MEDIUM-HIGH | Feature landscape well-sourced from SEO industry publications. Google's Dec 2025 update enforcement data comes from multiple independent sources. Specific content uniqueness thresholds (>40%) are industry heuristics, not Google-confirmed numbers. |
| Architecture | HIGH | Route structure, generateStaticParams, generateSitemaps, JSON-LD patterns all verified against official Next.js 16 documentation. File organization follows existing codebase conventions. |
| Pitfalls | HIGH | Pitfalls sourced from Google's official spam policies, Vercel's official plan docs, and multiple corroborating SEO industry case studies. Recovery costs validated against documented penalty recovery timelines. |

**Overall confidence:** HIGH

### Gaps to Address

- **City-specific local data:** Research identifies neighborhoods, landmarks, and housing stock as critical for content uniqueness, but the actual data for 15 Peninsula cities needs to be curated manually. No automated source for this exists.
- **Prompt engineering quality bar:** No validated prompt template exists for this domain. Phase 2 will need iterative experimentation. Plan for 3-5 prompt iterations before bulk generation.
- **Content uniqueness threshold validation:** The >40% uniqueness heuristic is industry consensus, not a Google-confirmed number. Monitor indexing rates after launch to validate.
- **Crawl budget for this specific domain:** Unknown until pages exist. The site is relatively new/small, so crawl allocation may be limited. Phase 5 batch sizes may need adjustment based on actual crawl stats.
- **Google Business Profile alignment:** PSEO service areas should match GBP service areas. Need to verify current GBP configuration before launch.
- **Vercel plan upgrade timing:** Must be confirmed before any PSEO deployment. Currently on Hobby plan (commercial use violation for a business site).

## Sources

### Primary (HIGH confidence)
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- schema-dts recommendation, script tag pattern
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- SSG routing
- [Next.js generateSitemaps](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- multi-sitemap support
- [Google Spam Policies](https://developers.google.com/search/docs/essentials/spam-policies) -- doorway pages, scaled content abuse definitions
- [Google Crawl Budget Management](https://developers.google.com/search/docs/crawling-indexing/large-site-managing-crawl-budget) -- crawl budget for large sites
- [Google LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business) -- schema requirements
- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction) -- generateText for batch processing
- [Vercel Hobby Plan Docs](https://vercel.com/docs/plans/hobby) -- commercial use restrictions
- [Vercel Limits](https://vercel.com/docs/limits) -- deployment and build limits

### Secondary (MEDIUM confidence)
- [Search Engine Land - Local SEO Sprints 2026](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059)
- [Sterling Sky - Service Area Pages](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/)
- [BrightLocal - Service Area Page SEO](https://www.brightlocal.com/learn/service-area-pages/)
- [Semrush - Keyword Cannibalization Guide](https://www.semrush.com/blog/keyword-cannibalization-guide/)
- [seomatic.ai - Programmatic SEO Mistakes](https://seomatic.ai/blog/programmatic-seo-mistakes)
- [Programmatic SEO Scale Without Penalties](https://guptadeepak.com/the-programmatic-seo-paradox-why-your-fear-of-creating-thousands-of-pages-is-both-valid-and-obsolete/)
- [ALM Corp - Google December 2025 Core Update](https://almcorp.com/blog/google-december-2025-core-update-complete-guide/)

### Tertiary (LOW confidence)
- [How I Built 500+ SEO-Optimized Pages with Next.js (dev.to)](https://dev.to/kaomojiya/how-i-built-500-seo-optimized-pages-with-nextjs-14-and-edge-runtime-2mpg) -- anecdotal, older Next.js version
- [Google August 2025 Spam Update (localdominator.co)](https://localdominator.co/google-august-2025-spam-update/) -- single source for enforcement details

---
*Research completed: 2026-03-10*
*Ready for roadmap: yes*
