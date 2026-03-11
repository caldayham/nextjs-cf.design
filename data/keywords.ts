export interface KeywordData {
  primary: string
  secondary: string[]
  metaTitle: string
  metaDescription: string
}

const KEYWORD_TEMPLATES = {
  metaTitle: '{service} in {city}, CA | CF Design',
  metaDescription:
    'Professional {serviceLower} in {city}, CA. {description} Serving {city} and the SF Peninsula. Free consultation.',
}

export function getKeywords(
  cityName: string,
  service: { title: string; keywords: string[]; description: string }
): KeywordData {
  const primary = `${service.title.toLowerCase()} in ${cityName.toLowerCase()}`

  const secondary = service.keywords.flatMap(keyword => [
    `${keyword} ${cityName}`,
    `${keyword} near ${cityName}`,
  ])

  const metaTitle = KEYWORD_TEMPLATES.metaTitle
    .replace('{service}', service.title)
    .replace('{city}', cityName)

  const metaDescription = KEYWORD_TEMPLATES.metaDescription
    .replace('{serviceLower}', service.title.toLowerCase())
    .replace(/\{city\}/g, cityName)
    .replace('{description}', service.description)

  return { primary, secondary, metaTitle, metaDescription }
}
