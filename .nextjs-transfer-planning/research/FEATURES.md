# Feature Landscape

**Domain:** Carpentry/contractor business portfolio website — Next.js migration
**Project:** CF Design (cf.design) v3
**Researched:** 2026-03-01
**Research mode:** Ecosystem — what features does this type of site need?

---

## Context: What This Migration Is

This is not a greenfield build. The existing site is a working, content-rich carpentry business portfolio with real customers and real traffic. The migration is a 1:1 recreation in Next.js (App Router) to fix:

1. **Zero SEO** — Babel in-browser compilation renders blank HTML to crawlers. Every page is invisible to Google.
2. **Copy-paste maintenance** — 4 HTML files with duplicated nav/footer/components. Adding a case study means copying an entire 800-line HTML file.
3. **No image optimization** — Plain `<img>` tags serve full-resolution JPEGs to every device.

All design decisions, content, and animations are locked. The feature landscape is about what makes the migration correct and complete — not what to redesign.

---

## Table Stakes

Features where absence means the migration failed or users will notice breakage. Every item must ship before the site goes live.

### Core Infrastructure

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Server-side rendering (SSR/SSG) | The entire reason for the migration. Without this, SEO is still zero | Low | Next.js default behavior for Server Components — no extra work needed for static pages |
| Shared component architecture | Nav and footer duplicated across 4 HTML files today. Any edit requires 4 changes | Low | Next.js layouts solve this: `app/layout.tsx` wraps all pages |
| Next.js Image component (`<Image>`) | 79 images across jobs/reviews/mobile dirs. Plain `<img>` tags currently serve unoptimized JPEGs. Core Web Vitals, LCP, bandwidth | Medium | Replace every `<img>` with `next/image`. Requires `width`/`height` or `fill` prop. Prevents CLS automatically |
| next/font for Google Fonts | Current site fetches Inter + Playfair Display from Google CDN on every page load. Adds ~300ms latency, external dependency | Low | `next/font/google` self-hosts fonts at build time. No Google request from user browser. Zero layout shift |
| Page-level metadata (`<title>`, `<meta description>`) | Current site has generic title on every page: "Custom local quality construction!" — not per-page | Low | Next.js `metadata` export in each `page.tsx`. Static for most pages, dynamic for case studies |
| Favicon | Already exists (`assets/cf-icon.png`). Must survive migration | Low | Place as `app/icon.png` per Next.js file convention, or in `public/` |
| Mobile-responsive layout | Existing site is mobile-responsive. Must be preserved exactly | Medium | Tailwind breakpoints already defined. Direct port of existing classes |
| Sticky mobile CTA | Hero "Book Consultation" button becomes sticky after scrolling past it on mobile. Exists today | Medium | Requires IntersectionObserver in a Client Component. Already coded — just port it |
| Contact/inquiry form (Formspree) | Primary conversion point for the business. Full-screen modal with name, location, phone, referral source, project notes | Medium | Form stays Formspree. Port as Client Component — form state requires `'use client'` |
| Google Analytics (gtag.js) | Already installed. Must survive migration | Low | Add via `instrumentation-client.js` or Script component in root layout with `afterInteractive` strategy |
| 404 page | Next.js default 404 is generic. Branded 404 needed for user experience | Low | `app/not-found.tsx` file — simple branded page |

### Existing Animations (Must Preserve)

All animations are currently CSS keyframe-based. They survive migration intact as Tailwind config extensions plus CSS classes. The IntersectionObserver `Reveal` component needs porting to a proper Client Component.

| Animation | Where Used | Complexity | Notes |
|-----------|------------|------------|-------|
| Scroll-up / scroll-down columns | Hero vibe cards (desktop), Reviews wall (3 columns) | Low | Pure CSS animation, already in Tailwind keyframes config. Port as-is |
| Horizontal scroll marquee | Hero image strip (mobile only) | Low | Pure CSS animation. Port as-is |
| Slow-zoom | Not in current index.html but referenced in config | Low | CSS-only. Port as-is |
| Fade-in / reveal on scroll | Section headings, cards, process steps, purpose section | Medium | Requires IntersectionObserver. Port `Reveal` component as Client Component using `useEffect` + `useRef` |
| Hover pause on review columns | Review wall hover pauses the scrolling animation | Low | CSS `animation-play-state: paused` on hover. Port as-is |
| Portfolio carousel prev/next | Each portfolio card has image carousel navigation | Medium | Client Component with `useState` for index tracking. Port PortfolioCard as-is |
| FAQ accordion | Open/close individual FAQ items | Low | Client Component with `useState`. Port as-is |
| Nav scroll behavior (transparent → frosted) | Nav background changes from transparent to dark/blurred after 50px scroll | Low | Client Component with scroll listener. Port Nav as-is |

### Pages (Must Exist at Equivalent URLs)

