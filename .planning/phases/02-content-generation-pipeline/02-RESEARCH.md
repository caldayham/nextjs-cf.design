# Phase 2: Content Generation Pipeline - Research

**Researched:** 2026-03-11
**Domain:** AI content generation with Gemini API, content uniqueness validation, standalone script architecture
**Confidence:** HIGH

## Summary

Phase 2 builds a standalone Node.js script that calls the Gemini API to generate unique, city-specific prose for each of the 165 city/service combinations, saving results as committed JSON files. The Phase 1 data foundation provides rich per-city context (neighborhoods, landmarks, housing stock, permits, climate) and per-service metadata (descriptions, keywords, related services) via `getPageData()`. This context is the key input for producing genuinely unique content -- not just city-name swaps.

The recommended approach is a single TypeScript script (`scripts/generate-content.ts`) run via `npx tsx`, which iterates over all 165 combinations, assembles a detailed prompt from `getPageData()`, calls Gemini 2.5 Flash with structured JSON output (using `responseMimeType: "application/json"` + a JSON schema), and writes each result to `content/generated/{city}/{service}.json`. A separate validation script compares all pages for the same service across cities and flags any pair with >60% overlap (i.e., <40% unique content).

**Primary recommendation:** Use `@google/genai` SDK with Gemini 2.5 Flash, structured output via JSON schema (no Zod dependency needed), rate limiting at 8 RPM to stay within free tier, and `string-similarity` for Dice coefficient-based uniqueness validation.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CONT-01 | AI content generation script that produces unique page content per city/service combination using Gemini API | `@google/genai` SDK v1.44+ with Gemini 2.5 Flash model. Structured output via `responseMimeType: "application/json"` + `responseSchema`. Script at `scripts/generate-content.ts` run with `npx tsx`. Prompt template includes city neighborhoods, landmarks, housing stock, climate, and service-specific details from `getPageData()`. |
| CONT-02 | Generated content committed to repo as JSON files (not generated at build time) | Output to `content/generated/{city}/{service}.json`. Files committed to git. Pages import these at build time via `import` or `fs.readFileSync`. No API calls during `next build`. |
| CONT-03 | Content uniqueness validation that flags thin or duplicate content before deployment | Validation script at `scripts/validate-content.ts`. Uses Dice coefficient (`string-similarity` package) to compare all page pairs for same service across different cities. Flags pairs with similarity >0.60 (i.e., <40% unique). Also flags pages under minimum word count. |
| CONT-04 | Each generated page contains minimum 200-300 words of city-specific prose with local knowledge woven in | Prompt engineering requires specific city references: neighborhoods by name, local landmarks, housing stock types, permit context, climate considerations. Structured output schema enforces separate sections (intro, service description, local context, why choose us) each with minimum content expectations. Word count validated post-generation. |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @google/genai | ^1.44 | Gemini API SDK for Node.js | Official Google SDK, GA since May 2025, supports structured JSON output natively |
| tsx | ^4 | Run TypeScript scripts directly | Already common in Node.js ecosystem, no build step needed for scripts |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| string-similarity | ^4 | Dice coefficient text comparison | Content uniqueness validation (CONT-03) |
| dotenv | ^16 | Load .env for API key | Keep GEMINI_API_KEY out of source code |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Gemini 2.5 Flash | Gemini 2.5 Pro | Pro is higher quality but only 5 RPM / 100 RPD free tier -- too slow for 165 pages. Flash at 10 RPM / 250 RPD handles the full run in ~20 min. |
| Gemini | OpenAI GPT-4o | Gemini has generous free tier (250 RPD for Flash). GPT-4o would cost ~$5-10 for 165 pages. Project spec says Gemini. |
| string-similarity (Dice) | Cosine similarity with TF-IDF | Dice coefficient is simpler, zero-config, and sufficient for detecting near-duplicate prose. TF-IDF would be more sophisticated but overkill for validation. |
| dotenv | Hardcoded key | Never hardcode API keys. dotenv is the standard approach. |
| JSON output files | Markdown files | JSON is machine-parseable, type-safe with TS interfaces, and easy to import in Next.js pages. Markdown adds a parsing layer. |

**Installation:**
```bash
npm install --save-dev @google/genai tsx string-similarity dotenv
npm install --save-dev @types/string-similarity
```

## Architecture Patterns

### Recommended Project Structure
```
scripts/
├── generate-content.ts    # Main generation script (CONT-01)
├── validate-content.ts    # Uniqueness validation (CONT-03)
└── lib/
    ├── gemini.ts          # Gemini client setup + generation function
    ├── prompts.ts         # Prompt template builder
    └── schemas.ts         # JSON output schema definition

content/
└── generated/
    ├── burlingame/
    │   ├── garden-boxes.json
    │   ├── fences-gates-decks.json
    │   └── ... (11 files per city)
    ├── san-mateo/
    │   └── ...
    └── ... (15 city directories, 165 total files)

.env                       # GEMINI_API_KEY (gitignored)
```

