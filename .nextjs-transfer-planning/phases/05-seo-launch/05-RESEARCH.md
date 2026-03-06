# Phase 5: SEO & Launch - Research

**Researched:** 2026-03-02
**Domain:** Next.js App Router metadata API, next/image optimization, Vercel deployment
**Confidence:** HIGH

---

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | All page content visible in HTML source (server-rendered, not client-only) | App Router Server Components render to HTML by default; verify no client-only content islands hide text |
| SEO-02 | Open Graph tags on all pages with correct titles, descriptions, and preview images | Next.js `metadata` object / `generateMetadata` function — exports `openGraph` field inline |
| SEO-03 | sitemap.xml auto-generated from all routes | `app/sitemap.ts` file convention — `MetadataRoute.Sitemap` return type |
| SEO-04 | robots.txt allows crawling of all public pages | `app/robots.ts` file convention — `MetadataRoute.Robots` return type |
| SEO-05 | JSON-LD LocalBusiness structured data on homepage | `<script type="application/ld+json">` injected in `app/page.tsx` Server Component |
| SEO-06 | All images use next/image with automatic WebP/AVIF optimization | `next.config.ts` already has `formats: ['image/avif', 'image/webp']`; audit existing Image usages |
| SEO-07 | Hero images use priority/preload loading for fast LCP | `priority` is deprecated in Next.js 16 — use `preload={true}` on the single LCP image |
| SEO-08 | Portfolio and gallery images use responsive sizes prop | `sizes` prop generates full `srcset`; add appropriate breakpoint strings |
| SEO-09 | Images use blur placeholders for progressive loading | Dynamic/remote images require explicit `blurDataURL`; static imports get it automatically |
| DEPL-01 | Site deploys to Vercel with zero-config Next.js support | Vercel auto-detects Next.js; push repo, connect project, deploy |
| DEPL-02 | All routes match current URL structure (no broken links) | `trailingSlash: true` already set in `next.config.ts`; verify slug routes resolve |

</phase_requirements>

---

## Summary

This phase has two concerns: SEO metadata completeness and image performance. The project is already well-positioned because the App Router renders Server Components to HTML by default (SEO-01 is largely satisfied), `next/image` is already in use across all components, and `trailingSlash: true` is already set. The remaining work is additive: wire up metadata exports, add file-based sitemap/robots, inject JSON-LD, and apply image props (`preload`, `sizes`, `placeholder="blur"`) that were deferred in earlier phases.

Deployment to Vercel is zero-config for Next.js. The only configuration gap that could cause surprises is the `qualities` field in `next.config.ts` — Next.js 16 changed the default to `[75]` only, which may raise a build warning or error if other quality values are used.

The critical correctness requirement for SEO-01 is that no page-level content is hidden inside a `'use client'` component that doesn't server-render. The existing architecture uses Server Components for all content-heavy sections (Purpose, Process, Portfolio, Reviews, FAQ, CaseStudyLayout), so SSR is intact by design.

**Primary recommendation:** Use Next.js built-in file conventions for sitemap/robots (no external libraries), use the `metadata` object for static pages and `generateMetadata` for dynamic slug pages (already wired in Phase 4), add `preload` to hero Image components, add `sizes` to fill-based images, and generate `blurDataURL` values for remote/dynamic images using a simple inline base64 or the plaiceholder library.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next/image | 16.1.6 (built-in) | Image optimization, WebP/AVIF, srcset | Built into Next.js; handles format negotiation, lazy loading, layout shift prevention |
| Next.js metadata API | 16.1.6 (built-in) | `<head>` tags, Open Graph, canonical URLs | Zero-config, type-safe, merges across layout/page segments |
| app/sitemap.ts | 16.1.6 (built-in) | Generates /sitemap.xml | File convention; no library needed |
| app/robots.ts | 16.1.6 (built-in) | Generates /robots.txt | File convention; no library needed |
| JSON-LD inline script | native | Structured data for search engines | Official Next.js recommendation: `<script dangerouslySetInnerHTML>` in Server Component |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| schema-dts | latest | TypeScript types for schema.org | Optional type safety on JSON-LD objects; lightweight, no runtime |
| plaiceholder | latest | Generate blurDataURL from image at build time | Use if blur placeholders are needed on remote/dynamic images beyond simple base64 solid color |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| app/sitemap.ts | next-sitemap (npm) | next-sitemap adds config complexity and is post-build; the built-in convention is simpler for a 4-route site |
| Inline JSON-LD script | next-seo | next-seo is a valid option but adds a dependency; the built-in pattern (official docs) is sufficient and has no runtime cost |
| Manual blurDataURL | plaiceholder | plaiceholder is server-side and generates high-quality blur; manual solid-color base64 is adequate for most images |

