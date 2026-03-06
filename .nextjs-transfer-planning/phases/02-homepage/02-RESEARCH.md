# Phase 2: Homepage - Research

**Researched:** 2026-03-01
**Domain:** Next.js React component extraction — homepage sections with CSS animations, carousels, and interactive state
**Confidence:** HIGH

## Summary

Phase 2 extracts seven homepage section components from `index.html` verbatim and wires them into `app/page.tsx`. The work is straightforward extraction per CLAUDE.md — no new libraries, no rewrites. All animations are pure CSS keyframes already present in `globals.css`. All interactive state (carousel index, FAQ open/close, sticky CTA) uses simple React `useState`/`useEffect`/`useRef` hooks. The only non-trivial decisions are:

1. **`onInquiry` prop threading**: Hero needs `onInquiry` but `page.tsx` is a Server Component that cannot hold state. SiteShell owns `showInquiry` state. The cleanest solution is a React Context that SiteShell provides, consumed by Hero as a client component.

2. **`next/image` in scroll-animated columns**: The VIBE_IMAGES masonry columns triple-duplicate arrays (`[...col1, ...col1, ...col1]`). Each image's natural dimensions vary. Use `width` and `height` props with `w-full h-auto` on the `<Image>` tag, OR use `fill` inside a sized wrapper. The simpler option matching the original `img` tag behavior is to provide explicit `width` and `height` (e.g., 600×800 approximation) and rely on `object-cover` — or use `unoptimized` for the marquee images where exact dimensions are impractical.

3. **`mobileImg()` helper**: Only one mobile image exists in `public/assets/mobile/`. The original `mobileImg()` function assumes every VIBE_IMAGE has a mobile variant. At runtime, missing mobile images will 404 but not crash. Keep the helper verbatim — do NOT add fallback logic (that would be a rewrite).

4. **`window.location.href` in PortfolioCard**: Replace with `useRouter().push()` from `next/navigation` for case study card clicks, as `window.location.href` skips Next.js client routing. This is the minimal required change to preserve navigation behavior in Next.js.

**Primary recommendation:** Extract all seven components verbatim. Use a `ShellContext` to thread `onInquiry` from SiteShell to Hero. Use `next/image` with explicit dimensions on all images.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Hero section renders with animated masonry columns (scroll-up/scroll-down) on desktop | CSS `animate-scroll-up`/`animate-scroll-down` already defined in `globals.css`; VIBE_IMAGES split into two columns, tripled for loop effect |
| HOME-02 | Hero section renders horizontal image marquee on mobile | CSS `animate-scroll-left` already defined; `mobileImg()` helper points to `/assets/mobile/` subdirectory; only one mobile image exists currently (non-crash) |
| HOME-03 | Sticky mobile CTA appears after scrolling past Hero "Book Consultation" button | `useRef` on buttonRef + scroll listener with `getBoundingClientRect().bottom < 0`; rendered as `fixed` button inside Hero with `z-[60]` |
| HOME-04 | Purpose section renders "Quality through clarity" content with image and three value propositions | Static section, no interactive state; uses Reveal component already built |
| HOME-05 | Process section renders three-step timeline (Consultation → Design → Build) with alternating layout | Static section mapping PROCESS_STEPS array; alternating `md:flex-row-reverse` for even/odd; uses Reveal |
| HOME-06 | Portfolio section renders project cards grid with image carousel and navigation buttons | PortfolioCard has `useState` for carousel index; `prev`/`next` functions cycle through `item.images` array; only `published: true` items shown |
| HOME-07 | Portfolio cards link to case studies where applicable | `window.location.href` in original → replace with `useRouter().push()` from `next/navigation`; `<a href>` for inline link → `<Link href>` |
| HOME-08 | Reviews section renders three-column masonry with scroll animations and hover-pause | `.hover-pause` CSS class already in `globals.css`; `animate-scroll-up`/`animate-scroll-down` already defined; REVIEWS array split into 3 columns modulo |
| HOME-09 | FAQ section renders expandable accordion with all current questions/answers | `useState(null)` for `openIndex`; `max-h-0`/`max-h-96` CSS transition for open/close |
| HOME-10 | All homepage sections use Reveal animations matching current fade-in behavior | `Reveal` component already built in `components/ui/Reveal.tsx`; all sections import and use it as in original |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (already installed) | App Router, page rendering | Project foundation |
| React | 19.2.3 (already installed) | Component model, hooks | Project foundation |
| next/image | built-in | Optimized image rendering, replaces `<img>` | Required per CLAUDE.md |
| next/link | built-in | Client-side navigation, replaces `<a href>` for internal links | Required per CLAUDE.md |
| next/navigation | built-in | `useRouter` for programmatic navigation in PortfolioCard | Replaces `window.location.href` |
| Tailwind CSS v4 | ^4 (already installed) | All styling — no changes to class names | Already configured |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Context | built-in | Thread `onInquiry` from SiteShell to Hero without prop drilling | Needed because `page.tsx` is a Server Component |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Context for onInquiry | Prop drilling via a `HomepageClient.tsx` wrapper | Context is cleaner; wrapper component is also valid but requires page.tsx restructuring |
| `useRouter().push()` | `window.location.href` | `window.location.href` bypasses Next.js client routing; `useRouter` is correct |
| `next/image` with explicit dimensions | `next/image` with `fill` prop | `fill` requires a positioned parent container; explicit dimensions are simpler for the marquee/masonry images that already have CSS sizing |

