# Phase 4: Case Studies - Research

**Researched:** 2026-03-02
**Domain:** MDX integration with Next.js App Router, case study layout components
**Confidence:** HIGH

---

## Summary

Phase 4 adds MDX-based case study pages to the existing Next.js project. The goal is two working case study pages at their exact URLs, with a system extensible by creating new MDX files. Both source HTML files (`case-studies/palo-alto-redwood-little-library/index.html` and `case-studies/palo-alto-walnut-marble-tables/index.html`) share an identical section structure (hero, hero image, overview, challenge, solution, gallery, client quote, project details, CTA), making them perfect candidates for a single shared layout component with MDX-supplied content.

The primary technical work is: (1) install and configure `@next/mdx`, (2) convert `next.config.ts` to use the MDX plugin wrapper, (3) create `mdx-components.tsx` at project root (required by `@next/mdx`), (4) create a shared `CaseStudyLayout` component that replicates the HTML structure verbatim, (5) write two MDX files that export metadata and render through the layout. The existing `Reveal`, `Nav`, `Footer`, `Icons`, and `SiteShell` components are all reusable without modification.

The case study pages in the source HTML use placeholder text throughout (overview, challenge, solution, quote all say "[Placeholder...]"). The gallery renders six generic photo boxes. This means MDX content will be structured around the layout component — the MDX files primarily supply frontmatter/exports for metadata and a few content-variable fields, while the layout handles the static structure. Images referenced are already in `/public/assets/jobs/`.

**Primary recommendation:** Use `@next/mdx` with the "using imports" pattern — MDX files live in `content/case-studies/` and are imported into `app/case-studies/[slug]/page.tsx` via dynamic import. Each MDX file exports a `metadata` object (title, description) and a `caseStudyData` object (hero text, location, materials, year, images, quote). A single `CaseStudyLayout` component receives this data as props and renders all sections.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CASE-01 | MDX-based case study system using @next/mdx with shared layout component | MDX dynamic import pattern + shared layout component covers this |
| CASE-02 | "Palo Alto Redwood Little Library" renders at /case-studies/palo-alto-redwood-little-library/ | Dynamic route `[slug]` with `generateStaticParams` + `trailingSlash: true` in next.config covers this |
| CASE-03 | "Palo Alto Walnut Marble Tables" renders at /case-studies/palo-alto-walnut-marble-tables/ | Same as CASE-02 — second slug in `generateStaticParams` |
| CASE-04 | Pages include hero, overview, challenge, solution, gallery, client quote, project details, CTA | CaseStudyLayout component extracts all 8 sections verbatim from source HTML |
| CASE-05 | Each case study has unique page title and meta description visible in HTML source | MDX `export const metadata` pattern + Next.js metadata API generates server-rendered `<title>` and `<meta name="description">` |
| CASE-06 | Adding a new case study requires only creating an MDX file and adding images | Dynamic import pattern from MDX file in `content/case-studies/`; `generateStaticParams` returns slugs from a static list (or filesystem scan) |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @next/mdx | latest (matches next 16) | MDX compilation + Next.js integration | Official Next.js package, built by Vercel team, works in App Router |
| @mdx-js/loader | latest | Webpack MDX loader | Required peer dep of @next/mdx |
| @mdx-js/react | latest | MDX React runtime | Required peer dep for component mapping |
| @types/mdx | latest | TypeScript types for MDX imports | Dev dependency, required for TS module typing |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| gray-matter | ^4 | YAML frontmatter parsing | Only needed if frontmatter YAML syntax desired over MDX `export const` syntax |

**Do NOT use gray-matter.** The official `@next/mdx` approach is to use `export const metadata = {}` inside the MDX file directly — no frontmatter parser needed.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @next/mdx | next-mdx-remote | next-mdx-remote not well maintained in 2026; @next/mdx is official and preferred for local filesystem |
| @next/mdx | next-mdx-remote-client | Better maintained than next-mdx-remote but still more complex setup; @next/mdx sufficient here |
| MDX exports | remark-frontmatter | Extra dependency; MDX `export const` is simpler and fully supported |

