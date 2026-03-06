# Domain Pitfalls

**Domain:** Next.js App Router migration from inline React/CDN Babel
**Researched:** 2026-03-01
**Confidence:** HIGH (all critical pitfalls verified against official Next.js 16 docs, current date)

---

## Critical Pitfalls

Mistakes that cause SSR crashes, blank pages, or require full component rewrites.

---

### Pitfall 1: SSR Crash from `window` Access at Module Scope

**What goes wrong:** The current `App` component initializes state using `window.location.search` directly in the `useState` initializer: `useState(() => new URLSearchParams(window.location.search).has('inquire'))`. In Next.js App Router, Server Components render on the server where `window` does not exist. Any code that accesses `window`, `document`, `navigator`, or `localStorage` at module level or during server-side execution will throw a `ReferenceError: window is not defined` and crash the route.

**Why it happens:** The current site renders entirely in the browser after Babel compiles JSX — there is no server execution step. In Next.js, components default to Server Components and execute on the server first.

**Consequences:** The page 404s or returns a 500 error. The inquiry modal URL parameter (`?inquire`) functionality breaks entirely if not addressed.

**Prevention:**
- Mark any component that accesses `window`, `document`, or browser APIs with `'use client'` at the top of the file.
- Move `window.location.search` access into a `useEffect` hook (runs client-only) or use Next.js `useSearchParams()` hook from `next/navigation`.
- Use the `useSearchParams()` hook for the `?inquire` URL parameter pattern — it is safe in Client Components.

**Warning signs:**
- Any `useState` initializer that references `window` or `document`
- Any `useEffect` that you moved outside of a component
- Build errors mentioning `ReferenceError: window is not defined`

**Phase:** Foundation / component extraction phase. Address before any component is extracted.

---

### Pitfall 2: Making the Entire App a Client Component

**What goes wrong:** Because so many components in this site use `useState`, `useEffect`, and browser APIs, the instinct is to put `'use client'` at the top of the root layout or a single large wrapper component. This defeats the purpose of App Router — the entire page ships as client JavaScript with no SSR benefit. SEO is no better than the current CDN/Babel setup.

**Why it happens:** `'use client'` propagates down the component tree. Once a file has it, all components imported into that file are also treated as client components. Putting it on the layout makes everything client-side.

**Consequences:** Zero SEO improvement. No server-side rendering. The entire point of the migration (fixing SEO) fails. Performance regresses because no HTML is pre-rendered.

**Prevention:**
- Keep `app/layout.tsx` and `app/page.tsx` as Server Components (no `'use client'`).
- Extract only the interactive pieces into separate Client Component files: `Nav`, `Reveal`, `FAQ`, `Contact`, `PortfolioCard`, `Hero` (for the sticky CTA state), `Reviews` (for hover-pause events).
- Static sections — `Purpose`, `Process` content blocks, `Footer` — can remain Server Components.
- The pattern: Server Component renders the page structure and passes static data as props to leaf-level Client Components.

**Warning signs:**
- `'use client'` appears in `app/layout.tsx` or `app/page.tsx`
- No static HTML in the page source when viewing browser source
- Lighthouse SEO score unchanged from current site

**Phase:** Component architecture phase. Design the client/server split before writing any component.

---

### Pitfall 3: Next.js Image Breaks Infinite Scroll Animations

**What goes wrong:** The hero marquee and reviews wall use CSS `translateY` animations on containers holding duplicated image arrays. These images are off-screen at load time. Next.js `<Image>` component uses native `loading="lazy"` by default, which tells the browser not to load images until they approach the viewport. Images inside a CSS-transformed container are never considered "near the viewport" by the browser's lazy loading algorithm — they load as the animation brings them into view, causing a flash of missing images mid-animation.

**Why it happens:** The `animate-scroll-up` / `animate-scroll-down` / `animate-scroll-left` animations work by pre-loading triple-duplicated image arrays and translating the container. Standard browser lazy loading does not account for CSS-animated positions, only static DOM positions.

**Consequences:** Visible flicker and missing images during the hero marquee and review wall scroll animations. The visual effect breaks entirely at first load.

**Prevention:**
- Use `loading="eager"` on all images inside animated scroll containers (hero marquee, reviews wall).
- Alternatively, use the `priority` prop (deprecated in Next.js 16 — use `preload` instead) or `fetchPriority="high"` for above-the-fold animated images.
- For `fill`-mode images inside scroll containers, ensure the parent has `position: relative`.
- Provide explicit `sizes` props to prevent over-fetching: e.g., `sizes="(max-width: 768px) 192px, 25vw"` for hero marquee thumbnails.