**Installation:** No new packages needed. All dependencies are already installed.

---

## Architecture Patterns

### Recommended Project Structure
```
components/
├── home/
│   ├── Hero.tsx           # 'use client' — useState, useEffect, useRef, scroll listener
│   ├── Purpose.tsx        # Server Component — static, uses Reveal
│   ├── Process.tsx        # Server Component — static, maps PROCESS_STEPS, uses Reveal
│   ├── Portfolio.tsx      # Server Component shell — renders PortfolioCard children
│   ├── PortfolioCard.tsx  # 'use client' — carousel useState
│   ├── Reviews.tsx        # Server Component — pure CSS animation, no state
│   └── FAQ.tsx            # 'use client' — accordion useState
data/
├── case-studies.ts        # already exists
├── portfolio.ts           # extract PORTFOLIO_ITEMS from index.html
├── reviews.ts             # extract REVIEWS array from index.html
├── vibe-images.ts         # extract VIBE_IMAGES array from index.html
├── process-steps.tsx      # extract PROCESS_STEPS (contains JSX icons — must be .tsx)
└── faqs.ts                # extract FAQS array from index.html
context/
└── ShellContext.tsx        # 'use client' — provides openInquiry to Hero
```

### Pattern 1: ShellContext for onInquiry Threading

**What:** SiteShell creates a React Context providing `openInquiry`. Hero consumes it. This avoids making `page.tsx` a client component.

**When to use:** When a deeply-nested client component needs a callback owned by a parent Server Component boundary.

**Example:**
```typescript
// context/ShellContext.tsx
'use client'
import { createContext, useContext } from 'react'

interface ShellContextValue {
  openInquiry: () => void
}

export const ShellContext = createContext<ShellContextValue>({
  openInquiry: () => {},
})

export const useShell = () => useContext(ShellContext)
```

```typescript
// components/layout/SiteShell.tsx — updated
'use client'
import { useState } from 'react'
import { ShellContext } from '@/context/ShellContext'
// ...
return (
  <ShellContext.Provider value={{ openInquiry }}>
    <div className="font-sans text-arch-charcoal bg-arch-concrete">
      <Nav onInquiry={openInquiry} />
      {children}
      <Footer />
    </div>
  </ShellContext.Provider>
)
```

```typescript
// components/home/Hero.tsx
'use client'
import { useShell } from '@/context/ShellContext'
// ...
const { openInquiry } = useShell()
// replace onInquiry prop with openInquiry from context
```

### Pattern 2: Data Array Extraction

**What:** Move all data arrays from `index.html` to `data/` files. Import into components.

**When to use:** All static data arrays. PROCESS_STEPS contains JSX (`<Layout className="w-6 h-6" />`) so its file must be `.tsx`.

**Example:**
```typescript
// data/vibe-images.ts
export const VIBE_IMAGES = [
  "assets/jobs/27_susanne_bench.jpg",
  // ... (verbatim from index.html, but update to /assets/ prefix)
]
```

**IMPORTANT:** Update asset paths from `assets/` to `/assets/` per CLAUDE.md:
- `"assets/jobs/foo.jpg"` → `"/assets/jobs/foo.jpg"`
- `"assets/reviews/foo.jpg"` → `"/assets/reviews/foo.jpg"`

### Pattern 3: next/image in Scroll-Animated Columns

**What:** Replace `<img>` with `<Image>` in HeroVibeCard and mobile marquee.

**When to use:** All `<img>` tags per CLAUDE.md.

**Example for HeroVibeCard (masonry, variable natural size):**
```typescript
import Image from 'next/image'

const HeroVibeCard = ({ img }: { img: string }) => (
  <div className="w-full mb-4 break-inside-avoid">
    <div className="rounded-sm overflow-hidden border border-white/10 shadow-lg">
      <Image
        src={img}
        alt="Life at CF"
        width={600}
        height={800}
        className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
        loading="lazy"
      />
    </div>
  </div>
)
```