**Installation:** No new packages required. `schema-dts` is optional type-only.

```bash
# Optional only
npm install --save-dev schema-dts
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx           # Root metadata (metadataBase, title template, default OG)
├── page.tsx             # Homepage metadata export + JSON-LD script
├── sitemap.ts           # NEW: MetadataRoute.Sitemap function
├── robots.ts            # NEW: MetadataRoute.Robots function
├── case-studies/
│   └── [slug]/
│       └── page.tsx     # Already has generateMetadata — extend with openGraph
├── thank-you/
│   └── page.tsx         # Already has metadata export — extend with openGraph
components/
├── home/
│   └── Hero.tsx         # Add preload={true} to first hero image
│   └── Portfolio.tsx    # Add sizes prop to PortfolioCard images
│   └── Reviews.tsx      # Verify lazy loading (already present)
├── case-studies/
│   └── CaseStudyLayout.tsx  # Add preload to heroImage; sizes already present on fill images
```

### Pattern 1: Static Metadata Export (layout.tsx and page.tsx)

**What:** Export a typed `Metadata` object from a Server Component file.
**When to use:** Pages where title/description are hardcoded (homepage, thank-you).
**Example:**

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/layout.tsx — sets metadataBase and title template for all routes
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://cf.design'),
  title: {
    default: 'CF Design — Custom Construction in the Bay Area',
    template: '%s | CF Design',
  },
  description: 'Constructing beautiful solutions in San Mateo & Santa Clara County.',
  openGraph: {
    siteName: 'CF Design',
    locale: 'en_US',
    type: 'website',
    images: ['/assets/cal-fynn-build.jpg'], // relative OK with metadataBase set
  },
}
```

```typescript
// app/page.tsx — homepage-specific metadata; openGraph inherits and extends layout
export const metadata: Metadata = {
  title: 'CF Design — Custom Construction in the Bay Area',
  description: 'Cal & Fynn build custom woodwork, decks, and garden structures in Palo Alto and the Bay Area.',
  openGraph: {
    title: 'CF Design — Custom Construction in the Bay Area',
    description: 'Cal & Fynn build custom woodwork, decks, and garden structures in Palo Alto and the Bay Area.',
    images: [{ url: '/assets/cal-fynn-build.jpg', width: 1200, height: 630 }],
  },
}
```

### Pattern 2: generateMetadata for Dynamic Routes

**What:** Async function that reads route params and returns `Metadata`. Already present in `app/case-studies/[slug]/page.tsx` — needs to be extended with `openGraph`.
**When to use:** Slug-based pages where title/image differ per route.
**Example:**

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/case-studies/[slug]/page.tsx — extend existing generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await import(`@/content/case-studies/${slug}.mdx`)
  return {
    ...metadata,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [{ url: metadata.heroImage ?? '/assets/cal-fynn-build.jpg', width: 1200, height: 630 }],
      type: 'article',
    },
  }
}
```

### Pattern 3: sitemap.ts

**What:** File placed at `app/sitemap.ts` that returns an array of URL objects. Next.js serves it at `/sitemap.xml`.
**When to use:** Always — required for SEO-03.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cf.design/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cf.design/case-studies/palo-alto-redwood-little-library/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://cf.design/case-studies/palo-alto-walnut-marble-tables/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
  // NOTE: thank-you page is excluded — it is a conversion confirmation, not indexable content
}
```

**Important:** With `trailingSlash: true` in `next.config.ts`, all URLs in the sitemap MUST have trailing slashes to match the actual served routes.

### Pattern 4: robots.ts

**What:** File placed at `app/robots.ts` that returns a `Robots` object. Serves at `/robots.txt`.
**When to use:** Always — required for SEO-04.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://cf.design/sitemap.xml',
  }
}
```