### Pattern 1: Structured Output with JSON Schema
**What:** Define a JSON schema that Gemini must conform to, guaranteeing parseable output with required fields.
**When to use:** Every generation call -- eliminates JSON parsing failures and missing field errors.
**Example:**
```typescript
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const contentSchema = {
  type: Type.OBJECT,
  properties: {
    intro: {
      type: Type.STRING,
      description: 'Opening paragraph mentioning the city by name, key neighborhoods, and how the service fits the local context. 60-80 words.',
    },
    serviceDescription: {
      type: Type.STRING,
      description: 'Detailed description of the service tailored to the city. Reference local housing stock, common project scenarios, and materials suited to the climate. 80-120 words.',
    },
    localContext: {
      type: Type.STRING,
      description: 'Why this service matters specifically in this city. Reference permits, HOA considerations, neighborhood character, and relevant landmarks. 60-80 words.',
    },
    whyChooseUs: {
      type: Type.STRING,
      description: 'Why cf.design is the right choice for this service in this city. Mention Peninsula expertise, nearby completed projects, and local knowledge. 40-60 words.',
    },
    highlights: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3-4 bullet points highlighting key benefits, each 10-20 words.',
    },
  },
  required: ['intro', 'serviceDescription', 'localContext', 'whyChooseUs', 'highlights'],
};

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    responseMimeType: 'application/json',
    responseSchema: contentSchema,
  },
});

const content = JSON.parse(response.text);
```

### Pattern 2: Rich Prompt Assembly from PageData
**What:** Build prompts that inject all available city and service context so Gemini has enough raw material to produce unique content.
**When to use:** Every generation call.
**Example:**
```typescript
import { getPageData } from '../data/helpers';

function buildPrompt(citySlug: string, serviceSlug: string): string {
  const data = getPageData(citySlug, serviceSlug);
  if (!data) throw new Error(`No data for ${citySlug}/${serviceSlug}`);

  const { city, service, localKnowledge, nearbyCaseStudies, relevantCaseStudies } = data;

  return `You are writing website content for cf.design, a custom carpentry and outdoor services business on the San Francisco Peninsula.

Write content for the "${service.title}" service page specifically for ${city.name}, California.

CITY CONTEXT:
- City: ${city.name} (${city.county} County)
- Neighborhoods: ${city.neighborhoods.join(', ')}
- Character: ${city.characteristics.join(', ')}
- Housing Stock: ${localKnowledge.housingStock.join('; ')}
- Landmarks: ${localKnowledge.landmarks.join('; ')}
- Climate: ${localKnowledge.climateNotes}
- Permits: ${localKnowledge.permits.join('; ')}
- HOA Notes: ${localKnowledge.hoaNotes}

SERVICE CONTEXT:
- Service: ${service.title}
- Description: ${service.longDescription}
- Related Services: ${service.relatedServices.join(', ')}

NEARBY COMPLETED PROJECTS:
${nearbyCaseStudies.map(cs => `- ${cs.title} (${cs.location}): ${cs.description}`).join('\n')}

REQUIREMENTS:
- Write naturally, as if a knowledgeable local craftsperson is speaking
- Mention specific neighborhoods, landmarks, and housing types by name
- Reference local permit requirements or HOA considerations where relevant
- Do NOT use generic filler -- every sentence should contain city-specific or service-specific detail
- Total content should be 250-350 words across all sections
- Tone: professional but approachable, confident but not salesy`;
}
```

### Pattern 3: Rate-Limited Sequential Processing
**What:** Process all 165 combinations sequentially with delays to respect free-tier rate limits.
**When to use:** Main generation loop.
**Example:**
```typescript
const DELAY_MS = 8000; // ~7.5 RPM to stay under 10 RPM limit

async function generateAll() {
  const params = getAllCityServiceParams();
  let generated = 0;
  let skipped = 0;

  for (const { city, service } of params) {
    const outputPath = `content/generated/${city}/${service}.json`;

    // Skip if already generated (idempotent re-runs)
    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    const prompt = buildPrompt(city, service);
    const content = await generateContent(prompt);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));

    generated++;
    console.log(`[${generated + skipped}/${params.length}] ${city}/${service} ✓`);

    await delay(DELAY_MS);
  }

  console.log(`Done. Generated: ${generated}, Skipped: ${skipped}`);
}
```

