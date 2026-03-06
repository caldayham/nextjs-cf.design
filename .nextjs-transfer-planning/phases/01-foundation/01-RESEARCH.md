# Phase 1: Foundation - Research

**Researched:** 2026-03-01
**Domain:** Next.js 16 App Router scaffold, Tailwind CSS v3/v4 design-token migration, `next/font` self-hosted fonts, static asset migration, shared layout components (Nav, Footer, Reveal, SiteShell, Icons)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SETUP-01 | Next.js 16 App Router project initialized with TypeScript and Tailwind CSS v4 | `create-next-app` command documented; Tailwind v4 is the default; exact flags confirmed from official install docs |
| SETUP-02 | Tailwind config includes all arch-* colors, custom animations, and font families matching current site | Exact values extracted from `index.html` `<script>` tag; migration path to `globals.css @theme {}` documented |
| SETUP-03 | next/font self-hosts Inter (300-600) and Playfair Display (400-700 + italic) with zero layout shift | `next/font/google` pattern from official Next.js fonts guide; exact weights extracted from current Google Fonts CDN URL |
| SETUP-04 | All existing image assets migrated to public/ directory with correct paths | Asset directory structure enumerated; mobileImg() helper path logic documented |
| SETUP-05 | Branded 404 page exists at app/not-found.tsx | Standard Next.js App Router pattern; file convention documented |
| COMP-01 | Nav component renders identically — logo, menu items, case study dropdown, "Start Project" CTA | Full Nav JSX extracted from index.html lines 274-335; all state, event handlers, and classes captured |
| COMP-02 | Nav transitions from transparent to frosted background after 50px scroll | Exact scroll threshold (50px) and CSS classes extracted from index.html line 286 |
| COMP-03 | Footer component renders identically — contact info, social links, copyright | Full Footer JSX extracted from index.html lines 787-809 |
| COMP-04 | Reveal component triggers fade-in animation on scroll via IntersectionObserver with configurable delay | Full Reveal JSX extracted from index.html lines 165-186; threshold=0.1, once-only, delay prop |
| COMP-05 | All SVG icons ported as React components | All 16 icon SVG paths extracted from index.html lines 142-162; ArrowLeft from case study HTML line 83 |
| COMP-06 | SiteShell client wrapper manages inquiry modal state accessible from Nav, Hero, and sticky CTA | App component pattern extracted from index.html lines 811-831; `showInquiry` state, onInquiry callback pattern |
</phase_requirements>

---

## Summary

Phase 1 is a pure scaffold-and-extraction phase. No new visual design is invented — every value, class, animation, and SVG path is extracted verbatim from the existing `index.html` and ported into the Next.js project structure. The existing site's CDN `<script>` Tailwind config, `<style>` block CSS, icon SVGs, Nav/Footer/Reveal/Contact components, and all asset files are the single source of truth. The research task is primarily extraction and translation, not design decisions.

The most critical ordering constraint: Tailwind config and design tokens must be verified working before any component is written. The entire visual system (all `arch-*` color classes, all `animate-*` animation classes, all font classes) depends on correct config output. If the config is wrong, every subsequent visual verification is meaningless noise.

The second ordering constraint: asset paths must be resolved at scaffold time. All 79+ images must move from `assets/` to `public/assets/` and all references must switch from relative paths (`assets/foo.jpg`) to root-relative paths (`/assets/foo.jpg`). This prevents a class of 404 errors that would otherwise surface mid-development and corrupt every visual test.

**Primary recommendation:** Bootstrap with `create-next-app`, immediately port the Tailwind config, verify all `arch-*` colors and animations render in a test page, move all assets, then build Nav → Footer → Reveal → Icons → SiteShell in that order. Do not write any component until colors and animations are visually confirmed.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1 (latest) | App Router SSR/SSG framework | Explicit migration target; official Vercel deployment target; Turbopack default dev server |
| React | 19.2 (bundled) | UI runtime | Auto-included with Next.js 16; do not pin separately |
| TypeScript | 5.1+ | Type safety | Required by Next.js 16; included by `create-next-app` |
| Node.js | 20.9+ | Runtime | Minimum for Next.js 16; Node 18 is dropped |
| Tailwind CSS | v4 (latest) | Utility CSS | `create-next-app` default; CSS-based config in `globals.css` |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@tailwindcss/postcss` | latest | Tailwind v4 build integration | Required PostCSS plugin for Tailwind v4 in Next.js |
| `next/font/google` | built-in | Self-hosted font delivery | Inter + Playfair Display; zero-layout-shift, no Google CDN round-trip |
| `next/image` | built-in | Image optimization | All static assets (79+ images); WebP/AVIF, blur placeholder |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind v4 | Tailwind v3 (`tailwindcss@^3`) | v3 is safer if the @theme{} migration proves difficult; v4 is the forward path and the create-next-app default. STATE.md decision: attempt v4, fall back to v3 if unexpectedly complex |
| `next/font/google` | Google Fonts CDN `<link>` | CDN link causes FOUC and external network dependency; `next/font` is strictly better with no tradeoff |

**Installation:**
```bash
# Bootstrap (Node 20.9+ required)
npx create-next-app@latest cf-design --typescript --tailwind --app --turbopack