**Warning signs:**
- Blank image slots appearing then filling during scroll animation
- Console warnings about missing `width`/`height` on Image components used with `fill`
- Layout shift (CLS) on hero section

**Phase:** Image migration phase. Apply `loading="eager"` to animated containers as a first pass, then tune `sizes` for performance.

---

### Pitfall 4: Assets Folder Path Mismatch

**What goes wrong:** All current images are referenced as relative paths like `assets/jobs/foo.jpg`, `../../assets/cf-icon.png`. Next.js serves static files from the `public/` directory, and they must be referenced with absolute paths starting with `/`. Moving images to `public/assets/` and keeping relative path references will result in 404s for all images.

**Why it happens:** The current site uses a flat directory structure where HTML, JS, and assets coexist. Next.js requires all public static assets to live under `public/` and uses root-relative URLs.

**Consequences:** Every image on every page returns 404. The site appears completely broken visually.

**Prevention:**
- Move all assets from `/assets/` to `/public/assets/` (preserving subdirectory structure: `jobs/`, `reviews/`, `mobile/`).
- Update all image `src` values from `assets/foo.jpg` to `/assets/foo.jpg` (add leading slash).
- In Next.js `<Image>` components, use `/assets/jobs/foo.jpg` format.
- The `mobileImg()` helper function that constructs paths like `assets/jobs/mobile/foo.jpg` must be updated to produce `/assets/jobs/mobile/foo.jpg`.

**Warning signs:**
- 404 errors in the network tab for all images
- `<img>` tags with `src` starting without a slash in the compiled output

**Phase:** Project scaffold phase, before any component migration. Move assets first.

---

### Pitfall 5: Tailwind CDN Config Does Not Port Directly to Installed Tailwind

**What goes wrong:** The current site uses `tailwind.config = { theme: { extend: { ... } } }` as a JavaScript object assigned to a global in a `<script>` tag. This is CDN-specific syntax. The installed Tailwind (via npm) uses a `tailwind.config.js` file at the project root. The custom `arch-*` colors, custom animations (`slow-zoom`, `scroll-up`, `scroll-down`, `scroll-left`, `float`), custom keyframes, and font families will all be missing if the config is not ported correctly.

**Why it happens:** CDN Tailwind and npm Tailwind have completely different configuration mechanisms. The CDN approach is a runtime global; the installed approach is a build-time config file.

**Consequences:** All `arch-black`, `arch-mineral`, `arch-stone`, `arch-concrete`, `arch-bronze`, `arch-charcoal` color classes are stripped. All `animate-scroll-up`, `animate-scroll-down`, `animate-slow-zoom`, `animate-float` classes are missing. Font families `font-serif` (Playfair Display) and `font-sans` (Inter) fall back to system defaults. The site looks completely wrong.

**Prevention:**
- Copy the `tailwind.config` object from the current `<script>` tag directly into a `tailwind.config.js` file as `module.exports = { theme: { extend: { ... } } }`.
- Install Tailwind v3 (not v4) since the config uses v3 syntax: `npm install -D tailwindcss@^3 postcss autoprefixer`.
- Create `postcss.config.js` with `{ plugins: { tailwindcss: {}, autoprefixer: {} } }`.
- Add `content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}']` to the config for class scanning.
- The `backgroundImage.noise` data URL inline SVG must be ported exactly — Tailwind will purge it if it only appears in a `<style>` tag, not in a `className`.
- Import `globals.css` with `@tailwind base; @tailwind components; @tailwind utilities;` in the root layout.

**Warning signs:**
- Page renders with no custom colors (everything black/white/gray)
- Animations not working despite correct class names
- `font-serif` not using Playfair Display

**Phase:** Project scaffold phase. Configure Tailwind before migrating any component.

---

### Pitfall 6: `'use client'` Boundary Contamination Breaking Server Rendering

**What goes wrong:** The `Reveal` component (which uses `useState`, `useEffect`, and `IntersectionObserver`) is used as a wrapper around nearly every section. If `Reveal` is marked `'use client'`, any Server Component that imports and uses `Reveal` must also be a Client Component unless the content is passed as `children`. If the entire `Purpose`, `Process`, and `Portfolio` sections are wrapped in a single `'use client'` component, they cannot contain Server Components as direct imports.

**Why it happens:** The `'use client'` directive marks a module boundary — all imports within that module are considered client-side. But Server Components can be passed as `children` to Client Components and will still render on the server.