### Pattern 4: Content Validation with Dice Coefficient
**What:** Compare all pages for the same service across cities. Flag pairs that are too similar.
**When to use:** After generation, before committing.
**Example:**
```typescript
import { compareTwoStrings } from 'string-similarity';

function validateUniqueness(serviceSlug: string, threshold = 0.60) {
  const cities = getAllCityServiceParams()
    .filter(p => p.service === serviceSlug)
    .map(p => p.city);

  const contents = cities.map(city => ({
    city,
    text: loadGeneratedContent(city, serviceSlug),
  }));

  const flags: string[] = [];

  for (let i = 0; i < contents.length; i++) {
    for (let j = i + 1; j < contents.length; j++) {
      const fullTextA = Object.values(contents[i].text).join(' ');
      const fullTextB = Object.values(contents[j].text).join(' ');
      const similarity = compareTwoStrings(fullTextA, fullTextB);

      if (similarity > threshold) {
        flags.push(
          `DUPLICATE: ${contents[i].city} vs ${contents[j].city} ` +
          `for ${serviceSlug} — ${(similarity * 100).toFixed(1)}% similar`
        );
      }
    }
  }

  return flags;
}
```

### Anti-Patterns to Avoid
- **Generic prompt with just city name swap:** "Write about {service} in {city}" produces near-identical pages. Must inject neighborhoods, landmarks, housing stock, permits, and climate to force unique output.
- **Generating at build time:** API failures break deploys, costs accumulate per deploy, non-deterministic output means content changes unexpectedly. Pre-generate and commit.
- **No idempotency:** Script should skip already-generated files so partial runs can resume without re-generating (and re-spending API calls).
- **Batch/parallel API calls:** Free tier is 10 RPM. Parallel calls will hit rate limits instantly. Sequential with delay is correct.
- **Trusting AI word count:** Always validate word count after generation. AI models often under-deliver on requested word counts. Re-generate if below minimum.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Text similarity comparison | Custom diff algorithm | `string-similarity` (Dice coefficient) | Edge cases in tokenization, Unicode handling, performance. Well-tested library. |
| JSON schema validation | Manual field checking | Gemini structured output (`responseSchema`) | API guarantees conformance. No parsing errors or missing fields. |
| Rate limiting | Custom timer logic | Simple `await delay()` with constant interval | 165 calls is small enough that sequential + fixed delay works perfectly. No need for token bucket or exponential backoff. |
| API key management | Environment variable parsing | `dotenv` | Standard, handles .env file loading, well-understood pattern. |

**Key insight:** The generation script is a one-time (or occasional) offline tool, not a production service. Simplicity beats sophistication. A linear loop with a sleep timer is superior to a queue system for 165 items.

## Common Pitfalls

### Pitfall 1: Near-Identical Content Across Cities
**What goes wrong:** Gemini produces the same generic paragraphs for every city, just swapping the city name. Google flags these as doorway pages or thin content.
**Why it happens:** Prompt lacks sufficient city-specific context, or the prompt structure encourages templated responses.
**How to avoid:** Inject ALL local knowledge fields (neighborhoods, landmarks, housing stock, permits, climate, HOA notes) into the prompt. Include nearby case studies. Instruct the model to reference specific names. Validate with similarity checker post-generation.
**Warning signs:** Validation script flags >3 pairs per service above 60% similarity.

### Pitfall 2: API Rate Limit Errors Mid-Run
**What goes wrong:** Script crashes at page 80 of 165 due to 429 rate limit error. No resume capability means starting over.
**Why it happens:** Free tier is 10 RPM / 250 RPD. Running too fast or running the script multiple times in a day.
**How to avoid:** 8-second delay between calls (7.5 RPM). Skip existing files for idempotent re-runs. Add retry with exponential backoff on 429 errors. The full 165-page run fits within the 250 RPD limit in a single run.
**Warning signs:** 429 errors in console output.

### Pitfall 3: Inconsistent JSON Structure
**What goes wrong:** Some generated files have different field names, missing sections, or malformed content.
**Why it happens:** Not using structured output, or schema doesn't enforce all required fields.
**How to avoid:** Always use `responseMimeType: "application/json"` with `responseSchema`. Define all fields as `required`. Type the output with a TypeScript interface matching the schema.
**Warning signs:** TypeScript compilation errors when importing generated JSON, or runtime errors from missing fields.

### Pitfall 4: Content Below Minimum Word Count
**What goes wrong:** Some pages only have 100-150 words despite requesting 250-350.
**Why it happens:** AI models don't reliably follow word count instructions. Shorter prompts or less city context can produce shorter outputs.
**How to avoid:** Validate word count after generation. Flag pages under 200 words. Re-generate flagged pages with a more explicit prompt ("You MUST write at least 250 words total").
**Warning signs:** Validation script reports pages under word count minimum.

### Pitfall 5: API Key Leaked to Git
**What goes wrong:** `GEMINI_API_KEY` committed to repository.
**Why it happens:** Forgetting to add `.env` to `.gitignore`, or hardcoding the key during development.
**How to avoid:** Add `.env` to `.gitignore` before creating it. Use `dotenv` package. Provide `.env.example` with placeholder.
**Warning signs:** `git status` shows `.env` as untracked and about to be committed.

