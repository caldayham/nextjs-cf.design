# Case Study Spec Sheet

How to create a new case study page for cf.design — from raw photos and notes to a polished, published page.

---

## 1. Inputs

Every case study starts with two things:

1. **Photos** — Job photos placed in `public/case-studies/{slug}/`. Use lowercase-with-hyphens for the folder name (e.g., `perry-little-library`). Rename any files with spaces.
2. **Seed context document** — A markdown file at `app/case-studies/{slug}/{slug}.md` with the builder/designer's raw notes: what the client needed, materials used, build steps, notable details, and any client quotes.

---

## 2. Narrative Structure

Every case study follows a consistent arc. Use these sections in order:

### Opening — The Brief / Context
- What the client needed and why it was interesting
- The relationship (new client vs. returning)
- Any unique constraints (materials provided, matching existing furniture, etc.)

### Middle — The Build
- Chronological walk-through of the build process
- Each major stage gets an `h3` subheading and 1-2 paragraphs + photos
- Group related process photos into 2-column grids; use full-width for hero moments

### Quality — Built to Last (optional)
- Technical details and construction specs
- Bullet list format with bold emphasis on key numbers/materials

### Closing — The Result
- Final installed/delivered shots
- A blockquote summarizing the project's significance (not a fake testimonial — a genuine reflection on the work)
- If available, a photo of the builder with the finished piece

---

## 3. Photo Classification

When reviewing job photos, classify each into one of these categories:

| Category | Usage | Aspect Ratio | Layout |
|----------|-------|-------------|--------|
| **Hero** | The single best finished shot — wide, well-lit, in context | `16/9` → `21/9` on desktop | CaseStudyLayout hero (automatic) |
| **Process** | Build stages, chronological order | `4/3` | 2-column grid or standalone |
| **Detail** | Close-ups of joinery, materials, hardware | `4/3` | 2-column grid |
| **Result** | Finished product from multiple angles | `4/3` or `16/9` | Standalone full-width |
| **Portrait** | Vertical shots (screenshots, tall compositions) | `3/4` | 2-column grid |

### Selecting the hero image
- Must be a finished shot (not a process photo)
- Landscape orientation works best (it's cropped to 16:9 / 21:9)
- Good lighting and context (in the garden, on the street, in the home)
- If the hero needs a saturation boost, set `heroSaturationBoost` and `heroSaturationOpacity` in frontmatter

---

## 4. Agent Orchestration Workflow

When using an AI agent to assemble a case study page:

### Step 1: Gather inputs
- Point the agent to the photo folder in `public/case-studies/{slug}/`
- Point the agent to the seed context document at `app/case-studies/{slug}/{slug}.md`

### Step 2: Photo review
- Ask the agent to **view every image** in the folder
- The agent should classify each photo (hero, process, detail, result, portrait)
- The agent should describe what it sees in each photo (this becomes alt text)

### Step 3: Organize
- Select the hero image
- Order remaining photos chronologically by build stage
- Group related photos (2-3 per stage) for grid layouts
- Identify any gaps — stages mentioned in the seed context but not shown in photos

### Step 4: Write narrative
- Combine the seed context with the photo descriptions
- Follow the narrative arc: Brief → Build → Quality → Result
- Write in first person plural ("we") — Cal and Fynn are the builders
- Keep paragraphs short (2-3 sentences). Let photos do most of the talking.
- Write descriptive alt text for every image

### Step 5: Assemble the page
- Select the single best finished landscape photo as the hero
- Create `app/case-studies/{slug}/page.tsx` using the template below
- Update `data/case-studies.ts` to add the new entry
- Verify with `npm run build`

### Step 6: Hero collage (post-assembly)
- After the page is fully assembled and the user can see it, ask: **"Would you like to create a hero collage for this post? If so, which two images would you like to use?"**
- If yes, create the collage following the rules in Section 8 and swap out the hero image
- If no, keep the single hero photo

---

## 5. Page Template

```tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: '{Title} — CF Design Case Study',
  description: '{One-sentence description}',
}

const frontmatter: CaseStudyFrontmatter = {
  title: '{Title}',
  date: '{Year}',
  location: '{City, State}',
  heroImage: '/case-studies/{slug}/{hero-filename}',
  // Optional saturation boost:
  // heroSaturationBoost: 1.8,
  // heroSaturationOpacity: 0.3,
}

const IMG = '/case-studies/{slug}'

export default function PageName() {
  return (
    <CaseStudyLayout frontmatter={frontmatter}>
      {/* Content here — see styling reference below */}
    </CaseStudyLayout>
  )
}
```

---

## 6. Styling Reference

Use these exact classes for consistency across all case study pages:

### Section heading (h2)
```tsx
<h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
  <span className="w-8 h-[1px] bg-arch-mineral" /> Section Title
</h2>
```
Note: First h2 on the page should omit `mt-16`.

### Subheading (h3)
```tsx
<h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
  Subheading
</h3>
```

### Paragraph
```tsx
<p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
  Body text here.
</p>
```

### Full-width image
```tsx
<div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
  <Image src={`${IMG}/filename.JPG`} alt="Descriptive alt text" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
</div>
```

### Two-column image grid
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
  <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
    <Image src={`${IMG}/filename.JPG`} alt="..." fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
  </div>
  <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
    <Image src={`${IMG}/filename.JPG`} alt="..." fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
  </div>
</div>
```

### Blockquote (pull quote)
```tsx
<blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
  <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
    Quote text here.
  </p>
</blockquote>
```

### Bullet list
```tsx
<ul className="text-lg text-arch-charcoal/80 leading-relaxed font-light mb-6 list-disc pl-6 space-y-2">
  <li>Item with <strong className="font-semibold text-arch-black">bold emphasis</strong></li>
</ul>
```

---

## 7. Checklist — Adding a New Case Study

- [ ] Photos in `public/case-studies/{slug}/` (lowercase-hyphens, no spaces)
- [ ] Seed context in `app/case-studies/{slug}/{slug}.md`
- [ ] Page created at `app/case-studies/{slug}/page.tsx`
- [ ] Hero image selected and set in frontmatter
- [ ] Every image has descriptive alt text
- [ ] Entry added to `data/case-studies.ts`
- [ ] `npm run build` passes
- [ ] Visual check on desktop and mobile

---

## 8. Hero Collage Creation

When creating a side-by-side hero collage from two images using Python (Pillow), follow these rules:

1. **Scale both images to the same height** — use the natural aspect ratio of each, do not force them into equal-width panels
2. **No padding, no letterboxing, no black bars** — each image fills its space edge-to-edge with no empty space around it
3. **20px white vertical line** between the two images as a separator
4. **Total width = left image width + 20px gap + right image width** — let the natural proportions determine the final dimensions, don't force a target width
5. **Left image goes on the left, right image on the right** — paste them flush against their respective edges
6. Save both a full-size version and an 800px-wide mobile version in the `mobile/` subfolder

The collage should look like two photos laid next to each other on a white table with a thin white line between them — nothing more.

**Common mistake to avoid:** Do not pre-define a fixed canvas size and then try to fit images into panels. This causes cropping, zooming, and leftover space that becomes black bars. Instead, scale to the same height and let widths be whatever they naturally are.
