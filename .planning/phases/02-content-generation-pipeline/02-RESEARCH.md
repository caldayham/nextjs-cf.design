# Phase 2: Content Generation Pipeline - Research

**Researched:** 2026-03-11
**Domain:** AI content generation (dual-model pipeline), content validation, JSON file management
**Confidence:** MEDIUM-HIGH

## Summary

Phase 2 transforms the existing single-model Gemini pipeline in `pseo-content-gen/` into a dual-model pipeline: Gemini 2.5 Flash for research/data gathering, Claude for content writing. The current codebase has a working scaffold (`generate-content.ts`, `lib/gemini.ts`, `lib/prompts.ts`, `lib/schemas.ts`) but it uses Gemini for everything and lacks FAQs, content validation, and the authentic tone the user requires. The prompt currently references permits and HOA notes, which contradicts explicit user feedback ("reads as forced and inauthentic").

The key architectural work is: (1) restructure the pipeline into a two-step process where Gemini gathers/enriches local research data and Claude writes the final prose + FAQs, (2) expand the JSON schema to include FAQs, (3) build a validation script that flags overly similar content, and (4) fix the prompt to align with user tone preferences.

**Primary recommendation:** Refactor the existing `pseo-content-gen/` pipeline to use Gemini for structured local research (neighborhoods, streets, zip codes, landmarks) and Claude (Haiku 4.5 or Sonnet 4) for writing the final content with FAQs. Use `string-similarity` (already a dependency) with Dice's coefficient for cross-city similarity detection.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | Multi-step content generation pipeline (Gemini for research/data, Claude for writing) producing authentic page content per city/service combination | Dual-model architecture: Gemini gathers research JSON, Claude writes prose from that research. Both SDKs support structured output. Existing scaffold in pseo-content-gen/ provides the runner, rate limiting, and file I/O. |
| CONT-02 | Generated content committed to repo as JSON files (not generated at build time) | Existing pipeline already writes to `nextjs-cf.design/content/generated/{city}/{service}.json`. File structure and skip-existing logic already work. |
| CONT-03 | Content validation that flags thin or overly similar content before deployment | `string-similarity` (already installed) provides Dice's coefficient. Compare same-service content across cities. Threshold ~0.7 flags for review. |
| CONT-04 | Each generated page reads like it was written by a passionate local craftsperson -- natural SEO signals woven in organically | Claude writing step with carefully crafted system prompt. Remove permit/HOA references from prompts. Focus on neighborhoods, streets, zip codes, landmarks. |
| CONT-05 | FAQ content generated per page (3-5 questions with fact-first answers) | Expand `GeneratedContent` schema to include `faqs` array. Claude generates FAQs as part of the writing step. Each FAQ has `question` and `answer` fields. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `@google/genai` | ^1.44.0 | Gemini API for research/data step | Already installed in pseo-content-gen. Supports structured JSON output via `responseMimeType: 'application/json'` and `responseSchema`. |
| `@anthropic-ai/sdk` | latest | Claude API for content writing step | Official Anthropic SDK. Supports structured output (beta) with Zod schemas. Claude excels at natural, authentic writing. |
| `string-similarity` | ^4.0.4 | Content similarity detection for validation | Already installed. Dice's coefficient is well-suited for paragraph-level text comparison. |
| `dotenv` | ^17.3.1 | Environment variable management | Already installed. Needed for both GEMINI_API_KEY and ANTHROPIC_API_KEY. |
| `tsx` | ^4.21.0 | TypeScript execution | Already installed. Runs scripts without build step. |
| `zod` | latest | Schema definition for Claude structured output | Claude's structured output beta uses Zod for TypeScript schema definitions. Also useful for runtime validation of generated content. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `typescript` | ^5 | Type checking | Already installed |
| `@types/string-similarity` | ^4.0.2 | Type definitions | Already installed |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Claude Haiku 4.5 for writing | Claude Sonnet 4 | Sonnet produces better prose but costs 3x more ($3/$15 vs $1/$5 per M tokens). For 240 pages, Haiku is likely sufficient and much cheaper. Start with Haiku, upgrade if quality is insufficient. |
| `string-similarity` (Dice) | Cosine similarity via TF-IDF | Cosine with TF-IDF would be more semantically accurate but requires tokenization/vectorization. Dice's coefficient on raw text is simpler and sufficient for catching near-duplicate content. |
| Gemini for research | Gemini with Google Search grounding | Grounding costs $14/1000 queries and may be overkill. The local-knowledge data from Phase 1 already has neighborhoods, landmarks, housing stock. Gemini's role is to enrich and restructure this data, not do web research. |

