# Architecture Patterns

**Domain:** Next.js portfolio site migration (carpentry business)
**Researched:** 2026-03-01
**Confidence:** HIGH (Next.js official docs, verified against source codebase)

---

## Recommended Architecture

A flat App Router structure with three route segments, shared layout wrapping all routes, and a hard split between Server Components (static structure, images, text) and Client Components (all interactive behavior: scroll events, IntersectionObserver, modals, accordions, carousels).

The contact modal is the most architecturally sensitive piece: it is triggered from Nav, Hero, and a sticky CTA button. The cleanest approach is to use a URL search param (`?inquire`) as the source of truth for modal open state — the existing site already does this — and handle it in a Client Component at the root layout level.

### File Layout

```
v3.cf.design/
├── next.config.mjs              # MDX + image config
├── tailwind.config.ts           # arch-* colors, Inter/Playfair, custom animations
├── mdx-components.tsx           # Global MDX component map (required for @next/mdx)
├── tsconfig.json
├── public/
│   ├── assets/
│   │   ├── jobs/                # Portfolio images (~50 files)
│   │   ├── reviews/             # Review screenshot images (~17 files)
│   │   ├── mobile/              # Mobile-optimized image variants
│   │   └── *.jpg / *.png        # Top-level assets (cf-icon.png, etc.)
├── app/
│   ├── layout.tsx               # Root layout: <html>, <body>, GoogleAnalytics, InquiryModal
│   ├── page.tsx                 # Homepage (Server Component)
│   ├── globals.css              # .reveal-base, no-scrollbar, hover-pause, body defaults
│   ├── not-found.tsx            # 404 page
│   ├── thank-you/
│   │   └── page.tsx             # Thank-you page (Server Component)
│   └── case-studies/
│       ├── layout.tsx           # Case study layout: Nav + Footer (no contact modal trigger needed)
│       └── [slug]/
│           └── page.tsx         # Dynamic case study route, imports MDX by slug
├── content/
│   ├── palo-alto-redwood-little-library.mdx
│   └── palo-alto-walnut-marble-tables.mdx
├── components/
│   ├── layout/
│   │   ├── Nav.tsx              # 'use client' — scroll state, mobile menu open/close, CS dropdown
│   │   ├── Footer.tsx           # Server Component — pure static markup
│   │   └── InquiryModal.tsx     # 'use client' — modal open/close, phone formatting, form state
│   ├── sections/                # Homepage sections (Server Components unless noted)
│   │   ├── Hero.tsx             # 'use client' — sticky CTA scroll tracking, onInquiry prop
│   │   ├── Purpose.tsx          # Server Component
│   │   ├── Process.tsx          # Server Component (data is static inline)
│   │   ├── Portfolio.tsx        # Server Component (renders PortfolioCard)
│   │   ├── Reviews.tsx          # Server Component (renders ReviewCard scroll columns)
│   │   └── FAQ.tsx              # 'use client' — accordion open/close state
│   ├── ui/
│   │   ├── Reveal.tsx           # 'use client' — IntersectionObserver for scroll fade-in
│   │   ├── PortfolioCard.tsx    # 'use client' — image carousel state (prev/next)
│   │   ├── ReviewCard.tsx       # Server Component — pure static img markup
│   │   ├── HeroVibeCard.tsx     # Server Component — pure static img markup
│   │   └── Icons.tsx            # Server Component — inline SVG icon components
│   └── analytics/
│       └── GoogleAnalytics.tsx  # 'use client' — gtag script, window.gtag calls
├── lib/
│   └── case-studies.ts          # generateStaticParams helper, slug → MDX file map
└── data/
    ├── portfolio.ts             # PORTFOLIO_ITEMS array
    ├── reviews.ts               # REVIEWS image array
    ├── vibe-images.ts           # VIBE_IMAGES array for hero marquee
    ├── process.ts               # PROCESS_STEPS array
    ├── faqs.ts                  # FAQS array
    └── case-studies.ts          # CASE_STUDIES nav list
```

