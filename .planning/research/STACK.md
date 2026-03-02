# Technology Stack

**Project:** CF Design — Next.js Migration
**Researched:** 2026-03-01
**Sources:** Next.js official docs (v16.1.6, last updated 2026-02-27), verified via WebFetch

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.1 (latest) | Full-stack React framework | App Router gives SSR/SSG per page, Turbopack for fast dev, natural Vercel deployment target. This is the explicitly stated migration target |
| React | 19.2 (canary bundled with Next.js) | UI runtime | Included automatically with App Router — do not pin separately beyond `react@latest` |
| TypeScript | 5.1+ | Type safety | Required by Next.js 16+, included by default in `create-next-app`, eliminates a whole class of bugs during migration |
| Node.js | 20.9+ | Runtime | **Minimum required by Next.js 16**. Node 18 is dropped. Verify your dev environment before starting |

**Confidence:** HIGH — all version requirements sourced from official Next.js 16 blog post and installation docs.

---

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4 (latest) | Utility CSS framework | The current site already uses Tailwind via CDN. v4 is the default in `create-next-app` as of Next.js 16, and uses a CSS-based config instead of `tailwind.config.js` |
| `@tailwindcss/postcss` | latest | Build integration | Required PostCSS plugin for Tailwind v4 with Next.js — replaces the old `tailwindcss` PostCSS plugin |
| `@tailwindcss/typography` | latest | MDX prose styling | Provides `prose` classes for MDX case study content. Still referenced in official Next.js MDX docs |

**CRITICAL: Tailwind v4 breaking changes vs. current CDN usage:**
- No `tailwind.config.js` by default. Theme customization moves into `globals.css` via `@theme { --color-* }` directives
- Replace `@tailwind base/components/utilities` with a single `@import "tailwindcss"`
- Custom arch-* color palette must be defined as CSS variables in `@theme` block, not in JS config
- The `theme()` CSS function still works but is discouraged in v4 — use `var(--color-*)` instead
- Shadow names changed (`shadow` → `shadow-sm`, `shadow-sm` → `shadow-xs`)
- Ring default width changed from 3px to 1px
- Use automated migration: `npx @tailwindcss/upgrade`

**Confidence:** HIGH for v4 being current standard. MEDIUM for exact migration impact on arch-* custom colors (test early).

---

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/font/google` | built-in | Self-hosting Inter + Playfair Display | Zero-layout-shift font loading, no external requests to Google, built into Next.js — no separate install |

**Usage pattern (Tailwind v4):**

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

```css
/* globals.css */
@import 'tailwindcss';

@theme inline {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
  /* arch-* custom colors */
  --color-arch-black: #121212;
  --color-arch-charcoal: #1A1A1A;
  --color-arch-mineral: #4A5D4F;
  --color-arch-stone: #E5E4E2;
  --color-arch-concrete: #F5F5F4;
  --color-arch-bronze: #8C7A6B;
}
```

**Confidence:** HIGH — pattern verified directly from official Next.js fonts documentation (v16.1.6, 2026-02-27).

---

### Images

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `next/image` | built-in | All 79 site images | Automatic WebP/AVIF conversion, responsive srcsets, blur placeholder, lazy loading — zero extra dependencies |

**Configuration for this project:**

```js
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF preferred, WebP fallback
    qualities: [75, 85],                    // Allowed quality values
    minimumCacheTTL: 2678400,               // 31 days for static portfolio images
  },
}
```

**Notes:**
- Use `placeholder="blur"` for static imports (auto-generates blurDataURL from local images)
- Hero images: use `preload` (replaces deprecated `priority` prop in Next.js 16)
- The `priority` prop is deprecated in Next.js 16 — use `preload` instead
- The `quality` prop now coerces to nearest value in `images.qualities` array (Next.js 16 change)

**Confidence:** HIGH — sourced from official next/image API reference (v16.1.6, 2026-02-27).

---

### MDX (Case Studies)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/mdx` | latest | MDX compilation | Official Next.js integration, works with App Router Server Components |
| `@mdx-js/loader` | latest | Webpack/Turbopack loader | Required peer dependency for `@next/mdx` |
| `@mdx-js/react` | latest | React context provider | Required for component mapping in App Router |
| `@types/mdx` | latest | TypeScript types | Type safety for MDX imports |
| `remark-gfm` | latest | GitHub-Flavored Markdown | Tables, task lists, strikethrough — standard for content writing |

