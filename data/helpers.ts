import { CITIES, CITY_BY_SLUG } from './cities'
import { SERVICES, SERVICE_BY_SLUG } from './services'
import { LOCAL_KNOWLEDGE } from './local-knowledge'
import { CASE_STUDIES } from './case-studies'
import { getKeywords } from './keywords'

/**
 * Returns all 165 city+service param combinations for generateStaticParams.
 */
export function getAllCityServiceParams(): { city: string; service: string }[] {
  return CITIES.flatMap(city =>
    SERVICES.map(service => ({
      city: city.slug,
      service: service.slug,
    }))
  )
}

/**
 * Returns case studies where the city is the primary location OR a nearby city.
 */
export function getCaseStudiesForCity(citySlug: string) {
  return CASE_STUDIES.filter(
    cs => cs.citySlug === citySlug || cs.nearbyCities.includes(citySlug)
  )
}

/**
 * Returns case studies that demonstrate a particular service category.
 */
export function getCaseStudiesForService(serviceSlug: string) {
  return CASE_STUDIES.filter(cs => cs.serviceCategories.includes(serviceSlug))
}

/**
 * Assembles complete data for one PSEO page. Returns null if city or service not found.
 * This is the primary function Phase 2 and 3 will call.
 */
export function getPageData(citySlug: string, serviceSlug: string) {
  const city = CITY_BY_SLUG.get(citySlug)
  const service = SERVICE_BY_SLUG.get(serviceSlug)
  if (!city || !service) return null

  return {
    city,
    service,
    localKnowledge: LOCAL_KNOWLEDGE[citySlug],
    keywords: getKeywords(city.name, service),
    nearbyCaseStudies: getCaseStudiesForCity(citySlug),
    relevantCaseStudies: getCaseStudiesForService(serviceSlug),
  }
}

export type PageData = NonNullable<ReturnType<typeof getPageData>>
