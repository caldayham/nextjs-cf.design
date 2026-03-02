# Phase 3: Contact & Conversion - Research

**Researched:** 2026-03-01
**Domain:** Inquiry modal (full-screen overlay, form state, URL-triggered open), Formspree form submission, thank-you page, Google Analytics 4 via @next/third-parties
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONV-01 | Inquiry modal opens as full-screen overlay with fields: name, location checkbox, phone, referral source, project notes | Full `Contact` component extracted from `index.html` lines 694–784; all JSX, state, and CSS classes catalogued verbatim |
| CONV-02 | Inquiry modal opens via `?inquire` URL parameter | Source uses `new URLSearchParams(window.location.search).has('inquire')` (line 812); Next.js pattern is `useSearchParams().has('inquire')` inside a Suspense boundary |
| CONV-03 | Phone number input auto-formats as user types | `formatPhone(val, prev)` function extracted verbatim from source lines 697–704; strips non-digits, formats `(NXX) NXX-XXXX`, handles backspace-delete correctly |
| CONV-04 | Form submits to Formspree and redirects to thank-you page | Source uses `<form action="https://formspree.io/f/mpqlvore" method="POST">` with `<input type="hidden" name="_next" value="https://cf.design/thank-you" />`; redirect target must update to deployed domain |
| CONV-05 | Thank-you page renders with confirmation image and text, link back to homepage | Full `thank-you/index.html` examined; it is a standalone page with `h-screen flex flex-col items-center justify-center` layout, hero image (`/assets/cal-fynn-outdoor-design.jpg`), and a back-link to `/` |
| CONV-06 | Google Analytics (GA4) integrated via @next/third-parties | `@next/third-parties` v16.1.6 available (matches Next.js version); `GoogleAnalytics gaId="G-DNSCN01BPT"` placed inside `<html>` in `app/layout.tsx`; pageview tracking is automatic |
</phase_requirements>

---

## Summary

Phase 3 has four distinct deliverables: (1) the `InquiryModal` component extracted verbatim from `index.html`, wired into `SiteShell`; (2) `?inquire` URL-parameter detection that auto-opens the modal; (3) the `/thank-you` Next.js page; and (4) Google Analytics 4 setup via `@next/third-parties`.

The inquiry modal is already stubbed in `SiteShell.tsx` with a `{/* InquiryModal mounted here in Phase 3 */}` comment and the `closeInquiry`/`showInquiry` state already exists (though `closeInquiry` is currently voided). SiteShell already provides `openInquiry` through `ShellContext`. The modal component is pure extraction — every CSS class, every field, the `formatPhone` function, the Escape-key listener, and the body-scroll-lock are lifted verbatim from the source.

The key technical challenge is `?inquire` URL detection. In Next.js App Router, `useSearchParams()` in a Client Component causes the nearest Suspense boundary to become a CSR bailout boundary. The production build will fail with "Missing Suspense boundary with useSearchParams" if the hook is called without a Suspense wrapper. The solution is to isolate the URL-detection into a small wrapper component that is itself wrapped in `<Suspense>`, leaving the rest of SiteShell SSR-friendly.

Google Analytics is a one-line addition to `app/layout.tsx`: install `@next/third-parties`, import `GoogleAnalytics`, place `<GoogleAnalytics gaId="G-DNSCN01BPT" />` just before `</html>`. Pageview events fire automatically on every client-side navigation with no additional code.

