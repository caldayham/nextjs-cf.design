# Technology Stack: PSEO System Additions

**Project:** cf.design Programmatic SEO
**Researched:** 2026-03-10
**Overall confidence:** HIGH

## Context

The existing stack is Next.js 16.1.6 + React 19 + TypeScript + Tailwind CSS 4 on Vercel free tier. This document covers **only new additions** needed for the PSEO system. The existing stack is validated and unchanged.

## Recommended Stack Additions

### Content Generation (Build-Time Script)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `ai` (Vercel AI SDK) | ^6.0 | Unified LLM interface for content generation | Provider-agnostic: swap models without rewriting code. `generateText()` is designed for batch/background tasks. TypeScript-native, maintained by Vercel (same ecosystem as Next.js). |
| `@ai-sdk/google` | ^2.0 | Google Gemini provider for AI SDK | Gemini 2.0 Flash-Lite is the cheapest viable model at $0.075/$0.30 per M tokens. Free tier available for development. |
| `@ai-sdk/openai` | ^2.0 | OpenAI provider (fallback) | GPT-4o-mini at $0.15/$0.60 per M tokens as backup if Gemini quality is insufficient. |

**Why Vercel AI SDK instead of raw API calls:** The AI SDK provides a unified `generateText()` interface across providers. When you discover Gemini quality is poor for a specific prompt, you swap one line (`google('gemini-2.0-flash-lite')` to `openai('gpt-4o-mini')`) instead of rewriting HTTP calls. The SDK handles retries, rate limiting, and structured output parsing.

**Why NOT Anthropic for content generation:** Claude Haiku at $1/$5 per M tokens is 13x more expensive than Gemini Flash-Lite for output tokens. For generating 500 pages of templated local service content, quality differences between models are marginal -- the prompt template and local data matter more than model sophistication.

### Schema Markup (TypeScript Types)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| `schema-dts` | ^1.1.5 | TypeScript types for Schema.org JSON-LD | Google-maintained. Provides `WithContext<LocalBusiness>`, `WithContext<Service>`, `WithContext<FAQPage>` types. Catches schema errors at compile time. Next.js officially recommends it in their JSON-LD guide. |

**Why schema-dts and not a runtime library:** JSON-LD in Next.js is just a `<script type="application/ld+json">` tag with `JSON.stringify()`. No runtime library needed. schema-dts provides only TypeScript types (zero runtime cost) to ensure your JSON-LD objects match Schema.org specs. This is exactly what Next.js docs recommend.

### Sitemap Generation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| (built-in) | Next.js 16 | `generateSitemaps` + `sitemap.ts` | Already using `sitemap.ts`. Extend it with `generateSitemaps()` to split PSEO pages into multiple sitemap files (Google limit: 50,000 URLs per sitemap). No additional dependency needed. |

**Why NOT next-sitemap:** The project already uses Next.js built-in `sitemap.ts`. The built-in `generateSitemaps()` function handles splitting into multiple sitemaps natively. Adding next-sitemap would be a regression -- more config, a postbuild step, and an unnecessary dependency for a site with at most 500 pages.

### Data Layer (City x Service Combinations)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| TypeScript data files | -- | Static JSON/TS files defining cities, services, and generated content | No database needed. 500 pages of content fits in a few MB of JSON. Generated at build time by the content script, consumed by `generateStaticParams()`. Simple, version-controlled, free. |

**Why NOT a CMS or database:** The constraint is Vercel free tier with static export. A CMS (Contentful, Sanity) adds cost, API calls during build, and complexity. The data is structured (city + service + generated content) and changes infrequently. TypeScript files with proper types give compile-time safety and zero runtime cost.

### What NOT to Add

| Temptation | Why Avoid |
|------------|-----------|
| `next-seo` package | Next.js 16 metadata API (`generateMetadata`) handles title, description, Open Graph natively. next-seo is a Pages Router artifact. |
| `next-sitemap` | Already using built-in `sitemap.ts`. See above. |
| Database (Postgres, SQLite) | Overkill for 500 static pages of structured data. |
| Headless CMS | Adds cost, build-time API dependency, and complexity for data that rarely changes. |
| `react-schemaorg` | Unnecessary wrapper. JSON-LD is a `<script>` tag -- no React component needed. |
| Full AI orchestration (LangChain, etc.) | Content generation is a simple prompt-in/text-out flow. LangChain adds massive dependency surface for zero benefit here. |
| `tsx` or `ts-node` for build scripts | Next.js 16 runs on Node 20+ which supports TypeScript natively via `--experimental-strip-types`, or use the AI SDK script as an npm script with `tsx`. If needed, `tsx` is already implicitly available through Next.js toolchain. |

## Cost Analysis: AI Content Generation

### Scenario: 500 Pages

Each page needs ~800 tokens of generated content (title, meta description, 3-4 paragraphs, FAQ answers). With a ~500 token prompt template:

| Model | Input Cost (500 pages) | Output Cost (500 pages) | Total | Quality |
|-------|----------------------|------------------------|-------|---------|
| Gemini 2.0 Flash-Lite | $0.019 | $0.12 | **$0.14** | Good for templated content |
| GPT-4o-mini | $0.038 | $0.24 | **$0.28** | Good, slightly better prose |
| Gemini 2.0 Flash | $0.025 | $0.16 | **$0.19** | Better reasoning |
| Claude Haiku 4.5 | $0.25 | $2.00 | **$2.25** | Excellent but 16x more expensive |

**Recommendation:** Start with Gemini 2.0 Flash-Lite. Total cost under $0.15 for 500 pages. If quality is insufficient, escalate to GPT-4o-mini ($0.28 total) or Gemini 2.0 Flash ($0.19). All options are under $1 for the full site, so cost is effectively negligible.

**Batch API discount:** OpenAI offers 50% off via Batch API for non-urgent workloads. Not needed at these volumes but available.

**Development:** Google AI Studio free tier provides free access to Gemini models with lower rate limits -- sufficient for iterating on prompts during development.

### Regeneration Cost

Content regeneration (updating all 500 pages) costs the same -- under $0.30. You can afford to regenerate weekly if needed.

## Integration Points with Existing Setup

### generateStaticParams

```typescript
// app/(main)/[city]/[service]/page.tsx
export async function generateStaticParams() {
  // Read from data/pseo/combinations.ts
  return combinations.map(({ citySlug, serviceSlug }) => ({
    city: citySlug,
    service: serviceSlug,
  }))
}
```

### generateMetadata

```typescript
// Already supported by Next.js 16 -- no new dependencies
export async function generateMetadata({ params }) {
  const data = getPageData(params.city, params.service)
  return {
    title: data.title,
    description: data.metaDescription,
    // Open Graph, etc.
  }
}
```

### JSON-LD Schema

```typescript
import type { WithContext, LocalBusiness, Service, FAQPage } from 'schema-dts'

const jsonLd: WithContext<LocalBusiness> = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'cf.design',
  areaServed: { '@type': 'City', name: 'Palo Alto' },
  // ...
}

// Render as <script type="application/ld+json">
```

### Sitemap Extension

```typescript
// app/sitemap.ts -- extend existing file
import { generateSitemaps } from './pseo-sitemaps'

export default function sitemap(): MetadataRoute.Sitemap {
  const pseoPages = getAllPSEOPages() // from data files
  return [
    ...existingPages,
    ...pseoPages.map(page => ({
      url: `https://cf.design/${page.citySlug}/${page.serviceSlug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
```

### Content Generation Script

```typescript
// scripts/generate-content.ts (run before build)
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

for (const combo of combinations) {
  const { text } = await generateText({
    model: google('gemini-2.0-flash-lite'),
    prompt: buildPrompt(combo.city, combo.service),
  })
  writeContentFile(combo, text)
}
```

## Installation

```bash
# Content generation (dev dependency -- only used in build scripts)
npm install -D ai @ai-sdk/google @ai-sdk/openai

# Schema types (dev dependency -- types only, zero runtime)
npm install -D schema-dts
```

**All additions are dev dependencies.** The AI SDK runs in a build script (not in the browser or server). schema-dts provides only TypeScript types. Zero impact on bundle size.

## Environment Variables

```bash
# .env.local (for content generation script)
GOOGLE_GENERATIVE_AI_API_KEY=...   # Gemini API key (free from AI Studio)
OPENAI_API_KEY=...                  # Optional fallback
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| LLM Interface | Vercel AI SDK | Raw fetch to API | No retries, no provider swapping, more boilerplate |
| LLM Model | Gemini 2.0 Flash-Lite | GPT-4o-mini | 2x more expensive, marginal quality difference for templated content |
| Schema Types | schema-dts | Manual typing | Error-prone, Schema.org spec is large and evolving |
| Sitemap | Built-in generateSitemaps | next-sitemap | Unnecessary dependency, already using built-in approach |
| Data Store | TypeScript files | Headless CMS | Cost, complexity, API dependency for infrequently-changing data |
| Content Gen Framework | Vercel AI SDK generateText | LangChain | Massive over-engineering for simple prompt-to-text pipeline |

## Sources

- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- official recommendation for schema-dts and `<script>` tag pattern
- [Next.js generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) -- official docs
- [Next.js generateSitemaps](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) -- official multi-sitemap support
- [schema-dts GitHub](https://github.com/google/schema-dts) -- Google-maintained Schema.org TypeScript types
- [Vercel AI SDK](https://ai-sdk.dev/docs/introduction) -- generateText for batch processing
- [Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing) -- Flash-Lite at $0.075/$0.30 per M tokens
- [OpenAI API Pricing](https://openai.com/api/pricing/) -- GPT-4o-mini at $0.15/$0.60 per M tokens
- [Anthropic API Pricing](https://platform.claude.com/docs/en/about-claude/pricing) -- Haiku at $1/$5 per M tokens
- [Programmatic SEO with Next.js](https://www.ktz.dev/nextjs-programmatic-seo-guide) -- patterns and best practices
- [Next.js sitemap.xml metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) -- built-in sitemap conventions
