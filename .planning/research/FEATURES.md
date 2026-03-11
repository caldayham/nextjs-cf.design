# Feature Research

**Domain:** Programmatic SEO for Local Home Improvement Service Pages
**Researched:** 2026-03-10
**Confidence:** MEDIUM-HIGH

## Feature Landscape

### Table Stakes (Google and Users Expect These)

Missing any of these means pages will either be penalized as thin/doorway content or fail to convert visitors.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Unique city-specific content per page | Google's Dec 2025 core update penalizes duplicate/swapped-city-name pages with 63% ranking losses. Each page needs genuinely distinct prose. | HIGH | This is the hardest part. AI generation with city-specific data injection (landmarks, neighborhoods, climate, housing stock) is the path. Minimum 300-500 words of unique content per page. |
| Service description tailored to city context | Users searching "[service] in [city]" expect to learn what that service looks like in their specific area (e.g., redwood fence regulations in Atherton vs. Palo Alto). | MEDIUM | Depends on: existing 11 specialty pages as source material. Each PSEO page adapts the service description to local context rather than duplicating the specialty page. |
| LocalBusiness + Service schema markup (JSON-LD) | Google requires structured data for local pack visibility. Schema.org LocalBusiness with Service type is the standard. AI search engines (Gemini, ChatGPT) also consume this data. | LOW | Templated -- same structure per page with city-specific values (areaServed, address proxy, geo coordinates). Use HomeAndConstructionBusiness subtype. |
| City-specific title tags and meta descriptions | "[Service] in [City], CA" pattern is fundamental local SEO. Without it, pages won't rank for geo-modified queries. | LOW | Template: "[Service Name] in [City] | cf.design" / Meta: unique 155-char description per page. |
| Internal linking to specialty pages and case studies | Hub-and-spoke model is critical for programmatic sites. PSEO pages (spokes) must link to specialty pages (hubs) and relevant case studies. Without this, pages are orphaned and won't accumulate authority. | MEDIUM | Depends on: existing 11 specialty pages + 5 case studies. Map each case study to relevant cities (by proximity) and services. |
| Mobile-responsive layout | 60%+ of local searches are mobile. Google uses mobile-first indexing. | LOW | Already solved -- existing Tailwind responsive design carries over to PSEO template. |
| Clear CTA with inquiry form link | Users landing on service area pages have high purchase intent. Every page needs a prominent path to the inquiry form. | LOW | Depends on: existing inquiry form. Simple link/button component. |
| Canonical URLs and proper sitemap inclusion | Programmatic pages must be in sitemap.xml and have self-referencing canonicals to avoid duplicate content signals. | LOW | Next.js generateStaticParams + sitemap generation. Straightforward with existing sitemap infrastructure. |
| Page load speed (Core Web Vitals) | Google uses CWV as ranking signal. Static generation (SSG) gives this for free. Programmatic pages that load slowly get deprioritized. | LOW | Already solved -- Next.js SSG + Vercel CDN handles this. Keep images optimized. |

### Differentiators (Competitive Advantage)

These separate a quality PSEO system from the typical "swap the city name" doorway page farms that Google now penalizes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Real project photos embedded per city | Most competitors use stock photos or no images. Embedding actual cf.design project photos from nearby cities (e.g., Palo Alto case study photos on Menlo Park page) builds trust and passes Google's "experience" signal from E-E-A-T. | LOW | Depends on: existing 5 case studies with photos. Map case study locations to nearby cities. A Palo Alto project photo is authentic on a Menlo Park or Los Altos page. |
| Local regulation and permit knowledge | Peninsula cities have wildly different regulations (Atherton has strict tree ordinances, Palo Alto has specific fence height rules, Woodside has rural lot requirements). Including this makes content genuinely useful and impossible to replicate with generic templates. | HIGH | Requires manual research per city. This is the content moat -- competitors won't invest this effort. Can start with 2-3 key regulations per city and expand. |
| Neighborhood-level housing stock references | Mentioning "Eichler homes in south Palo Alto" or "1950s ranch houses in San Carlos" demonstrates authentic local knowledge that AI-generated content from competitors cannot easily replicate. | MEDIUM | Requires curating housing stock data per city. Can be embedded in AI prompt context for content generation. |
| Case study cross-linking with proximity context | "See our redwood little library project, completed just 2 miles away in Palo Alto" -- contextual distance-based references to real projects. | LOW | Depends on: case study location data. Calculate or estimate distances. Adds authentic local proof. |
| FAQ section with city-specific questions | "Do I need a permit for a fence in [City]?" "What's the typical cost of deck building in [City]?" -- answers real questions with local specifics. Targets featured snippet and People Also Ask boxes. | MEDIUM | Can use FAQPage schema markup for rich results. Questions should vary by city based on local regulations and common project types. |
| Service-to-city relevance scoring | Not every service is equally relevant in every city. Squirrel/rat excluders are more relevant in Woodside (rural, wildlife) than downtown Redwood City. Highlighting the most relevant services per city feels curated, not automated. | MEDIUM | Requires a relevance matrix (city x service). Affects which services get featured prominently on each city page and which PSEO pages to generate at all. |
| Aggregate review snippets with Review schema | Displaying existing customer reviews (especially from nearby cities) with proper Review/AggregateRating schema markup enables star ratings in search results. | MEDIUM | Depends on: existing reviews data. Need to verify reviews are from real customers in verifiable locations. Google penalizes fake review markup. |
| Breadcrumb navigation with BreadcrumbList schema | Home > [Service] > [Service] in [City] -- shows site hierarchy to both users and Google. Enables breadcrumb rich results in SERPs. | LOW | Straightforward template component with schema markup. |