**Consequences:** Large sections of the page that have no interactivity ship as client JavaScript. SSR is partially lost. Bundle size grows unnecessarily.

**Prevention:**
- Mark `Reveal` as `'use client'` (it needs `useState`, `useEffect`, `useRef`).
- Pass section content as `children` to `Reveal`, not as direct imports inside `Reveal`. This is the "interleaving" pattern from official docs.
- Pattern: `<Reveal><StaticContent /></Reveal>` where `StaticContent` is a Server Component imported in the parent Server Component page file.
- Alternatively, implement `Reveal` using CSS-only animation and `@keyframes` triggered by the `:is([data-visible])` attribute set via a small client script, keeping section components as Server Components entirely.

**Warning signs:**
- All content inside `Reveal` disappears from the server-rendered HTML
- View source shows an empty `<div class="reveal-base">` with no content

**Phase:** Component architecture phase, during `Reveal` component design.

---

## Moderate Pitfalls

Mistakes that cause incorrect behavior, visual bugs, or require significant debugging.

---

### Pitfall 7: MDX Missing `mdx-components.tsx` File

**What goes wrong:** `@next/mdx` with Next.js App Router **requires** a `mdx-components.tsx` file at the project root (same level as `app/`). Without it, MDX pages will silently fail to render or throw a build error. This file maps HTML elements to custom React components, which is how you apply Tailwind styles to MDX-rendered content (e.g., making `h2` elements use `font-serif text-arch-black`).

**Why it happens:** The App Router MDX plugin has a stricter contract than the Pages Router version. The file is part of the official API and not optional.

**Consequences:** Case study MDX pages render with unstyled HTML. Or the build fails with a cryptic error about missing component mapping.

**Prevention:**
- Create `mdx-components.tsx` at the project root immediately when setting up MDX.
- Map all markdown elements to styled equivalents using the arch design system.
- Use `@tailwindcss/typography` (`prose` classes) as a base for MDX content styling to avoid manually mapping every element.
- Add `pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']` to `next.config.mjs`.

**Warning signs:**
- Case study pages render with browser-default unstyled text
- Build error: "mdx-components file is required"

**Phase:** MDX case study phase. Set up this file before writing any MDX content.

---

### Pitfall 8: MDX Frontmatter Not Supported by Default

**What goes wrong:** `@next/mdx` does NOT support frontmatter (`--- title: "..." ---` blocks) by default. If case study MDX files use frontmatter for metadata (title, description, date), it will either be rendered as literal text or silently ignored. This means page metadata (`<title>`, `<meta name="description">`) cannot be sourced from frontmatter without additional plugins.

**Why it happens:** `@next/mdx` is a minimal MDX processor. Frontmatter parsing requires a separate remark plugin (`remark-frontmatter` + `remark-mdx-frontmatter`).

**Consequences:** Case study pages all have the same `<title>` (the site default). SEO benefit of case studies is lost.

**Prevention option A:** Use ES module exports inside MDX files instead of frontmatter:
```mdx
export const metadata = { title: "Perry's Little Library", description: "..." }
```
Then import `metadata` from the MDX file in the page component and pass to Next.js `generateMetadata`.

**Prevention option B:** Add `remark-frontmatter` and `remark-mdx-frontmatter` to `next.config.mjs` and use gray-matter to parse frontmatter during `generateStaticParams`.

Option A is simpler with `@next/mdx` and avoids extra dependencies.

**Warning signs:**
- Frontmatter YAML appears as rendered text at the top of the case study page
- All case study pages share the same browser tab title

**Phase:** MDX case study phase.

---

### Pitfall 9: URL Structure Must Match Current `case-studies/slug/` Pattern

**What goes wrong:** The current case studies are served as `case-studies/palo-alto-redwood-little-library/index.html` — the URL is `/case-studies/palo-alto-redwood-little-library/` (with trailing slash). Next.js App Router maps `app/case-studies/palo-alto-redwood-little-library/page.tsx` to `/case-studies/palo-alto-redwood-little-library`. If the trailing slash behavior differs, existing links, search engine indexes, and any backlinks break.

**Why it happens:** Trailing slash handling is configurable. By default, Next.js does NOT add trailing slashes. The current site uses directory-based routing with `index.html` files which produce trailing slash URLs.

**Consequences:** Existing search engine indexed URLs return 404. Any hardcoded links in the current site (e.g., portfolio card `caseStudy` hrefs) produce 404s.