# No additional packages needed for Phase 1
# next/font and next/image are built-in
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 1 scope)

```
v3.cf.design/                          # Next.js project root
├── next.config.ts                     # Minimal config for Phase 1 (image formats)
├── tsconfig.json                      # TypeScript config (auto-generated)
├── postcss.config.mjs                 # { '@tailwindcss/postcss': {} }
├── public/
│   └── assets/
│       ├── cf-icon.png                # Favicon (referenced as /assets/cf-icon.png)
│       ├── cal-fynn-build.jpg
│       ├── cal-fynn-outdoor-design.jpg
│       ├── diagram_collage.jpg
│       ├── [other root-level assets]
│       ├── jobs/
│       │   ├── 25_perry_library.jpg
│       │   ├── [38 more job images]
│       │   └── mobile/
│       │       └── [21 mobile-optimized variants]
│       ├── reviews/
│       │   └── [17 review screenshot images]
│       └── mobile/
│           └── cal-fynn-outdoor-design.jpg
├── app/
│   ├── globals.css                    # @import 'tailwindcss'; @theme {}; .reveal-base; .no-scrollbar; .hover-pause; body defaults
│   ├── layout.tsx                     # Server: HTML shell, next/font vars on <html>, GoogleAnalytics stub, SiteShell wrapper
│   ├── page.tsx                       # Server: homepage stub (renders SiteShell content)
│   ├── not-found.tsx                  # Branded 404 page
│   └── icon.png                       # OR: keep favicon in public/assets/ and reference in layout metadata
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                    # 'use client' — scroll state, mobile menu, CS dropdown
│   │   ├── Footer.tsx                 # Server Component — static markup
│   │   └── SiteShell.tsx              # 'use client' — showInquiry state, renders Nav + children (+ InquiryModal in Phase 3)
│   └── ui/
│       ├── Icons.tsx                  # Server Component — all 16 SVG icon exports
│       └── Reveal.tsx                 # 'use client' — IntersectionObserver fade-in wrapper
└── data/
    └── case-studies.ts                # CASE_STUDIES nav dropdown data (needed by Nav)
```

### Pattern 1: Tailwind v4 Design Token Migration

**What:** Port the CDN inline `<script>` Tailwind config into `globals.css` `@theme {}` block. The CDN config syntax (`tailwind.config = { theme: { extend: {} } }`) does not work with installed Tailwind v4.

**When:** First task in Phase 1, before any component. Cannot write a single component with the correct colors until this is done.

**Exact values to port (from `index.html` lines 38-98):**

```css
/* app/globals.css */
@import 'tailwindcss';

@theme inline {
  /* Font families */
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);

  /* arch-* color palette */
  --color-arch-black: #121212;
  --color-arch-charcoal: #1A1A1A;
  --color-arch-mineral: #4A5D4F;
  --color-arch-stone: #E5E4E2;
  --color-arch-concrete: #F5F5F4;
  --color-arch-white: #FFFFFF;
  --color-arch-bronze: #8C7A6B;

  /* Custom animations */
  --animate-slow-zoom: zoom 30s infinite alternate;
  --animate-fade-in: fadeIn 1s ease-out forwards;
  --animate-fade-in-fast: fadeIn 0.2s ease-out forwards;
  --animate-scroll-up: scrollUp 120s linear infinite;
  --animate-scroll-down: scrollDown 120s linear infinite;
  --animate-scroll-left: scrollLeft 120s linear infinite;
  --animate-float: float 6s ease-in-out infinite;

  /* Background images */
  --background-image-noise: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E');
}

/* Custom keyframes — Tailwind v4 requires @keyframes outside @theme */
@keyframes zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes scrollUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes scrollDown {
  0% { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Global utility classes (from index.html <style> block, lines 100-132) */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

.reveal-base {
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

body {
  background-color: #F5F5F4;
  color: #252525;
}

select option {
  background-color: #1A1A1A;
  color: #E5E4E2;
}

.hover-pause:hover .animate-scroll-up,
.hover-pause:hover .animate-scroll-down {
  animation-play-state: paused;
}
```