### Pattern 5: JSON-LD LocalBusiness in page.tsx

**What:** Inline `<script type="application/ld+json">` in the homepage Server Component.
**When to use:** Homepage only — required for SEO-05.

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// Injected as JSX inside the Server Component return value

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CF Design',
  description: 'Custom woodwork, decks, and garden structures in the Bay Area.',
  url: 'https://cf.design',
  telephone: '+1-650-XXX-XXXX',  // verify actual number from source HTML
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Palo Alto',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: ['San Mateo County', 'Santa Clara County'],
  image: 'https://cf.design/assets/cal-fynn-build.jpg',
}

// Inside the page component return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

**Note:** The `.replace(/</g, '\\u003c')` XSS sanitization is the official Next.js recommended approach.

### Pattern 6: Image Optimization Props

**What:** Three props to add across existing Image usages.
**When to use:**

| Prop | Where | Why |
|------|-------|-----|
| `preload={true}` | First/hero image only (Hero.tsx column images are not LCP; CaseStudyLayout hero IS the LCP candidate) | Replaces deprecated `priority`; inserts `<link rel="preload">` in `<head>` |
| `sizes="..."` | All `fill`-based images without a sizes prop; portfolio carousel images | Without `sizes`, browser assumes 100vw and downloads too-large images |
| `placeholder="blur" blurDataURL="..."` | Images where progressive loading is desired | Static imports get blurDataURL automatically; dynamic src paths need explicit value |

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
// Hero image — LCP candidate (CaseStudyLayout)
<Image
  src={data.heroImage}
  alt={data.heroImageAlt}
  fill
  preload={true}
  className="object-cover"
  sizes="100vw"
/>

// Portfolio carousel images — responsive
<Image
  src={img}
  alt={item.title}
  width={800}
  height={600}
  className="..."
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
/>

// Blur placeholder — only works automatically for static imports
// For dynamic src strings, use a simple solid-color base64:
placeholder="blur"
blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
```

**For the homepage Hero:** The hero section shows masonry image columns (desktop) and a horizontal marquee (mobile). None of these images is the page's LCP element — the LCP on the homepage is likely the heading text or the above-fold layout. Do NOT add `preload` to the masonry/marquee images. The case study hero IS the LCP candidate.

### Anti-Patterns to Avoid

- **Setting `metadataBase` only in page.tsx:** It must be set in `app/layout.tsx` so all child routes inherit the base URL for relative OG image paths.
- **Using `priority` prop instead of `preload`:** `priority` is deprecated in Next.js 16. The compiler may not error immediately, but it is not forwards-compatible. Use `preload={true}` only.
- **Adding `preload` to multiple images:** Over-preloading increases LCP time. Only the true above-the-fold LCP image gets `preload`. The Next.js docs explicitly warn: "In most cases, you should use `loading='eager'` or `fetchPriority='high'` instead of `preload`."
- **Sitemap URLs without trailing slashes:** With `trailingSlash: true` in `next.config.ts`, Vercel will redirect `/case-studies/palo-alto-redwood-little-library` → `/case-studies/palo-alto-redwood-little-library/`. Sitemap must use the canonical form.
- **Skipping `qualities` in next.config.ts:** Next.js 16 changed the default `qualities` to `[75]` only. If any image uses a quality value other than 75 (e.g., quality={90}), it will default to the nearest allowed value or return a 400. Current codebase does not use the `quality` prop, so this is not an immediate issue, but it should be noted.
- **openGraph `description` override without re-including base fields:** Metadata merging is shallow — if `openGraph` is defined in a page, it completely replaces the layout's `openGraph`. Always include all needed OG fields at the page level, not just the fields you want to change.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| sitemap.xml generation | Custom route handler with XML strings | `app/sitemap.ts` file convention | Built-in typing, caching, and format; works in static export |
| robots.txt | Static file in public/ | `app/robots.ts` file convention | Programmatic, typed, consistent with metadata API |
| Open Graph meta tags | Custom `<Head>` JSX or helmet library | Next.js `metadata` export | App Router renders metadata into `<head>` server-side automatically |
| Preload hints for images | `<link rel="preload">` in layout | `preload={true}` on next/image | next/image generates the correct `<link>` in `<head>` including `imagesrcset` for responsive |

**Key insight:** Next.js 16 provides all needed primitives as built-in file conventions. Zero additional libraries are needed for this phase.

---

## Common Pitfalls

### Pitfall 1: metadataBase Missing from Root Layout

**What goes wrong:** OG image URLs resolve to relative paths in the HTML source (`/assets/cal-fynn-build.jpg` instead of `https://cf.design/assets/cal-fynn-build.jpg`). Social media crawlers reject relative image URLs.
**Why it happens:** The `metadata.openGraph.images` field requires absolute URLs. When `metadataBase` is not set, Next.js requires you to provide full URLs directly, or it will throw a build-time error.
**How to avoid:** Set `metadataBase: new URL('https://cf.design')` in the root `app/layout.tsx` metadata export. Then all relative paths in child pages are automatically resolved.
**Warning signs:** Build output warning: "metadata.openGraph.images must be an absolute URL."