**Installation (in pseo-content-gen/):**
```bash
npm install @anthropic-ai/sdk zod
```

## Architecture Patterns

### Recommended Project Structure
```
pseo-content-gen/
├── scripts/
│   ├── generate-content.ts     # Main runner (refactor existing)
│   ├── validate-content.ts     # New: similarity validation
│   └── lib/
│       ├── gemini.ts           # Gemini research step (refactor existing)
│       ├── claude.ts           # New: Claude writing step
│       ├── prompts.ts          # Refactor: split into research + writing prompts
│       ├── research-prompt.ts  # New: Gemini research prompt builder
│       ├── writing-prompt.ts   # New: Claude writing prompt builder
│       └── schemas.ts          # Refactor: add FAQ schema, research schema
nextjs-cf.design/
├── content/
│   └── generated/
│       ├── burlingame/
│       │   ├── redwood-garden-boxes.json
│       │   ├── custom-carpentry.json
│       │   └── ... (16 service files per city)
│       └── ... (15 city directories)
```

### Pattern 1: Two-Step Pipeline (Research then Write)
**What:** Gemini produces a structured research object (local details, relevant angles, neighborhood specifics), then Claude receives that research plus the system prompt and writes the final content + FAQs.
**When to use:** Every city/service generation.
**Why:** Gemini is good at structured data extraction and is cheap/free. Claude is better at authentic, natural prose. Separating concerns lets each model do what it's best at.
**Example:**
```typescript
// Step 1: Gemini research
const research = await geminiResearch(citySlug, serviceSlug);
// Returns: { localAngles: string[], relevantDetails: string[], neighborhoodMentions: string[], ... }

// Step 2: Claude writing
const content = await claudeWrite(research, citySlug, serviceSlug);
// Returns: { intro, serviceDescription, localContext, whyChooseUs, highlights, faqs }
```

### Pattern 2: Structured Output for Both Models
**What:** Both Gemini and Claude use structured output (JSON schema) to guarantee response format.
**When to use:** Always -- prevents parsing errors and ensures consistent shape.
**Example (Gemini):**
```typescript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    responseMimeType: 'application/json',
    responseSchema: researchSchema,
  },
});
```
**Example (Claude with structured output):**
```typescript
const response = await client.messages.create({
  model: 'claude-haiku-4-5-20250415',
  max_tokens: 2048,
  messages: [{ role: 'user', content: writingPrompt }],
  // Use tool_use pattern for structured output
  tools: [{
    name: 'write_content',
    description: 'Write PSEO page content',
    input_schema: contentJsonSchema,
  }],
  tool_choice: { type: 'tool', name: 'write_content' },
});
```

### Pattern 3: Resume-Safe Generation with Skip Logic
**What:** The existing pipeline already skips files that exist (unless `--force`). This pattern must be preserved since 240 pages at rate-limited speeds takes ~32 minutes with Gemini free tier (8s delay) plus Claude API time.
**When to use:** Always -- pipeline WILL be interrupted and restarted.
**Example:** Already implemented in `generate-content.ts`.

### Pattern 4: Batch-by-City Generation
**What:** Generate all services for one city before moving to the next. This improves content quality because the model "warms up" on a city's context.
**When to use:** Default generation order.
**Example:** The existing `getAllCityServiceParams()` already returns params grouped by city (flatMap over cities, then services).

