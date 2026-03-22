import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CASE_STUDIES } from '@/data/case-studies'
import { ArrowRight, MapPin } from '@/components/ui/Icons'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real projects by CF Design — custom woodwork, fences, decks, patios, and more in Palo Alto and the Bay Area.',
  openGraph: {
    title: 'Case Studies | CF Design',
    description: 'Real projects by CF Design — custom woodwork, fences, decks, patios, and more in Palo Alto and the Bay Area.',
    url: 'https://cf.design/case-studies',
  },
}

export default function CaseStudiesPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-arch-mineral mb-4">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-serif text-arch-black mb-6">Case Studies</h1>
          <p className="text-arch-charcoal/70 font-light">
            Every project tells a story. Browse our recent builds across Palo Alto and the Bay Area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CASE_STUDIES.map((cs) => (
            <Link key={cs.href} href={cs.href} className="group block bg-white border border-arch-stone hover:border-arch-mineral/50 transition-colors overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden shimmer-bg">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-serif text-arch-black group-hover:text-arch-mineral transition-colors mb-1">{cs.title}</h2>
                <p className="text-xs text-arch-charcoal/60 font-light flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3" /> {cs.location}
                </p>
                <p className="text-arch-charcoal/70 font-light text-xs mb-3">{cs.description}</p>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-arch-mineral group-hover:text-arch-black transition-colors">
                  Read Case Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