### Pitfall 2: Metadata Object Shallow Merge Kills OG Description

**What goes wrong:** A page defines `openGraph: { title: '...' }` and the layout's `openGraph.description` disappears from the output.
**Why it happens:** Next.js shallow-merges metadata between segments. The entire `openGraph` object in a page replaces the layout's `openGraph` object — field-by-field inheritance does not happen within the object.
**How to avoid:** Each page that defines `openGraph` must include ALL desired OG fields: title, description, images, type, url.
**Warning signs:** `view-source` shows `og:title` but not `og:description` on inner pages.

### Pitfall 3: priority Prop Used Instead of preload

**What goes wrong:** Code deploys with `priority` prop, which is deprecated in Next.js 16. Future upgrade path breaks.
**Why it happens:** Prior plans (02-01) deferred hero image preloading and documented `priority` as deprecated. The replacement is `preload={true}`.
**How to avoid:** Search codebase for `priority` prop on `<Image>` components and replace with `preload={true}`.
**Warning signs:** TypeScript may show deprecation warning in IDE even if it compiles.

### Pitfall 4: blur Placeholder on Dynamic src Paths

**What goes wrong:** `placeholder="blur"` is added to an Image component with a dynamic `src` string (not a static import), causing a build error: "An image with `src` 'X' and `placeholder="blur"` must provide a `blurDataURL`".
**Why it happens:** Next.js generates `blurDataURL` automatically only for static `import profileImg from './image.jpg'` usages. Dynamic string paths (e.g., `src="/assets/jobs/..."`) require an explicit `blurDataURL`.
**How to avoid:** For dynamic src strings, either (a) provide a hardcoded solid-color base64 blurDataURL, or (b) use the plaiceholder library to generate them at build time, or (c) skip blur on these images.
**Warning signs:** `next build` fails with "placeholder-blur-data-url" error.

### Pitfall 5: Sitemap Not Reflecting trailingSlash Setting

**What goes wrong:** Sitemap lists `https://cf.design/case-studies/palo-alto-redwood-little-library` (no trailing slash), but the canonical URL served is `https://cf.design/case-studies/palo-alto-redwood-little-library/`. Search engines see a mismatch.
**Why it happens:** `trailingSlash: true` causes Vercel to redirect non-trailing-slash URLs to the slash version. If sitemap uses non-slash form, crawlers follow a redirect to the canonical.
**How to avoid:** All sitemap entries must end with `/`.
**Warning signs:** Google Search Console shows "Discovered — currently not indexed" with redirect chains.

### Pitfall 6: Over-Preloading Hero Images

**What goes wrong:** `preload={true}` is added to the masonry column images in `Hero.tsx` (which are not the LCP element), causing the browser to preload dozens of images eagerly. LCP time worsens by 400-1200ms.
**Why it happens:** Instinct to make "hero images" fast leads to adding preload to all images in the hero section.
**How to avoid:** Only the single image that is the page's Largest Contentful Paint element gets `preload={true}`. On the homepage, the masonry images are below-the-fold on mobile and beside text on desktop — the LCP is the heading, not the images. On case study pages, the full-bleed hero image IS the LCP.
**Warning signs:** Lighthouse LCP score worsens after adding preload to multiple images.

