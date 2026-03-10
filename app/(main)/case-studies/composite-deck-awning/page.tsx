import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Composite Deck & Redwood Awning — CF Design Case Study",
  description:
    'A mahogany Timbertech composite deck and redwood awning with corrugated stainless roof — replacing a rotting deck that had become a critter hotel.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Composite Deck & Redwood Awning",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/composite-deck-awning/hero-collage-v5.jpg',
  heroSaturationBoost: 1.8,
  heroSaturationOpacity: 0.3,
}

const IMG = '/case-studies/composite-deck-awning'
const MOB = '/case-studies/composite-deck-awning/mobile'

export default function CompositeDeckAwningPage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter} currentHref="/case-studies/composite-deck-awning">
      {/* ── The Brief ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Brief
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Turning a skunk hotel into an outdoor living space
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Our neighbor Robin had an old deck that had seen better days — it was rotting, collapsing, and had become a hotel for possums, skunks, and rats. She wanted it replaced with something beautiful and durable: a proper composite deck with a covered awning for reading outside, rain or shine.
      </p>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${MOB}/IMG_3077.PNG`} />
          <Image src={`${IMG}/IMG_3077.PNG`} alt="The original concrete pad and outdoor furniture before the build — the old deck had already been removed" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </picture>
      </div>

      {/* ── The Build ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Demolition
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        First we took down the old deck that had been hosting local critters and hauled it away to the reclamation center. Underneath was years of rot and debris — a clean slate was long overdue.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/Robin-deck-before.png`} />
            <Image src={`${IMG}/Robin-deck-before.png`} alt="Demolishing the old rotting deck with a reciprocating saw — exposed joists and debris underneath" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3075.PNG`} />
            <Image src={`${IMG}/IMG_3075.PNG`} alt="Old deck pieces torn apart and stacked up, ready to haul to the reclamation center" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Substructure
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We built the substructure from pressure treated lumber set 16&quot; on center with lots of blocking for great rigidity. The main portion sits on nine concrete piles drilled two feet into the ground — six along the outside and three to support the center.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3066.PNG`} />
            <Image src={`${IMG}/IMG_3066.PNG`} alt="Pressure treated joists on concrete piles — early substructure taking shape" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3064.PNG`} />
            <Image src={`${IMG}/IMG_3064.PNG`} alt="Wider view of the substructure with joists laid out on concrete piles" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3065.PNG`} />
            <Image src={`${IMG}/IMG_3065.PNG`} alt="Installing blocking between the joists for added rigidity" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3072.PNG`} />
            <Image src={`${IMG}/IMG_3072.PNG`} alt="Close-up of the joist substructure with blocking and joist tape on concrete piles" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
      </div>

      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We installed 19 gauge galvanized mesh underneath to keep future critters out, and used joist tape on every bearing surface to make sure the substructure lasts as long as the decking.
      </p>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Materials
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        For the decking we used the mahogany line from Timbertech — a beautiful composite material with a 50 year warranty. For the awning we went with redwood, which has natural tannins that resist insects and rot, finished with linseed oil for protection.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${MOB}/IMG_3061.PNG`} />
          <Image src={`${IMG}/IMG_3061.PNG`} alt="Applying linseed oil finish to redwood lumber laid out on a tarp in the yard" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </picture>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Awning
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We erected the awning substructure from redwood and topped it with corrugated stainless steel sheeting to keep the area dry. The roof has a 7.5 degree tilt to keep sticks and leaves from building up — so Robin can read outside without worrying about the weather.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_3074.PNG`} />
            <Image src={`${IMG}/IMG_3074.PNG`} alt="Building the redwood awning frame — standing inside the substructure with the posts and beams going up" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <picture>
            <source media="(max-width: 640px)" srcSet={`${MOB}/IMG_9921.jpg`} />
            <Image src={`${IMG}/IMG_9921.jpg`} alt="Redwood awning substructure with sun flaring through the beams — joists and blocking visible below" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
          </picture>
        </div>
      </div>

      <div className="relative aspect-[3/4] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${MOB}/IMG_3063.PNG`} />
          <Image src={`${IMG}/IMG_3063.PNG`} alt="Cal and Fynn standing on the deck substructure with the awning frame rising behind them" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </picture>
      </div>

      {/* ── Built to Last ─────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Built to Last
      </h2>
      <ul className="text-lg text-arch-charcoal/80 leading-relaxed font-light mb-6 list-disc pl-6 space-y-2">
        <li><strong className="font-semibold text-arch-black">Timbertech mahogany composite decking</strong> — 50 year warranty</li>
        <li><strong className="font-semibold text-arch-black">Pressure treated substructure</strong> — 16&quot; on center with heavy blocking</li>
        <li><strong className="font-semibold text-arch-black">9 concrete piles</strong> — drilled 2 feet into the ground</li>
        <li><strong className="font-semibold text-arch-black">19 gauge galvanized mesh</strong> — critter-proofing underneath</li>
        <li><strong className="font-semibold text-arch-black">Joist tape</strong> — on every bearing surface for long-term protection</li>
        <li><strong className="font-semibold text-arch-black">Redwood awning</strong> — naturally rot and insect resistant</li>
        <li><strong className="font-semibold text-arch-black">Corrugated stainless steel roof</strong> — 7.5&deg; tilt for drainage</li>
        <li><strong className="font-semibold text-arch-black">Linseed oil finish</strong> — on all redwood surfaces</li>
      </ul>

      {/* ── The Result ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        From critter hotel to covered outdoor living space. The finished deck is beautiful, durable, and built to last decades — a mahogany composite surface that&apos;ll look great for 50 years, under a redwood awning that keeps Robin dry while she reads.
      </p>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${MOB}/IMG_3073.PNG`} />
          <Image src={`${IMG}/IMG_3073.PNG`} alt="Finished composite deck and redwood awning with corrugated stainless steel roof — the complete outdoor living space" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </picture>
      </div>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          This was a fantastic weekend build with my brother — taking down a rotting deck and replacing it with something our neighbor will enjoy for decades. From concrete piles to composite decking to a redwood awning with a stainless roof, every layer was built to last. It&apos;s always a great feeling to get something beautiful built right.
        </p>
      </blockquote>

      <div className="relative aspect-[3/4] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={`${MOB}/IMG_3068.PNG`} />
          <Image src={`${IMG}/IMG_3068.PNG`} alt="Cal and Fynn on the finished deck under the awning — project complete" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
        </picture>
      </div>
    </CaseStudyLayout>
  )
}