**CRITICAL — Turbopack compatibility:** When using Turbopack (now the default in Next.js 16), remark/rehype plugins must be passed as **strings**, not function references. JavaScript functions cannot be passed to the Rust-based Turbopack.

```js
// next.config.mjs — Turbopack-compatible MDX config
import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      'remark-gfm',  // String, not: [remarkGfm]
    ],
    rehypePlugins: [],
  },
})

export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
})
```

**Case study routing pattern:**

```
content/
  case-studies/
    kitchen-remodel.mdx
    bathroom-renovation.mdx
app/
  case-studies/
    [slug]/
      page.tsx        ← dynamic import from @/content/case-studies/[slug].mdx
  mdx-components.tsx  ← REQUIRED file at app root
```

**Confidence:** HIGH — sourced from official Next.js MDX guide (v16.1.6, 2026-02-27).

---

### Animations

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `framer-motion` | latest | Scroll animations, fade-ins, entrance effects, marquee | Declarative React animation API; handles IntersectionObserver-based reveals cleanly; carousel drag gesture support; widely used in Next.js portfolio sites |

**IMPORTANT — Server Components boundary:** Framer Motion components require `'use client'`. Wrap animation components in client boundaries. Do not animate server components directly.

**Pattern for this project's animations:**

```tsx
'use client'
import { motion } from 'framer-motion'

// Scroll reveal (replaces manual IntersectionObserver)
export function RevealOnScroll({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Slow Ken Burns zoom for hero images
export function SlowZoom({ children }) {
  return (
    <motion.div
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
    >
      {children}
    </motion.div>
  )
}
```

**Note:** Framer Motion was rebranding to `motion` (package name `motion` on npm). As of my research, the `framer-motion` package still exists and is widely used. The `motion` package is the new unified package. Both provide the same API. Use `framer-motion` unless you find a specific reason to prefer `motion` — the `framer-motion` package has broader ecosystem familiarity and more community examples.

**Confidence:** MEDIUM — Framer Motion core API is HIGH confidence, but the `framer-motion` vs `motion` package status could not be directly verified via npm (WebFetch was restricted for npmjs.com). Recommend checking `npm info framer-motion` before starting.

---

### Analytics

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `@next/third-parties` | latest | Google Analytics 4 integration | Official Next.js package, loads GA after hydration to avoid blocking LCP, correct pattern for App Router |

```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXX" />
    </html>
  )
}
```

**Why not raw `gtag.js` in `<Script>`:** The `@next/third-parties` component handles script loading strategy, avoids hydration warnings, and auto-tracks client-side navigations — which matter for SPA-style page transitions.

**Confidence:** HIGH — sourced from official Next.js third-party libraries guide (v16.1.6, 2026-02-27).

---

### Forms

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Formspree | existing | Inquiry/contact form submission | Already integrated and working. No backend changes in scope. Keep as-is, just port the HTML form to a React component |

**Migration note:** The form HTML with `action="https://formspree.io/f/..."` works as a plain HTML form. In Next.js, wrap it in a React component with controlled or uncontrolled inputs. No Formspree package needed — the native form POST to Formspree's endpoint is sufficient.

**Confidence:** HIGH — no changes needed, carry-over from existing site.

---

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | N/A (platform) | Hosting + CI/CD | Natural deployment target for Next.js; auto-detects Next.js builds, handles image optimization API, zero-config CDN, edge caching. User's stated choice |

**Confidence:** HIGH — user's explicit choice, optimal pairing with Next.js.

---

## Alternatives Considered and Rejected

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| MDX integration | `@next/mdx` | `next-mdx-remote` | `next-mdx-remote` is for remote/CMS-fetched MDX. This project uses local files — `@next/mdx` compiles at build time, produces zero runtime overhead, and is the official Next.js approach |
| MDX integration | `@next/mdx` | Contentlayer | Contentlayer is unmaintained as of 2024, its maintainer archived the project. Do not use |
| CSS | Tailwind v4 | Tailwind v3 | v3 is available (`tailwindcss@^3`) for broader old-browser support, but this portfolio targets modern browsers. The site's current CDN already uses Tailwind v3 syntax so migration effort exists either way — v4 is the forward-looking choice |
| Animation | `framer-motion` | GSAP | GSAP has a more complex licensing model for commercial use. Framer Motion is MIT-licensed, React-native, and lighter for declarative entrance animations. GSAP's strength is timeline-based animations this project doesn't need |
| Animation | `framer-motion` | CSS-only (Tailwind `animate-*`) | CSS animations cannot respond to scroll position or viewport entry without JavaScript. The existing site already uses IntersectionObserver for reveal animations — Framer Motion's `whileInView` is a direct 1:1 replacement |
| Animation | `framer-motion` | `react-intersection-observer` + manual CSS | Works, but requires more boilerplate. Framer Motion covers this use case plus the marquee and carousel gestures in a single dependency |
| Font loading | `next/font` | Google Fonts `<link>` tag | Direct `<link>` creates external network requests, causes layout shift, and is discouraged by Next.js. `next/font` self-hosts at build time with zero layout shift |
| Analytics | `@next/third-parties` | Manual `<Script>` with gtag.js | Works, but requires manual handling of hydration and page tracking. `@next/third-parties` is the idiomatic Next.js solution |