**Installation:**
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
```

---

## Architecture Patterns

### Recommended Project Structure
```
app/
├── case-studies/
│   └── [slug]/
│       └── page.tsx          # dynamic route, imports MDX by slug
content/
└── case-studies/
    ├── palo-alto-redwood-little-library.mdx
    └── palo-alto-walnut-marble-tables.mdx
components/
└── case-studies/
    └── CaseStudyLayout.tsx   # shared layout, all sections verbatim
mdx-components.tsx            # REQUIRED at project root
```

### Pattern 1: Dynamic Import of MDX (Recommended)

**What:** `app/case-studies/[slug]/page.tsx` dynamically imports the MDX file by slug. Each MDX file exports `metadata` and `caseStudyData`. The page passes `caseStudyData` as props to `CaseStudyLayout`.

**When to use:** When MDX files live outside `app/` and you want the flexibility to add new case studies by creating files without touching any route file.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/mdx (Using dynamic imports section)
// app/case-studies/[slug]/page.tsx
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'palo-alto-redwood-little-library' },
    { slug: 'palo-alto-walnut-marble-tables' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await import(`@/content/case-studies/${slug}.mdx`)
  return metadata
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { caseStudyData } = await import(`@/content/case-studies/${slug}.mdx`)
  return <CaseStudyLayout data={caseStudyData} />
}
```

**Example MDX file:**
```mdx
// content/case-studies/palo-alto-redwood-little-library.mdx
export const metadata = {
  title: "Perry's Redwood Little Library - CF Design Case Study",
  description: "A detailed look at Perry's double-decker little library and dog amenities station built by CF Design in Palo Alto.",
}

export const caseStudyData = {
  heroTitle: "Perry's Double-Decker",
  heroTitleItalic: "Little Library",
  location: "Palo Alto, CA",
  materials: "Redwood & Cedar",
  year: "2025",
  heroImage: "/assets/jobs/25_perry_library.jpg",
  heroImageAlt: "Perry's Little Library",
  overview: "A brief overview of...",
  challengeTitle: "...",
  challengeText: "...",
  challengeImage: "/assets/jobs/25_perry_library.jpg",
  solutionTitle: "...",
  solutionText: "...",
  solutionImage: "/assets/jobs/25_perry_library.jpg",
  galleryImages: [
    { src: "/assets/jobs/25_perry_library.jpg", alt: "..." },
    // ...
  ],
  quote: "Client testimonial...",
  quoteAttribution: "— Perry, Palo Alto",
  details: [
    { label: "Timeline", value: "X weeks" },
    { label: "Materials", value: "Redwood, Cedar" },
    { label: "Location", value: "Palo Alto, CA" },
    { label: "Year", value: "2025" },
  ],
}
```

### Pattern 2: next.config.ts MDX Setup

The project uses `next.config.ts` (TypeScript), not `next.config.mjs`. The `@next/mdx` docs show `.mjs` but the TypeScript version works identically.

```typescript
// next.config.ts
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
}

const withMDX = createMDX({
  // No remark/rehype plugins needed for this use case
})

export default withMDX(nextConfig)
```

### Pattern 3: mdx-components.tsx (Required)

This file MUST exist at the project root (same level as `app/`) for `@next/mdx` to work with App Router. Minimal version:

```typescript
// mdx-components.tsx (project root)
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {}
}
```

No custom element mappings needed since content is driven by the `CaseStudyLayout` component, not MDX prose.

### Pattern 4: CaseStudyLayout Component

The source HTML for both case studies is structurally identical — same 8 sections, same Tailwind classes, same Reveal animation wrapping, same Nav/Footer. Extract the structure verbatim per CLAUDE.md rules.

**Key observations from source HTML analysis:**
- Both source files use `Nav` and `Footer` — but in the Next.js version, these are already provided by `SiteShell` in `app/layout.tsx`. The `CaseStudyLayout` should NOT include `Nav` or `Footer` — the root layout already renders them via `SiteShell`.
- The source uses relative `../../?inquire` links → will be `/?inquire` in Next.js (Link href)
- The source uses relative `../../` for Back Home → will be `/` (Link href)
- `Reveal` component already exists at `@/components/ui/Reveal` — import and reuse
- `ArrowLeft`, `MapPin` icons already exist at `@/components/ui/Icons` — reuse
- Images: `src="../../assets/jobs/..."` → `/assets/jobs/...` in Next.js (next/image)
- Gallery section in source has 6 placeholder boxes ("Photo 1"..."Photo 6") — in MDX files, pass actual image arrays