### Anti-Patterns to Avoid
- **Single mega-prompt:** Don't try to get one model to do research AND write prose in a single call. The dual-model split exists for a reason.
- **Build-time generation:** Content MUST be pre-generated and committed. Never call AI APIs during `next build`.
- **Generic prompts:** Don't use the same prompt for every city. Each prompt must inject city-specific data from Phase 1's data layer.
- **Permit/HOA/regulation references in prompts:** User explicitly flagged this as "weird and forced." Remove from all prompts.
- **Word count minimums as quality signals:** The current `MIN_WORD_COUNT = 200` is a floor, not a target. Content should be as long as needed to be useful and authentic.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Text similarity detection | Custom diffing algorithm | `string-similarity` (Dice coefficient) | Edge cases around whitespace, punctuation, stopwords. Library handles these. |
| JSON schema validation | Manual field checking | Zod `.parse()` / `.safeParse()` | Catches schema drift, provides typed results, works with Claude structured output. |
| Rate limiting | Custom token bucket | Simple delay loop (existing pattern) | Only 2 API providers with known rate limits. The existing `delay()` + sequential loop is sufficient for a batch script. |
| Structured AI output | JSON.parse + hope | Gemini `responseSchema` + Claude `tool_use` | Both SDKs have built-in structured output. Using them prevents malformed JSON responses. |

**Key insight:** This is a batch script that runs occasionally, not a production service. Keep it simple. The existing runner pattern (sequential loop with delay) is appropriate.

## Common Pitfalls

### Pitfall 1: Content Homogeneity Across Cities
**What goes wrong:** Same service description for different cities reads nearly identically, just with city name swapped.
**Why it happens:** Prompt doesn't inject enough city-specific differentiation. Model falls into template patterns.
**How to avoid:** The Gemini research step must produce genuinely different local angles for each city. Inject neighborhood names, specific street references, housing stock details, and climate differences. The validation script (CONT-03) catches this after generation.
**Warning signs:** Similarity scores > 0.7 between same-service pages for different cities.

### Pitfall 2: Prompt Still References Permits/HOA
**What goes wrong:** Generated content sounds forced and inauthentic.
**Why it happens:** The current `prompts.ts` explicitly tells the model to "Reference local permit requirements or HOA considerations."
**How to avoid:** Remove all permit/HOA/regulation references from prompts. Focus on natural signals: neighborhoods, streets, zip codes, landmarks, housing character.
**Warning signs:** Generated content mentions "permits," "building codes," "HOA approval," etc.

### Pitfall 3: Rate Limit Exhaustion Mid-Run
**What goes wrong:** Pipeline fails partway through 240 pages because Gemini free tier (10 RPM, 250 RPD) or Claude API rate limits are exceeded.
**Why it happens:** Two API calls per page (Gemini + Claude) means 480 API calls total. Gemini free tier only allows 250/day.
**How to avoid:** (a) Use Gemini paid tier ($0.30/M input tokens -- very cheap) or split across 2 days on free tier. (b) Claude Haiku has generous rate limits but add retry with backoff (existing pattern). (c) The `--city` flag lets you generate one city at a time.
**Warning signs:** 429 errors in console output.

### Pitfall 4: Schema Mismatch Between Generator and Consumer
**What goes wrong:** Generated JSON doesn't match what Phase 3's page template expects.
**Why it happens:** Schema defined in pseo-content-gen but consumed in nextjs-cf.design. No shared type.
**How to avoid:** Define the canonical `GeneratedContent` TypeScript interface in `nextjs-cf.design/content/types.ts` and import it in both projects. Or at minimum, keep schemas in sync manually and validate with Zod on both sides.
**Warning signs:** Page template crashes or shows undefined fields.

### Pitfall 5: Claude Structured Output Beta Limitations
**What goes wrong:** Structured output doesn't work as expected or isn't available for chosen model.
**Why it happens:** Claude structured output is in beta (as of Nov 2025). Currently supports Sonnet 4.5 and Opus 4.1, with Haiku 4.5 support announced but may have limitations.
**How to avoid:** Use the tool_use pattern as a fallback -- define a tool with the desired output schema and force the model to call it via `tool_choice`. This works on all Claude models and effectively produces structured output.
**Warning signs:** Schema validation errors on Claude responses.

## Code Examples

