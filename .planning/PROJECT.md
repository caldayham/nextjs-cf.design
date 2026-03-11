# cf.design — Next.js Website

## What This Is

A portfolio and business website for cf.design, a custom carpentry and home improvement service business operating in the San Francisco Peninsula. Built with Next.js 16, React 19, and Tailwind CSS. Migrated from a static HTML site to Next.js with case studies, specialty pages, inquiry form, and a homepage with portfolio gallery.

## Core Value

Generate qualified customer inquiries by showcasing craftsmanship and building trust through real project case studies and service expertise.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Homepage with hero, portfolio gallery, reviews, FAQ, process sections — v0.1
- ✓ 5 case studies with MDX-driven content and image galleries — v0.1
- ✓ 11 specialty/service pages — v0.1
- ✓ Inquiry form with consultation booking — v0.1
- ✓ Responsive design with Tailwind CSS — v0.1
- ✓ SEO basics: sitemap.xml, robots.txt, meta tags — v0.1

### Active

<!-- Current scope. Building toward these. -->

- [ ] Programmatic SEO (PSEO) system for local service pages
- [ ] AI-generated unique content per city/service combination
- [ ] Internal linking between PSEO pages, case studies, and specialty pages
- [ ] Schema markup (LocalBusiness, Service) on PSEO pages
- [ ] Sitemap integration for PSEO pages

### Out of Scope

- Hero banner flickering fix — separate effort, not part of PSEO milestone
- Blog/content marketing — may revisit after PSEO proves ROI
- Paid advertising — organic-first approach
- Mobile app — web only

## Context

- Service area: San Francisco Peninsula (Palo Alto, Menlo Park, Atherton, Woodside, Portola Valley, Los Altos, Los Altos Hills, Mountain View, Redwood City, San Carlos, etc.)
- 11 specialties: custom carpentry, demolition & hauling, fences/gates/decks, garden boxes, hardscape, landscape design, painting, refinishing, shed renovation, squirrel/rat excluders, tree/shrub removal
- Estimated page count: 150-500 depending on intent variations
- Content strategy: AI-generated unique content with real photos/case studies woven in
- Goal: early SEO investment to build domain authority over time (SEO takes 2-6 months)
- Currently hosted on Vercel free tier (10,000 page limit per deploy)

## Constraints

- **Hosting**: Vercel free tier — must stay under 10,000 static pages per deployment
- **Content quality**: Each PSEO page must be genuinely useful, not thin/duplicate — Google penalizes low-quality programmatic content
- **Tech stack**: Next.js 16 with SSG (generateStaticParams) — no server-side rendering needed
- **Budget**: Minimal — prefer free/low-cost tools for content generation
- **Migration rule**: Existing components extracted verbatim from HTML source — do not rewrite

## Current Milestone: v1.0 Programmatic SEO

**Goal:** Build a PSEO system that generates high-quality, unique local service pages for Peninsula cities to drive organic search traffic.

**Target features:**
- PSEO page generation system with city × service combinations
- AI-generated unique content per page with local knowledge
- SEO optimization (schema markup, internal linking, sitemap)
- Content management system for city/service data

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| PSEO only milestone | Focus enables deeper quality vs spreading thin | — Pending |
| Peninsula cities only | Authentic service area, manageable scope | — Pending |
| Template + AI content | Balances uniqueness (SEO) with scalability | — Pending |
| Next.js SSG approach | Static pages = free hosting, fast load, good SEO | — Pending |

---
*Last updated: 2026-03-10 after milestone v1.0 initialization*
