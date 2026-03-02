# Project Research Summary

**Project:** CF Design — v3.cf.design Next.js Migration
**Domain:** Carpentry/contractor business portfolio website — CDN Babel to Next.js App Router
**Researched:** 2026-03-01
**Confidence:** HIGH

## Executive Summary

CF Design v3 is a targeted migration — not a redesign. The existing site (index.html + 3 HTML files) is a fully realized, content-complete carpentry business portfolio. Every design decision, animation, image, and copy block is locked. The migration goal is narrowly defined: fix zero SEO visibility caused by in-browser Babel compilation, eliminate 4-file copy-paste maintenance, and enable automatic image optimization across 79 images. Next.js 16 App Router with Tailwind CSS v4 and Vercel deployment is the correct and well-supported technical path. All stack decisions are sourced from official Next.js docs (v16.1.6, 2026-02-27) and the migration is entirely within well-documented patterns.

The recommended architecture is a flat App Router structure with a hard server/client component split. The majority of the site renders as Server Components (SSR HTML for SEO). Only interactive leaf nodes — Nav, Hero sticky CTA, PortfolioCard carousel, FAQ accordion, Reveal scroll animations, InquiryModal, and GoogleAnalytics — need `'use client'` boundaries. A single `SiteShell` client wrapper in the root layout holds modal state and passes `onOpenInquiry` callbacks down. MDX case studies are local files compiled at build time via `@next/mdx`, with `generateStaticParams` pre-rendering both existing case studies. This design keeps JS bundle minimal and SSR complete.

The dominant risk is boundary contamination: a single misplaced `'use client'` directive on a layout or page file turns the entire migration into a client-rendered app with no SEO improvement — which is exactly the failure mode the migration is trying to escape. A secondary but immediate risk is the Tailwind CDN-to-npm migration: all custom `arch-*` colors, animation keyframes, and font config must be ported from the inline `<script>` tag before a single component is built. These two risks dictate the phase order: scaffold and design-token setup must be complete and verified before any page sections are written.

---

## Key Findings

### Recommended Stack

The stack is entirely within the standard Next.js 16 ecosystem with no novel or experimental choices. Next.js 16.1 (App Router, Turbopack default) on Node 20.9+ is the current stable baseline. Tailwind CSS v4 is the `create-next-app` default as of Next.js 16 — it uses a CSS-based config (`@theme {}` in `globals.css`) instead of `tailwind.config.js`. The existing CDN Tailwind config uses v3 syntax and must be migrated, but the PITFALLS research notes that Tailwind v3 is also a viable and safer choice given the existing codebase uses v3 class syntax extensively. MDX is handled via `@next/mdx` (official, local-file-optimized). Animations use the existing CSS keyframes — Framer Motion is explicitly called out as unnecessary for this project (FEATURES anti-feature list). Font loading migrates from Google CDN `<link>` to `next/font/google` for self-hosted zero-layout-shift delivery.

**Core technologies:**
- **Next.js 16.1 + App Router**: SSR/SSG per route, Turbopack dev server, natural Vercel deployment target — the explicit migration target
- **TypeScript 5.1+**: Required by Next.js 16, eliminates a class of migration bugs, included in `create-next-app`
- **Tailwind CSS v4**: `create-next-app` default; CSS-based config; existing arch-* colors, animations, and font tokens migrate to `@theme {}` block in `globals.css`
- **`next/font/google`**: Self-hosts Inter + Playfair Display at build time — eliminates Google CDN network round-trip and layout shift
- **`next/image`**: Automatic WebP/AVIF, responsive srcsets, blur placeholders, lazy loading for all 79 images
- **`@next/mdx` + `remark-gfm`**: Local MDX compilation at build time for case studies; Turbopack requires string-form plugin references
- **Formspree**: No changes; carry existing HTML form POST as a React component
- **`@next/third-parties` (GoogleAnalytics)**: Official Next.js GA4 integration; defers script until after hydration
- **Vercel**: Zero-config Next.js deployment, Vercel Image Optimization API, edge CDN

**Critical version requirements:**
- Node.js 20.9+ minimum (Next.js 16 drops Node 18)
- Tailwind v4 breaks `tailwind.config.js` — config moves to `globals.css`
- `priority` prop deprecated in Next.js 16 — use `preload` on hero images
- Turbopack requires remark plugins as strings, not function references

---

### Expected Features

This is a migration, not a product build. The feature landscape is defined by the existing site. All design, content, and animations are locked.

