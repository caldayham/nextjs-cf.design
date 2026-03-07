import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLeft, ArrowRight, MapPin } from '@/components/ui/Icons'
import BookConsultationButton from '@/components/case-studies/BookConsultationButton'
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
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-arch-mineral" /> More Case Studies
              </h2>
              <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-12">See what else we&apos;ve built</h3>
            </Reveal>
            <div className={`grid gap-6 ${suggestedStudies.length === 1 ? 'max-w-sm' : 'md:grid-cols-2 max-w-2xl'}`}>
              {suggestedStudies.map((cs, idx) => (
                <Reveal key={cs.href} delay={idx * 150}>
                  <Link href={cs.href} className="group block bg-white border border-arch-stone hover:border-arch-mineral/50 transition-colors overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden shimmer-bg">
                      <Image
                        src={cs.image}
                        alt={cs.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-serif text-arch-black group-hover:text-arch-mineral transition-colors mb-1">{cs.title}</h4>
                      <p className="text-xs text-arch-charcoal/60 font-light flex items-center gap-1.5 mb-2">
                        <MapPin className="w-3 h-3" /> {cs.location}
                      </p>
                      <p className="text-arch-charcoal/70 font-light text-xs mb-3">{cs.description}</p>
                      <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-arch-mineral group-hover:text-arch-black transition-colors">
                        Read Case Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
