---
phase: 02-content-generation-pipeline
plan: 01
subsystem: content-generation
tags: [anthropic, gemini, dual-model, structured-output, tool-use, faqs]

# Dependency graph
requires:
  - phase: 01-data-foundation
    provides: "City, service, local-knowledge data layer (helpers.ts, services.ts, cities.ts, local-knowledge.ts)"
  - phase: 01.1-service-taxonomy-expansion
    provides: "Expanded 16-service taxonomy with intent-specific slugs"
provides:
  - "Claude writing module (claudeWrite) with tool_use structured output"
  - "Gemini research module (geminiResearch) with structured research schema"
  - "Research and writing prompt builders (buildResearchPrompt, buildWritingPrompt)"
  - "Shared GeneratedContent type with FAQs and dual-model metadata"
  - "contentJsonSchema (JSON Schema for Claude) and researchSchema (Gemini Type format)"
affects: [02-content-generation-pipeline, 03-page-templates]

# Tech tracking
tech-stack:
  added: ["@anthropic-ai/sdk", "zod"]
  patterns: ["dual-model pipeline (Gemini research + Claude writing)", "tool_use for Claude structured output", "shared types across sibling projects"]

key-files:
  created:
    - "nextjs-cf.design/content/types.ts"
    - "pseo-content-gen/scripts/lib/claude.ts"
    - "pseo-content-gen/scripts/lib/research-prompt.ts"
    - "pseo-content-gen/scripts/lib/writing-prompt.ts"
  modified:
    - "pseo-content-gen/scripts/lib/schemas.ts"
    - "pseo-content-gen/scripts/lib/gemini.ts"
    - "pseo-content-gen/package.json"
  deleted:
    - "pseo-content-gen/scripts/lib/prompts.ts"

key-decisions:
  - "Used tool_use pattern for Claude structured output instead of native beta (reliable across all models)"
  - "Deleted old prompts.ts entirely rather than deprecating (clean break, no dead code)"
  - "Removed all permit/HOA/building code data from research prompt injection (not just from instructions)"

patterns-established:
  - "Dual-model pipeline: Gemini for structured research, Claude for authentic prose"
  - "Shared types via relative imports between sibling projects (nextjs-cf.design/content/types.ts)"
  - "tool_use pattern for Claude structured output with forced tool_choice"

requirements-completed: [CONT-01, CONT-04, CONT-05]

# Metrics
duration: 3min
completed: 2026-03-12
---

# Phase 2 Plan 1: Pipeline Foundation Summary

**Dual-model pipeline modules: Gemini research step with structured schema, Claude writing step with tool_use, shared GeneratedContent type with FAQs**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-12T04:22:41Z
- **Completed:** 2026-03-12T04:25:38Z
- **Tasks:** 2
- **Files modified:** 8 (3 created, 3 modified, 1 deleted, 1 package.json updated)

## Accomplishments
- Shared GeneratedContent type with FAQs and dual-model metadata (researchModel/writingModel) defined in nextjs-cf.design/content/types.ts
- Claude writing module using tool_use pattern with Haiku 4.5 for structured prose output
- Research and writing prompts separated -- no permit/HOA/building code references anywhere
- Gemini module refactored from content generation to structured research (geminiResearch + researchSchema)
- Old single-model contentSchema and prompts.ts removed

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies and create schemas + shared content type** - `a6dba32` (feat)
2. **Task 2: Create Claude module and refactor prompts + Gemini** - pseo-content-gen files not git-tracked (see Deviations)

## Files Created/Modified
- `nextjs-cf.design/content/types.ts` - Canonical GeneratedContent and FAQ interfaces shared between projects
- `pseo-content-gen/scripts/lib/schemas.ts` - ResearchOutput interface, researchSchema (Gemini), contentJsonSchema (Claude tool_use)
- `pseo-content-gen/scripts/lib/claude.ts` - claudeWrite function using tool_use pattern with Haiku 4.5
- `pseo-content-gen/scripts/lib/research-prompt.ts` - buildResearchPrompt injecting city/service context without permits/HOA
- `pseo-content-gen/scripts/lib/writing-prompt.ts` - buildWritingPrompt with authentic craftsperson voice and FAQ guidelines
- `pseo-content-gen/scripts/lib/gemini.ts` - Refactored: generateContent renamed to geminiResearch, returns ResearchOutput
- `pseo-content-gen/scripts/lib/prompts.ts` - Deleted (replaced by research-prompt.ts + writing-prompt.ts)
- `pseo-content-gen/package.json` - Added @anthropic-ai/sdk and zod dependencies

## Decisions Made
- Used tool_use pattern for Claude structured output instead of native structured output beta -- works reliably on all Claude models including Haiku 4.5
- Deleted prompts.ts entirely rather than adding deprecation re-exports -- generate-content.ts (refactored in Plan 02-02) will import from new files directly
- Removed permits and hoaNotes fields from research prompt data injection entirely (not just from instructions) per user tone feedback

## Deviations from Plan

### Noted Issues

**1. pseo-content-gen is not a git repository**
- **Found during:** Task 1 (commit step)
- **Issue:** pseo-content-gen/ is a sibling directory outside the nextjs-cf.design git repo with no git init. All pseo-content-gen file changes (schemas.ts, gemini.ts, claude.ts, research-prompt.ts, writing-prompt.ts, package.json) cannot be committed.
- **Impact:** Task 2 changes verified via import tests but not version-controlled. Only nextjs-cf.design/content/types.ts is committed.
- **Recommendation:** Consider initializing git in pseo-content-gen or creating a monorepo structure.

---

**Total deviations:** 1 noted (git tracking gap for pseo-content-gen)
**Impact on plan:** All code is written and verified. Only version control tracking is affected.

## Issues Encountered
None -- all modules import and verify correctly.

## User Setup Required
None - no external service configuration required. ANTHROPIC_API_KEY and GEMINI_API_KEY will be needed at runtime (Plan 02-02) but are already documented in the modules with helpful error messages.

## Next Phase Readiness
- All building blocks ready for Plan 02-02 (wire into generate-content.ts runner)
- geminiResearch, claudeWrite, buildResearchPrompt, buildWritingPrompt all export and import correctly
- Shared GeneratedContent type available for both projects
- pseo-content-gen needs git initialization for proper version control

## Self-Check: PASSED

- All 6 created/modified files exist on disk
- prompts.ts confirmed deleted
- Commit a6dba32 exists in git history
- All module imports verified via tsx

---
*Phase: 02-content-generation-pipeline*
*Completed: 2026-03-12*
