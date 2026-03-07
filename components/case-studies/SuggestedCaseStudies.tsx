'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowRight, MapPin } from '@/components/ui/Icons'
import type { CaseStudy } from '@/data/case-studies'

function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link href={cs.href} className="group block bg-white border border-arch-stone hover:border-arch-mineral/50 transition-colors overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden shimmer-bg">
        <Image
          src={cs.image}
          alt={cs.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 85vw, 384px"
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
  )
}

export default function SuggestedCaseStudies({ studies }: { studies: CaseStudy[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 1
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, studies.length - 1))
  }, [studies.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      {/* Mobile: horizontal swipe */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-6 px-6"
        >
          {studies.map((cs) => (
            <div key={cs.href} className="snap-start shrink-0 w-[85vw]">
              <CaseStudyCard cs={cs} />
            </div>
          ))}
        </div>
        {studies.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {studies.map((cs, idx) => (
              <span
                key={cs.href}
                className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-arch-mineral' : 'bg-arch-stone/40'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: grid */}
      <div className={`hidden md:grid gap-6 ${studies.length === 1 ? 'max-w-sm' : 'md:grid-cols-2 max-w-2xl'}`}>
        {studies.map((cs, idx) => (
          <Reveal key={cs.href} delay={idx * 150}>
            <CaseStudyCard cs={cs} />
          </Reveal>
        ))}
      </div>
    </>
  )
}
