import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLeft, MapPin } from '@/components/ui/Icons'
import BookConsultationButton from '@/components/case-studies/BookConsultationButton'
import SuggestedCaseStudies from '@/components/case-studies/SuggestedCaseStudies'
import { CASE_STUDIES } from '@/data/case-studies'

export interface CaseStudyFrontmatter {
  title: string
  date: string
  location: string
  heroImage?: string
  heroSaturationBoost?: number
  heroSaturationOpacity?: number
  heroObjectPosition?: string
}

export default function CaseStudyLayout({
  frontmatter,
  currentHref,
  children,
}: {
  frontmatter: CaseStudyFrontmatter
  currentHref: string
  children: React.ReactNode
}) {
  const suggestedStudies = CASE_STUDIES.filter(cs => cs.href !== currentHref)
  return (
    <div>
      {/* Header */}
      <section className="relative bg-arch-black text-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-arch-stone/60 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back Home
            </Link>
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-arch-mineral"></span> Case Study
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              {frontmatter.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-arch-stone/60">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {frontmatter.location}</span>
              <span>{frontmatter.date}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      {frontmatter.heroImage && (
        <section className="bg-arch-concrete">
          <div className="container mx-auto px-6 -mt-8">
            <Reveal delay={200}>
              <div className="aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden shadow-xl border-8 border-white relative shimmer-bg">
                <Image src={`${frontmatter.heroImage}`} alt={frontmatter.title} fill className="object-cover" sizes="100vw" priority style={frontmatter.heroObjectPosition ? { objectPosition: frontmatter.heroObjectPosition } : undefined} />
                {frontmatter.heroSaturationBoost && (
                  <Image
                    src={`${frontmatter.heroImage}`}
                    alt=""
                    fill
                    className="object-cover pointer-events-none"
                    sizes="100vw"
                    aria-hidden="true"
                    style={{
                      filter: `saturate(${frontmatter.heroSaturationBoost})`,
                      opacity: frontmatter.heroSaturationOpacity ?? 0.3,
                      ...(frontmatter.heroObjectPosition ? { objectPosition: frontmatter.heroObjectPosition } : {}),
                    }}
                  />
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="py-20 md:py-28 bg-arch-concrete bg-noise">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white border-t border-arch-stone">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-6">Have a similar project?</h3>
            <p className="text-arch-charcoal/70 mb-10 font-light max-w-2xl mx-auto">We&apos;d love to hear about it. Consultations are free within 30 minutes of Palo Alto.</p>
            <BookConsultationButton />
          </Reveal>
        </div>
      </section>

      {/* Suggested Case Studies */}
      {suggestedStudies.length > 0 && (
        <section className="py-20 md:py-28 bg-arch-concrete bg-noise border-t border-arch-stone">
          <div className="container mx-auto px-6">
            <Reveal>
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-12 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-arch-mineral" /> More Case Studies
              </h2>
            </Reveal>
            <SuggestedCaseStudies studies={suggestedStudies} />
          </div>
        </section>
      )}
    </div>
  )
}
