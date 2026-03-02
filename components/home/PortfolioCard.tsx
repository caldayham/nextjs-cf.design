'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight } from '@/components/ui/Icons'
import { PortfolioItem } from '@/data/portfolio'

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const [index, setIndex] = useState(0)
  const [active, setActive] = useState('next')
  const router = useRouter()
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setActive('prev'); setIndex((i) => (i - 1 + item.images.length) % item.images.length) }
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setActive('next'); setIndex((i) => (i + 1) % item.images.length) }
  const handleClick = () => { if (item.caseStudy) router.push(item.caseStudy) }
  return (
    <div onClick={handleClick} className={`bg-white group border border-arch-stone h-[400px] md:h-[500px] flex flex-col hover:border-arch-mineral/50 transition-colors ${item.caseStudy ? 'cursor-pointer' : ''}`}>
      <div className="relative flex-grow overflow-hidden bg-arch-stone">
        {item.images.map((img, i) => (
          <Image key={i} src={img} alt={item.title} width={800} height={600} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`} sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw" />
        ))}

        {/* Navigation */}
        <div className="absolute bottom-4 right-4 flex bg-white/95 border border-arch-stone p-1 gap-1">
          <button onClick={prev} onMouseEnter={() => setActive('prev')} className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition-all ${active === 'prev' ? 'bg-arch-mineral text-white' : 'text-arch-charcoal hover:bg-gray-100'}`}>Previous</button>
          <button onClick={next} onMouseEnter={() => setActive('next')} className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold transition-all ${active === 'next' ? 'bg-arch-mineral text-white' : 'text-arch-charcoal hover:bg-gray-100'}`}>Next</button>
        </div>
      </div>
      <div className="px-4 py-3 bg-white border-t border-arch-stone">
        <h4 className="text-xl font-serif text-arch-black group-hover:text-arch-mineral transition-colors">{item.title}</h4>
        {item.caseStudy && (
          <Link href={item.caseStudy} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-arch-mineral hover:text-arch-black transition-colors mt-4">
            Read Case Study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  )
}
