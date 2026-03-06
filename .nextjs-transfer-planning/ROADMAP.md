# Roadmap: CF Design — Next.js Migration

## Overview

Five phases transform the existing 4-file CDN React site into a server-rendered Next.js app. The foundation phase resolves all scaffold dependencies (design tokens, asset paths, layout shell) before any page section is built. The homepage, conversion flow, and case study system each ship as complete, independently verifiable capabilities. The final phase adds SEO metadata and deploys to Vercel. Every phase produces something observable and testable — no phase is purely internal.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Next.js scaffold with design tokens, fonts, asset paths, shared nav/footer/shell (completed 2026-03-02)
- [x] **Phase 2: Homepage** - All homepage sections with animations matching the current site (completed 2026-03-02)
- [x] **Phase 3: Contact & Conversion** - Inquiry modal, thank-you page, Google Analytics (completed 2026-03-02)
- [x] **Phase 4: Case Studies** - MDX-based case study system with both existing case studies (completed 2026-03-02)
- [x] **Phase 5: SEO & Launch** - Metadata, Open Graph, sitemap, image optimization, Vercel deploy (completed 2026-03-02)

## Phase Details

### Phase 1: Foundation
**Goal**: A working Next.js app skeleton with correct design tokens, self-hosted fonts, all image assets accessible, and shared Nav/Footer/SiteShell components that render identically to the current site
**Depends on**: Nothing (first phase)
**Requirements**: SETUP-01, SETUP-02, SETUP-03, SETUP-04, SETUP-05, COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06
**Success Criteria** (what must be TRUE):
  1. Visiting `/` in a browser shows a page with the correct nav and footer — logo, menu items, contact info — styled with arch-* colors and Inter/Playfair Display fonts
  2. `view-source` on any page shows real HTML content (not a blank div or loading state)
  3. All images in `/public/assets/` load without 404 errors when referenced via `next/image`
  4. Scrolling past 50px on any page transitions the nav from transparent to frosted background
  5. A branded 404 page appears when navigating to a non-existent route
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Scaffold Next.js 16 project, Tailwind v4 design tokens, self-hosted fonts, asset migration, 404 page
- [ ] 01-02-PLAN.md — Port shared components: Icons, Reveal, Nav, Footer, SiteShell, wire layout shell

### Phase 2: Homepage
**Goal**: The homepage renders completely and identically to the current site, with all sections, animations, and interactive elements working
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07, HOME-08, HOME-09, HOME-10
**Success Criteria** (what must be TRUE):
  1. Desktop hero shows animated masonry columns scrolling up/down; mobile hero shows horizontal image marquee
  2. Scrolling down on mobile reveals a sticky "Start Project" CTA after passing the hero button
  3. Portfolio section shows project cards with working image carousels (prev/next navigation) and links to case study pages
  4. Reviews section renders a three-column masonry layout with scroll animations that pause on hover
  5. FAQ section expands and collapses individual questions via accordion click
**Plans**: 2 plans

Plans:
- [x] 02-01-PLAN.md — ShellContext, data files (VIBE_IMAGES, PROCESS_STEPS), Hero, Purpose, Process components, initial page.tsx wiring
- [ ] 02-02-PLAN.md — Data files (PORTFOLIO_ITEMS, REVIEWS, FAQS), Portfolio, PortfolioCard, Reviews, FAQ components, complete page.tsx, visual verification

### Phase 3: Contact & Conversion
**Goal**: Visitors can submit an inquiry through the modal form, receive a confirmation, and site activity is tracked in Google Analytics
**Depends on**: Phase 2
**Requirements**: CONV-01, CONV-02, CONV-03, CONV-04, CONV-05, CONV-06
**Success Criteria** (what must be TRUE):
  1. Clicking "Start Project" from the nav, hero, or sticky CTA opens a full-screen inquiry modal with all fields (name, location, phone, referral, project notes)
  2. Navigating to `/?inquire` opens the inquiry modal directly without any other interaction
  3. Submitting the form redirects to `/thank-you` which shows a confirmation message and a link back to the homepage
  4. Google Analytics pageview events fire on every page navigation (verifiable in GA4 real-time view)
**Plans**: 2 plans

Plans:
- [x] 03-01-PLAN.md — InquiryModal component, InquiryUrlWatcher, SiteShell wiring (body-scroll-lock, Suspense, modal mount)
- [x] 03-02-PLAN.md — Thank-you page, Google Analytics via @next/third-parties, visual verification checkpoint

### Phase 4: Case Studies
**Goal**: Both case studies are accessible at their correct URLs, rendered from MDX files, and the system supports adding new case studies by creating a single MDX file
**Depends on**: Phase 1
**Requirements**: CASE-01, CASE-02, CASE-03, CASE-04, CASE-05, CASE-06
**Success Criteria** (what must be TRUE):
  1. Visiting `/case-studies/palo-alto-redwood-little-library/` renders the full case study with hero, overview, challenge, solution, gallery, client quote, project details, and CTA
  2. Visiting `/case-studies/palo-alto-walnut-marble-tables/` renders the full case study with the same section structure
  3. Each case study page has a unique `<title>` and `<meta description>` visible in the HTML source
  4. Creating a new MDX file in the case studies directory and adding images is sufficient to publish a new case study
**Plans**: 1 plan

Plans:
- [ ] 04-01-PLAN.md — MDX infrastructure (@next/mdx config, mdx-components.tsx), CaseStudyLayout component (verbatim extraction), both MDX content files, dynamic route page

### Phase 5: SEO & Launch
**Goal**: All pages are fully indexed by search engines, image performance is optimized, and the site is live on Vercel at the correct URLs
**Depends on**: Phase 4
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08, SEO-09, DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. `view-source` on every page shows all text content in the HTML (not empty divs populated by JS)
  2. All pages have Open Graph tags with correct title, description, and preview image visible in the HTML source
  3. `https://cf.design/sitemap.xml` exists and lists all public routes
  4. Hero images on the homepage and case studies load without layout shift (LCP is fast)
  5. The live Vercel URL returns working pages for `/`, `/case-studies/palo-alto-redwood-little-library/`, `/case-studies/palo-alto-walnut-marble-tables/`, and `/thank-you/`
**Plans**: 2 plans

Plans:
- [x] 05-01-PLAN.md — Root metadata (metadataBase, title template, OG), sitemap.ts, robots.ts, page-level OG tags, JSON-LD LocalBusiness
- [x] 05-02-PLAN.md — Image optimization (preload, sizes, blur placeholders), visual/functional verification checkpoint

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

Note: Phase 4 depends only on Phase 1 (not Phase 3), so it can begin after Phase 1 completes if needed.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/2 | Complete    | 2026-03-02 |
| 2. Homepage | 2/2 | Complete    | 2026-03-02 |
| 3. Contact & Conversion | 2/2 | Complete   | 2026-03-02 |
| 4. Case Studies | 1/1 | Complete   | 2026-03-02 |
| 5. SEO & Launch | 2/2 | Complete    | 2026-03-02 |