**Must have (table stakes — migration blockers):**
- All 4 pages at equivalent URLs: `/`, `/case-studies/palo-alto-redwood-little-library/`, `/case-studies/palo-alto-walnut-marble-tables/`, `/thank-you/`
- Server-side rendering: page content visible in HTML source (fixes zero-SEO failure mode)
- All existing animations ported: scroll columns, horizontal marquee, slow-zoom, reveal-on-scroll, hover-pause, portfolio carousel, FAQ accordion, nav scroll behavior
- `next/image` on all 79+ images — prevents CLS, improves LCP
- `next/font` replacing Google CDN font links
- Per-page metadata (unique `<title>` + `<meta description>` per page and per case study)
- Inquiry/contact modal (Formspree) working with correct `/thank-you` redirect
- Google Analytics working
- Sticky mobile CTA (requires IntersectionObserver Client Component)
- 404 page (`app/not-found.tsx`)
- Favicon (`app/icon.png`)

**Should have (unlocked by SSR, low effort, high SEO value):**
- `sitemap.xml` via `app/sitemap.ts` — two-line file
- `robots.txt` via `app/robots.ts` — two-line file
- Open Graph tags — add to existing `metadata` object
- JSON-LD LocalBusiness structured data — one script tag in homepage layout
- MDX-based case study authoring — replaces 800-line HTML copy-paste workflow
- Shared case study layout (`app/case-studies/layout.tsx`) — defines once, eliminates duplication
- Blur placeholder (`placeholder="blur"`) on portfolio and case study images
- Responsive `sizes` prop on portfolio grid images

**Defer without consequence (post-launch):**
- Case study index page (`/case-studies/`) — not currently linked from anywhere
- Per-case-study OG images — ship after initial launch
- `generateStaticParams` only needed if using dynamic `[slug]` routing

**Anti-features (explicitly out of scope):**
- CMS, admin dashboard, authentication, backend API routes
- Dark mode / theme toggle
- Framer Motion or any animation library — existing CSS keyframes are sufficient
- Component library (shadcn, Radix)
- Image hosting migration to CDN (Cloudinary, S3)
- Blog, PWA, real-time features, i18n, search

---

### Architecture Approach

The architecture is a flat App Router directory structure with a clean server/client split. Most components are Server Components; only interactive leaf nodes carry `'use client'`. Static content data lives in `data/*.ts` typed modules imported directly into Server Components — no API routes, no fetch, no caching configuration. The `SiteShell` client component in `app/layout.tsx` holds modal state and is the single source of truth for the inquiry modal, preventing unmount/remount across navigation. Case study pages use dynamic `[slug]` routing with `generateStaticParams` for build-time pre-rendering and `dynamicParams = false` to 404 unknown slugs.

**Major components:**
1. **`SiteShell`** (Client) — Holds `showInquiry` state; renders Nav + page children + InquiryModal; passes `onOpenInquiry` callbacks down; lives in `app/layout.tsx` as a client boundary
2. **`Reveal`** (Client) — Transparent IntersectionObserver wrapper; `'use client'` at leaf level; section parents stay Server Components via `children` prop pattern
3. **`PortfolioCard`** (Client) — Image carousel state, `useRouter().push()` navigation to case studies
4. **`InquiryModal`** (Client) — Full-screen Formspree form; reads `?inquire` URL param via `useSearchParams()`; phone formatting state
5. **`Nav`** (Client) — Scroll-based background transition, mobile menu, case study dropdown, opens inquiry via callback
6. **`case-studies/[slug]/page.tsx`** (Server) — Dynamic MDX import by slug; `generateStaticParams` pre-builds both case studies at build time
7. **`data/*.ts` modules** — `PORTFOLIO_ITEMS`, `REVIEWS`, `FAQS`, `PROCESS_STEPS`, `VIBE_IMAGES`, `CASE_STUDIES` as typed TypeScript exports; single source of truth
8. **`GoogleAnalytics`** (Client) — `next/script` with `strategy="afterInteractive"`; `gtag()` calls wrapped in `typeof gtag !== 'undefined'` guard

---

### Critical Pitfalls

1. **`'use client'` on layout/page = zero SEO** — If `app/layout.tsx` or `app/page.tsx` gets `'use client'`, the entire migration fails. Keep layout and page files as Server Components. Extract interactivity into leaf-level client components. Design the server/client split before writing any component. Warning sign: no static HTML in browser view-source.