### Pitfall 7: qualities Config Missing in next.config.ts

**What goes wrong:** Next.js 16 defaults `qualities` to `[75]`. If an image uses `quality={90}`, the build may fail or silently downgrade to 75.
**Why it happens:** Next.js 16 introduced a restricted quality allowlist for security. The current `next.config.ts` does not define `qualities`, relying on the default.
**How to avoid:** Verify no Image components use a `quality` prop. If they do, add `qualities: [75, 90]` to `next.config.ts`. Current audit shows no `quality` prop in use — this is a low-risk item but worth noting.
**Warning signs:** `next build` warning about image quality restrictions.

---

## Code Examples

Verified patterns from official sources:

### Root Layout Metadata with metadataBase

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// app/layout.tsx — add/update metadata export
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://cf.design'),
  title: {
    default: 'CF Design — Custom Construction in the Bay Area',
    template: '%s | CF Design',
  },
  description: 'Constructing beautiful solutions in San Mateo & Santa Clara County.',
  icons: { icon: '/assets/cf-icon.png' },
  openGraph: {
    siteName: 'CF Design',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/cal-fynn-build.jpg', width: 1200, height: 630, alt: 'CF Design' }],
  },
}
```

### robots.ts

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// app/robots.ts (NEW FILE)
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://cf.design/sitemap.xml',
  }
}
```

### sitemap.ts

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// app/sitemap.ts (NEW FILE)
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://cf.design/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://cf.design/case-studies/palo-alto-redwood-little-library/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: 'https://cf.design/case-studies/palo-alto-walnut-marble-tables/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}
```

### JSON-LD in Homepage Server Component

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// Inline inside app/page.tsx default export return
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CF Design',
  description: 'Custom woodwork, decks, and garden structures in the Bay Area.',
  url: 'https://cf.design',
  // telephone: verify from index.html source
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Palo Alto',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: ['San Mateo County', 'Santa Clara County'],
  image: 'https://cf.design/assets/cal-fynn-build.jpg',
}

// In the JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
/>
```

### Case Study Hero Image with preload

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
// components/case-studies/CaseStudyLayout.tsx — hero image
<Image
  src={data.heroImage}
  alt={data.heroImageAlt}
  fill
  preload={true}
  className="object-cover"
  sizes="100vw"
/>
```

### Portfolio Image with sizes

```typescript
// Source: https://nextjs.org/docs/app/api-reference/components/image
// components/home/PortfolioCard.tsx — carousel images
<Image
  key={i}
  src={img}
  alt={item.title}
  width={800}
  height={600}
  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
/>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `priority` prop on next/image | `preload={true}` prop | Next.js 16.0.0 | Must update any existing `priority` usage; no change to rendered behavior |
| `themeColor` / `colorScheme` in metadata | `generateViewport` function | Next.js 14 | Not relevant to this project (no theme toggle), but avoid adding themeColor to metadata |
| `domains` in images config | `remotePatterns` | Next.js 14 | All images are local (`/assets/...`), no remote patterns needed |
| `onLoadingComplete` callback | `onLoad` callback | Next.js 14 | Not used in this project |
| `qualities` unlimited | `qualities: [75]` default only | Next.js 16.0.0 | No impact if no `quality` prop used on Image components |

**Deprecated/outdated:**
- `priority` prop: deprecated Next.js 16; replace with `preload`
- Metadata streaming (introduced 15.2.0): for this project's static pages, metadata is included in the initial HTML shell — no streaming needed

---

## Open Questions

1. **LocalBusiness telephone and full address**
   - What we know: The homepage source HTML (`index.html`) contains contact info
   - What's unclear: The exact phone number and whether a street address is published
   - Recommendation: Read `index.html` Footer section to extract the exact NAP (Name, Address, Phone) data before writing JSON-LD

2. **OG image asset dimensions**
   - What we know: OG images should be 1200x630px for optimal social preview
   - What's unclear: Whether `/assets/cal-fynn-build.jpg` is landscape 1200x630 or a different aspect ratio
   - Recommendation: Check actual image dimensions with `identify` or `file` command before using as OG image. If wrong ratio, use a different asset or create a purpose-built OG image.

