import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { Check } from '@/components/ui/Icons'

export default function Purpose() {
  return (
    <section id="purpose" className="py-20 md:py-32 bg-arch-concrete bg-noise">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">

          <div className="lg:w-1/2">
            <Reveal delay={200}>
              <div className="relative">
                <div className="relative aspect-[5/6] md:aspect-[3/4] rounded-sm overflow-hidden shadow-xl border-8 border-white max-w-md mx-auto">
                  <Image src="/assets/jobs/Robin-deck-after.jpg" alt="Cal & Fynn" width={448} height={537} className="w-full h-full object-cover object-bottom" sizes="(min-width: 1024px) 448px, 100vw" />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-6 border-t border-arch-stone">
                    <p className="font-serif text-arch-black text-xl italic mb-1">&quot;Quality through clarity.&quot;</p>
                    <p className="text-arch-mineral text-xs uppercase tracking-widest font-bold">— Cal & Fynn</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-1/2">
            <Reveal delay={400}>
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-arch-mineral"></span> Purpose
              </h2>
              <h3 className="text-3xl md:text-5xl font-serif text-arch-black mb-8 leading-tight">
                Clean up your todo list, <br /> <span className="italic text-arch-mineral">zero headache.</span>
              </h3>
              <p className="text-arch-charcoal/80 leading-relaxed mb-10 text-base md:text-lg font-light border-l-2 border-arch-mineral/20 pl-6">
                Cal & Fynn specialize in <span className="font-semibold text-arch-black">medium scale</span> projects that are a too big to tackle alone but too small for traditional companies to take seriously, or at a fair price.
              </p>
              <ul className="space-y-4 border-t border-arch-stone pt-8">
                {["Unparalleled communication", "Unique & creative solutions", "Intentional, precise, & flexible execution"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="w-6 h-6 rounded-full border border-arch-mineral flex items-center justify-center text-arch-mineral group-hover:bg-arch-mineral group-hover:text-white transition-colors">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-arch-charcoal text-sm md:text-base font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