2. **`window` access crashes server rendering** — The existing `App` component accesses `window.location.search` in a `useState` initializer. This crashes Next.js SSR with `ReferenceError: window is not defined`. Replace with `useSearchParams()` from `next/navigation` inside a `'use client'` component. Apply to every instance of `window`, `document`, `navigator`, or `localStorage` in the codebase before extracting any component.

3. **Assets 404 on migration** — All `assets/foo.jpg` paths must become `/assets/foo.jpg` after moving to `public/assets/`. The `mobileImg()` helper must produce root-relative paths. Every image reference in the codebase needs updating. Do this at scaffold time before any component work.

4. **Tailwind CDN config doesn't port automatically** — The inline `<script>` CDN config is runtime-only syntax. All `arch-*` colors, custom animations (`scroll-up`, `scroll-down`, `scroll-left`, `slow-zoom`, `float`), and font families must be manually ported to `globals.css` `@theme {}` (Tailwind v4) or `tailwind.config.js` (Tailwind v3). Without this, the site renders with no custom colors or animations. Do this before touching any component.

5. **`next/image` lazy loading breaks animated marquees** — Hero marquee and reviews wall use CSS `translateY` animations on duplicated image arrays. Lazy loading doesn't account for CSS-transformed positions — images load mid-animation, causing visible flicker. Apply `loading="eager"` to all images inside scroll-animated containers. This is not a build error; it only appears during visual testing.

6. **`Reveal` client boundary contamination** — If a Server Component directly imports `Reveal` and places non-children content inside it, those components are pulled into the client bundle. Use the `children` prop pattern: Server Components pass children to `Reveal`; `Reveal` is `'use client'` at the leaf. Warning sign: empty `<div class="reveal-base">` in view-source.

7. **MDX frontmatter not supported by default** — `@next/mdx` ignores YAML frontmatter. Use ES module exports (`export const metadata = {...}`) inside MDX files for per-case-study `<title>` and `<meta description>` values. Without this, all case study pages share the default site title.

---

## Implications for Roadmap

Based on combined research, the architecture has a clear dependency chain. The critical path is: Tailwind config and design tokens → layout shell → homepage sections → contact conversion → case studies → SEO. The MDX system is independent of homepage sections and can be built in parallel with phases 4-5 if capacity allows.

### Phase 1: Foundation — Scaffold, Design Tokens, Layout Shell

**Rationale:** Tailwind config must exist before any visual component can be built. Asset paths must be resolved before any `next/image` usage. The layout shell (`SiteShell`, `Nav`, `Footer`) must exist before any page can render correctly. Three of the seven critical pitfalls (Pitfalls 4, 5, 12) are exclusively scaffold-phase risks — addressing them here prevents cascading failures.

**Delivers:** Working Next.js app with correct Tailwind tokens, fonts, asset paths, shared nav/footer, and layout shell. View-source shows SSR HTML.

**Implements from FEATURES.md:** Server-side rendering infrastructure, `next/font` font loading, shared layout (nav + footer), favicon, 404 page.

**Addresses pitfalls:** Tailwind CDN config migration (Pitfall 5), assets 404 (Pitfall 4), trailing slash URL parity (Pitfall 9), hover-pause CSS in globals (Pitfall 12), `window` crash pattern established (Pitfall 1).

**Stack elements:** `create-next-app` with TypeScript + Tailwind + App Router + Turbopack, Node.js 20.9+, `next/font/google` for Inter + Playfair Display, `globals.css` with `@theme {}` or `tailwind.config.js`.

**Research flag:** NONE — standard, well-documented Next.js setup patterns. Skip research-phase.

---

### Phase 2: Homepage Sections

**Rationale:** The homepage is the core product. Once the shell exists, all homepage sections can be built. Each section is relatively independent with clear data dependencies resolved in Phase 1. The server/client split design (Pitfall 2) must be locked before this phase begins — map every component to Server or Client before writing any file.

**Delivers:** Complete, animated homepage matching the existing site. SSR confirmed for all static sections. All CSS animations working (scroll columns, marquee, slow-zoom). `Reveal` Client Component pattern established. `PortfolioCard` carousel and `FAQ` accordion working.

**Implements from FEATURES.md:** Hero (with all animations and sticky CTA), Purpose, Process, Portfolio (with carousels), Reviews (scrolling columns + hover-pause), FAQ accordion.

**Addresses pitfalls:** Client boundary design before first component (Pitfall 2), `Reveal` children pattern (Pitfall 6), `loading="eager"` on animated image containers (Pitfall 3), `next/image fill` parent positioning (Pitfall 11), `<a>` to `<Link>` migration (Pitfall 14).

