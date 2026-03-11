import { getPageData } from '../../data/helpers';

/**
 * Builds a rich prompt for Gemini content generation using Phase 1 data.
 * Injects all available city context, service details, and nearby case studies
 * so the model has enough material to produce genuinely unique content.
 */
export function buildPrompt(citySlug: string, serviceSlug: string): string {
  const data = getPageData(citySlug, serviceSlug);
  if (!data) throw new Error(`No data for ${citySlug}/${serviceSlug}`);

  const { city, service, localKnowledge, nearbyCaseStudies, relevantCaseStudies } = data;

  // Combine nearby and relevant case studies, deduplicate by title
  const allCaseStudies = [...nearbyCaseStudies, ...relevantCaseStudies];
  const seen = new Set<string>();
  const uniqueCaseStudies = allCaseStudies.filter(cs => {
    if (seen.has(cs.title)) return false;
    seen.add(cs.title);
    return true;
  });

  const caseStudyLines = uniqueCaseStudies.length > 0
    ? uniqueCaseStudies.map(cs => `- ${cs.title} (${cs.location}): ${cs.description}`).join('\n')
    : '- No nearby completed projects yet';

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
${caseStudyLines}

REQUIREMENTS:
- Write naturally, as if a knowledgeable local craftsperson is speaking
- Mention specific neighborhoods, landmarks, and housing types by name
- Reference local permit requirements or HOA considerations where relevant
- Do NOT use generic filler -- every sentence should contain city-specific or service-specific detail
- Total content should be 250-350 words across all sections
- Tone: professional but approachable, confident but not salesy`;
}