3. **Case study hero image OG metadata**
   - What we know: The `metadata` object in each MDX file has title and description, but not a `heroImage` field (heroImage is in `caseStudyData`)
   - What's unclear: The cleanest way to pass heroImage to generateMetadata without duplicating data in MDX
   - Recommendation: In `generateMetadata`, import both `metadata` and `caseStudyData` from the MDX file, use `caseStudyData.heroImage` as the OG image URL.

4. **Vercel domain configuration**
   - What we know: The domain is `cf.design`; Vercel deployment is zero-config
   - What's unclear: Whether the custom domain is already configured on the Vercel project
   - Recommendation: Plan 05-02 should include a step for verifying/configuring the custom domain, not assume it is already done.

---

## Validation Architecture

`workflow.nyquist_validation` is not present in `.planning/config.json` — the config uses `workflow.research`, `workflow.plan_check`, `workflow.verifier`. Skipping formal test mapping section.

Manual verification steps for each requirement:

| Req ID | Verification Method |
|--------|---------------------|
| SEO-01 | `view-source:https://cf.design/` — confirm visible text in HTML, not empty divs |
| SEO-02 | `view-source` on each page — check for `og:title`, `og:description`, `og:image` meta tags |
| SEO-03 | `curl https://cf.design/sitemap.xml` — confirm XML with all 3 routes |
| SEO-04 | `curl https://cf.design/robots.txt` — confirm `Allow: /` and sitemap URL |
| SEO-05 | `view-source:https://cf.design/` — search for `application/ld+json` script tag |
| SEO-06 | `view-source` — all `<img>` tags use `/_next/image?url=...` (optimized) |
| SEO-07 | `view-source:https://cf.design/case-studies/palo-alto-redwood-little-library/` — `<link rel="preload" as="image">` in `<head>` |
| SEO-08 | DevTools Network tab — images request appropriately-sized variants |
| SEO-09 | Screenshots show blur-to-sharp transition during load on slow 3G throttle |
| DEPL-01 | Vercel deployment succeeds; `next build` exits 0 |
| DEPL-02 | All 4 routes return 200: `/`, `/case-studies/palo-alto-redwood-little-library/`, `/case-studies/palo-alto-walnut-marble-tables/`, `/thank-you/` |

---

## Sources

### Primary (HIGH confidence)

- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — fetched 2026-02-27 (docs version 16.1.6); metadata fields, openGraph, metadataBase
- [Next.js sitemap.xml docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — fetched 2026-02-27 (docs version 16.1.6); MetadataRoute.Sitemap type and patterns
- [Next.js robots.txt docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) — fetched 2026-02-27 (docs version 16.1.6); MetadataRoute.Robots type
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) — fetched 2026-02-27 (docs version 16.1.6); inline script pattern
- [Next.js Image component docs](https://nextjs.org/docs/app/api-reference/components/image) — fetched 2026-02-27 (docs version 16.1.6); preload prop (priority deprecated in v16), sizes, placeholder, blurDataURL

### Secondary (MEDIUM confidence)

- [WebSearch: Next.js 16 priority deprecated](https://nextjs.org/docs/app/api-reference/components/image) — confirmed by official docs version history: "v16.0.0: `preload` prop added, `priority` prop deprecated"
- [WebSearch: Vercel zero-config deployment](https://vercel.com/docs/frameworks/full-stack/nextjs) — consistent with official Vercel docs
- [schema.org LocalBusiness](https://schema.org/LocalBusiness) — fields for JSON-LD structured data
- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) — Google's recommended fields

### Tertiary (LOW confidence)

- LCP timing figures (300-800ms improvement from preloading): cited from WebSearch; treat as directional, not precise

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tooling is built into Next.js 16.1.6, verified via official docs
- Architecture: HIGH — patterns taken directly from official docs at version 16.1.6 (last updated 2026-02-27)
- Pitfalls: HIGH — `priority` deprecation confirmed in docs version history; shallow merge behavior confirmed in generateMetadata docs; blur placeholder requirements confirmed

**Research date:** 2026-03-02
**Valid until:** 2026-06-02 (stable Next.js API — changes unlikely in 90 days)
