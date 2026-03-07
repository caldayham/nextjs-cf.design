---
created: 2026-03-07T00:05:36.793Z
title: Fix hero banner image flickering and loading strategy
area: ui
files:
  - components/home/Hero.tsx
  - app/page.tsx
---

## Problem

The scrolling image set on the hero banner area of the homepage flickers badly for the first 2+ minutes after page load. Symptoms include:
- Images only half-showing while they scroll/animate
- Right-side column sometimes entirely missing/gone
- General visual instability during initial load period

This worked perfectly in the original pure HTML site — the issue was introduced during the Next.js migration. It's the last remaining migration issue.

## Solution

Multi-pronged loading strategy:

1. **Shimmer placeholders** — Use the same shimmering vector image placeholders already used on case study pages as loading placeholders for hero images
2. **Progressive loading** — Load lower-quality/smaller images first, swap to full-res once loaded
3. **Image persistence** — Once an image is fully loaded, ensure it stays loaded and doesn't re-render or flicker (memoize, cache in state, or use `priority` / `loading="eager"` on critical images)
4. **Preloading** — Consider preloading the first visible set of hero images so they're ready before animation starts
5. **Render gating** — Don't start the scroll animation until a minimum set of images have confirmed they're loaded (onLoad callbacks)

Reference the original HTML implementation to ensure exact visual parity.