**Prevention:**
- Add `trailingSlash: true` to `next.config.js` to maintain URL parity.
- OR add redirects in `next.config.js` mapping `/case-studies/slug/` to `/case-studies/slug`.
- For a greenfield migration where SEO history can be discarded, this is less critical, but the internal portfolio card links in the homepage use paths like `case-studies/palo-alto-redwood-little-library/` and must be updated to absolute paths `/case-studies/palo-alto-redwood-little-library`.

**Warning signs:**
- 404 on case study pages when clicking portfolio cards
- Portfolio card links using relative paths (`case-studies/...`) instead of root-relative (`/case-studies/...`)

**Phase:** Routing setup phase, during project scaffold.

---

### Pitfall 10: Google Analytics `gtag()` Global Function

**What goes wrong:** The current site uses `window.gtag()` directly from inline `<script>` tags. In Next.js, you cannot add arbitrary `<script>` tags in the `<body>` at the component level without `next/script`. The `gtag()` function called in the `App` component via `gtag('event', 'inquiry_form_opened')` will throw `ReferenceError: gtag is not defined` in Server Components.

**Why it happens:** Global script loading happens differently in Next.js. The `<head>` section is managed by the root layout and `generateMetadata`, not inline `<script>` tags.

**Consequences:** Google Analytics events are not tracked. Build or runtime error if `gtag` is called in a component that does not have access to the global.

**Prevention:**
- Load the GA script using `next/script` with `strategy="afterInteractive"` in the root layout.
- Wrap `gtag()` calls in a client-side utility function that checks `typeof gtag !== 'undefined'` before calling.
- Place event tracking calls only in Client Components (`'use client'`), never in Server Components.

**Warning signs:**
- Console error `ReferenceError: gtag is not defined`
- GA events not appearing in real-time report

**Phase:** Analytics integration, after component migration.

---

### Pitfall 11: Next.js Image `fill` Mode Requires `position: relative` Parent

**What goes wrong:** Many images in this site use `object-cover` on a container with `aspect-ratio`. When migrating to Next.js `<Image fill>`, the parent element must have `position: relative` (or `fixed`/`absolute`). Without it, the image renders at 0x0 or fills the entire viewport. This is a silent visual bug — no build error.

**Why it happens:** `fill` mode renders the `<img>` as `position: absolute`. It needs a positioned ancestor to anchor to.

**Consequences:** Images are invisible (0x0) or massively oversized. The portfolio cards, process section images, and purpose section hero image break visually.

**Prevention:**
- For every `<Image fill>` usage, ensure the parent has `className="relative"` (Tailwind) or `style={{ position: 'relative' }}`.
- Always pair `fill` with `style={{ objectFit: 'cover' }}` or `className="object-cover"` to maintain cropping behavior.
- For fixed-dimension images where width and height are known, prefer explicit `width` and `height` props over `fill` to avoid the positioning requirement.

**Warning signs:**
- Invisible image slots (element exists but renders at 0px)
- Image stretches to fill entire browser window
- No build error — purely a visual bug caught only by testing

**Phase:** Image migration phase, per-component.

---

### Pitfall 12: CSS-only Hover Pause Requires Client Component Context

**What goes wrong:** The review wall uses `.hover-pause:hover .animate-scroll-up { animation-play-state: paused }` — pure CSS with no JavaScript. This CSS must be in a global stylesheet or CSS Module to work. The `hover-pause` class is currently defined in an inline `<style>` tag. In Next.js, inline `<style>` in JSX is allowed, but it bypasses Tailwind's purging and may create hydration issues when the server-rendered HTML has different inline styles from client expectations.

**Why it happens:** Next.js has strict rules around where styles live to support SSR hydration consistency.

**Prevention:**
- Move the `.hover-pause` CSS rule into `globals.css` alongside the `.reveal-base` and `.no-scrollbar` rules.
- This is a global CSS class so `globals.css` is appropriate — it is not component-scoped.
- Also move `select option` styling there.

**Warning signs:**
- Hover-pause functionality stops working on the reviews wall
- Hydration mismatch warnings in the browser console related to style attributes

**Phase:** Tailwind/CSS setup phase.

---

## Minor Pitfalls

Issues that create friction but are easy to fix once identified.

---

### Pitfall 13: Google Fonts Need to Move from CDN `<link>` to `next/font`

