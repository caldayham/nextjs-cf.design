import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { PROCESS_STEPS } from '@/data/process-steps'

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-32 bg-white relative">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-arch-stone"></div>

      <div className="container mx-auto px-6 relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 bg-white relative z-10 py-4">
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">Roadmap</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-arch-black">Concept to Complete</h3>
          </div>
        </Reveal>

        <div className="space-y-16 md:space-y-24">
          {PROCESS_STEPS.map((step, index) => {
            const isEven = index % 2 === 0
            return (
              <div key={step.id} className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'} relative pl-10 md:pl-0`}>

                {/* Image */}
                <div className="w-full md:w-1/2 px-0">
                  <Reveal delay={index * 100}>
                    <div className="relative aspect-[4/3] bg-arch-stone overflow-hidden shadow-sm group rounded-sm">
                      <Image src={step.img} alt={step.title} width={800} height={600} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[10%]" sizes="(min-width: 1024px) 50vw, 100vw" />
                    </div>
                  </Reveal>
                </div>

                {/* Center Dot */}
                <div className="absolute -left-[26px] md:left-1/2 top-0 md:top-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 bg-arch-mineral border-4 border-white rounded-full z-10"></div>

                {/* Text */}
                <div className="w-full md:w-1/2 md:px-0 py-4 md:py-8 flex flex-col justify-center">
                  <Reveal delay={index * 100 + 200}>
                    <div className="text-left max-w-lg mx-auto md:mx-0">
                      <div className="flex items-baseline gap-4 mb-4 md:mb-6">
                        <span className="text-arch-mineral font-serif text-2xl font-bold">{step.id}.</span>
                        <h4 className="text-2xl md:text-3xl font-serif text-arch-black">{step.title}</h4>
                      </div>

                      <p className="text-arch-charcoal/70 mb-6 md:mb-8 leading-relaxed text-sm md:text-lg pl-2 border-l-2 border-arch-stone">{step.intro}</p>

                      <ul className="space-y-3 text-sm text-arch-charcoal/80 flex flex-col items-start">
                        {step.points.map((point, i) => (
                          <li key={i} className="flex gap-4 items-start text-left">
                            <span className="w-1.5 h-1.5 bg-arch-mineral rounded-full mt-1.5 flex-shrink-0"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