| Page | Current URL | Required Next.js Route | Notes |
|------|------------|----------------------|-------|
| Homepage | `/` or `index.html` | `app/page.tsx` | All sections: Hero, Purpose, Process, Portfolio, Reviews, FAQ, Footer. Contact modal lives here |
| Case study: Little Library | `case-studies/palo-alto-redwood-little-library/` | `app/case-studies/palo-alto-redwood-little-library/page.tsx` | Or use MDX at `content/case-studies/palo-alto-redwood-little-library.mdx` |
| Case study: Walnut Tables | `case-studies/palo-alto-walnut-marble-tables/` | `app/case-studies/palo-alto-walnut-marble-tables/page.tsx` | Or MDX |
| Thank you page | `thank-you/` | `app/thank-you/page.tsx` | Post-form-submission redirect destination |

---

## Differentiators

Features that are not present in the current site but unlock meaningful value for the Next.js migration specifically. These are optional-but-high-value for the business.

### SEO Enhancements Unlocked by SSR

The current site has zero SEO because nothing is visible to crawlers. Once SSR is working, several SEO enhancements become trivially cheap to add.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Per-page Open Graph tags | Social media shares show correct preview images and titles instead of blank cards. Instagram and Nextdoor referrals are common for this business | Low | `metadata.openGraph` in each page.tsx. Add an `opengraph-image.jpg` to app root |
| `sitemap.xml` | Helps Google index all pages. Especially useful as case studies grow | Low | Next.js file-based: create `app/sitemap.ts` returning all routes. Generates at build time |
| `robots.txt` | Tells crawlers which pages to index. Currently missing entirely | Low | Create `app/robots.ts` — two-line file |
| Local business JSON-LD structured data | Google can show "rich results" for local businesses: service area, hours, ratings snippet, contact. Directly serves customers searching "carpentry San Mateo County" | Medium | Add `<script type="application/ld+json">` to homepage layout with `LocalBusiness` schema. Not complex, just requires knowing the schema fields |
| Case study page-specific metadata | Each case study gets a unique `<title>` and `<meta description>` tailored to the project, material, and location — capturing long-tail search intent ("redwood library Palo Alto") | Low | MDX frontmatter exports or `generateMetadata` in the dynamic route |
| Per-case-study OG images | Case study social shares show the project photo instead of a generic image | Low | Add `opengraph-image.jpg` inside each case study directory |

### MDX Case Study System

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| MDX-based case study authoring | Currently adding a case study requires copying an 800-line HTML file and manually editing. MDX makes it a markdown file with frontmatter | Medium | `@next/mdx` + `@mdx-js/loader` + `mdx-components.tsx`. Requires shared case study layout component. Adds `remark-gfm` for tables/lists |
| Shared case study layout | All case studies share nav, footer, hero image format, back-link. Define once in `app/case-studies/layout.tsx` | Low | Next.js nested layouts. Eliminates duplication |
| Case study index page (optional) | List of all case studies. Useful as portfolio grows. Currently not a standalone page — case studies are accessed from portfolio cards | Low | `app/case-studies/page.tsx` listing all MDX files. Can add later |
| `generateStaticParams` for case study routes | Pre-renders all case study pages at build time. Zero runtime latency for a static site | Low | Required if using dynamic `[slug]` routing. Simple 3-line function |

### Image Pipeline Improvements

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Blur placeholder (`placeholder="blur"`) | Images fade in from blurred placeholder instead of layout-shifting or appearing white while loading | Low | Add `blurDataURL` or use static import (auto-generates blur hash). Particularly good for portfolio grid and case study hero images |
| Priority loading for hero images | LCP score improvement. Hero image loads first without waiting for lazy evaluation | Low | `priority` prop on the first above-the-fold image in each hero |
| Responsive `sizes` for portfolio grid | `sizes` prop tells the browser which image to download based on viewport. Cuts bandwidth significantly for mobile users viewing the portfolio grid | Low | Add `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"` on portfolio card images |

---

## Anti-Features

Features to explicitly NOT build. Each one is a trap that would increase scope, complexity, or maintenance burden without adding business value for this specific project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| CMS or admin dashboard | CF Design content is managed by Cal and Fynn directly. MDX files are already a sufficient authoring workflow for a 2-person team | Edit MDX files directly. Vercel auto-deploys on git push |
| Authentication | No logged-in user state exists or is needed | N/A |
| Backend API routes | Form handling is already working via Formspree. No reason to introduce a server function | Keep Formspree as-is |
| Dark mode / theme toggle | Existing design is a single fixed theme. Adding a toggle doubles CSS complexity with zero business value for a local contractor site | Fix the theme. Don't add a toggle |
| Search functionality | 4 pages and ~15 portfolio items. Users scroll, they don't search | Navigation + anchor links are sufficient |
| Internationalization (i18n) | SF Bay Area local business. English-only audience | N/A |
| Progressive Web App (PWA) / Service Worker | Offline capability has no use case for a portfolio site visited once or twice before a consultation call | N/A |
| Blog / content feed | No content marketing strategy exists. Adding a blog adds authoring overhead with no clear ROI | Case studies serve the content marketing purpose |
| Animation library (Framer Motion, etc.) | All existing animations are pure CSS keyframes + IntersectionObserver. No animation library is needed. Adding one adds bundle weight and a new dependency | Port existing CSS animations as-is |
| Component library (shadcn, Radix, etc.) | The design system is fully custom with no standard UI patterns that warrant a library. Adding one means overriding its styles everywhere | Build custom components as before |
| Image hosting migration | Moving 79 images to a CDN (Cloudinary, S3) adds upload workflow complexity. Vercel already serves static assets with edge CDN | Keep images in `public/` directory. Next.js Image handles optimization |
| Real-time features (WebSockets, server actions for dynamic data) | Nothing on this site changes in real time | Static rendering + Formspree handles everything |