**Tailwind v3 fallback (if v4 migration fails):** Create `tailwind.config.ts` with:

```typescript
// tailwind.config.ts (v3 syntax — use only if v4 @theme{} approach fails)
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        arch: {
          black: '#121212',
          charcoal: '#1A1A1A',
          mineral: '#4A5D4F',
          stone: '#E5E4E2',
          concrete: '#F5F5F4',
          white: '#FFFFFF',
          bronze: '#8C7A6B',
        },
      },
      animation: {
        'slow-zoom': 'zoom 30s infinite alternate',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.2s ease-out forwards',
        'scroll-up': 'scrollUp 120s linear infinite',
        'scroll-down': 'scrollDown 120s linear infinite',
        'scroll-left': 'scrollLeft 120s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        zoom: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.1)' } },
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scrollUp: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50%)' } },
        scrollDown: { '0%': { transform: 'translateY(-50%)' }, '100%': { transform: 'translateY(0)' } },
        scrollLeft: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      backgroundImage: {
        noise: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.05%22/%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
}

export default config
```

### Pattern 2: next/font Self-Hosted Fonts

**What:** Replace the Google Fonts CDN `<link>` tags with `next/font/google`. Apply CSS variables to `<html>` element; reference variables in Tailwind config.

**Exact weights from current Google Fonts URL (index.html line 35):**
- Inter: `wght@300;400;500;600` — weights 300, 400, 500, 600
- Playfair Display: `ital,wght@0,400;0,500;0,600;0,700;1,400` — italic axis, weights 400/500/600/700 regular + 400 italic

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-arch-mineral selection:text-white">
        {children}
      </body>
    </html>
  )
}
```

### Pattern 3: SiteShell Client Wrapper (COMP-06)

**What:** The App component in the current site (`index.html` lines 811-831) holds `showInquiry` state and passes `onInquiry` callbacks to Nav and Hero. In Next.js, `app/layout.tsx` must stay a Server Component. Extract the modal state into a `SiteShell` Client Component.

**Why this pattern:** `SiteShell` is mounted once in `layout.tsx` and persists across navigation. Modal state is never lost on route changes.

```tsx
// components/layout/SiteShell.tsx
'use client'
import { useState } from 'react'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

interface SiteShellProps {
  children: React.ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  const [showInquiry, setShowInquiry] = useState(false)
  const openInquiry = () => setShowInquiry(true)
  const closeInquiry = () => setShowInquiry(false)

  return (
    <div className="font-sans text-arch-charcoal bg-arch-concrete">
      <Nav onInquiry={openInquiry} />
      {/* Pass openInquiry to children via context or cloneElement — see Open Questions */}
      {children}
      {/* InquiryModal mounted here in Phase 3 */}
      <Footer />
    </div>
  )
}
```

**Note on Phase 1 scope:** In Phase 1, SiteShell renders Nav and Footer. The InquiryModal slot is left empty. Passing `openInquiry` to page children (Hero section) without prop-drilling through Server Components requires React context or a different pattern — this is the Open Question below.

### Pattern 4: Nav Component (COMP-01, COMP-02)

**Exact extraction from `index.html` lines 274-335:**

```tsx
// components/layout/Nav.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from '@/components/ui/Icons'
import { CASE_STUDIES } from '@/data/case-studies'

interface NavProps {
  onInquiry: () => void
}

