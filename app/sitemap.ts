import type { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/data/case-studies'

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = CASE_STUDIES.map((cs) => ({
    url: `https://cf.design${cs.href}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://cf.design/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies,
  ]
}