---

## Feature Dependencies

```
SSR / Server Components
  → Per-page metadata (requires server-rendered <head>)
    → Open Graph tags (same)
    → sitemap.xml (requires list of all routes)
    → JSON-LD structured data (requires server-rendered script tag)

MDX setup (@next/mdx)
  → Case study routes (either MDX files or component imports)
  → Per-case-study metadata (frontmatter exports)
  → Shared case study layout (Next.js nested layout)
  → generateStaticParams (only needed for dynamic [slug] routing)

next/image migration
  → Priority prop on hero images (requires image to be identified as LCP candidate)
  → blur placeholders (requires static import or manual blurDataURL)
  → Responsive sizes (independent, add per usage context)

Reveal component (Client Component)
  → All section animations (depends on Reveal being ported correctly)
  → Must be 'use client' — IntersectionObserver is browser-only API

next/font
  → Tailwind font family config must reference CSS variable from next/font
    (not hardcoded Google CDN link)

Contact modal (Client Component)
  → Form state (useState for nearPaloAlto, phone formatting)
  → URL param detection (?inquire) needs useSearchParams (Client Component)
  → Body scroll lock (useEffect) — browser API
```

---

## MVP Recommendation

For the migration to be shippable (SEO working, site looks identical, no regressions):

**Must ship:**
1. All 4 pages at correct URLs (homepage, 2 case studies, thank-you)
2. Server-side rendering — all page content visible in HTML source
3. Every animation ported (scroll columns, marquee, reveal, carousel, FAQ accordion, nav scroll)
4. next/image on all 79+ images (prevents CLS, improves LCP)
5. next/font replacing Google CDN font links
6. Per-page metadata (title + description unique per page)
7. Contact form (Formspree) working with correct redirect
8. Google Analytics working

**Ship immediately after (low effort, high SEO value):**
9. sitemap.xml — two-line file
10. robots.txt — two-line file
11. Open Graph tags — add to metadata object
12. JSON-LD LocalBusiness structured data — one script tag in homepage layout

**Defer without consequence:**
- Case study index page — not linked from anywhere currently
- Blur placeholders — nice polish, not blocking
- Per-case-study OG images — ship after initial launch
- `generateStaticParams` only needed if using dynamic `[slug]` routing for case studies

---

## Feature-to-Phase Mapping

| Phase | Features |
|-------|---------|
| Phase 1: Project scaffold | Next.js init, Tailwind config, design tokens (arch-* colors), font setup (next/font), shared layout (nav + footer), 404 page |
| Phase 2: Homepage sections | Hero (with all animations), Purpose, Process, Portfolio (with carousels), Reviews (scrolling columns), FAQ accordion, sticky mobile CTA |
| Phase 3: Contact & conversion | Contact modal (Formspree), thank-you page, GA integration |
| Phase 4: Case studies | MDX setup, case study layout, port both existing case studies, per-page metadata, case study nav links |
| Phase 5: SEO & performance | sitemap.xml, robots.txt, Open Graph tags, JSON-LD structured data, image `priority` + `sizes` + blur placeholders |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Next.js features (SSR, Image, font, metadata, MDX) | HIGH | Verified against official Next.js docs (v16.1.6, updated 2026-02-27) |
| Existing site features (animations, components, content) | HIGH | Direct inspection of index.html and case study files |
| Table stakes for carpentry/contractor business | MEDIUM | Based on existing site audit + known contractor website patterns. No competitor analysis performed (WebSearch denied) |
| Local business SEO (JSON-LD, sitemap) | MEDIUM | Official Google docs unreachable. JSON-LD LocalBusiness schema is well-established — confidence in recommendation, not specific field requirements |
| Anti-features list | HIGH | Driven directly by PROJECT.md out-of-scope constraints + site audit |

---

## Sources

- Next.js official docs (v16.1.6, last updated 2026-02-27): https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js Image docs: https://nextjs.org/docs/app/getting-started/images
- Next.js Font docs: https://nextjs.org/docs/app/getting-started/fonts
- Next.js MDX docs: https://nextjs.org/docs/app/guides/mdx
- Next.js Analytics docs: https://nextjs.org/docs/app/guides/analytics
- Next.js Server/Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Deploying: https://nextjs.org/docs/app/getting-started/deploying
- Direct audit of existing site: `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html`
- Project context: `.planning/PROJECT.md`