**What goes wrong:** The current site loads Inter and Playfair Display from Google Fonts CDN via `<link>` tags in `<head>`. In Next.js, the recommended approach is `next/font/google`, which self-hosts fonts at build time, eliminates the Google Fonts CDN network request, and prevents layout shift from font loading. Using raw CDN links via `<link>` in the layout still works but misses performance gains and may cause FOUC (flash of unstyled content).

**Prevention:**
- Use `next/font/google` for both `Inter` and `Playfair_Display`.
- Apply font CSS variables to the root `<html>` element via the layout.
- Pass font variable names to `tailwind.config.js` so `font-sans` and `font-serif` classes use the self-hosted fonts.

**Phase:** Project scaffold / layout setup phase.

---

### Pitfall 14: `<a>` Tags Must Become `<Link>` for Internal Navigation

**What goes wrong:** The current site uses `<a href="case-studies/...">` and `<a href="#purpose">` for all navigation. In Next.js, internal page navigation should use `<Link>` from `next/link` for prefetching and client-side transitions. Hash anchor links (`#purpose`) work fine as native `<a>` tags since they are same-page scroll targets, not route changes.

**Prevention:**
- Replace cross-page `<a>` tags with `<Link href="...">` from `next/link`.
- Keep `<a href="#section">` for same-page anchor navigation (no change needed).
- Nav's `href="#purpose"` hash links stay as `<a>` — they scroll the current page, no routing change.

**Phase:** Component migration phase, during Nav extraction.

---

### Pitfall 15: `window.location.href` Assignment for Navigation

**What goes wrong:** `PortfolioCard` uses `window.location.href = item.caseStudy` for navigation on card click. This is a hard navigation that bypasses Next.js's client-side router and causes a full page reload. It also crashes in Server Components if the component is not marked `'use client'`.

**Prevention:**
- Replace with `useRouter().push(item.caseStudy)` from `next/navigation` inside a `'use client'` component.
- Or change the card to render as a native `<Link>` wrapper with appropriate styling.

**Phase:** Component migration phase, during PortfolioCard extraction.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project scaffold | Missing Tailwind config (Pitfall 5) | Port CDN config to `tailwind.config.js` before first component |
| Project scaffold | Assets 404 (Pitfall 4) | Move `assets/` to `public/assets/` and update all paths immediately |
| Project scaffold | URL trailing slash (Pitfall 9) | Add `trailingSlash: true` to `next.config.js` |
| Root layout | Global `window` crash (Pitfall 1) | Never access `window` outside `'use client'` components |
| Component architecture | Entire app becomes client (Pitfall 2) | Design server/client split before writing any component |
| Component architecture | `Reveal` contaminates parents (Pitfall 6) | Use `children` prop pattern for Reveal wrapper |
| Image migration | Animated containers lazy-load badly (Pitfall 3) | Apply `loading="eager"` to all marquee/review scroll images |
| Image migration | Fill mode layout bug (Pitfall 11) | Every `<Image fill>` parent must have `position: relative` |
| CSS setup | Custom global classes lost (Pitfall 12) | Move `hover-pause`, `reveal-base`, `no-scrollbar` to `globals.css` |
| Font setup | FOUC / layout shift (Pitfall 13) | Use `next/font/google` not CDN `<link>` |
| MDX case studies | Missing `mdx-components.tsx` (Pitfall 7) | Create file before any MDX page |
| MDX case studies | Frontmatter not supported (Pitfall 8) | Use ES exports for metadata, not frontmatter YAML |
| Analytics | `gtag` not defined (Pitfall 10) | Load via `next/script`, call only from Client Components |
| Navigation | Hard navigation reload (Pitfall 15) | Replace `window.location.href` with `useRouter().push()` |

---

## Sources

- Next.js App Router Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components (version 16.1.6, 2026-02-27)
- Next.js Image Component API Reference: https://nextjs.org/docs/app/api-reference/components/image (version 16.1.6, 2026-02-27)
- Next.js MDX Guide: https://nextjs.org/docs/app/guides/mdx (version 16.1.6, 2026-02-27)
- Next.js CSS / Tailwind v3 Setup: https://nextjs.org/docs/app/guides/tailwind-v3-css (version 16.1.6, 2026-02-27)
- Next.js Layouts and Pages: https://nextjs.org/docs/app/getting-started/layouts-and-pages (version 16.1.6, 2026-02-27)
- Next.js Redirecting Guide: https://nextjs.org/docs/app/guides/redirecting (version 16.1.6, 2026-02-27)
- Current site source: /Users/caldayham/Desktop/cf.design/v3.cf.design/index.html (direct code inspection)
