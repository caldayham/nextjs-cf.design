# CF Design — Next.js Migration

## What This Is

A pixel-perfect recreation of the CF Design carpentry business website (cf.design) in Next.js. The current site is built with React via CDN and Babel in-browser compilation, which kills SEO and makes component maintenance painful across pages. The new site preserves the exact same design, content, and animations while gaining server-side rendering, shared components, and a scalable case study workflow via MDX.

## Core Value

The site must look and function identically to the current version — same design, same content, same animations, same user experience — while being server-rendered for SEO and maintainable for growing content.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Pixel-perfect recreation of all 4 existing pages (home, 2 case studies, thank you)
- [ ] Server-side rendering for SEO (no client-side-only content)
- [ ] Shared component architecture (nav, footer, reveal animations, icons)
- [ ] Tailwind CSS with existing custom theme (arch-* colors, Inter + Playfair Display fonts)
- [ ] All existing animations preserved (scroll-up/down columns, marquee, slow-zoom, fade-in, reveal)
- [ ] Mobile-responsive design matching current breakpoints
- [ ] MDX-based case study system for easy content addition
- [ ] Next.js Image optimization for all images (auto WebP/AVIF, responsive sizes)
- [ ] Formspree contact/inquiry form integration
- [ ] Google Analytics integration
- [ ] Vercel deployment configuration
- [ ] Portfolio image carousels with navigation
- [ ] FAQ accordion functionality
- [ ] Sticky mobile CTA button
- [ ] Review wall with scroll animations and hover pause
- [ ] Process timeline with alternating layout

### Out of Scope

- Redesign or visual changes — this is a 1:1 recreation
- CMS or admin dashboard — content managed via code/MDX files
- Backend API routes — form handling stays with Formspree
- Image hosting migration — images stay local, optimized by Next.js
- New pages or features beyond what currently exists

## Context

- **Current site**: 4 HTML pages with inline React (via CDN), Babel standalone, and Tailwind CSS (via CDN)
- **Pain points**: Browser-compiled JSX invisible to search engines; duplicated components across 4 files; adding case studies requires copying entire HTML files
- **Design system**: arch-* color palette (black #121212, charcoal #1A1A1A, mineral #4A5D4F, stone #E5E4E2, concrete #F5F5F4, bronze #8C7A6B), Inter (sans), Playfair Display (serif)
- **Assets**: ~79 images across /assets/jobs/, /assets/reviews/, /assets/mobile/ directories
- **Forms**: Formspree integration for inquiry/contact form with fields: name, location checkbox, phone, referral source, project notes
- **Analytics**: Google Analytics (gtag.js)
- **Contact**: SMS (650) 521-7269, email info@cf.design, Instagram @cf.design__

## Constraints

- **Tech stack**: Next.js (App Router), Tailwind CSS, MDX, deployed on Vercel
- **Visual fidelity**: Must match current site exactly — same layout, colors, typography, animations, content
- **Image assets**: Reuse all existing images, leverage Next.js Image component for optimization
- **Form backend**: Continue using Formspree (no backend changes)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern standard, better SSR/SSG support, recommended by Next.js team | — Pending |
| MDX for case studies | User preference — markdown with components for easy authoring | — Pending |
| Local images with Next.js Image | Simplest migration path, Vercel auto-optimizes (WebP/AVIF, responsive) | — Pending |
| Tailwind CSS (keep) | Already using Tailwind, no reason to switch — just move from CDN to proper install | — Pending |
| Vercel deployment | Natural hosting for Next.js, user's choice | — Pending |

---
*Last updated: 2026-03-01 after initialization*