## Code Examples

### Generated Content JSON Schema (TypeScript Interface)
```typescript
// content/types.ts
export interface GeneratedContent {
  intro: string;
  serviceDescription: string;
  localContext: string;
  whyChooseUs: string;
  highlights: string[];
  metadata: {
    citySlug: string;
    serviceSlug: string;
    generatedAt: string;
    model: string;
    wordCount: number;
  };
}
```

### Loading Generated Content at Build Time
```typescript
// Used by Phase 3 page templates
import fs from 'fs';
import path from 'path';
import type { GeneratedContent } from '@/content/types';

export function getGeneratedContent(citySlug: string, serviceSlug: string): GeneratedContent {
  const filePath = path.join(process.cwd(), 'content', 'generated', citySlug, `${serviceSlug}.json`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as GeneratedContent;
}
```

### Retry Logic for API Errors
```typescript
async function generateWithRetry(prompt: string, maxRetries = 3): Promise<GeneratedContent> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await callGemini(prompt);
    } catch (error: any) {
      if (error?.status === 429 && attempt < maxRetries) {
        const backoff = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.warn(`Rate limited. Retrying in ${backoff / 1000}s...`);
        await delay(backoff);
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@google/generative-ai` SDK | `@google/genai` SDK | May 2025 (GA) | Old SDK deprecated. New unified SDK covers both AI Studio and Vertex AI. |
| Gemini 2.0 Flash | Gemini 2.5 Flash | Feb 2026 | 2.0 Flash retired March 2026. Use `gemini-2.5-flash` model ID. |
| Prompt-only JSON ("return JSON") | `responseMimeType` + `responseSchema` | 2024 | Guaranteed valid JSON conforming to schema. No more parsing failures. |
| Manual rate limiting | Still manual for scripts | N/A | No built-in rate limiter in SDK. Simple delay is appropriate for batch scripts. |

**Deprecated/outdated:**
- `@google/generative-ai`: Deprecated, replaced by `@google/genai`
- `gemini-2.0-flash` / `gemini-2.0-flash-lite`: Retired March 3, 2026. Use `gemini-2.5-flash`.

## Open Questions

1. **Content tone calibration**
   - What we know: The prompt template can specify tone. Phase 1 data provides rich context.
   - What's unclear: The exact voice that converts best for a carpentry business (casual craftsperson vs. professional contractor). May need iteration.
   - Recommendation: Start with "professional but approachable" tone. Generate a sample batch of 5-10 pages, review manually, then adjust prompt before full run.

2. **Regeneration strategy**
   - What we know: Files are committed to git. Script skips existing files.
   - What's unclear: How to handle regeneration when local knowledge data is updated or prompt improves.
   - Recommendation: Add a `--force` flag to regenerate all, or `--city burlingame` to regenerate one city. Track generation metadata (model, date) in each JSON file.

3. **Content length balance**
   - What we know: Requirement says 200-300 words. SEO best practices in 2026 suggest 300+ words minimum for ranking.
   - What's unclear: Whether 200-300 is enough or should target 300-400.
   - Recommendation: Target 250-350 in the prompt. Validate minimum of 200. The structured sections (intro + serviceDescription + localContext + whyChooseUs) naturally produce 250-320 words.

## Sources

### Primary (HIGH confidence)
- [@google/genai npm package](https://www.npmjs.com/package/@google/genai) - v1.44, GA status, installation
- [Gemini API structured output docs](https://ai.google.dev/gemini-api/docs/structured-output) - JSON schema, responseMimeType
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) - Free tier limits for 2.5 Flash
- [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits) - RPM/RPD for free tier
- [googleapis/js-genai GitHub](https://github.com/googleapis/js-genai) - SDK source, TypeScript types

### Secondary (MEDIUM confidence)
- [string-similarity npm](https://www.npmjs.com/package/string-similarity) - Dice coefficient implementation
- [Backlinko PSEO guide 2026](https://backlinko.com/programmatic-seo) - Best practices for unique content
- [seomatic.ai PSEO best practices](https://seomatic.ai/blog/programmatic-seo-best-practices) - Anti-patterns, quality thresholds

### Tertiary (LOW confidence)
- Content word count thresholds (300+ words) -- based on multiple PSEO guides but no definitive Google source

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - `@google/genai` is GA, well-documented, verified on npm. Gemini 2.5 Flash pricing/limits confirmed.
- Architecture: HIGH - Structured output pattern is documented in official Gemini docs. Script-based generation with committed JSON is a well-established PSEO pattern.
- Pitfalls: HIGH - Rate limits verified from official docs. Content uniqueness concern is well-documented in PSEO literature. API key management is standard practice.

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (30 days -- Gemini SDK is stable/GA)