**Primary recommendation:** Wire the InquiryModal into SiteShell first (no URL dependency), then add the `?inquire` detection via Suspense-wrapped useSearchParams, then create the thank-you page, then add GA. This ordering isolates complexity and allows each piece to be verified independently.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 (installed) | App Router, page routing, server rendering | Project foundation; provides `useSearchParams`, `useRouter`, page conventions |
| React | 19.2.3 (installed) | Component model, useState, useEffect | Project foundation |
| `@next/third-parties` | 16.1.6 | GoogleAnalytics component for GA4 | Official Next.js package; matches installed Next.js version; replaces manual gtag script |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `next/navigation` → `useSearchParams` | built-in | Detect `?inquire` in URL | Inside `'use client'` component wrapped in `<Suspense>` |
| Formspree | (service, no npm package) | Form submission backend | Used via plain HTML `<form action>` post — no npm package needed |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `@next/third-parties` `GoogleAnalytics` | Manual `<script>` tag in `layout.tsx` | Manual script works but lacks the performance optimizations (deferred hydration) that `@next/third-parties` provides; REQUIREMENTS.md CONV-06 specifies `@next/third-parties` explicitly |
| `useSearchParams` in SiteShell | `searchParams` prop on `page.tsx` | `page.tsx` can read `searchParams` as a Server Component prop, but cannot pass it to SiteShell (which is in `layout.tsx`, which does not receive `searchParams`). `useSearchParams` in a client component is the correct approach. |
| Formspree `@formspree/react` hook | Plain HTML `<form action>` POST | Source uses plain HTML POST; the `@formspree/react` hook adds dependency weight with no benefit; REQUIREMENTS.md says "backend API routes out of scope" |

**Installation:**
```bash
npm install @next/third-parties@latest
```

---

## Architecture Patterns

### Recommended Project Structure

```
app/
├── layout.tsx            # Add <GoogleAnalytics gaId="G-DNSCN01BPT" />
├── thank-you/
│   └── page.tsx          # New — /thank-you route
components/
├── layout/
│   ├── SiteShell.tsx     # Add: showInquiry state active, InquiryModal mounted, closeInquiry wired, Suspense wrapper for URL detection
│   └── InquiryModal.tsx  # New — extracted verbatim from index.html lines 694–784
```

### Pattern 1: InquiryModal Component (CONV-01, CONV-03)

**What:** Extract the `Contact` component verbatim from `index.html` lines 694–784 into `components/layout/InquiryModal.tsx`. Rename to `InquiryModal` for clarity. Add `'use client'` directive. No other changes except standard Next.js migrations (no `<img>` in the modal — no images used; no `<a href>` — no links either).

**When to use:** Mounted in SiteShell, conditionally rendered (`if (!isOpen) return null` — matches source line 711).