---

## Installation Commands

```bash
# Bootstrap (Node 20.9+ required)
npx create-next-app@latest cf-design --typescript --tailwind --app --turbopack

# MDX support
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm

# MDX content styling
npm install @tailwindcss/typography

# Animations
npm install framer-motion

# Analytics
npm install @next/third-parties
```

**Note:** `next/font`, `next/image`, and `@next/mdx` are all part of the Next.js ecosystem and do not require separate versioning from Next.js itself. Install with `@latest` and they track the Next.js version.

---

## Configuration Files Overview

```
cf-design/
├── next.config.mjs         ← MDX setup, image formats, Turbopack config
├── tsconfig.json           ← TypeScript config (strict mode recommended)
├── postcss.config.mjs      ← Tailwind v4: { '@tailwindcss/postcss': {} }
├── app/
│   ├── globals.css         ← @import 'tailwindcss'; + @theme { custom colors/fonts }
│   ├── layout.tsx          ← next/font setup, GoogleAnalytics
│   └── mdx-components.tsx  ← REQUIRED for @next/mdx with App Router
└── content/
    └── case-studies/       ← .mdx files live here
```

---

## Version Freshness Notes

| Finding | Confidence | How Verified |
|---------|------------|--------------|
| Next.js 16.1 is current stable | HIGH | Official Next.js blog (nextjs.org/blog, Feb 2026) |
| Tailwind CSS v4 is the Next.js default | HIGH | Official Next.js CSS guide (v16.1.6, 2026-02-27) |
| `@tailwindcss/postcss` is the install package for v4 | HIGH | Official Next.js CSS guide code sample |
| Tailwind v4 CSS-based config, not `tailwind.config.js` | HIGH | Official Tailwind upgrade guide via WebFetch |
| `@next/mdx` is the recommended MDX approach for local files | HIGH | Official Next.js MDX guide (v16.1.6) |
| Turbopack requires string-form remark plugins | HIGH | Official Next.js MDX guide note |
| `next/font` variable + Tailwind `@theme inline` pattern | HIGH | Official Next.js fonts guide (v16.1.6) |
| `@next/third-parties` for Google Analytics | HIGH | Official Next.js third-party guide (v16.1.6) |
| `framer-motion` package name and API | MEDIUM | Based on training data knowledge; npm page inaccessible during research |
| `@tailwindcss/typography` compatibility with v4 | MEDIUM | Referenced in official Next.js MDX docs but v4-specific install not shown |
| Node.js 20.9+ required for Next.js 16 | HIGH | Official Next.js 16 blog post |

---

## Sources

- Next.js 16 release blog: https://nextjs.org/blog/next-16 (Oct 21, 2025)
- Next.js 16.1 release blog: https://nextjs.org/blog/next-16-1 (Dec 18, 2025)
- Next.js installation docs: https://nextjs.org/docs/app/getting-started/installation (v16.1.6, 2026-02-27)
- Next.js CSS guide: https://nextjs.org/docs/app/getting-started/css (v16.1.6, 2026-02-27)
- Next.js fonts guide: https://nextjs.org/docs/app/getting-started/fonts (v16.1.6, 2026-02-27)
- Next.js MDX guide: https://nextjs.org/docs/app/guides/mdx (v16.1.6, 2026-02-27)
- Next.js image component: https://nextjs.org/docs/app/api-reference/components/image (v16.1.6, 2026-02-27)
- Next.js third-party libraries: https://nextjs.org/docs/app/guides/third-party-libraries (v16.1.6, 2026-02-27)
- Tailwind v3 → v4 upgrade guide: https://tailwindcss.com/docs/upgrade-guide (fetched 2026-03-01)
