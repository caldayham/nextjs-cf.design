# Project Instructions

## Migration Rule: Extract, Don't Rewrite

This is a 1:1 migration from static HTML/React to Next.js. **Extract components verbatim from the original source files** — do NOT rewrite or "improve" them.

### Source files:
- `index.html` — homepage components, data arrays, all CSS classes
- `case-studies/palo-alto-redwood-little-library/index.html` — case study components
- `case-studies/palo-alto-walnut-marble-tables/index.html` — case study components
- `thank-you/index.html` — thank you page

### What to change:
- `<a href>` → `<Link href>` for internal navigation
- `<img>` → `<Image>` from `next/image` (add width/height or fill)
- Add TypeScript types (interfaces for props)
- Add `'use client'` directive where needed (useState, useEffect, useRef, event handlers)
- Update asset paths: `assets/` → `/assets/`

### What NOT to change:
- CSS class names — keep every Tailwind class exactly as-is
- Component structure and nesting
- Data arrays (PORTFOLIO_ITEMS, REVIEWS, VIBE_IMAGES, FAQS, PROCESS_STEPS, CASE_STUDIES)
- Animation behavior
- Layout and spacing
- Font sizes, weights, tracking values
- Color values
- Any visual styling whatsoever

**If the original says `font-serif text-lg tracking-wide font-bold`, the Next.js version says `font-serif text-lg tracking-wide font-bold`. Period.**
