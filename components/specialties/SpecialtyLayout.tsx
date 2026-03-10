import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLeft } from '@/components/ui/Icons'
import BookConsultationButton from '@/components/case-studies/BookConsultationButton'
import SuggestedSpecialties from '@/components/specialties/SuggestedSpecialties'
import { SPECIALTIES } from '@/data/specialties'

export interface SpecialtyFrontmatter {
  title: string
  description: string
}

export default function SpecialtyLayout({
  frontmatter,
  currentHref,
  children,
}: {
  frontmatter: SpecialtyFrontmatter
  currentHref: string
  children: React.ReactNode
}) {
  const suggestedSpecialties = SPECIALTIES.filter(s => s.href !== currentHref)
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
              <span className="w-8 h-[1px] bg-arch-mineral"></span> Specialty
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              {frontmatter.title}
            </h1>
            <p className="text-lg text-arch-stone/60 font-light max-w-2xl">
              {frontmatter.description}
            </p>
          </Reveal>
        </div>
      </section>

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
            <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-6">Need this kind of work?</h3>
            <p className="text-arch-charcoal/70 mb-10 font-light max-w-2xl mx-auto">We&apos;d love to hear about it. Consultations are free within 30 minutes of Palo Alto.</p>
            <BookConsultationButton />
          </Reveal>
        </div>
      </section>

      {/* Suggested Specialties */}
      {suggestedSpecialties.length > 0 && (
        <section className="py-20 md:py-28 bg-arch-concrete bg-noise border-t border-arch-stone">
          <div className="container mx-auto px-6">
            <Reveal>
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-12 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-arch-mineral" /> More Specialties
              </h2>
            </Reveal>
            <SuggestedSpecialties specialties={suggestedSpecialties} />
          </div>
        </section>
      )}
    </div>
  )
}