### Anti-Features (Commonly Requested, Often Problematic)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Hundreds of intent variation pages (e.g., "best fence contractor in Palo Alto" AND "fence installation cost Palo Alto" AND "fence builder near Palo Alto" as separate pages) | More pages = more keyword coverage, in theory. | Google treats these as doorway pages. Multiple thin pages targeting slight keyword variations cannibalize each other. The Dec 2025 update specifically targets this pattern. Vercel free tier has a 10K page limit anyway. | One comprehensive page per city+service combination that naturally includes cost info, "best" qualifiers, and "near me" signals in its content. Target intent variations through on-page sections, not separate pages. |
| Auto-generated city descriptions with no human review | Scales faster -- just let AI write everything. | Google's Dec 2025 update explicitly targets "AI content at scale without substantial human oversight." Generic AI city descriptions ("Palo Alto is a vibrant city in Silicon Valley...") add no value and are detectable. | AI-generated content with city-specific data injection (regulations, housing stock, landmarks) reviewed and edited per batch. Quality over quantity. |
| Duplicate content with city name swap | Fast to produce -- copy one page, find-and-replace city name. | This is the #1 pattern Google penalizes in local PSEO. Sites using this approach saw 71% traffic drops in 2025 updates. | Template structure that's consistent, but with genuinely unique content sections per city. |
| Fake or generic testimonials per city | "We loved the work done in [City]!" -- templated reviews. | Google penalizes fake review markup. Users recognize templated reviews. Damages trust. | Use real reviews from actual customers. If no review exists for a specific city, don't fabricate one -- show reviews from nearby cities with honest attribution ("From a customer in neighboring Menlo Park"). |
| Targeting cities outside actual service area | More cities = more traffic, right? | Google checks business legitimacy against service area claims. Ranking for cities you don't actually serve wastes crawl budget and leads to bad user experience. Also risks spam penalties. | Stick to the ~15 Peninsula cities where cf.design actually works. Authenticity is the moat. |
| Blog-style content pages per city | "Top 10 Home Improvement Ideas in Palo Alto" -- content marketing at scale. | Dilutes the site's focus, creates content that competes with the service pages for the same keywords, and requires ongoing maintenance. | Keep PSEO pages service-focused. If content marketing is added later, it should be a separate initiative with distinct keyword targets. |
| Separate "near me" optimized pages | "Fence builder near me in Palo Alto" as a distinct page. | "Near me" is handled by Google based on user location + your LocalBusiness schema, not by creating pages with "near me" in the URL. These pages look spammy. | Proper LocalBusiness schema with areaServed, plus natural "serving [City] and surrounding areas" language in content. |

## Feature Dependencies

```
[City/Service Data System]
    |
    |--requires--> [City Data: names, coordinates, landmarks, regulations, housing stock]
    |--requires--> [Service Data: descriptions, relevance per city, related case studies]
    |
    v
[PSEO Page Template]
    |
    |--requires--> [City/Service Data System]
    |--requires--> [Existing Specialty Pages] (for hub-spoke linking)
    |--requires--> [Existing Case Studies] (for cross-linking with proximity)
    |--requires--> [Existing Inquiry Form] (for CTA)
    |
    v
[Content Generation]
    |
    |--requires--> [PSEO Page Template]
    |--requires--> [City/Service Data System]
    |--requires--> [AI Content Pipeline] (for unique per-page content)
    |
    v
[Schema Markup]
    |
    |--requires--> [City/Service Data System] (for structured data values)
    |--enhances--> [PSEO Page Template]
    |
    v
[Sitemap + Internal Linking]
    |
    |--requires--> [All PSEO pages generated]
    |--enhances--> [Existing Specialty Pages] (adds spoke links)
    |--enhances--> [Existing Case Studies] (adds contextual backlinks)

[Local Regulation Data] --enhances--> [Content Generation] (makes content unique and useful)

[FAQ Sections] --enhances--> [PSEO Page Template] (adds featured snippet targeting)
    |--requires--> [City/Service Data System]
```