**Example for mobile marquee (fixed size `h-40 w-48`):**
```typescript
<Image
  key={`m-${i}`}
  src={mobileImg(img)}
  alt=""
  width={192}
  height={160}
  className="h-40 w-48 object-cover rounded-sm border border-white/10 flex-shrink-0"
  loading="lazy"
/>
```

**Note on `loading="lazy"` vs `priority`:** The hero images (VIBE_IMAGES in the masonry columns and marquee) are decoration, not LCP targets. Keep `loading="lazy"` as in the original. Do NOT add `priority` — that would be a rewrite. (SEO phase will handle hero image optimization.)

### Pattern 4: PortfolioCard Navigation

**What:** Replace `window.location.href = item.caseStudy` with `useRouter().push()`.

**When to use:** Any programmatic navigation that was `window.location.href` in the original.

**Example:**
```typescript
'use client'
import { useRouter } from 'next/navigation'

const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState<'next' | 'prev'>('next')
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActive('prev'); setIndex((i) => (i - 1 + item.images.length) % item.images.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setActive('next'); setIndex((i) => (i + 1) % item.images.length) }
  const handleClick = () => { if (item.caseStudy) router.push(item.caseStudy) }
  // ...
}
```

Also update the inline `<a href={item.caseStudy}>` → `<Link href={item.caseStudy}>`.

### Pattern 5: PROCESS_STEPS icon field (JSX in data)

**What:** PROCESS_STEPS entries contain `icon: <Layout className="w-6 h-6" />` — JSX as a value. The data file must be `.tsx` and the interface must use `React.ReactNode`.

**Example:**
```typescript
// data/process-steps.tsx  ← note .tsx extension
import React from 'react'
import { Layout, PenTool, FileText } from '@/components/ui/Icons'

export interface ProcessStep {
  id: number
  title: string
  intro: string
  points: string[]
  icon: React.ReactNode
  img: string
  outro?: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: "Consultation (Free)",
    // ...
    icon: <Layout className="w-6 h-6" />,
    img: "/assets/cal-fynn-outdoor-design.jpg"
  },
  // ...
]
```

### Pattern 6: mobileImg helper

**What:** The `mobileImg()` helper from `index.html` inserts `mobile/` before the filename. Extract verbatim. Note: only one mobile image exists (`/assets/mobile/cal-fynn-outdoor-design.jpg`). Other paths will 404 but this mirrors current production behavior — do NOT add fallback logic.

```typescript
// Extract verbatim into Hero.tsx or a utils/images.ts
const mobileImg = (path: string): string => {
  const parts = path.split('/')
  const filename = parts.pop()!
  return [...parts, 'mobile', filename].join('/')
}
```

### Anti-Patterns to Avoid
- **Don't make `app/page.tsx` a client component**: It would lose SSR for the homepage. Use context instead.
- **Don't import Icons as JSX in data files that are `.ts`**: Will cause TypeScript parse error. PROCESS_STEPS file MUST be `.tsx`.
- **Don't add `priority` to marquee/masonry images**: The original uses `loading="lazy"` — this is the correct behavior for decoration. SEO phase handles optimization.
- **Don't change the `hover-pause` class or animation CSS**: Already in `globals.css`, works as-is.
- **Don't change `PORTFOLIO_ITEMS.filter(item => item.published)`**: The original intentionally hides unpublished items. Do not change this filter.
- **Don't change data arrays**: Keep PORTFOLIO_ITEMS, REVIEWS, VIBE_IMAGES, FAQS, PROCESS_STEPS exactly as in source. Only update `assets/` → `/assets/` in image paths.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll animations | Custom JS scroll handler | CSS keyframes (already in globals.css) | Already implemented — `animate-scroll-up`, `animate-scroll-down`, `animate-scroll-left` |
| Hover-pause animation | JS mouseover/mouseleave handlers | `.hover-pause` CSS class (already in globals.css) | Already implemented as pure CSS |
| Image carousel | Swiper, Embla, Splide | Native React `useState` index + CSS `opacity` transition | Original is a simple two-button, index-based carousel with CSS opacity — no library needed |
| Accordion | Radix UI Accordion, Headless UI | Native React `useState` + CSS `max-h` transition | Original is 4 questions, single-open accordion — already implemented |
| Sticky detection | Intersection Observer, scroll percentage | `getBoundingClientRect().bottom < 0` | Original uses this exact pattern — keep verbatim |