**Complete component (verbatim extract + Next.js adaptations):**
```tsx
// components/layout/InquiryModal.tsx
'use client'
import { useState, useEffect } from 'react'
import { X, MapPin } from '@/components/ui/Icons'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [nearPaloAlto, setNearPaloAlto] = useState<string | null>(null)
  const [phone, setPhone] = useState('')

  const formatPhone = (val: string, prev: string) => {
    const d = val.replace(/\D/g, '').slice(0, 10)
    const deleting = val.length < prev.length
    if (!d.length) return ''
    if (d.length <= 3) return deleting ? `(${d}` : `(${d})`
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] bg-arch-black/95 backdrop-blur-md overflow-y-auto animate-fade-in-fast">
      <button onClick={onClose} className="fixed top-6 right-6 z-[80] text-white hover:text-arch-stone transition-colors cursor-pointer">
        <X className="w-6 h-6" />
      </button>
      <div className="container mx-auto px-6 py-20 md:py-32 text-white relative">
        {/* Mobile header */}
        <div className="lg:hidden mb-4">
          <h2 className="text-xs font-bold tracking-[0.25em] text-arch-stone uppercase mb-8">Inquiries</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Get Solutions.</h3>
          <p className="text-arch-stone/60 mb-4 leading-relaxed font-light text-sm">Once submitted, Cal or Fynn will send you a quick text message within 24 hours :)</p>
          <p className="text-arch-stone/60 mb-4 leading-relaxed font-light text-sm">We only use your information to contact you directly. We will never share your information.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16 md:gap-20">
          {/* Left column */}
          <div className="lg:w-1/3 order-2 lg:order-1">
            <div className="hidden lg:block">
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-stone uppercase mb-8">Inquiries</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Get Solutions.</h3>
              <p className="text-arch-stone/60 mb-12 leading-relaxed font-light text-sm md:text-base">Once submitted, Cal or Fynn will send you a quick text message within 24 hours :)</p>
              <p className="text-arch-stone/60 mb-12 leading-relaxed font-light text-sm md:text-base">We only use your information to contact you directly. We never share information.</p>
            </div>
            <div className="space-y-6 text-arch-stone">
              <div className="flex items-center gap-4"><MapPin className="w-5 h-5 text-white" /><span>Serving San Mateo &amp; Santa Clara County</span></div>
            </div>
          </div>
          {/* Right column — form */}
          <div className="lg:w-2/3 order-1 lg:order-2">
            <form className="space-y-12" action="https://formspree.io/f/mpqlvore" method="POST">
              <input type="hidden" name="_next" value="https://cf.design/thank-you" />
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">Name</label>
                <input type="text" name="name" required className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif" placeholder="Your name" />
              </div>
              <div className="border-b border-white/20 pb-8">
                <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-6">Are you within 30 minutes of Palo Alto?</label>
                <div className="flex flex-wrap gap-8">
                  {['Yes', 'No'].map(opt => (
                    <label key={opt} className="flex items-center cursor-pointer gap-3" onClick={() => setNearPaloAlto(opt)}>
                      <input type="radio" name="near_palo_alto" value={opt} required className="hidden" />
                      <div className="w-5 h-5 border border-white/50 rounded-full flex items-center justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${nearPaloAlto === opt ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                      <span className="text-lg font-serif">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value, phone))}
                    className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif"
                    placeholder="(650) 123-4567"
                  />
                </div>
                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">How did you hear about us?</label>
                  <select
                    name="referral_source"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif appearance-none cursor-pointer"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E5E4E2' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
                  >
                    <option value="" disabled style={{ color: '#999' }}>Select one</option>
                    <option value="Builder_Referral">Builder Referral</option>
                    <option value="Homeowner_Referral">Homeowner Referral</option>
                    <option value="Google">Google</option>
                    <option value="Nextdoor">Nextdoor</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Mail_Brochure">Mail Brochure</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">
                  Project Notes <span className="normal-case tracking-normal font-normal text-arch-stone/40 italic">(brief is fine)</span>
                </label>
                <textarea rows={2} name="project_notes" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif" placeholder="two garden boxes and a stuck gate repair"></textarea>
              </div>
              <button type="submit" className="bg-white text-arch-black px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-arch-stone transition-colors w-full md:w-auto">Submit Inquiry</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Key details from source:**
- `z-[70]` for modal overlay; `z-[80]` for the close button (above modal)
- `animate-fade-in-fast` — already defined in `globals.css` as `fadeIn 0.2s ease-out forwards`
- `overflow-y-auto` — modal content scrolls if viewport is short
- `if (!isOpen) return null` — renders nothing when closed; this is the correct pattern (no CSS `display:none`)
- Body scroll-lock is handled in `SiteShell` via `useEffect` on `showInquiry` (see Pattern 2 below)
- The `select` element's `defaultValue` must be set differently in React — use a `defaultValue=""` on the `<select>` or keep `selected` on the option. In React, `selected` on `<option>` is a no-op; use `defaultValue=""` on the `<select>` instead. This is a required change (it's a React constraint, not a rewrite).

### Pattern 2: SiteShell Updates (CONV-01, CONV-02)

**What:** Three changes to `SiteShell.tsx`:
1. Activate the `closeInquiry` function (remove `void closeInquiry`)
2. Mount `<InquiryModal>` in the commented placeholder slot
3. Add body-scroll-lock `useEffect` (from source line 813–821)
4. Add `?inquire` URL detection via a Suspense-wrapped child component

**Body scroll lock (from source lines 813–821 — extract verbatim):**
```tsx
useEffect(() => {
  if (showInquiry) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
  return () => { document.body.style.overflow = '' }
}, [showInquiry])
```

**SiteShell after Phase 3 updates:**
```tsx
// components/layout/SiteShell.tsx
'use client'
import { useState, useEffect, Suspense } from 'react'
import { ShellContext } from '@/context/ShellContext'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import InquiryModal from '@/components/layout/InquiryModal'
import InquiryUrlWatcher from '@/components/layout/InquiryUrlWatcher'

interface SiteShellProps {
  children: React.ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  const [showInquiry, setShowInquiry] = useState(false)
  const openInquiry = () => setShowInquiry(true)
  const closeInquiry = () => setShowInquiry(false)

  useEffect(() => {
    if (showInquiry) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showInquiry])

  return (
    <ShellContext.Provider value={{ openInquiry }}>
      <div className="font-sans text-arch-charcoal bg-arch-concrete">
        <Nav onInquiry={openInquiry} />
        {children}
        <Suspense fallback={null}>
          <InquiryUrlWatcher onInquiry={openInquiry} />
        </Suspense>
        <InquiryModal isOpen={showInquiry} onClose={closeInquiry} />
        <Footer />
      </div>
    </ShellContext.Provider>
  )
}
```

### Pattern 3: InquiryUrlWatcher — Suspense-Isolated useSearchParams (CONV-02)

**What:** A minimal Client Component that reads `useSearchParams()` and calls `openInquiry` if `?inquire` is present. Wrapped in `<Suspense fallback={null}>` in SiteShell to prevent build-time CSR bailout.

**Why isolated:** `useSearchParams()` in a static route causes the component tree up to the nearest Suspense boundary to be client-side rendered (not SSR). By isolating it in a tiny component with `<Suspense fallback={null}>`, the rest of SiteShell (Nav, children, Footer) remains SSR-rendered. Without the Suspense boundary, the production build fails.

**Source original (index.html line 812):**
```js
const [showInquiry, setShowInquiry] = useState(() => new URLSearchParams(window.location.search).has('inquire'));
```

**Next.js equivalent:**
```tsx
// components/layout/InquiryUrlWatcher.tsx
'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface InquiryUrlWatcherProps {
  onInquiry: () => void
}

