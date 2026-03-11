import fs from 'fs';
import path from 'path';
import { getAllCityServiceParams } from '../data/helpers';
import { buildPrompt } from './lib/prompts';
import { generateContent } from './lib/gemini';
import type { GeneratedContent } from './lib/schemas';

const MODEL = 'gemini-2.5-flash';
const DELAY_MS = 8000; // ~7.5 RPM, stays under 10 RPM free tier limit
const MIN_WORD_COUNT = 200;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function parseArgs(argv: string[]) {
  const args = {
    force: false,
    city: null as string | null,
    dryRun: false,
  };

  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--force') {
      args.force = true;
    } else if (argv[i] === '--city' && argv[i + 1]) {
      args.city = argv[i + 1];
      i++;
    } else if (argv[i] === '--dry-run') {
      args.dryRun = true;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const startTime = Date.now();

  // Get all city/service combinations
  let params = getAllCityServiceParams();

  // Filter by city if specified
  if (args.city) {
    params = params.filter(p => p.city === args.city);
    if (params.length === 0) {
      console.error(`No combinations found for city: ${args.city}`);
      process.exit(1);
    }
    console.log(`Filtering to city: ${args.city} (${params.length} pages)\n`);
  }

  console.log(`Total combinations: ${params.length}`);
  console.log(`Mode: ${args.dryRun ? 'DRY RUN' : args.force ? 'FORCE (regenerate all)' : 'NORMAL (skip existing)'}\n`);

  // Dry run: just list what would be generated
  if (args.dryRun) {
    let wouldGenerate = 0;
    let wouldSkip = 0;

    for (const { city, service } of params) {
      const outputPath = path.join(process.cwd(), 'content', 'generated', city, `${service}.json`);
      const exists = fs.existsSync(outputPath);

      if (exists && !args.force) {
        console.log(`  [skip] ${city}/${service} (already exists)`);
        wouldSkip++;
      } else {
        console.log(`  [generate] ${city}/${service}`);
        wouldGenerate++;
      }
    }

    console.log(`\nDry run complete. Would generate: ${wouldGenerate}, Would skip: ${wouldSkip}`);
    return;
  }

  let generated = 0;
  let skipped = 0;
  let warnings = 0;
  let failures = 0;
  const total = params.length;

  for (let i = 0; i < params.length; i++) {
    const { city, service } = params[i];
    const outputDir = path.join(process.cwd(), 'content', 'generated', city);
    const outputPath = path.join(outputDir, `${service}.json`);

    // Skip existing files unless --force
    if (!args.force && fs.existsSync(outputPath)) {
      skipped++;
      console.log(`[${skipped + generated}/${total}] ${city}/${service} (skipped)`);
      continue;
    }

    try {
      // Build prompt and generate content
      const prompt = buildPrompt(city, service);
      const result = await generateContent(prompt);

      // Calculate word count across prose sections
      const wordCount = countWords(
        [result.intro, result.serviceDescription, result.localContext, result.whyChooseUs].join(' ')
      );

      // Enrich with metadata
      const content: GeneratedContent = {
        ...result,
        metadata: {
          citySlug: city,
          serviceSlug: service,
          generatedAt: new Date().toISOString(),
          model: MODEL,
          wordCount,
        },
      };

      // Write output
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));

      generated++;

      // Word count warning
      if (wordCount < MIN_WORD_COUNT) {
        warnings++;
        console.log(`[${skipped + generated}/${total}] ${city}/${service} -- WARNING: ${wordCount} words (below ${MIN_WORD_COUNT} minimum)`);
      } else {
        console.log(`[${skipped + generated}/${total}] ${city}/${service} (${wordCount} words)`);
      }

      // Rate limiting delay (skip on last item)
      if (i < params.length - 1) {
        await delay(DELAY_MS);
      }
    } catch (error: unknown) {
      failures++;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[${skipped + generated + failures}/${total}] ${city}/${service} FAILED: ${message}`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n--- Generation Complete ---`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Warnings:  ${warnings} (under ${MIN_WORD_COUNT} words)`);
  console.log(`Failures:  ${failures}`);
  console.log(`Elapsed:   ${elapsed}s`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
