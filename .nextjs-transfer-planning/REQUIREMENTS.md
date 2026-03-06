# Requirements: CF Design — Next.js Migration

**Defined:** 2026-03-01
**Core Value:** The site must look and function identically to the current version while being server-rendered for SEO and maintainable for growing content.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Project Setup

- [x] **SETUP-01**: Next.js 16 App Router project initialized with TypeScript and Tailwind CSS v4
- [x] **SETUP-02**: Tailwind config includes all arch-* colors, custom animations, and font families matching current site
- [x] **SETUP-03**: next/font self-hosts Inter (300-600) and Playfair Display (400-700 + italic) with zero layout shift
- [x] **SETUP-04**: All existing image assets migrated to public/ directory with correct paths
- [x] **SETUP-05**: Branded 404 page exists at app/not-found.tsx

### Shared Components

- [x] **COMP-01**: Nav component renders identically — logo, menu items, case study dropdown, "Start Project" CTA
- [x] **COMP-02**: Nav transitions from transparent to frosted background after 50px scroll
- [x] **COMP-03**: Footer component renders identically — contact info, social links, copyright
- [x] **COMP-04**: Reveal component triggers fade-in animation on scroll via IntersectionObserver with configurable delay
- [x] **COMP-05**: All SVG icons ported as React components (Menu, X, ArrowRight, ArrowDown, ArrowLeft, Check, MapPin, Mail, ChevronDown, Layout, PenTool, FileText, Hammer, Smile, Instagram, Home)
- [x] **COMP-06**: SiteShell client wrapper manages inquiry modal state accessible from Nav, Hero, and sticky CTA

### Homepage

- [x] **HOME-01**: Hero section renders with animated masonry columns (scroll-up/scroll-down) on desktop
- [x] **HOME-02**: Hero section renders horizontal image marquee on mobile
- [x] **HOME-03**: Sticky mobile CTA appears after scrolling past Hero "Book Consultation" button
- [x] **HOME-04**: Purpose section renders "Quality through clarity" content with image and three value propositions
- [x] **HOME-05**: Process section renders three-step timeline (Consultation → Design → Build) with alternating layout
- [x] **HOME-06**: Portfolio section renders project cards grid with image carousel and navigation buttons
- [x] **HOME-07**: Portfolio cards link to case studies where applicable
- [x] **HOME-08**: Reviews section renders three-column masonry with scroll animations and hover-pause
- [x] **HOME-09**: FAQ section renders expandable accordion with all current questions/answers
- [x] **HOME-10**: All homepage sections use Reveal animations matching current fade-in behavior

### Contact & Conversion

- [x] **CONV-01**: Inquiry modal opens as full-screen overlay with fields: name, location checkbox, phone, referral source, project notes
- [x] **CONV-02**: Inquiry modal opens via ?inquire URL parameter
- [x] **CONV-03**: Phone number input auto-formats as user types
- [x] **CONV-04**: Form submits to Formspree and redirects to thank-you page
- [x] **CONV-05**: Thank-you page renders with confirmation image and text, link back to homepage
- [x] **CONV-06**: Google Analytics (GA4) integrated via @next/third-parties

### Case Studies

- [x] **CASE-01**: MDX-based case study system using @next/mdx with shared layout component
- [x] **CASE-02**: Case study: "Palo Alto Redwood Little Library" renders at /case-studies/palo-alto-redwood-little-library/
- [x] **CASE-03**: Case study: "Palo Alto Walnut Marble Tables" renders at /case-studies/palo-alto-walnut-marble-tables/
- [x] **CASE-04**: Case study pages include: hero, overview, challenge, solution, gallery, client quote, project details, CTA
- [x] **CASE-05**: Each case study has unique page title and meta description
- [x] **CASE-06**: Adding a new case study requires only creating an MDX file and adding images

### SEO & Performance