export default function InquiryUrlWatcher({ onInquiry }: InquiryUrlWatcherProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.has('inquire')) {
      onInquiry()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run only on mount — matches source's useState lazy initializer behavior

  return null
}
```

**Note on `useEffect` dependency:** The source uses a `useState` lazy initializer — it fires once on mount, not on every render. The `useEffect` with empty dependency array matches this behavior. The `onInquiry` function is stable (created in SiteShell's render scope), but including it in deps would cause the effect to re-run on every SiteShell render. `eslint-disable-next-line` comment documents this intentional decision.

### Pattern 4: Thank-You Page (CONV-05)

**What:** Create `app/thank-you/page.tsx` by extracting the `App` component from `thank-you/index.html` verbatim. The page is a Server Component (no state, no hooks in the original `App` component).

**Key details from source:**
- Full-screen dark layout: `font-sans text-arch-stone bg-arch-black h-screen flex flex-col items-center justify-center px-6`
- `<h1>Thank You!</h1>`: `text-4xl md:text-7xl font-serif text-white mb-6 md:mb-10`
- Image: `src="../assets/cal-fynn-outdoor-design.jpg"` → `/assets/cal-fynn-outdoor-design.jpg` with `next/image`
- Image wrapper: `w-full max-w-md md:max-w-lg overflow-hidden mb-6 md:mb-10`
- Body text: `text-arch-stone/70 text-xs md:text-base leading-relaxed font-light mb-8 md:mb-12 max-w-lg mx-auto text-center`
- Back link: `<a href="/">` → `<Link href="/">` with classes `inline-block px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white text-white hover:bg-white hover:text-arch-black transition-all`

**Source thank-you page has no Nav or Footer.** In Next.js, `app/thank-you/page.tsx` is a child of `app/layout.tsx`, which wraps everything in SiteShell (which includes Nav and Footer). Decision required: either (a) accept that thank-you page has Nav/Footer (differs from original), or (b) create a separate layout for thank-you that bypasses SiteShell.

**Research recommendation:** The original thank-you page intentionally shows no Nav or Footer — it is a distraction-free confirmation page. The cleanest approach is to render the thank-you page content at full-height and let the Nav sit transparently on top (as it does on all pages initially). The Nav scroll-frosted-background behavior means it's invisible against the dark background until the user scrolls. This is acceptable visual behavior and avoids the complexity of a separate layout. If the Nav is considered a problem, a route group layout (`app/(main)/layout.tsx` vs `app/(standalone)/thank-you/page.tsx`) can bypass SiteShell — but this is complex and not required for 1:1 parity.

**Complete thank-you page:**
```tsx
// app/thank-you/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You - CF Design',
  description: 'Thank you for your inquiry. Cal or Fynn will reach out within 24 hours.',
}

