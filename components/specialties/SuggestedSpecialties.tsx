'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@/components/ui/Icons'
import type { Specialty } from '@/data/specialties'

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  return (
    <Link href={specialty.href} className="group block bg-white border border-arch-stone hover:border-arch-mineral/50 transition-colors overflow-hidden">
      <div className="p-6">
        <h4 className="text-lg font-serif text-arch-black group-hover:text-arch-mineral transition-colors mb-2">{specialty.title}</h4>
        <p className="text-arch-charcoal/70 font-light text-sm mb-4">{specialty.description}</p>
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-arch-mineral group-hover:text-arch-black transition-colors">
          Learn More <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default function SuggestedSpecialties({ specialties }: { specialties: Specialty[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const scrollLeft = el.scrollLeft
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 1
    const index = Math.round(scrollLeft / cardWidth)
    setActiveIndex(Math.min(index, specialties.length - 1))
  }, [specialties.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-6 px-6"
      >
        {specialties.map((s) => (
          <div key={s.href} className="snap-start shrink-0 w-[85vw] md:w-[384px]">
            <SpecialtyCard specialty={s} />
          </div>
        ))}
      </div>
      {specialties.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {specialties.map((s, idx) => (
            <span
              key={s.href}
              className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-arch-mineral' : 'bg-arch-stone/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
