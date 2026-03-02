import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import Purpose from '@/components/home/Purpose'
import Process from '@/components/home/Process'
import Portfolio from '@/components/home/Portfolio'
import Reviews from '@/components/home/Reviews'
import FAQ from '@/components/home/FAQ'

export const metadata: Metadata = {
  title: 'CF Design — Custom Construction in the Bay Area',
  description: 'Cal & Fynn build custom woodwork, decks, and garden structures in Palo Alto and the Bay Area.',
  openGraph: {
    title: 'CF Design — Custom Construction in the Bay Area',
    description: 'Cal & Fynn build custom woodwork, decks, and garden structures in Palo Alto and the Bay Area.',
    url: 'https://cf.design/',
    images: [{ url: '/assets/cal-fynn-build.jpg', width: 1200, height: 630, alt: 'CF Design' }],
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CF Design',
  description: 'Custom woodwork, decks, and garden structures in the Bay Area.',
  url: 'https://cf.design',
  telephone: '+1-650-521-7269',
  email: 'info@cf.design',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Palo Alto',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  areaServed: ['San Mateo County', 'Santa Clara County'],
  image: 'https://cf.design/assets/cal-fynn-build.jpg',
  sameAs: [
    'https://www.instagram.com/cf.design__/',
    'https://nextdoor.com/page/cf-design',
  ],
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <Hero />
      <Purpose />
      <Process />
      <Portfolio />
      <Reviews />
      <FAQ />
    </main>
  )
}