export default function ThankYouPage() {
  return (
    <div className="font-sans text-arch-stone bg-arch-black h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 md:mb-10">Thank You!</h1>
      <div className="w-full max-w-md md:max-w-lg overflow-hidden mb-6 md:mb-10">
        <Image
          src="/assets/cal-fynn-outdoor-design.jpg"
          alt="Cal and Fynn"
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      <p className="text-arch-stone/70 text-xs md:text-base leading-relaxed font-light mb-8 md:mb-12 max-w-lg mx-auto text-center">
        Cal or Fynn will reach out to you via text message within 24 hours to learn more about your project and schedule your free consultation!
      </p>
      <Link href="/" className="inline-block px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white text-white hover:bg-white hover:text-arch-black transition-all">
        Back to website
      </Link>
    </div>
  )
}
```

**Note on `bg-arch-black` background:** The thank-you page has a dark background (`bg-arch-black`) but the `<body>` defaults to `bg-arch-concrete` (light) from `globals.css`. The `bg-arch-black` class on the page's root `<div>` overrides the body color visually since the div is `h-screen`. This matches the source.

### Pattern 5: Google Analytics via @next/third-parties (CONV-06)

**What:** Add `<GoogleAnalytics gaId="G-DNSCN01BPT" />` to `app/layout.tsx`. The component handles script loading with deferred hydration; pageview events fire automatically on every client-side navigation.

**GA4 Measurement ID from source:** `G-DNSCN01BPT` (confirmed in `index.html` lines 12, 18 and `thank-you/index.html` lines 8, 14).

**Source also fires a custom event on modal open (line 815):**
```js
gtag('event', 'inquiry_form_opened');
```

This custom event is not part of the CONV-06 requirement (which only requires pageview tracking). It is noted here so the planner can decide whether to include it. If included, use `sendGAEvent('event', 'inquiry_form_opened')` from `@next/third-parties/google` in the `openInquiry` function or in InquiryModal's `useEffect`.

**Updated `app/layout.tsx`:**
```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import SiteShell from '@/components/layout/SiteShell'
import './globals.css'