### Dependency Notes

- **PSEO Page Template requires City/Service Data System:** The template cannot render without structured data about each city and service. This data system is the foundation everything else builds on.
- **Content Generation requires AI Content Pipeline:** Unique content per ~165 pages (15 cities x 11 services) is not feasible by hand. AI generation with structured city data injection is necessary.
- **Local Regulation Data enhances Content Generation:** This is the quality differentiator. Without it, content is generic. With it, content is genuinely useful. But it requires manual research, so it can be added incrementally.
- **Sitemap + Internal Linking requires all PSEO pages:** The linking strategy and sitemap can only be finalized once the page set is defined. However, the template can include dynamic link generation.
- **Existing site content (specialty pages, case studies, inquiry form) is a hard dependency:** The PSEO system's value comes from linking to real, existing content. No new standalone pages should exist without connections to the existing site.

## MVP Definition

### Launch With (v1)

Minimum viable PSEO system -- enough to start indexing and building authority.

- [ ] City/service data system -- JSON/TypeScript data files with 15 cities (name, slug, coordinates, 3-5 key landmarks/neighborhoods, 1-2 housing stock notes) and 11 services (name, slug, description, related case studies)
- [ ] PSEO page template -- single responsive template with dynamic content slots for city name, service description, local context, CTA, schema markup
- [ ] generateStaticParams for /[city]/[service] routes -- generates all valid city+service combinations at build time
- [ ] AI-generated unique intro paragraph per page -- minimum 200-300 words of genuinely unique content incorporating city landmarks, housing stock, and service relevance
- [ ] LocalBusiness + Service JSON-LD schema on every page -- with areaServed, geo coordinates, service type
- [ ] Internal linking to parent specialty page and 1-2 relevant case studies per page
- [ ] Sitemap.xml inclusion of all PSEO pages
- [ ] City-specific title tags and meta descriptions

### Add After Validation (v1.x)

Features to add once pages are indexed and initial traffic data is available.

- [ ] Local regulation content per city -- add permit requirements, fence height rules, tree ordinances. Trigger: manual research completed for each city
- [ ] FAQ sections with FAQPage schema -- add city-specific questions. Trigger: Search Console data shows People Also Ask opportunities
- [ ] Aggregate review snippets -- display real reviews with proper schema. Trigger: sufficient reviews collected with city attribution
- [ ] Service-to-city relevance scoring -- deprioritize or remove low-relevance combinations. Trigger: traffic data shows which combinations actually get searched
- [ ] Neighborhood-level content -- deeper housing stock and neighborhood references. Trigger: first batch of pages ranking, need to deepen content

### Future Consideration (v2+)

Features to defer until PSEO proves ROI.

- [ ] Before/after photo galleries per city -- requires more completed projects with location tagging. Defer: need more project photos in more cities.
- [ ] Customer video testimonials per city -- high production cost. Defer: until organic traffic justifies investment.
- [ ] Seasonal content updates -- "Best time to build a fence in [City]" variations. Defer: requires ongoing content maintenance.
- [ ] Expanded service area beyond Peninsula -- only if Peninsula pages prove ROI and business can actually serve those areas.
- [ ] Multi-language pages (Spanish) -- meaningful Peninsula demographic, but doubles content generation scope. Defer: until English PSEO is validated.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| City/service data system | HIGH | MEDIUM | P1 |
| PSEO page template | HIGH | MEDIUM | P1 |
| generateStaticParams routing | HIGH | LOW | P1 |
| AI-generated unique content | HIGH | HIGH | P1 |
| LocalBusiness + Service schema | HIGH | LOW | P1 |
| Internal linking (hub-spoke) | HIGH | MEDIUM | P1 |
| Sitemap inclusion | HIGH | LOW | P1 |
| Title tags / meta descriptions | HIGH | LOW | P1 |
| Local regulation content | HIGH | HIGH (manual research) | P2 |
| FAQ sections with schema | MEDIUM | MEDIUM | P2 |
| Review snippets with schema | MEDIUM | MEDIUM | P2 |
| Service-city relevance scoring | MEDIUM | LOW | P2 |
| Breadcrumb navigation + schema | LOW | LOW | P2 |
| Neighborhood housing stock content | MEDIUM | HIGH (manual research) | P2 |
| Before/after galleries | MEDIUM | HIGH (photo collection) | P3 |
| Seasonal content | LOW | MEDIUM (ongoing) | P3 |
| Multi-language support | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch -- without these, pages won't rank or will be penalized
- P2: Should have, add when data supports it -- these deepen content quality
- P3: Nice to have, defer until PSEO proves ROI

## Search Intent Strategy

Rather than creating separate pages per intent variation, handle intent variations within each city+service page through content sections.