- [x] **SEO-01**: All page content visible in HTML source (server-rendered, not client-only)
- [x] **SEO-02**: Open Graph tags on all pages with correct titles, descriptions, and preview images
- [x] **SEO-03**: sitemap.xml auto-generated from all routes
- [x] **SEO-04**: robots.txt allows crawling of all public pages
- [x] **SEO-05**: JSON-LD LocalBusiness structured data on homepage
- [x] **SEO-06**: All images use next/image with automatic WebP/AVIF optimization
- [x] **SEO-07**: Hero images use priority/preload loading for fast LCP
- [x] **SEO-08**: Portfolio and gallery images use responsive sizes prop
- [x] **SEO-09**: Images use blur placeholders for progressive loading

### Deployment

- [x] **DEPL-01**: Site deploys to Vercel with zero-config Next.js support
- [x] **DEPL-02**: All routes match current URL structure (no broken links)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Expansion

- **V2-01**: Case study index page listing all case studies
- **V2-02**: Per-case-study Open Graph images (project hero photo)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| CMS or admin dashboard | Content managed via code/MDX files by 2-person team |
| Authentication / user accounts | No logged-in user state needed |
| Backend API routes | Form handling stays with Formspree |
| Dark mode / theme toggle | Single fixed theme, no business value |
| Search functionality | 4 pages, ~15 portfolio items — users scroll |
| Internationalization (i18n) | SF Bay Area local business, English-only |
| PWA / Service Worker | No offline use case for portfolio site |
| Blog / content feed | Case studies serve content marketing purpose |
| Animation library (Framer Motion) | All animations are CSS keyframes + IntersectionObserver |
| Component library (shadcn, Radix) | Fully custom design system |
| Image hosting migration (Cloudinary, S3) | Images stay local, Next.js Image handles optimization |
| Real-time features | Static site, nothing changes in real time |
| Redesign or visual changes | This is a 1:1 recreation |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Pending |
| SETUP-02 | Phase 1 | Pending |
| SETUP-03 | Phase 1 | Pending |
| SETUP-04 | Phase 1 | Pending |
| SETUP-05 | Phase 1 | Pending |
| COMP-01 | Phase 1 | Complete |
| COMP-02 | Phase 1 | Complete |
| COMP-03 | Phase 1 | Complete |
| COMP-04 | Phase 1 | Complete |
| COMP-05 | Phase 1 | Complete |
| COMP-06 | Phase 1 | Complete |
| HOME-01 | Phase 2 | Complete |
| HOME-02 | Phase 2 | Complete |
| HOME-03 | Phase 2 | Complete |
| HOME-04 | Phase 2 | Complete |
| HOME-05 | Phase 2 | Complete |
| HOME-06 | Phase 2 | Complete |
| HOME-07 | Phase 2 | Complete |
| HOME-08 | Phase 2 | Complete |
| HOME-09 | Phase 2 | Complete |
| HOME-10 | Phase 2 | Complete |
| CONV-01 | Phase 3 | Complete |
| CONV-02 | Phase 3 | Complete |
| CONV-03 | Phase 3 | Complete |
| CONV-04 | Phase 3 | Complete |
| CONV-05 | Phase 3 | Complete |
| CONV-06 | Phase 3 | Complete |
| CASE-01 | Phase 4 | Complete |
| CASE-02 | Phase 4 | Complete |
| CASE-03 | Phase 4 | Complete |
| CASE-04 | Phase 4 | Complete |
| CASE-05 | Phase 4 | Complete |
| CASE-06 | Phase 4 | Complete |
| SEO-01 | Phase 5 | Complete |
| SEO-02 | Phase 5 | Complete |
| SEO-03 | Phase 5 | Complete |
| SEO-04 | Phase 5 | Complete |
| SEO-05 | Phase 5 | Complete |
| SEO-06 | Phase 5 | Pending |
| SEO-07 | Phase 5 | Pending |
| SEO-08 | Phase 5 | Pending |
| SEO-09 | Phase 5 | Pending |
| DEPL-01 | Phase 5 | Pending |
| DEPL-02 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 after roadmap creation — all 44 requirements mapped*