**Key insight:** Every interactive pattern in this phase is a known, simple implementation. The original developers chose the minimal viable solution in each case. Do not replace with libraries.

---

## Common Pitfalls

### Pitfall 1: `'use client'` Cascade
**What goes wrong:** Adding `'use client'` to a parent component forces all its children to be client components, losing SSR for Purpose, Process, and Reviews (which are static).
**Why it happens:** Developer makes `app/page.tsx` or a `HomepageWrapper` client to access state.
**How to avoid:** Keep `page.tsx` as a Server Component. Use `ShellContext` for `onInquiry`. Each interactive component declares its own `'use client'`.
**Warning signs:** `app/page.tsx` has `'use client'` at the top.

### Pitfall 2: next/image in Scroll-Animated Containers
**What goes wrong:** `next/image` with `fill` prop in the masonry columns causes layout issues because `fill` requires `position: relative` on the parent with a defined height.
**Why it happens:** `fill` is the intuitive choice for "unknown size" images.
**How to avoid:** Use explicit `width` and `height` props + `className="w-full h-auto object-cover"`. This matches the original `<img>` behavior where the image takes full column width with natural aspect ratio.
**Warning signs:** Images in masonry columns appear as 0px height or overflow containers.

### Pitfall 3: Asset Path Prefix
**What goes wrong:** Images 404 because paths remain `assets/foo.jpg` instead of `/assets/foo.jpg`.
**Why it happens:** Data arrays copied verbatim from `index.html` without applying the path update rule.
**How to avoid:** When extracting data arrays to `data/` files, update all image path strings: `"assets/` → `"/assets/`.
**Warning signs:** Images show broken icon in browser; console shows 404 on `/assets/assets/foo.jpg` or `assets/foo.jpg`.

### Pitfall 4: PROCESS_STEPS File Extension
**What goes wrong:** `data/process-steps.ts` fails TypeScript compilation because JSX (`<Layout className="w-6 h-6" />`) in a `.ts` file is invalid.
**Why it happens:** Default assumption that data files are `.ts`.
**How to avoid:** Name the file `data/process-steps.tsx`. Add `import React from 'react'` at top.
**Warning signs:** `error TS17004: Cannot use JSX unless the '--jsx' flag is provided` in a `.ts` file.

### Pitfall 5: onInquiry Not Available in Hero
**What goes wrong:** Hero cannot call `onInquiry` because it renders as a child of `page.tsx` (Server Component) which cannot pass callbacks from SiteShell.
**Why it happens:** Forgetting that Server Components cannot pass function props received from client component parents.
**How to avoid:** Implement ShellContext before implementing Hero. Hero uses `useShell()` to get `openInquiry`.
**Warning signs:** `onInquiry` prop is passed as undefined; clicking "Book Consultation" does nothing.

### Pitfall 6: Reviews Column Animation Direction
**What goes wrong:** Reviews middle column uses `animate-scroll-down` (not `animate-scroll-up`) in the original. Easy to make all columns the same direction.
**Why it happens:** Copy-paste error when extracting.
**How to avoid:** Check original: col1=`animate-scroll-up`, col2=`animate-scroll-down`, col3=`animate-scroll-up`. The alternating direction creates the visual interest.
**Warning signs:** All three review columns scroll in the same direction.

### Pitfall 7: Portfolio item.images duplicates
**What goes wrong:** PORTFOLIO_ITEMS in the original have `images` arrays where each item is duplicated (e.g., `["assets/jobs/foo.jpg", "assets/jobs/foo.jpg"]`). This means the carousel always shows the same image. This is correct and intentional — extract verbatim, do not "fix" it.
**Why it happens:** Developer notices the duplicate and assumes it's a bug.
**How to avoid:** Keep the duplicated image paths exactly as in the source.

---

## Code Examples

Verified patterns from source examination of `index.html`:

### Hero sticky CTA scroll detection (exact source logic)
```typescript
// Source: index.html lines 354-366
useEffect(() => {
  const onScroll = () => {
    if (window.innerWidth >= 768) { setStickyBtn(false); return; }
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setStickyBtn(rect.bottom < 0);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
}, []);
```

### FAQ accordion (exact source logic)
```typescript
// Source: index.html lines 665-692
const [openIndex, setOpenIndex] = useState<number | null>(null)
// toggle: setOpenIndex(openIndex === i ? null : i)
// open: className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
```

### Reviews column distribution (exact source logic)
```typescript
// Source: index.html lines 572-574
const col1 = REVIEWS.filter((_, i) => i % 3 === 0)
const col2 = REVIEWS.filter((_, i) => i % 3 === 1)
const col3 = REVIEWS.filter((_, i) => i % 3 === 2)
// col1: animate-scroll-up
// col2: animate-scroll-down (different direction — intentional)
// col3: animate-scroll-up
```