**CaseStudyLayout data interface:**
```typescript
interface CaseStudyData {
  heroTitle: string
  heroTitleItalic: string
  location: string
  materials: string
  year: string
  heroImage: string
  heroImageAlt: string
  overview: string
  challengeTitle: string
  challengeText: string
  challengeImage: string
  challengeImageAlt: string
  solutionTitle: string
  solutionText: string
  solutionImage: string
  solutionImageAlt: string
  galleryImages: { src: string; alt: string }[]
  quote: string
  quoteAttribution: string
  details: { label: string; value: string }[]
}
```

### Pattern 5: Metadata from MDX exports

`@next/mdx` allows exporting JS values from MDX files. The `generateMetadata` function in `page.tsx` imports the `metadata` export from the MDX file. This enables per-page `<title>` and `<meta name="description">` in the HTML source (server-rendered).

```typescript
// Source metadata values from the original HTML:
// Perry: title="Perry's Redwood Little Library - CF Design Case Study"
//        description="A detailed look at Perry's double-decker little library..."
// Michelle: title="Michelle's Walnut & Marble Tables - CF Design Case Study"
//           description="A detailed look at Michelle's marble topped black walnut speaker tables..."
```

### Anti-Patterns to Avoid
- **Do NOT put MDX files inside `app/`** as `page.mdx` files: This forfeits the ability to have a shared layout wrapper component with proper data typing. Use dynamic import instead.
- **Do NOT include Nav/Footer in CaseStudyLayout**: `SiteShell` already handles this in `app/layout.tsx`. Adding them again would double-render.
- **Do NOT use the MDX prose for the visual sections**: The case study structure is fixed HTML with Tailwind classes, not free-form prose. Pass all variable content as structured data props to `CaseStudyLayout`.
- **Do NOT use remark-frontmatter**: MDX `export const` is simpler and natively supported.
- **Do NOT forget `mdx-components.tsx`**: App Router will silently fail without it — `@next/mdx` with App Router requires this file.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| MDX compilation | Custom webpack plugin | @next/mdx | Official, maintained, handles HMR, TS types |
| Metadata per page | Reading HTML files | MDX `export const metadata` + `generateMetadata` | Native Next.js pattern, server-rendered |
| Dynamic route | Custom file-system scanning | `generateStaticParams` with explicit slug list | Two case studies; explicit is simpler than FS scanning |

**Key insight:** The case study "content system" here is two static pages with placeholder text. The MDX file's job is to hold metadata + variable data fields, not to render prose. Keep it simple — `CaseStudyLayout` is a React component that receives typed props, not an MDX prose renderer.

---

## Common Pitfalls

### Pitfall 1: Missing mdx-components.tsx
**What goes wrong:** Build fails or MDX imports do nothing; error message may not clearly point to this file.
**Why it happens:** `@next/mdx` with App Router requires this file at project root to register the MDX provider.
**How to avoid:** Create `mdx-components.tsx` at project root as first step, before anything else.
**Warning signs:** Build error mentioning MDX provider or components not resolving.

### Pitfall 2: next.config.ts vs next.config.mjs
**What goes wrong:** `createMDX` import fails or config is not applied.
**Why it happens:** Official docs show `.mjs` but this project uses `.ts`. The import syntax works the same.
**How to avoid:** Use `import createMDX from '@next/mdx'` in `next.config.ts` with TypeScript syntax (already present in project).
**Warning signs:** MDX files not being processed, `.mdx` extension not recognized.

### Pitfall 3: pageExtensions not set
**What goes wrong:** `.mdx` files are not treated as modules that can be imported.
**Why it happens:** Next.js only processes `.ts/.tsx` by default.
**How to avoid:** Add `pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']` to `nextConfig` before wrapping with `withMDX`.
**Warning signs:** Import of `.mdx` file throws "Module not found" error.

### Pitfall 4: params is a Promise in Next.js 15+
**What goes wrong:** `params.slug` returns undefined; TypeScript errors on `params.slug`.
**Why it happens:** In Next.js 15+, route params are async (`Promise<{ slug: string }>`). Must `await params` before destructuring.
**How to avoid:** Always use `const { slug } = await params` in both `generateMetadata` and `page` function.
**Warning signs:** Slug is undefined; dynamic import path resolves to wrong file.

