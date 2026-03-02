import type { Metadata } from 'next'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'

export const dynamicParams = false

export function generateStaticParams() {
  return [
    { slug: 'palo-alto-redwood-little-library' },
    { slug: 'palo-alto-walnut-marble-tables' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { metadata, caseStudyData } = await import(`@/content/case-studies/${slug}.mdx`)
  return {
    ...metadata,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://cf.design/case-studies/${slug}/`,
      images: [{ url: caseStudyData.heroImage, width: 1200, height: 630, alt: caseStudyData.heroImageAlt }],
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { caseStudyData } = await import(`@/content/case-studies/${slug}.mdx`)
  return <CaseStudyLayout data={caseStudyData} />
}