// ... font setup unchanged ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-arch-mineral selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
      <GoogleAnalytics gaId="G-DNSCN01BPT" />
    </html>
  )
}
```

**Note:** `<GoogleAnalytics>` is placed after `<body>` but inside `<html>`, as shown in the official Next.js docs example. This is intentional — it loads after hydration.

**Pageview tracking:** GA4 automatically tracks pageviews when browser history changes. "Enhanced Measurement" must be enabled in GA4 Admin → Data Streams → Enhanced Measurement → "Page changes based on browser history events". This is a GA4 admin setting, not a code change. Confirm this is enabled in the GA4 property before testing.

### Anti-Patterns to Avoid

- **Calling `useSearchParams()` outside a Suspense boundary:** The production build fails with `Missing Suspense boundary with useSearchParams`. Works in dev but breaks on `next build`. Always wrap in `<Suspense>`.
- **Using `selected` on `<option>` in React:** `selected` is ignored in React; use `defaultValue=""` on the `<select>` element to set the initial unselected state. This is a required React adaptation, not a visual rewrite.
- **Putting `InquiryModal` in `page.tsx` instead of `SiteShell`:** The modal must persist across page navigations and be accessible from Nav (which is in SiteShell). It belongs in SiteShell as the source's `App` component shows.
- **Forgetting body-scroll-lock:** Without `document.body.style.overflow = 'hidden'` when modal is open, the page scrolls behind the overlay on desktop. Extract this verbatim from source.
- **Making thank-you page a Client Component:** The source `App` component has no state — it is static HTML. `app/thank-you/page.tsx` should be a Server Component.
- **Using `router.push('/thank-you')` on form submit:** Formspree's POST redirect happens server-side via the `_next` field. Do not intercept the form submit in JavaScript — the native HTML form POST is the correct mechanism and matches the source.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Google Analytics script loading | Manual `<Script>` or `<script>` tag | `@next/third-parties` `GoogleAnalytics` | Official Next.js package; handles deferred loading, pageview tracking, type safety |
| Phone formatting | Third-party phone input library | `formatPhone()` function extracted from source (11 lines) | Already implemented verbatim; no edge cases missed; no library needed |
| Form submission | Server Actions, API routes | Native HTML POST to Formspree | Source uses plain HTML POST; no backend needed; REQUIREMENTS.md explicitly excludes backend API routes |
| Modal management | State management library | `useState` in SiteShell + ShellContext | Already implemented; context pattern established in Phase 1/2 |

**Key insight:** Every component in this phase is a direct extraction. The only new package is `@next/third-parties` for GA4.

---

## Common Pitfalls

### Pitfall 1: useSearchParams Without Suspense Crashes Production Build
**What goes wrong:** `next build` fails with error: `useSearchParams() should be wrapped in a suspense boundary at page "/"`.
**Why it happens:** In static rendering, `useSearchParams()` causes a CSR bailout up to the nearest Suspense boundary. Without one, Next.js errors at build time (not dev time — this is silent in `next dev`).
**How to avoid:** Create a separate `InquiryUrlWatcher` component that contains `useSearchParams()`. Mount it in SiteShell wrapped with `<Suspense fallback={null}>`.
**Warning signs:** Works in `next dev`, fails in `next build`. Error message mentions "Missing Suspense boundary with useSearchParams".

### Pitfall 2: React `<select>` defaultValue vs HTML `selected`
**What goes wrong:** The first `<option>` in the referral source select has `selected` in the source HTML (line 763). Copying this verbatim to React produces a warning and the option may not display as selected.
**Why it happens:** React controls form elements differently from HTML. `selected` on `<option>` is a React no-op.
**How to avoid:** Change `<select name="referral_source" ...>` to include `defaultValue=""` attribute. The `<option value="" disabled>Select one</option>` then displays correctly.
**Warning signs:** React console warning "Use the `defaultValue` or `value` props on `<select>` instead of setting `selected` on `<option>`".

### Pitfall 3: Formspree _next Redirect URL Must Be Absolute
**What goes wrong:** Form submissions redirect to Formspree's default thank-you page instead of the site's `/thank-you`.
**Why it happens:** The `_next` hidden field value must be an absolute URL. The source uses `https://cf.design/thank-you`. During local development, this redirects to the production site (not localhost).
**How to avoid:** Keep the value as `https://cf.design/thank-you` for the production build. During local development, Formspree will redirect to the production thank-you page — this is acceptable for development testing. Do not make the URL dynamic.
**Warning signs:** After submitting the form in development, browser redirects to `cf.design/thank-you` instead of `localhost:3000/thank-you`.

### Pitfall 4: Thank-You Page Background Conflict
**What goes wrong:** The thank-you page has `bg-arch-black h-screen` on its root div, but the `<body>` background is `bg-arch-concrete` (light). Any gap between the `h-screen` div and the actual viewport height (e.g., from iOS address bar) shows the light body background.
**Why it happens:** `h-screen` = `100vh`, which on mobile may not account for the browser UI chrome.
**How to avoid:** Add `min-h-screen` alongside `h-screen`, or use `min-h-dvh` if supported. However, the original source uses `h-screen` — stay verbatim.
**Warning signs:** Thin light-colored strip visible at bottom of thank-you page on mobile Safari.