### Pitfall 5: trailingSlash and dynamic routes
**What goes wrong:** `/case-studies/palo-alto-redwood-little-library/` returns 404.
**Why it happens:** `trailingSlash: true` is already set in next.config.ts — this is correct and matches existing URL structure. `generateStaticParams` slugs must NOT include trailing slash.
**How to avoid:** Return `{ slug: 'palo-alto-redwood-little-library' }` (no slash) from `generateStaticParams`. The framework handles trailing slash routing.
**Warning signs:** Case study URL returns 404 even though page.tsx exists.

### Pitfall 6: Turbopack plugin restriction
**What goes wrong:** If remark/rehype plugins are added as function references, `next dev` (Turbopack) fails.
**Why it happens:** Turbopack cannot serialize JS functions to Rust. STATE.md already documents: "Turbopack requires remark plugins as strings (not function references)".
**How to avoid:** This phase needs no remark/rehype plugins at all. Skip entirely.
**Warning signs:** "Cannot serialize function" error on dev server start.

---

## Code Examples

Verified patterns from official sources:

### next.config.ts with MDX
```typescript
// Source: https://nextjs.org/docs/app/guides/mdx
import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
```

### mdx-components.tsx (minimal, required)
```typescript
// Source: https://nextjs.org/docs/app/guides/mdx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(): MDXComponents {
  return {}
}
```

### Dynamic route page.tsx
```typescript
// Source: https://nextjs.org/docs/app/guides/mdx (dynamic imports)
import type { Metadata } from 'next'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'palo-alto-redwood-little-library' },
    { slug: 'palo-alto-walnut-marble-tables' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await import(`@/content/case-studies/${slug}.mdx`)
  return metadata
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { caseStudyData } = await import(`@/content/case-studies/${slug}.mdx`)
  return <CaseStudyLayout data={caseStudyData} />
}
```

### MDX file structure
```mdx
// content/case-studies/palo-alto-redwood-little-library.mdx
export const metadata = {
  title: "Perry's Redwood Little Library - CF Design Case Study",
  description: "A detailed look at Perry's double-decker little library and dog amenities station built by CF Design in Palo Alto.",
}

export const caseStudyData = {
  heroTitle: "Perry's Double-Decker",
  heroTitleItalic: "Little Library",
  location: "Palo Alto, CA",
  materials: "Redwood & Cedar",
  year: "2025",
  heroImage: "/assets/jobs/25_perry_library.jpg",
  heroImageAlt: "Perry's Little Library",
  overview: "[Placeholder: Brief overview...]",
  challengeTitle: "[Placeholder Title]",
  challengeText: "[Placeholder: Describe the client's problem...]",
  challengeImage: "/assets/jobs/25_perry_library.jpg",
  challengeImageAlt: "Challenge",
  solutionTitle: "[Placeholder Title]",
  solutionText: "[Placeholder: Describe the design approach...]",
  solutionImage: "/assets/jobs/25_perry_library.jpg",
  solutionImageAlt: "Solution",
  galleryImages: [
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 1" },
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 2" },
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 3" },
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 4" },
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 5" },
    { src: "/assets/jobs/25_perry_library.jpg", alt: "Photo 6" },
  ],
  quote: "[Placeholder: Client testimonial...]",
  quoteAttribution: "— Perry, Palo Alto",
  details: [
    { label: "Timeline", value: "[X weeks]" },
    { label: "Materials", value: "[Redwood, Cedar]" },
    { label: "Location", value: "Palo Alto, CA" },
    { label: "Year", value: "2025" },
  ],
}
```