### Research Schema (Gemini output)
```typescript
// New schema for Gemini research step output
import { Type } from '@google/genai';

export const researchSchema = {
  type: Type.OBJECT,
  properties: {
    neighborhoodAngles: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3-5 specific angles connecting this service to neighborhoods in this city. Reference specific streets, blocks, or areas.',
    },
    housingRelevance: {
      type: Type.STRING,
      description: 'How the local housing stock specifically relates to this service. Be concrete about architectural styles and common needs.',
    },
    climateFactors: {
      type: Type.STRING,
      description: 'How Peninsula microclimate affects this service in this specific city (fog, sun, moisture patterns).',
    },
    projectScenarios: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '2-3 realistic project scenarios a homeowner in this city would encounter for this service.',
    },
    differentiators: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'What makes this service different in this city vs. neighboring cities.',
    },
  },
  required: ['neighborhoodAngles', 'housingRelevance', 'climateFactors', 'projectScenarios', 'differentiators'],
};
```

### Expanded Content Schema (Claude output)
```typescript
export interface GeneratedContent {
  intro: string;
  serviceDescription: string;
  localContext: string;
  whyChooseUs: string;
  highlights: string[];
  faqs: FAQ[];
  metadata: {
    citySlug: string;
    serviceSlug: string;
    generatedAt: string;
    researchModel: string;
    writingModel: string;
    wordCount: number;
  };
}

export interface FAQ {
  question: string;
  answer: string;
}
```

### Validation Script Pattern
```typescript
import { compareTwoStrings } from 'string-similarity';

interface SimilarityFlag {
  city1: string;
  city2: string;
  service: string;
  score: number;
  section: string;
}

function validateSimilarity(contentDir: string): SimilarityFlag[] {
  const flags: SimilarityFlag[] = [];
  const THRESHOLD = 0.7;

  // For each service, compare content across all city pairs
  for (const service of services) {
    const cityContents = loadAllCitiesForService(service, contentDir);

    for (let i = 0; i < cityContents.length; i++) {
      for (let j = i + 1; j < cityContents.length; j++) {
        // Compare each prose section independently
        for (const section of ['intro', 'serviceDescription', 'localContext']) {
          const score = compareTwoStrings(
            cityContents[i].content[section],
            cityContents[j].content[section]
          );
          if (score > THRESHOLD) {
            flags.push({
              city1: cityContents[i].city,
              city2: cityContents[j].city,
              service,
              score,
              section,
            });
          }
        }
      }
    }
  }

  return flags;
}
```

### Claude Writing Prompt Pattern (tone-aligned)
```typescript
function buildWritingPrompt(research: ResearchOutput, city: City, service: Service): string {
  return `You are Calday, owner of cf.design — a custom carpentry and outdoor services business on the San Francisco Peninsula. You genuinely love your craft and the communities you serve.

Write content for your "${service.title}" service page for ${city.name}, California.