**Stack elements:** `next/image` on all section images, `data/*.ts` static modules, CSS keyframe animations from ported Tailwind config.

**Research flag:** NONE — all patterns are documented. The server/client split design is detailed in ARCHITECTURE.md. Skip research-phase.

---

### Phase 3: Contact and Conversion

**Rationale:** The inquiry modal and thank-you page are the primary business conversion points. They share a client boundary (`SiteShell`) that sits above the homepage. Building this after the homepage sections ensures the modal mounting pattern is tested against real page content. Google Analytics must be in place before launch.

**Delivers:** Working Formspree inquiry form with multi-step modal. Correct redirect to `/thank-you`. Google Analytics events firing for form opens and submissions. URL param (`?inquire`) correctly opens modal on both homepage and case study page back-links.

**Implements from FEATURES.md:** Contact/inquiry modal (Formspree), thank-you page, Google Analytics.

**Addresses pitfalls:** `window.location.search` replaced with `useSearchParams()` (Pitfall 1), `gtag` global access guarded (Pitfall 10), `window.location.href` in PortfolioCard replaced with `useRouter().push()` (Pitfall 15).

**Stack elements:** Formspree (no changes), `@next/third-parties` GoogleAnalytics, `next/navigation` `useSearchParams` and `useRouter`.

**Research flag:** NONE — standard patterns. Skip research-phase.

---

### Phase 4: MDX Case Studies

**Rationale:** Case studies are the second route segment and depend on the layout shell (Phase 1) but are independent of homepage sections (Phase 2). MDX setup has its own dependency chain: `@next/mdx` config → `mdx-components.tsx` → content MDX files → dynamic route. Keeping MDX in its own phase isolates the Turbopack plugin configuration risk and the frontmatter gotcha.

**Delivers:** Both existing case studies at correct URLs (`/case-studies/palo-alto-redwood-little-library/` and `/case-studies/palo-alto-walnut-marble-tables/`), with correct metadata, styled MDX content via `@tailwindcss/typography` prose classes, and navigation back to homepage (with `/?inquire` on "Start Project").

**Implements from FEATURES.md:** MDX case study authoring system, shared case study layout, `generateStaticParams` for static pre-rendering, per-case-study metadata.

**Addresses pitfalls:** `mdx-components.tsx` required file (Pitfall 7), frontmatter not supported — use ES exports instead (Pitfall 8), URL trailing slash parity (Pitfall 9).

**Stack elements:** `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-gfm` (as string for Turbopack), `@tailwindcss/typography`.

**Research flag:** LOW RISK — patterns are fully documented in official Next.js MDX guide (v16.1.6). The Turbopack string-plugin requirement is documented and noted in STACK.md. Skip research-phase.

---

### Phase 5: SEO and Performance Polish

**Rationale:** These features are only possible after SSR is working. Once all pages render server-side HTML, SEO enhancements are trivially cheap to add. This phase should ship immediately after initial launch.

**Delivers:** Complete SEO footprint: per-page metadata, Open Graph tags, `sitemap.xml`, `robots.txt`, JSON-LD LocalBusiness structured data. Performance improvements: `priority`/`preload` on hero images, `sizes` prop on portfolio grid images, blur placeholders on portfolio and case study images.

**Implements from FEATURES.md:** `sitemap.xml`, `robots.txt`, Open Graph tags, JSON-LD structured data, image `priority` + `sizes` + blur placeholders, per-case-study OG images (deferred to after initial launch if needed).

**Addresses pitfalls:** N/A — no new pitfalls introduced. Validates that SSR is complete (Pitfall 2 final check).

**Stack elements:** Next.js `metadata` API, `app/sitemap.ts`, `app/robots.ts`, JSON-LD inline script.

**Research flag:** MEDIUM — JSON-LD LocalBusiness schema field requirements and Google rich results documentation were not directly accessible during research. During this phase, validate schema fields against schema.org/LocalBusiness and Google's rich results test tool before shipping.

---

### Phase Ordering Rationale

- **Foundation before everything:** Tailwind config and asset paths are prerequisites for every visual component. Building any component before resolving these guarantees rework.
- **Homepage before conversion:** `SiteShell` modal state pattern is testable on the homepage before case studies link back to `/?inquire`.
- **Case studies independent:** MDX system has no dependency on homepage section components. It could be built in parallel with Phase 2 if resources allow — but sequencing after Phase 3 reduces risk by keeping context focused.
- **SEO last:** These features are only unlocked by SSR. They are also zero-regression additions — they cannot break existing functionality, making them safe to batch and ship as a final pass.