### Intent Patterns to Address Per Page

| Intent Pattern | Example Query | How to Address on Page |
|----------------|---------------|----------------------|
| Service + City | "fence installation Palo Alto" | Primary H1 and intro paragraph |
| Best + Service + City | "best fence contractor in Palo Alto" | Quality signals: case study links, reviews, years of experience |
| Cost + Service + City | "fence cost Palo Alto" | Pricing context section: "Typical fence projects in Palo Alto range from..." |
| Near Me | "fence builder near me" (user in Palo Alto) | LocalBusiness schema with geo coordinates; "serving Palo Alto and surrounding areas" |
| How To / DIY | "how to build a fence in Palo Alto" | Brief guidance section that pivots to "or let a professional handle it" |
| Permit / Regulation | "do I need a permit for a fence in Palo Alto" | Local regulation section (P2 feature, but placeholder in v1) |
| Comparison | "wood vs vinyl fence Palo Alto" | Material options section tailored to local climate/aesthetics |

### URL Structure

Use: `/[city]/[service]` (e.g., `/palo-alto/fences-gates-decks`)

Do NOT create:
- `/palo-alto/best-fence-contractor` (doorway page)
- `/palo-alto/fence-cost` (cannibalization)
- `/palo-alto/fence-near-me` (spam signal)

## Competitor Feature Analysis

| Feature | Typical Low-Quality PSEO | Quality Local Service Sites | cf.design Approach |
|---------|--------------------------|---------------------------|-------------------|
| Content uniqueness | City-name swap only | Hand-written per page (doesn't scale) | AI-generated with structured city data injection -- scales while maintaining uniqueness |
| Local proof | Stock photos or none | Real project photos, reviews | Real case study photos mapped to nearby cities by proximity |
| Schema markup | Missing or generic | LocalBusiness basics | Full LocalBusiness + Service + FAQPage + BreadcrumbList + Review |
| Internal linking | Flat or none | Manual, inconsistent | Systematic hub-spoke: PSEO -> specialty page -> case studies |
| Regulation content | None | Sometimes, often outdated | Per-city permit/regulation data (P2, incremental) |
| CTA | Generic contact form | City-specific phone/form | Link to existing inquiry form with city/service pre-populated |

## Content Uniqueness Requirements (Google Quality Bar)

Based on Google's Dec 2025 core update enforcement, each PSEO page needs:

1. **Unique introductory paragraph** (200-300 words) -- AI-generated, incorporating city-specific details (landmarks, neighborhoods, housing characteristics)
2. **Service description contextualized to city** -- not copied from specialty page, but adapted (e.g., "In Woodside, deck projects often work with the natural hillside terrain and oak tree canopy")
3. **At least one real photo** from a nearby project (case study)
4. **City-specific CTA** -- "Schedule a consultation for your [City] project"
5. **Structured data** -- complete LocalBusiness + Service schema
6. **Internal links** -- minimum 3 (specialty page, case study, inquiry form)

Pages that cannot meet these minimum bars should not be generated. It is better to have 100 quality pages than 165 thin ones.

## Sources

- [Search Engine Land - Local SEO Sprints 2026](https://searchengineland.com/local-seo-sprints-a-90-day-plan-for-service-businesses-in-2026-469059)
- [Programmatic SEO Scale Without Penalties](https://guptadeepak.com/the-programmatic-seo-paradox-why-your-fear-of-creating-thousands-of-pages-is-both-valid-and-obsolete/)
- [Sterling Sky - Service Area Pages](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/)
- [Search Engine Land - Service Area Pages Guide](https://searchengineland.com/guide/service-area-pages)
- [BrightLocal - Service Area Page SEO](https://www.brightlocal.com/learn/service-area-pages/)
- [Content Amigo - Service Area Page Best Practices](https://contentamigo.com/articles/service-area-page-examples-best-practices-must-have-elements/)
- [Outpace SEO - Location Pages for Home Services](https://outpaceseo.com/article/location-pages-seo-strategy-for-home-services/)
- [Fat Cat Strategies - Area Pages for Home Improvement](https://fatcatstrategies.com/marketing/area-pages-for-home-improvement-contractors/)
- [BrightLocal - Local SEO Schema Templates](https://www.brightlocal.com/learn/local-seo-schema-templates/)
- [Google - LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Hashmeta - Internal Linking for Programmatic Websites](https://hashmeta.com/blog/why-internal-linking-is-critical-for-programmatic-websites-a-strategic-guide/)
- [ALM Corp - Google December 2025 Core Update](https://almcorp.com/blog/google-december-2025-core-update-complete-guide/)
- [Semrush - Local Keyword Research](https://www.semrush.com/blog/local-keyword-research/)

---
*Feature research for: Programmatic SEO for Local Home Improvement Service Pages*
*Researched: 2026-03-10*