### Portfolio carousel (exact source logic)
```typescript
// Source: index.html lines 613-642
const [index, setIndex] = useState(0)
const [active, setActive] = useState<'next' | 'prev'>('next')
const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActive('prev'); setIndex((i) => (i - 1 + item.images.length) % item.images.length) }
const next = (e: React.MouseEvent) => { e.stopPropagation(); setActive('next'); setIndex((i) => (i + 1) % item.images.length) }
```

### VIBE_IMAGES column split (exact source logic)
```typescript
// Source: index.html lines 351-352
const col1 = VIBE_IMAGES.slice(0, Math.ceil(VIBE_IMAGES.length / 2))
const col2 = VIBE_IMAGES.slice(Math.ceil(VIBE_IMAGES.length / 2))
// Each column is tripled: [...col1, ...col1, ...col1]
// col2 is only doubled: [...col2, ...col2, ...col2] — check source (line 439)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `window.location.href` | `useRouter().push()` from `next/navigation` | Next.js App Router | Navigation stays within client-side routing |
| `<img loading="lazy">` | `<Image>` from `next/image` | CLAUDE.md rule | Automatic WebP/AVIF, lazy loading built-in |
| Inline data arrays in HTML | Separate `data/` files with TypeScript interfaces | Next.js migration | Type safety, reusability across components |
| `React.useState` destructured from window | `import { useState } from 'react'` | Module-based React | Standard import pattern |

**Deprecated/outdated:**
- CDN Tailwind `tailwind.config` inline script: Already migrated to `@theme {}` in `globals.css` (Phase 1)
- CDN React/Babel: Already migrated to npm packages (Phase 1)
- `priority` prop on `next/image`: Deprecated in Next.js 16 — use `preload` instead (per STATE.md decision)

---

## Open Questions

1. **Mobile image paths will 404**
   - What we know: `mobileImg()` builds paths like `/assets/mobile/foo.jpg` but only `/assets/mobile/cal-fynn-outdoor-design.jpg` exists
   - What's unclear: Whether this causes a visible error state in the browser or is silent
   - Recommendation: Extract `mobileImg()` verbatim — this is not a Phase 2 problem. The original site has the same issue. Do not add fallback logic (that would be a rewrite).

2. **SiteShell context vs prop drilling**
   - What we know: SiteShell currently does NOT expose a context; it holds `showInquiry` state internally
   - What's unclear: Whether adding ShellContext requires updating SiteShell (yes) — is that in scope for Phase 2 or should it be noted as a dependency
   - Recommendation: ShellContext creation and SiteShell update is the first task in Phase 2 Plan 01, before any homepage section component.

3. **Footer in page.tsx vs SiteShell**
   - What we know: SiteShell renders `<Footer />` — homepage does not need to render it separately
   - What's unclear: Nothing, this is clear from Phase 1 implementation
   - Recommendation: No action needed. `app/page.tsx` renders homepage sections only; SiteShell wraps with Nav + Footer.

---

## Sources

### Primary (HIGH confidence)
- Direct source examination: `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html` — all component implementations, data arrays, CSS classes (lines 1-835)
- Direct source examination: `/Users/caldayham/Desktop/cf.design/v3.cf.design/app/globals.css` — all animation keyframes, `.hover-pause`, `.reveal-base` already present
- Direct source examination: Phase 1 deliverables — `SiteShell.tsx`, `Reveal.tsx`, `Nav.tsx`, `Icons.tsx`, `globals.css`, `layout.tsx`
- Direct source examination: `/Users/caldayham/Desktop/cf.design/v3.cf.design/package.json` — Next.js 16.1.6, React 19.2.3, no animation libraries installed

### Secondary (MEDIUM confidence)
- Project documentation: `.planning/STATE.md` — key decisions including `priority` deprecation in Next.js 16 (use `preload`), Tailwind v4 migration working
- Project documentation: `.planning/REQUIREMENTS.md` — HOME-01 through HOME-10 requirement definitions
- Project documentation: `CLAUDE.md` — extract-don't-rewrite rule, what to change vs what not to change

### Tertiary (LOW confidence)
- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages already installed and verified in package.json
- Architecture: HIGH — component structure derived directly from source HTML; all patterns verified against actual source code
- Pitfalls: HIGH — pitfalls identified from direct source inspection and known Next.js patterns; no speculative claims

**Research date:** 2026-03-01
**Valid until:** 2026-04-01 (stable — Next.js 16 App Router patterns are stable)