RESEARCH NOTES (use these as raw material, don't copy verbatim):
${JSON.stringify(research, null, 2)}

VOICE GUIDELINES:
- Write as yourself — a skilled craftsperson who actually works in ${city.name}
- Mention neighborhoods and streets naturally, the way you would when talking to a neighbor
- NO permit references, NO building code mentions, NO HOA rules
- NO generic filler. Every sentence should be specific to ${city.name} or this service
- Be confident but not salesy. You're good at what you do and it shows in the work
- Zip codes, street names, and landmarks should feel organic, not researched

FAQ GUIDELINES:
- Write 3-5 questions a ${city.name} homeowner would actually ask about ${service.title}
- Lead each answer with the direct fact, then add context
- Keep answers concise (2-3 sentences each)
- Questions should feel natural, not keyword-stuffed`;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Single-model generation | Dual-model pipeline (research + write) | Architecture pivot, 2026-03-11 | Better content quality by letting each model do what it's best at |
| Gemini for all content | Gemini research + Claude writing | Decision logged in STATE.md | Claude produces more natural, authentic prose |
| No FAQs | FAQs on every page | Pulled from v2 to v1 | FAQPage schema is high-ROI for search visibility |
| Claude tool_use for structured output | Claude native structured output (beta) | Nov 2025 | Simpler API, but tool_use remains a reliable fallback |

**Deprecated/outdated:**
- The current `prompts.ts` references permits and HOA notes -- this must be removed per user feedback
- The current `schemas.ts` lacks FAQ fields -- must be expanded
- The current pipeline is single-model Gemini -- must be refactored to dual-model

## Open Questions

1. **Which Claude model for writing?**
   - What we know: Haiku 4.5 is $1/$5 per M tokens, Sonnet 4 is ~$3/$15. Both support structured output (Haiku via tool_use pattern guaranteed, native structured output TBD).
   - What's unclear: Whether Haiku's prose quality is sufficient for the "passionate craftsperson" voice the user wants.
   - Recommendation: Start with Haiku 4.5. Generate a sample batch (one city, 16 services) and review. Upgrade to Sonnet if quality isn't there. The cost difference for 240 pages is modest (~$2-5 total either way).

2. **Gemini free tier vs. paid for research step**
   - What we know: Free tier is 10 RPM / 250 RPD. 240 research calls fits in one day but leaves no room for retries. Paid tier is $0.30/M input tokens (very cheap).
   - What's unclear: Whether user wants to stay on free tier or is willing to enable billing.
   - Recommendation: Design for paid tier compatibility (no artificial delays beyond rate limit compliance). If user wants free tier, the `--city` flag already allows splitting across days.

3. **Shared types between pseo-content-gen and nextjs-cf.design**
   - What we know: pseo-content-gen imports from nextjs-cf.design via relative paths (`../../nextjs-cf.design/data/helpers`). This works but is fragile.
   - What's unclear: Whether to formalize this with a shared package or keep the relative import pattern.
   - Recommendation: Keep relative imports (they work, both projects are sibling directories). Add a content type file in nextjs-cf.design that pseo-content-gen also imports, so the JSON schema is defined once.

4. **How much research enrichment does Gemini actually need to do?**
   - What we know: Phase 1 data already includes neighborhoods, landmarks, housing stock, climate notes per city. The Gemini research step could simply restructure this existing data into service-specific angles.
   - What's unclear: Whether Gemini should do additional web research (grounding) or just work with existing Phase 1 data.
   - Recommendation: Start with Phase 1 data only (no grounding). The local-knowledge data is already rich. If content quality is insufficient, add Gemini grounding as an enhancement later. This avoids the $14/1000 queries grounding cost.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `pseo-content-gen/scripts/` -- reviewed all files (generate-content.ts, lib/gemini.ts, lib/prompts.ts, lib/schemas.ts)
- Existing codebase: `nextjs-cf.design/data/` -- reviewed helpers.ts, services.ts, cities.ts, local-knowledge.ts, case-studies.ts, keywords.ts
- `.planning/STATE.md` -- project decisions and architecture pivot details
- `.planning/REQUIREMENTS.md` -- CONT-01 through CONT-05 requirement definitions
- User feedback: `feedback_content_tone.md` -- permit/HOA content is forced and inauthentic

### Secondary (MEDIUM confidence)
- [Anthropic Structured Outputs docs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) -- Beta feature, Sonnet 4.5 and Opus 4.1 confirmed, Haiku 4.5 announced
- [Gemini Structured Output docs](https://ai.google.dev/gemini-api/docs/structured-output) -- responseSchema with Type enum, works with 2.5 Flash
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) -- $0.30/M input, $2.50/M output for 2.5 Flash
- [Claude API pricing](https://platform.claude.com/docs/en/about-claude/pricing) -- Haiku 4.5 at $1/$5, Sonnet 4 at $3/$15

### Tertiary (LOW confidence)
- [string-similarity npm](https://www.npmjs.com/package/string-similarity) -- Package marked as no longer supported, but Dice's coefficient implementation is stable and simple. No functional risk for this use case.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Both SDKs already in use or well-documented. `string-similarity` already installed.
- Architecture: MEDIUM-HIGH - Dual-model pattern is sound but the specific prompt engineering and research schema need iteration. Sample generation will validate.
- Pitfalls: HIGH - Content homogeneity and tone issues are well-understood from user feedback. Validation approach is straightforward.

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable domain, main risk is Claude structured output graduating from beta)