---

### Research Flags

Phases needing deeper research during planning:
- **Phase 5 (SEO/Performance):** JSON-LD LocalBusiness schema field requirements and Google rich results eligibility were not fully validated during initial research. Validate against schema.org/LocalBusiness before implementation. Consider `/gsd:research-phase` for the structured data implementation specifically.

Phases with standard, well-documented patterns (skip research-phase):
- **Phase 1:** Standard `create-next-app` setup, Tailwind v4 CSS config. Official docs are comprehensive.
- **Phase 2:** Server/client component split is fully documented. Animation patterns are CSS-only port.
- **Phase 3:** Formspree, `useSearchParams`, `next/script` — all standard Next.js patterns.
- **Phase 4:** `@next/mdx` with `generateStaticParams` is fully documented in official MDX guide.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All version requirements and package choices sourced from official Next.js 16.1.6 docs (2026-02-27). Only gap: `framer-motion` vs `motion` package rebrand status — but Framer Motion is explicitly an anti-feature for this project, so this gap is irrelevant. |
| Features | HIGH | Features derived from direct inspection of the existing site source code. No ambiguity about what the migration must preserve. SEO features (JSON-LD) rated MEDIUM due to inaccessible Google docs during research. |
| Architecture | HIGH | Architecture patterns verified against official Next.js Server/Client Components docs and direct source code inspection. The server/client split and `SiteShell` pattern are well-established App Router patterns. |
| Pitfalls | HIGH | All 15 pitfalls sourced from official Next.js docs (v16.1.6, 2026-02-27) and direct source code analysis. No inferred pitfalls — all verified against real code paths in the existing site. |

**Overall confidence:** HIGH

### Gaps to Address

- **Tailwind v4 vs v3 choice:** STACK.md recommends Tailwind v4 (the `create-next-app` default). PITFALLS.md notes the existing CDN config uses v3 syntax. The `arch-*` color palette migration to v4's `@theme {}` block is untested. During Phase 1, run `npx @tailwindcss/upgrade` and visually verify all custom colors, animations, and font classes before proceeding to Phase 2. If v4 migration is unexpectedly complex, fall back to Tailwind v3 (`tailwindcss@^3`) — the site has no v4-specific features.
- **`framer-motion` / `motion` package name:** STACK.md notes uncertainty about the `framer-motion` vs `motion` rebrand status. This is irrelevant — FEATURES.md explicitly lists animation libraries as an anti-feature. All animations are CSS keyframe-based. Do not install either package.
- **JSON-LD LocalBusiness schema:** The exact required and recommended fields for Google rich results eligibility were not verifiable during research. During Phase 5, validate the schema against schema.org/LocalBusiness and test with Google's Rich Results Test before shipping.
- **`@tailwindcss/typography` v4 compatibility:** Referenced in Next.js MDX docs but v4-specific installation was not confirmed during research. Verify during Phase 4 MDX setup.

---

## Sources

### Primary (HIGH confidence)
- Next.js 16 release blog: https://nextjs.org/blog/next-16 (Oct 21, 2025)
- Next.js 16.1 release blog: https://nextjs.org/blog/next-16-1 (Dec 18, 2025)
- Next.js official docs (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/installation
- Next.js CSS/Tailwind guide: https://nextjs.org/docs/app/getting-started/css
- Next.js fonts guide: https://nextjs.org/docs/app/getting-started/fonts
- Next.js MDX guide: https://nextjs.org/docs/app/guides/mdx
- Next.js image component API: https://nextjs.org/docs/app/api-reference/components/image
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js third-party libraries: https://nextjs.org/docs/app/guides/third-party-libraries
- Tailwind v3 → v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide
- Direct source inspection: `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html` and case study HTML files

### Secondary (MEDIUM confidence)
- Next.js App Router project structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js redirecting guide: https://nextjs.org/docs/app/guides/redirecting
- Project context: `.planning/PROJECT.md`

### Tertiary (LOW confidence / unverified during research)
- JSON-LD LocalBusiness schema field requirements — schema.org/LocalBusiness and Google rich results docs were inaccessible during research
- `@tailwindcss/typography` v4 compatibility — referenced but not directly verified
- `framer-motion` vs `motion` package rebrand status — npm was inaccessible during research (irrelevant: animation library is an anti-feature for this project)

---
*Research completed: 2026-03-01*
*Ready for roadmap: yes*