### Pitfall 5: SiteShell closeInquiry Was Voided
**What goes wrong:** `closeInquiry` was `void`ed in the Phase 1/2 implementation (`void closeInquiry`) as a placeholder. Forgetting to remove this `void` means the close button does nothing.
**Why it happens:** Phase 1 left `closeInquiry` intentionally unused as a placeholder for Phase 3.
**How to avoid:** Remove `void closeInquiry` line from SiteShell.tsx and wire `closeInquiry` to the `<InquiryModal onClose={closeInquiry} />` prop.
**Warning signs:** Clicking X button or pressing Escape does not close the modal.

### Pitfall 6: InquiryUrlWatcher Fires Every Re-render
**What goes wrong:** If `onInquiry` is included in `useEffect` dependencies, the watcher calls `openInquiry()` every time SiteShell re-renders (which happens on scroll, nav interactions, etc.).
**Why it happens:** `onInquiry` is recreated on each SiteShell render unless memoized. Including it in deps triggers the effect repeatedly.
**How to avoid:** Use empty dependency array `[]` in `InquiryUrlWatcher`'s `useEffect`. The check should run only once on mount — matching the source's `useState` lazy initializer behavior.
**Warning signs:** Modal keeps popping open while browsing; opening and immediately closing the modal causes it to re-open.

---

## Code Examples

Verified patterns from direct source inspection of `index.html` and `thank-you/index.html`:

### formatPhone function (verbatim from index.html lines 697–704)
```typescript
// Source: index.html lines 697-704
const formatPhone = (val: string, prev: string): string => {
  const d = val.replace(/\D/g, '').slice(0, 10)
  const deleting = val.length < prev.length
  if (!d.length) return ''
  if (d.length <= 3) return deleting ? `(${d}` : `(${d})`
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}
```

### Modal open state initialization (source vs Next.js)
```typescript
// Source (index.html line 812):
const [showInquiry, setShowInquiry] = useState(() => new URLSearchParams(window.location.search).has('inquire'));

// Next.js equivalent (split into SiteShell + InquiryUrlWatcher):
// SiteShell: const [showInquiry, setShowInquiry] = useState(false)
// InquiryUrlWatcher: useEffect(() => { if (searchParams.has('inquire')) onInquiry() }, [])
```

### GoogleAnalytics placement in layout.tsx
```tsx
// Source: Official Next.js docs (v16.1.6, 2026-02-27)
// https://nextjs.org/docs/app/guides/third-party-libraries#google-analytics
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XYZ" />  {/* After body, inside html */}
    </html>
  )
}
```

### Suspense wrapper pattern for useSearchParams
```tsx
// Source: Next.js docs useSearchParams (v16.1.6, 2026-02-27)
// https://nextjs.org/docs/app/api-reference/functions/use-search-params#static-rendering
<Suspense fallback={null}>
  <InquiryUrlWatcher onInquiry={openInquiry} />
</Suspense>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual `<script>` gtag.js in `<head>` | `<GoogleAnalytics>` from `@next/third-parties` | Next.js 13+ | Deferred loading, type-safe, no manual script tag |
| `new URLSearchParams(window.location.search)` | `useSearchParams()` from `next/navigation` | Next.js App Router | Must be in `'use client'`; requires Suspense boundary for static routes |
| Plain HTML `<select selected>` | React `<select defaultValue="">` | React 16+ | `selected` on `<option>` is ignored in React; must use `defaultValue` on `<select>` |

**Deprecated/outdated:**
- `priority` on `next/image`: Already noted — use `preload` (not relevant to this phase; thank-you page image is below fold)
- Manual `gtag()` function calls for pageviews: `GoogleAnalytics` component handles this automatically with Enhanced Measurement enabled

---

## Open Questions

1. **Nav on thank-you page**
   - What we know: Original `thank-you/index.html` has no Nav or Footer. Next.js `layout.tsx` wraps all pages in SiteShell (which includes Nav + Footer).
   - What's unclear: Whether the transparent Nav over the dark thank-you page background is acceptable, or whether a route group is needed to exclude SiteShell.
   - Recommendation: Accept the transparent Nav on thank-you page as acceptable behavior. The Nav starts transparent on all pages and only frosts on scroll. On the dark `h-screen` page, it is invisible at load. This matches close enough to the original intent. Only escalate to route group if visual review shows a problem.

2. **Custom `inquiry_form_opened` GA event**
   - What we know: Source fires `gtag('event', 'inquiry_form_opened')` when `showInquiry` becomes true (line 815).
   - What's unclear: CONV-06 only requires pageview tracking. Whether the custom event is in scope.
   - Recommendation: Include it — it's one line (`sendGAEvent('event', 'inquiry_form_opened')`) in the `useEffect` inside SiteShell. Preserves the original tracking behavior and matches the source with no additional complexity.

3. **select `defaultValue` vs. keeping `selected` attribute**
   - What we know: React ignores `selected` on `<option>` elements; it warns and the initial selection behavior is undefined.
   - What's unclear: Nothing — this is well-documented React behavior.
   - Recommendation: Change `<select>` to use `defaultValue=""`. This is a required React adaptation under CLAUDE.md (React constraints are acceptable changes).

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in `.planning/config.json` — skipping this section.

---

## Sources

### Primary (HIGH confidence)

- Direct source inspection: `/Users/caldayham/Desktop/cf.design/v3.cf.design/index.html` lines 694–784 (Contact component), 811–821 (App component, showInquiry state, body scroll lock) — all JSX, formatPhone, Escape handler extracted verbatim
- Direct source inspection: `/Users/caldayham/Desktop/cf.design/v3.cf.design/thank-you/index.html` (complete) — all JSX, CSS classes, image path, link classes extracted verbatim
- Official Next.js docs — @next/third-parties (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/guides/third-party-libraries — `GoogleAnalytics` component placement, `gaId` prop, automatic pageview tracking documentation
- Official Next.js docs — useSearchParams (v16.1.6, 2026-02-27): https://nextjs.org/docs/app/api-reference/functions/use-search-params — Suspense boundary requirement for static rendering, production build failure without it
- `npm show @next/third-parties version` → `16.1.6` (verified 2026-03-01)
- Direct code inspection: `/Users/caldayham/Desktop/cf.design/v3.cf.design/components/layout/SiteShell.tsx` — `showInquiry`, `closeInquiry` (currently voided), `openInquiry`, ShellContext provider, placeholder comment
- Direct code inspection: `/Users/caldayham/Desktop/cf.design/v3.cf.design/context/ShellContext.tsx` — `openInquiry: () => void` interface

### Secondary (MEDIUM confidence)

- Formspree `_next` redirect field: Multiple sources confirm `<input type="hidden" name="_next" value="https://...">` is the standard redirect mechanism; verified against source line 736 which uses this exact pattern.
- WebSearch: Next.js useSearchParams Suspense requirement (2025/2026) — multiple sources confirm production build failure without Suspense; consistent with official docs.

### Tertiary (LOW confidence)

- None

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — `@next/third-parties` version verified via npm; all other dependencies already installed and confirmed
- Architecture: HIGH — InquiryModal extracted verbatim from source; patterns verified against official Next.js docs; SiteShell patterns verified against existing code
- Pitfalls: HIGH — Suspense requirement verified in official docs; React `<select>` behavior is well-documented; other pitfalls derived from direct source inspection
- Formspree integration: MEDIUM — `_next` field behavior confirmed from multiple sources; official Formspree docs were 403/405 inaccessible but behavior is consistent with source code

**Research date:** 2026-03-01
**Valid until:** 2026-04-01 (stable — Next.js 16 App Router + @next/third-parties patterns are stable)
