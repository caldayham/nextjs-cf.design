import { Reveal } from '@/components/ui/Reveal'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'
import PortfolioCard from '@/components/home/PortfolioCard'

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-arch-concrete bg-noise">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16">
          <div>
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-arch-black">Selected Works</h3>
          </div>
          <div className="hidden md:block w-32 h-[1px] bg-arch-black mb-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.filter(item => item.published).map((item, idx) => (
            <Reveal key={idx} delay={idx * 150}><PortfolioCard item={item} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
