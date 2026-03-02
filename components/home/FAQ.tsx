'use client'

import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { ChevronDown } from '@/components/ui/Icons'
import { FAQS } from '@/data/faqs'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">FAQ</h2>
            <h3 className="text-3xl md:text-4xl font-serif text-arch-black">The Nitty Gritty</h3>
          </div>
        </Reveal>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className={`border-b border-arch-stone transition-all ${openIndex === i ? 'pb-6' : ''}`}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full text-left py-6 flex justify-between items-center group">
                <h4 className="text-lg md:text-xl font-serif text-arch-black group-hover:text-arch-mineral transition-colors pr-8">{faq.q}</h4>
                <div className={`transform transition-transform duration-300 text-arch-mineral flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}><ChevronDown /></div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-arch-charcoal/70 leading-relaxed max-w-3xl text-sm md:text-base">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