export default function Nav({ onInquiry }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [csOpen, setCsOpen] = useState(false)
  const [mobileCsOpen, setMobileCsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-arch-black/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent py-4 md:py-6'
      }`}
    >
      {/* ... full JSX from index.html lines 286-334 */}
    </nav>
  )
}
```

**Key Nav behavior to preserve:**
- Logo `cf.design` scrolls to top on homepage; on case study pages it links to `/`
- Desktop nav: anchor hash links to homepage sections (`#purpose`, `#process`, etc.)
- Case Studies dropdown: hover on desktop, tap toggle on mobile; `min-w-[310px]`
- Scroll threshold: exactly `window.scrollY > 50` (line 280)
- Frosted background: `bg-arch-black/90 backdrop-blur-md border-b border-white/10`
- "Start Project" button: `border border-white text-white hover:bg-white hover:text-arch-black`
- Mobile menu: white overlay with `font-serif` links; "Inquiries" text (not "Start Project") calls `onInquiry`
- Safe area inset: `paddingTop: 'env(safe-area-inset-top, 0px)'` for iOS notch

### Pattern 5: Footer Component (COMP-03)

**Exact extraction from `index.html` lines 787-809:**

```tsx
// components/layout/Footer.tsx
// Server Component — no 'use client' needed
import { MapPin, Mail, Instagram, Home } from '@/components/ui/Icons'

export default function Footer() {
  return (
    <footer className="bg-arch-black text-arch-stone/40 py-12 border-t border-white/10 text-xs tracking-widest uppercase px-6">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin className="w-3.5 h-3.5" />
          <span>Serving San Mateo &amp; Santa Clara County</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            <a href="sms:+16505217269&body=I'm%20interested%20in%20" className="flex items-center gap-2 hover:text-white transition-colors">
              <span>Text: (650) 521-7269</span>
            </a>
            <a href="mailto:info@cf.design" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /><span>info@cf.design</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <a href="https://www.instagram.com/cf.design__/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Instagram className="w-3.5 h-3.5" /><span>@cf.design__</span>
            </a>
            <a href="https://nextdoor.com/page/cf-design" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /><span>Nextdoor</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <span>© 2026 Cal and Fynn Design Services</span>
          <div className="flex gap-4">
            <img src="/assets/cf-icon.png" className="h-6 opacity-50 grayscale" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Note:** Footer uses `<img>` not `next/image` for the icon — this is fine; it's a tiny PNG. Can upgrade to `<Image>` in Phase 5 if desired.

### Pattern 6: Reveal Component (COMP-04)

**Exact extraction from `index.html` lines 165-186 and case study HTML lines 88-103:**

```tsx
// components/ui/Reveal.tsx
'use client'
import { useRef, useState, useEffect } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    const current = domRef.current
    if (current) observer.observe(current)
    return () => { if (current) observer.unobserve(current) }
  }, [])

  return (
    <div
      ref={domRef}
      className={`reveal-base transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

**Key Reveal details:**
- `threshold: 0.1` — triggers when 10% of element is visible
- `observer.unobserve(entry.target)` — fires once only, then stops watching
- `translate-y-12` — slides up 3rem (48px) from starting position
- `reveal-base` class provides the easing: `transition: all 1s cubic-bezier(0.16, 1, 0.3, 1)` (must be in globals.css)
- `delay` is in milliseconds, applied via `style` not Tailwind (Tailwind delay classes have fixed values)

### Pattern 7: Icons Component (COMP-05)

**All 16 icon SVG paths from source HTML. The base `Icon` component (lines 142-146):**

```tsx
// components/ui/Icons.tsx
// Server Component — no client APIs needed
import React from 'react'

interface IconProps {
  className?: string
  size?: number
  [key: string]: unknown
}

const Icon = ({ children, className = '', size = 24, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={className}
    {...props}
  >
    {children}
  </svg>
)

// From index.html lines 148-162:
export const Menu = (props: IconProps) => (<Icon {...props}><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="18" y2="18" /></Icon>)
export const X = (props: IconProps) => (<Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>)
export const ArrowRight = (props: IconProps) => (<Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>)
export const ArrowDown = (props: IconProps) => (<Icon {...props}><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></Icon>)
// ArrowLeft from case-study HTML line 83 (not in index.html):
export const ArrowLeft = (props: IconProps) => (<Icon {...props}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></Icon>)
export const Check = (props: IconProps) => (<Icon {...props}><polyline points="20 6 9 17 4 12" /></Icon>)
export const MapPin = (props: IconProps) => (<Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>)
export const Mail = (props: IconProps) => (<Icon {...props}><rect width="20" height="16" x="2" y="4" rx="0" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Icon>)
export const ChevronDown = (props: IconProps) => (<Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>)
export const Layout = (props: IconProps) => (<Icon {...props}><rect width="18" height="18" x="3" y="3" rx="0" ry="0" /><line x1="3" x2="21" y1="9" y2="9" /><line x1="9" x2="9" y1="21" y2="9" /></Icon>)
export const PenTool = (props: IconProps) => (<Icon {...props}><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></Icon>)
export const FileText = (props: IconProps) => (<Icon {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></Icon>)
export const Hammer = (props: IconProps) => (<Icon {...props}><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" /><path d="M17.64 15 22 10.64" /><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V2.46V2a2 2 0 0 0-2-2H3v3.24c0 .85.33 1.66.93 2.26L5.18 6.76" /></Icon>)
export const Smile = (props: IconProps) => (<Icon {...props}><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></Icon>)
export const Instagram = (props: IconProps) => (<Icon {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></Icon>)
export const Home = (props: IconProps) => (<Icon {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></Icon>)
```

**Icon count:** 16 icons total (Menu, X, ArrowRight, ArrowDown, ArrowLeft, Check, MapPin, Mail, ChevronDown, Layout, PenTool, FileText, Hammer, Smile, Instagram, Home). `ArrowLeft` appears only in the case study HTML (line 83) — not in `index.html`. REQUIREMENTS.md COMP-05 lists it, so include it.

### Pattern 8: Asset Migration

**Current asset structure to migrate:**

```
assets/                                 →  public/assets/
├── cf-icon.png                         →  /assets/cf-icon.png
├── cal-fynn-build.jpg                  →  /assets/cal-fynn-build.jpg
├── cal-fynn-outdoor-design.jpg         →  /assets/cal-fynn-outdoor-design.jpg
├── diagram_collage.jpg                 →  /assets/diagram_collage.jpg
├── Day-ham-family.jpg                  →  /assets/Day-ham-family.jpg
├── Fynn-workshop.jpg                   →  /assets/Fynn-workshop.jpg
├── suzi-build-process.jpg              →  /assets/suzi-build-process.jpg
├── jobs/ (38+ files)                   →  /assets/jobs/
│   └── mobile/ (21 files)             →  /assets/jobs/mobile/
├── reviews/ (17 files)                 →  /assets/reviews/
└── mobile/ (1 file)                    →  /assets/mobile/
```

**mobileImg() helper — port this logic to TypeScript:**
```typescript
// Current (index.html line 261-265):
const mobileImg = (path) => {
    const parts = path.split('/');
    const filename = parts.pop();
    return [...parts, 'mobile', filename].join('/');
};

// Next.js version (root-relative paths):
export const mobileImg = (path: string): string => {
  // path = '/assets/jobs/25_perry_library.jpg'
  // returns: '/assets/jobs/mobile/25_perry_library.jpg'
  const parts = path.split('/')
  const filename = parts.pop()!
  return [...parts, 'mobile', filename].join('/')
}
```

**Migration command:**
```bash
cp -r /path/to/current/assets ./public/assets
```

### Pattern 9: 404 Page (SETUP-05)

**What:** Next.js App Router uses `app/not-found.tsx` for custom 404 pages.

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-arch-concrete flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-serif text-arch-black mb-6">Page Not Found</h1>
        <p className="text-arch-charcoal/70 mb-10 font-light">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-3 bg-arch-black text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-arch-charcoal transition-colors">
          Back Home
        </Link>
      </div>
    </div>
  )
}
```

### Anti-Patterns to Avoid

- **`'use client'` on layout.tsx or page.tsx:** Kills SSR for the entire app. Keep these as Server Components. Only `SiteShell`, `Nav`, and `Reveal` in Phase 1 get `'use client'`.
- **Inline `<style>` tags in JSX:** Move all custom CSS to `globals.css`. The `.reveal-base`, `.no-scrollbar`, `.hover-pause`, `body`, and `select option` rules from the current `<style>` block must all live in `globals.css`. Inline JSX styles cause hydration mismatches.
- **Relative asset paths:** Never `src="assets/foo.jpg"`. Always `src="/assets/foo.jpg"` (root-relative). The leading slash is mandatory in Next.js.
- **CDN `<link>` for fonts:** Do not copy the Google Fonts `<link>` tags. Use `next/font/google` exclusively.
- **Importing `window` in Server Components:** `Nav.tsx` uses `window.scrollY` and `window.addEventListener` — these are safe inside a `useEffect` in a `'use client'` component but would crash a Server Component.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Self-hosted fonts with zero layout shift | Custom font-face + preload logic | `next/font/google` | Built-in, handles font subsetting, display swap, variable injection |
| SVG icon system | Third-party icon package | Custom `Icons.tsx` (Pattern 7) | 16 specific custom icons; zero dependency overhead; exact stroke/join values from source |
| Scroll-based CSS animations | JS-driven animation library | CSS keyframes in `globals.css` | Existing site uses pure CSS; no JS overhead; `animate-scroll-up` etc. are in the Tailwind config |
| IntersectionObserver boilerplate | useIntersectionObserver hook library | The Reveal component (Pattern 6) | 25 lines; simple; direct port; no library overhead |

**Key insight:** Phase 1 has almost no library decisions to make. Every implementation detail is dictated by the existing HTML source. The job is extraction and translation, not design.

---

## Common Pitfalls

### Pitfall 1: Tailwind @theme{} Keyframe Placement

**What goes wrong:** In Tailwind v4, `@keyframes` blocks placed inside `@theme {}` silently fail. The animation names are registered but the keyframe steps are not compiled.

**Why it happens:** `@theme {}` is a design-token namespace, not a raw CSS block. Only custom property declarations (`--color-*`, `--animate-*`) belong inside it.

**How to avoid:** Place `@keyframes` rules OUTSIDE the `@theme {}` block, directly in `globals.css`. The `--animate-*` values inside `@theme` reference the keyframe names, which are defined separately.

**Warning signs:** Animation classes exist in computed styles but elements don't actually animate.

### Pitfall 2: `next/font` Weight Array Must Match Exact Available Weights

**What goes wrong:** If a weight is specified in `next/font` that Google Fonts doesn't provide for that font family, the build fails with a cryptic font loader error.

**Why it happens:** `next/font` validates weights against the Google Fonts API at build time.

**How to avoid:** Use exactly the weights present in the current CDN URL: Inter `['300', '400', '500', '600']`; Playfair Display `['400', '500', '600', '700']` with `style: ['normal', 'italic']`.

**Warning signs:** Build error mentioning `Invalid font weight` or `Font not found`.

### Pitfall 3: Asset Path 404s

**What goes wrong:** Any image reference that doesn't start with `/` returns 404 in Next.js. The current site uses paths like `assets/jobs/foo.jpg` (no leading slash) everywhere — VIBE_IMAGES, REVIEWS, PORTFOLIO_ITEMS, mobileImg() output, Footer icon, Purpose section image, Process step images.

**Why it happens:** `public/` directory contents are served at the URL root. `assets/foo.jpg` (relative) resolves relative to the current page URL. `/assets/foo.jpg` (root-relative) resolves from the server root.

**How to avoid:** Move all assets to `public/assets/` first. Then do a project-wide find on `assets/` to catch every occurrence, and update all data arrays and component src values to use `/assets/`.

**Warning signs:** All images show 404 in the browser network tab; broken image icons everywhere.

### Pitfall 4: `bg-noise` Custom Background Must Survive Tailwind Purging

**What goes wrong:** The `bg-noise` class uses an inline SVG data URL defined in the Tailwind config. If the class only appears in a `<style>` block (not in JSX `className`), Tailwind's content scanning purges it from the output CSS.

**Why it happens:** Tailwind scans files listed in `content` config for class strings. It does not scan CSS files for class usage.

**How to avoid:** Always use `bg-noise` as a `className` string on a JSX element (e.g., `<section className="bg-arch-concrete bg-noise">`). The current site uses it on Purpose and Portfolio sections — port these usages directly.

**Warning signs:** Sections that should have the subtle noise texture show as flat solid colors.

### Pitfall 5: SiteShell Cannot Pass openInquiry to Server Component Children

**What goes wrong:** `SiteShell` holds `showInquiry` state and needs to pass `openInquiry` to the Hero section (Phase 2). But Hero is a Server Component. Server Components cannot receive function props from Client Components.

**Why it happens:** Functions are not serializable — they cannot cross the server/client boundary as props.

**How to avoid (two options):**
- Option A: Make Hero a Client Component (simplest, but Hero has a lot of static content that would then be bundled client-side).
- Option B: Create a React context in SiteShell, wrap children with a provider, and consume in Hero (Hero must still be `'use client'` to consume context).
- Option C: Pass the `openInquiry` handler only to Nav (which is already `'use client'`), and implement sticky CTA separately in Hero as its own Client Component that creates its own scroll handler.

**Phase 1 recommendation:** In Phase 1, SiteShell just renders `Nav` and `Footer` with no page-level content. This issue surfaces in Phase 2 when Hero is built. Plan for Option C (Hero as a Client Component for its sticky CTA functionality) — this is consistent with ARCHITECTURE.md which already marks Hero as `'use client'`.

**Warning signs:** TypeScript error "functions are not valid as a React child" when trying to pass `openInquiry` as a prop through a Server Component.

### Pitfall 6: Nav Logo Behavior Differs Between Homepage and Case Study Pages

**What goes wrong:** On the homepage, `cf.design` logo scrolls to top (`window.scrollTo({ top: 0, behavior: 'smooth' })`). On case study pages, it links to `/`.

**Why it happens:** The existing site has two different Nav implementations (one per page). The migration uses a single Nav component.

**How to avoid:** Use `usePathname()` from `next/navigation` inside the Nav Client Component to detect the current route:
```tsx
const pathname = usePathname()
const logoElement = pathname === '/'
  ? <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer ...">cf.design</span>
  : <Link href="/" className="...">cf.design</Link>
```

**Warning signs:** Logo on case study pages scrolls the current page to top instead of navigating home.

### Pitfall 7: Tailwind v4 `@theme inline` vs `@theme`

**What goes wrong:** Using `@theme` instead of `@theme inline` for font variable references causes Tailwind to generate BOTH the CSS custom property AND a duplicate utility class, leading to selector specificity conflicts.

**Why it happens:** `@theme inline` tells Tailwind v4 to use the CSS variables inline in utilities rather than generating separate custom properties.

**How to avoid:** Use `@theme inline` (with the `inline` keyword) when registering font variables that reference CSS custom properties set by `next/font`. Use `@theme` (without `inline`) for standalone color values that don't reference other CSS variables. In practice for this project: use `@theme inline` for the entire block.

**Warning signs:** Font utilities apply but font doesn't change; dev tools show `font-family: var(--font-inter)` resolving to an empty string.

---

## Code Examples

### Root Layout (complete for Phase 1)

```tsx
// app/layout.tsx
// Source: next/font/google pattern from official Next.js fonts guide (v16.1.6)
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import SiteShell from '@/components/layout/SiteShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Custom local quality construction!',
  description: 'Constructing beautiful solutions in San Mateo & Santa Clara County.',
  icons: { icon: '/assets/cf-icon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-arch-mineral selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
```

### Case Studies Data Module

```typescript
// data/case-studies.ts
export interface CaseStudy {
  title: string
  href: string
}

export const CASE_STUDIES: CaseStudy[] = [
  { title: "Perry's Little Library", href: '/case-studies/palo-alto-redwood-little-library' },
  { title: "Michelle's Walnut Tables", href: '/case-studies/palo-alto-walnut-marble-tables' },
]
```

**Note:** Hrefs use root-relative paths without trailing slashes (`/case-studies/...`). The current site uses relative paths with trailing slashes (`case-studies/palo-alto-redwood-little-library/`). This is the correct Next.js form.

### Minimal next.config.ts for Phase 1

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: false,  // Next.js default; URLs match /case-studies/slug (no trailing slash)
}

export default nextConfig
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` (JS config file) | `globals.css @theme {}` (CSS config) | Tailwind v4 | All custom tokens now in CSS; no JS config file by default |
| `@tailwind base/components/utilities` | `@import 'tailwindcss'` | Tailwind v4 | Single import replaces three directives |
| `priority` prop on `next/image` | `preload` prop on `next/image` | Next.js 16 | `priority` is deprecated; use `preload` for above-fold images |
| Google Fonts `<link>` in `<head>` | `next/font/google` | Next.js 13+ | Self-hosted at build time; no network dependency at runtime |
| `tailwind.config.js` `content` array | CSS-based scanning (auto-detected) | Tailwind v4 | No `content` config needed; v4 auto-detects files |

**Deprecated/outdated:**
- `priority` on `next/image`: deprecated in Next.js 16 — use `preload` instead (affects Phase 2 hero images; not Phase 1)
- `@tailwind base; @tailwind components; @tailwind utilities`: replaced by `@import 'tailwindcss'` in v4
- `tailwind.config.js` as primary config location: replaced by `@theme {}` in `globals.css` in v4

---

## Open Questions

1. **Tailwind v4 `@theme inline` vs standalone `@theme` for keyframe animation registration**
   - What we know: `--animate-scroll-up: scrollUp 120s linear infinite` syntax is documented for v4
   - What's unclear: Whether `@keyframes` names referenced in `--animate-*` must be registered before the `@theme` block or can follow it in the CSS file
   - Recommendation: Define `@keyframes` before the `@theme {}` block to be safe; verify with a single test animation during SETUP-02 before adding all keyframes

2. **`@theme inline` font variable chain with next/font**
   - What we know: `next/font` adds CSS custom properties (e.g., `--font-inter`) to `:root`. `@theme inline { --font-sans: var(--font-inter); }` should make `font-sans` utilities resolve to the self-hosted font.
   - What's unclear: Whether `@theme inline` font variable chain works correctly in all Tailwind v4 builds or has edge cases
   - Recommendation: Test with a single `<p className="font-serif">` element after SETUP-02 and SETUP-03 to confirm Playfair Display is loading before proceeding

3. **openInquiry prop passing from SiteShell to page children (Hero)**
   - What we know: Server Components cannot receive function props from Client Components directly
   - What's unclear: Whether React context (created in SiteShell) is the cleanest approach or whether making Hero a full Client Component is simpler
   - Recommendation: Defer to Phase 2. In Phase 1, SiteShell only manages Nav + Footer. The Hero integration pattern is a Phase 2 decision.

4. **Trailing slash URL behavior for existing bookmarked/indexed case study URLs**
   - What we know: Current URLs have trailing slashes (index.html in subdirectory). Next.js defaults to no trailing slash.
   - What's unclear: Whether existing Google index entries point to `/case-studies/slug/` (with slash). If they do, adding `trailingSlash: true` to next.config prevents 301 redirect loops.
   - Recommendation: Add `trailingSlash: true` to next.config in Phase 1 as a conservative default. This matches the existing URL structure and prevents any SEO regression from 301 redirects.

---

## Sources

### Primary (HIGH confidence)

- Next.js installation guide (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/installation — `create-next-app` flags, TypeScript default, Turbopack flag
- Next.js fonts guide (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/fonts — `next/font/google` API, variable pattern, `@theme inline` integration
- Next.js CSS/Tailwind guide (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/css — Tailwind v4 `@import 'tailwindcss'`, `@theme {}` block
- Next.js Server and Client Components (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/getting-started/server-and-client-components — `'use client'` propagation rules, children prop pattern
- Tailwind v3 → v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide — `@theme {}` migration, breaking changes
- **Direct source inspection** (HIGH confidence): `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html` (lines 38-162, 274-335, 787-831) — all exact color values, animation durations, keyframe percentages, icon SVG paths, Nav/Footer/Reveal JSX, App component pattern
- **Direct source inspection** (HIGH confidence): `/Users/caldayham/Desktop/cf.design/v3.cf.design/case-studies/palo-alto-redwood-little-library/index.html` (lines 83, 112-146) — ArrowLeft icon SVG, case study Nav behavior

### Secondary (MEDIUM confidence)

- `.planning/research/STACK.md` — Tailwind v4 config patterns, next/font weight syntax, verified against official docs 2026-03-01
- `.planning/research/ARCHITECTURE.md` — SiteShell pattern, component boundary decisions, data module structure
- `.planning/research/PITFALLS.md` — 15 specific pitfalls, all verified against official Next.js 16 docs

### Tertiary (LOW confidence)

- Tailwind v4 `@keyframes` placement relative to `@theme {}` — inferred from Tailwind docs structure; not explicitly documented as a sequencing requirement. Flag for manual verification during SETUP-02.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all package versions and flags from official Next.js 16 install docs; confirmed in project research
- Architecture: HIGH — direct source code extraction; component boundaries verified against official Server/Client Component docs
- Design tokens: HIGH — all values extracted verbatim from `index.html` `<script>` tag (lines 38-98); zero inference
- Icons: HIGH — all 16 SVG paths extracted verbatim from source HTML; ArrowLeft confirmed in case study HTML
- Pitfalls: HIGH — all pitfalls sourced from official docs or direct source code analysis in prior research phase

**Research date:** 2026-03-01
**Valid until:** 2026-04-01 (stable ecosystem; 30-day validity)