---

## Component Boundaries

| Component | Type | Responsibility | Communicates With |
|-----------|------|---------------|-------------------|
| `app/layout.tsx` | Server | HTML shell, font loading, GA script, mount InquiryModal | InquiryModal (child), all pages (via children) |
| `Nav` | Client | Scroll-based background change, mobile menu, case study dropdown, opens inquiry | InquiryModal (via URL param / callback), Router |
| `Footer` | Server | Static contact info, social links | None |
| `InquiryModal` | Client | Contact form display, Formspree POST, phone formatting, open/close | Formspree (external POST), URL search params |
| `Hero` | Client | Sticky CTA scroll tracking, vibe card marquee columns, opens inquiry | InquiryModal (via callback prop from page), HeroVibeCard |
| `Purpose` | Server | Static two-column layout with image | Reveal (child), Next/Image |
| `Process` | Server | Timeline with alternating layout | Reveal (child), Next/Image, data/process.ts |
| `Portfolio` | Server | 3-col grid of portfolio items | PortfolioCard (child), data/portfolio.ts |
| `PortfolioCard` | Client | Image carousel, click-to-case-study navigation | Next/Image, Router |
| `Reviews` | Server | Three-column scroll marquee | ReviewCard (child), data/reviews.ts |
| `ReviewCard` | Server | Single review image card | Next/Image |
| `FAQ` | Client | Accordion with open/close state | data/faqs.ts |
| `Reveal` | Client | IntersectionObserver scroll fade-in wrapper | Wraps any child component |
| `Icons` | Server | Inline SVG icon components | Used throughout |
| `case-studies/[slug]/page.tsx` | Server | Dynamic MDX import by slug | content/*.mdx, Nav, Reveal, Next/Image |
| `thank-you/page.tsx` | Server | Static confirmation page | Nav (via link back), Next/Image |
| `GoogleAnalytics` | Client | Injects gtag.js script | window.gtag, external GA endpoint |

---

## Data Flow

### Static Content (Homepage Sections)

```
data/*.ts (static arrays)
  └─→ Server Component (Purpose, Process, Portfolio, Reviews, FAQ)
        └─→ renders HTML with Next/Image
              └─→ Client Component wrappers where needed (PortfolioCard, Reveal)
                    └─→ hydrated in browser for interactivity
```

### Contact Modal (Inquiry Flow)

```
User clicks "Start Project" / "Book Consultation"
  └─→ Nav or Hero calls onInquiry()
        └─→ app/layout.tsx sets showInquiry=true (or URL param ?inquire)
              └─→ InquiryModal renders as full-screen overlay
                    └─→ User submits form → Formspree POST
                          └─→ Formspree redirects to /thank-you
```

The cleanest implementation: InquiryModal lives in `app/layout.tsx` as a Client Component. Nav and Hero receive an `onOpenInquiry` callback prop passed down from layout. This keeps modal state in one place and avoids prop-drilling through page boundaries.

### MDX Case Studies

```
URL: /case-studies/palo-alto-redwood-little-library
  └─→ app/case-studies/[slug]/page.tsx (Server Component)
        └─→ lib/case-studies.ts resolves slug → content/[slug].mdx
              └─→ dynamic import: `await import('@/content/${slug}.mdx')`
                    └─→ MDX renders with mdx-components.tsx mappings
                          └─→ custom components (Reveal, Next/Image) applied globally
```

`generateStaticParams()` returns the two known slugs. `dynamicParams = false` makes unknown slugs 404. This pre-renders both case study pages at build time — zero runtime cost.

### Scroll Animations

```
CSS keyframe animations (tailwind.config.ts)
  └─→ .animate-scroll-up / .animate-scroll-down / .animate-scroll-left
        └─→ Applied directly to Server Component markup (no JS needed)
              └─→ .hover-pause CSS class pauses animation on hover (Reviews section)

IntersectionObserver (Reveal component — Client)
  └─→ Observes DOM ref as it enters viewport
        └─→ Toggles opacity-0/translate-y-12 → opacity-100/translate-y-0
              └─→ Once visible, unobserves (one-shot, not persistent)
```

CSS animations (scroll marquees, slow-zoom) are pure CSS — no JS hydration needed. `Reveal` is the only animation requiring a Client Component.

### Image Optimization

```
/public/assets/ (local image files)
  └─→ next/image component in Server or Client Components
        └─→ Vercel Image Optimization API: serves WebP/AVIF at request time
              └─→ Cached at CDN edge after first request
```

Hero vibe images: use `loading="lazy"` on duplicated marquee items. Use `loading="eager"` (or `fetchPriority="high"`) only on the single above-the-fold hero image. For portfolio cards with `fill` prop, use `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`.

---

## Patterns to Follow

### Pattern 1: Push "use client" to Leaf Nodes

**What:** Keep Server Components as high as possible in the tree. Only add `"use client"` at the lowest component that actually needs browser APIs or state.

**When:** Always. This minimizes JS bundle size and maximizes SSR HTML.

**Example:**
```tsx
// app/page.tsx — Server Component
import Portfolio from '@/components/sections/Portfolio'
import PortfolioCard from '@/components/ui/PortfolioCard' // 'use client' lives here

// Portfolio.tsx renders server-side, passes data to PortfolioCard
// PortfolioCard.tsx has 'use client' for carousel state
export default function HomePage() {
  return <Portfolio items={PORTFOLIO_ITEMS} />
}
```

### Pattern 2: Static Data as Plain TypeScript Modules

**What:** All static arrays (PORTFOLIO_ITEMS, REVIEWS, FAQS, etc.) live in `data/*.ts` files as typed exports, imported directly into Server Components.

**When:** Any data that doesn't change without a code deploy.

**Why:** No API routes, no fetch, no caching configuration needed. Tree-shaken by bundler. Trivially typed.

```ts
// data/portfolio.ts
export interface PortfolioItem {
  title: string
  location: string
  published: boolean
  images: string[]
  caseStudy?: string
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [...]
```

### Pattern 3: MDX with Dynamic Import + generateStaticParams

**What:** Case study pages use `await import('@/content/${slug}.mdx')` inside a `[slug]` dynamic route. `generateStaticParams` pre-builds all pages at build time.

**When:** For any MDX content system with a finite, known set of pages.

**Example:**
```tsx
// app/case-studies/[slug]/page.tsx
export function generateStaticParams() {
  return [
    { slug: 'palo-alto-redwood-little-library' },
    { slug: 'palo-alto-walnut-marble-tables' },
  ]
}
export const dynamicParams = false

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const { default: CaseStudy } = await import(`@/content/${slug}.mdx`)
  return <CaseStudy />
}
```

Adding a new case study = add one MDX file + one entry in `generateStaticParams`. No other changes.

### Pattern 4: Reveal as a Transparent Client Wrapper

**What:** `Reveal` is a `'use client'` component that wraps any children, observes them with IntersectionObserver, and toggles CSS classes. It is invisible to Server Components above it.

**When:** Anywhere scroll-triggered fade-in is needed.

```tsx
// components/ui/Reveal.tsx
'use client'
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal-base ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
         style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
```

### Pattern 5: InquiryModal Mounted Once in Root Layout

**What:** The contact modal is mounted once in `app/layout.tsx`, not in `app/page.tsx`. Nav and Hero pages receive `onOpenInquiry` callbacks via props or context.

**When:** Any global overlay that can be triggered from multiple places in the component tree.

**Why:** Prevents unmounting/remounting the modal during navigation. Keeps one source of modal open state.

```tsx
// app/layout.tsx
'use client' — no, layout stays Server Component

// Instead, extract to a client wrapper:
// components/layout/SiteShell.tsx — 'use client'
// This component holds modal state and renders Nav + children + InquiryModal
```

The `app/layout.tsx` stays a Server Component. It renders a `SiteShell` client component that holds `showInquiry` state and wraps everything between Nav and Footer. This is the "context provider at the boundary" pattern from Next.js docs.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Making Section Components Client Components

**What:** Marking entire sections (`Purpose`, `Process`, `Reviews`, `Portfolio`) as `'use client'` because they contain `Reveal` wrappers.

**Why bad:** Server Components can render Client Component children. `Reveal` itself is `'use client'`, so wrapping a section in it doesn't require the section to be a Client Component. Entire section's markup (all those Next/Image calls, all that static text) would be bundled into the client JS instead of being SSR HTML.

**Instead:** Keep sections as Server Components. `Reveal` is `'use client'` and handles its own hydration boundary.

### Anti-Pattern 2: Inline Data in Components

**What:** Defining PORTFOLIO_ITEMS, REVIEWS, etc. inside component files (as the current site does in one giant HTML file).

**Why bad:** Data is tightly coupled to presentation. Impossible to use the same data in multiple components (e.g., portfolio grid + nav dropdown for case studies).

**Instead:** `data/*.ts` modules. Single source of truth, importable anywhere.

### Anti-Pattern 3: Separate Nav Variants Per Page

**What:** Writing a slightly different Nav for case study pages vs. home page (the current site does this — home Nav has `onInquiry` callback, case study Nav just links back with `href="../../?inquire"`).

**Why bad:** Two codebases to maintain. Style drift guaranteed.

**Instead:** Single `Nav` component. On case study pages, "Start Project" navigates to `/?inquire`. The modal opens when the home page loads with `?inquire` in the URL. This is already how the existing site works for direct-linked inquiries.

### Anti-Pattern 4: Using `next-mdx-remote` Instead of `@next/mdx`

**What:** Reaching for `next-mdx-remote` for the MDX system.

**Why bad:** `next-mdx-remote` is designed for remote MDX fetched at runtime (CMS content). This project uses local MDX files. `@next/mdx` is the officially supported approach for local MDX files in App Router. It integrates with `pageExtensions`, supports `mdx-components.tsx`, and works natively with `generateStaticParams`. Less configuration, official support.

**Instead:** `@next/mdx` with dynamic import pattern as described above.

### Anti-Pattern 5: Google Analytics as a Script Tag in layout.tsx

**What:** Copying the existing `<script async src="https://www.googletagmanager.com/gtag/js">` approach into the Next.js layout.

**Why bad:** Next.js provides `next/script` with `strategy="afterInteractive"` specifically for analytics scripts. This defers the script until after page hydration, improving LCP without breaking GA tracking.

**Instead:** Use `next/script` in a `GoogleAnalytics` client component:
```tsx
// components/analytics/GoogleAnalytics.tsx
'use client'
import Script from 'next/script'
export function GoogleAnalytics() {
  return (
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-DNSCN01BPT"
            strategy="afterInteractive" />
  )
}
```

---

## Build Order (Phase Dependencies)

The architecture has a clear dependency chain. Build in this order:

```
1. Foundation (no dependencies)
   ├── tailwind.config.ts          (arch-* colors, fonts, custom animations)
   ├── globals.css                 (.reveal-base, no-scrollbar, hover-pause)
   ├── app/layout.tsx              (HTML shell, font loading)
   └── data/*.ts                   (static data arrays — no component deps)

2. Shared UI (depends on: Foundation)
   ├── components/ui/Icons.tsx     (no deps — pure SVG)
   ├── components/ui/Reveal.tsx    (depends on: globals.css for .reveal-base)
   ├── components/layout/Footer.tsx (depends on: Icons)
   └── components/analytics/GoogleAnalytics.tsx (no component deps)

3. Layout Shell (depends on: Shared UI)
   ├── data/case-studies.ts        (nav dropdown data)
   ├── components/layout/Nav.tsx   (depends on: Icons, data/case-studies)
   ├── components/layout/InquiryModal.tsx (depends on: Icons)
   └── components/layout/SiteShell.tsx (depends on: Nav, InquiryModal)

4. Homepage Sections (depends on: Foundation, Shared UI)
   ├── components/ui/HeroVibeCard.tsx     (depends on: Next/Image)
   ├── components/sections/Hero.tsx       (depends on: HeroVibeCard, Icons, data/vibe-images)
   ├── components/sections/Purpose.tsx    (depends on: Reveal, Icons, Next/Image)
   ├── components/sections/Process.tsx    (depends on: Reveal, Icons, Next/Image, data/process)
   ├── components/ui/PortfolioCard.tsx    (depends on: Next/Image, Icons)
   ├── components/sections/Portfolio.tsx  (depends on: PortfolioCard, Reveal, data/portfolio)
   ├── components/ui/ReviewCard.tsx       (depends on: Next/Image)
   ├── components/sections/Reviews.tsx    (depends on: ReviewCard, data/reviews)
   └── components/sections/FAQ.tsx        (depends on: Icons, data/faqs)

5. Pages (depends on: all above)
   ├── app/page.tsx                (depends on: all sections + SiteShell)
   └── app/thank-you/page.tsx      (depends on: Nav, Footer, Next/Image)

6. MDX System (depends on: Foundation, Shared UI, Nav, Footer)
   ├── next.config.mjs             (add @next/mdx config, pageExtensions)
   ├── mdx-components.tsx          (map html elements to custom components)
   ├── lib/case-studies.ts         (slug list for generateStaticParams)
   ├── content/*.mdx               (case study content files)
   └── app/case-studies/[slug]/page.tsx  (dynamic route + MDX import)
```

**Critical path:** Tailwind config must be done before any visual component. `SiteShell` must be built before `app/page.tsx` can render correctly (it holds modal state). MDX system is fully independent of homepage sections — can be built in parallel with steps 4-5.

---

## Scalability Considerations

| Concern | Now (2 case studies) | At 10+ case studies | Notes |
|---------|---------------------|--------------------|----|
| Case study routing | `generateStaticParams` with manual slug list | Same — add slug to array | Consider `fs.readdir` on `content/` to auto-generate |
| Portfolio data | Static array in `data/portfolio.ts` | Same | MDX front matter for portfolio items if metadata grows complex |
| Image hosting | Local `/public/assets/` | Same | Vercel has 1GB storage on hobby plan; 79 images is trivial |
| Nav dropdown | Static CASE_STUDIES array | Same manual approach | Only case studies with a full MDX file should appear |
| Build time | Near-instant (4 pages) | Linear growth | Static generation is trivially fast at this scale |

This site will never need CMS integration or dynamic routing at the scale described. The architecture intentionally keeps it simple.

---

## Key Configuration Notes

### next.config.mjs (Required)

```js
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 100],
  },
}

export default createMDX()(nextConfig)
```

### tailwind.config.ts (Existing Config Migration)

The Tailwind config from the current site's `<script>` tag migrates verbatim into `tailwind.config.ts`. All arch-* colors, font families, and custom animation keyframes are already defined — they just need to move from a CDN inline script to a proper config file. The `hover-pause` class (animation-play-state: paused on hover) goes into `globals.css` since it's a pseudo-class interaction.

### mdx-components.tsx (Required for @next/mdx in App Router)

At minimum, map `img` to `next/image` and any custom components used inside MDX files (Reveal, section layouts):

```tsx
import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'

export function useMDXComponents(): MDXComponents {
  return {
    img: (props) => <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props} />,
    Reveal,
  }
}
```

---

## Sources

- Next.js App Router Project Structure (official, 2026-02-27): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js MDX Configuration (official, 2026-02-27): https://nextjs.org/docs/app/guides/mdx
- Next.js Server and Client Components (official, 2026-02-27): https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js Image Component (official, 2026-02-27): https://nextjs.org/docs/app/api-reference/components/image
- Source codebase analysis: `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html` and case study HTML files (HIGH confidence — direct inspection)