### CaseStudyLayout skeleton (verbatim structure from source)
```typescript
// components/case-studies/CaseStudyLayout.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLeft, MapPin } from '@/components/ui/Icons'

interface CaseStudyData {
  heroTitle: string
  heroTitleItalic: string
  location: string
  materials: string
  year: string
  heroImage: string
  heroImageAlt: string
  overview: string
  challengeTitle: string
  challengeText: string
  challengeImage: string
  challengeImageAlt: string
  solutionTitle: string
  solutionText: string
  solutionImage: string
  solutionImageAlt: string
  galleryImages: { src: string; alt: string }[]
  quote: string
  quoteAttribution: string
  details: { label: string; value: string }[]
}

export default function CaseStudyLayout({ data }: { data: CaseStudyData }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-arch-black text-white pt-32 pb-20 md:pt-40 md:pb-28">
        {/* ... verbatim from source ... */}
      </section>
      {/* Hero Image */}
      {/* Overview */}
      {/* The Challenge */}
      {/* The Solution */}
      {/* Gallery */}
      {/* Client Quote */}
      {/* Project Details */}
      {/* CTA */}
    </div>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| next-mdx-remote | @next/mdx | 2024-2025 | next-mdx-remote maintenance degraded; @next/mdx is now preferred for local FS |
| YAML frontmatter | MDX `export const` | Next.js 14+ | No additional parser needed; metadata is typed JS |
| Pages Router MDX | App Router MDX with layouts | Next.js 13+ | Layouts are now folder-based; mdx-components.tsx required |

**Known from STATE.md (already resolved issues):**
- `priority` prop deprecated in Next.js 16 — use `preload` on hero images (Phase 5 concern, not Phase 4)
- Turbopack requires remark plugins as strings — not relevant here (no plugins needed)

---

## Open Questions

1. **Gallery image content**
   - What we know: Both source HTML files have 6 placeholder boxes ("Photo 1"..."Photo 6") — no real images beyond the single job photo used for hero/challenge/solution
   - What's unclear: Does the client have additional gallery photos for these case studies?
   - Recommendation: Use the available job photos (`25_perry_library.jpg`, `26_michelle_tables.jpg`) for all gallery slots in the MDX data — this matches the source HTML behavior (same image repeated). Content will be updated by client later.

2. **Content text in MDX files**
   - What we know: All sections in the source HTML have placeholder text (`[Placeholder: ...]`)
   - What's unclear: Does the client want to fill in real content for Phase 4, or keep placeholders?
   - Recommendation: Keep placeholder text verbatim from source HTML. Phase 4 success criteria only require structure and unique page title/meta — not final content.

3. **CASE-06 extensibility: explicit list vs filesystem scan**
   - What we know: There are exactly 2 case studies; `generateStaticParams` can use a static array or scan `content/case-studies/`
   - What's unclear: How dynamic should CASE-06 be?
   - Recommendation: Use explicit list in `generateStaticParams` for simplicity now. Document that adding a third case study requires: (1) creating MDX file, (2) adding slug to the static list. This satisfies CASE-06 ("creating an MDX file and adding images is sufficient") with one small code change. Alternatively, use `fs.readdirSync` to auto-discover — but this adds complexity for marginal benefit with 2 case studies. **Recommend explicit list.**

---

## Sources

### Primary (HIGH confidence)
- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx) — Full @next/mdx setup, mdx-components.tsx requirement, dynamic imports, metadata exports, Turbopack plugin restriction. Version 16.1.6, last updated 2026-02-27.
- Source HTML files: `case-studies/palo-alto-redwood-little-library/index.html`, `case-studies/palo-alto-walnut-marble-tables/index.html` — direct analysis of section structure and Tailwind classes
- Existing project files: `app/layout.tsx`, `components/layout/SiteShell.tsx`, `components/ui/Reveal.tsx`, `data/case-studies.ts` — confirmed reusable components and existing patterns

### Secondary (MEDIUM confidence)
- [WebSearch: @next/mdx Next.js 15/16 2025](https://dev.to/ptpaterson/getting-started-with-nextjs-15-and-mdx-305k) — confirmed @next/mdx preferred over next-mdx-remote for local FS
- [WebSearch: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — confirmed async params pattern for Next.js 15+

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed via official Next.js docs (version 16.1.6, updated 2026-02-27)
- Architecture: HIGH — dynamic import pattern is documented, explicitly shown for this exact use case in official docs
- Pitfalls: HIGH for params/config pitfalls (official docs), HIGH for mdx-components.tsx requirement (explicitly documented as required), MEDIUM for Turbopack plugin issue (documented in STATE.md from prior phases)

**Research date:** 2026-03-02
**Valid until:** 2026-04-02 (Next.js stable, @next/mdx stable — 30 days reasonable)
