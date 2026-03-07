import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Tina's Redwood Potting Station — CF Design Case Study",
  description:
    'A custom redwood potting station with corrugated steel roof, tool rack, and slatted storage — built in two days for a Palo Alto garden.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Tina's Redwood Potting Station",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/tina-potting-station/hero-collage.jpg',
  heroSaturationBoost: 2.0,
  heroSaturationOpacity: 0.4,
}

const IMG = '/case-studies/tina-potting-station'

export default function TinaPottingStationPage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter} currentHref="/case-studies/tina-potting-station">
      {/* ── The Brief ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Brief
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        A place to pot in the sun
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Tina wanted an outdoor workspace where she could pot plants, hang tools, and store supplies — all protected from the rain. The station needed to be sturdy enough to work on, open enough to enjoy the sun, and covered enough to keep everything dry.
      </p>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/before-garden-area.jpg`} alt="Tina's backyard garden area before the build — open corner with fence and plants" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We designed the station around her needs: a flat redwood bench for potting, a raised tool rack with hangers for trowels and utensils, a slatted lower shelf for soil and large pots, and a corrugated stainless steel roof overhead.
      </p>

      <div className="relative w-full my-10 overflow-hidden">
        <Image src={`${IMG}/design-diagram-dimensions.png`} alt="Technical diagram showing side, front, and top views of the potting station with dimensions — 7 feet tall, 4 feet wide, 24 inches deep" width={900} height={360} className="w-full h-auto" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      {/* ── The Build ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Materials
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Everything is built from redwood — naturally rot-resistant and insect-proof, perfect for an outdoor station that&apos;ll see weather year-round. We picked up the lumber and corrugated stainless steel sheeting and got to work.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/redwood-lumber-pickup.JPG`} alt="Loading fresh redwood lumber into the truck for the potting station build" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/materials-and-surfboard-on-site.JPG`} alt="Redwood lumber and corrugated metal sheets staged on-site, ready for the build" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Building the base
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We started with the substructure — a solid redwood frame that forms the legs, bench supports, and the skeleton for the upper tool rack. Getting this square and sturdy was the foundation for everything else.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/assembling-base-frame.JPG`} alt="Assembling the redwood base frame on the back deck" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/base-frame-complete.JPG`} alt="Completed base frame standing upright — legs, bench supports, and upper rack structure" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/worksite-overview-golden-sun.JPG`} alt="Wide view of the backyard worksite with the frame in progress under golden afternoon sun" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Bench, shelves, and roof
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Once the frame was solid, we moved on to the surfaces — the flat bench top, the slatted lower storage rack, and the upper tool platform. Finally, we attached the corrugated stainless steel roof to keep rain and sun off the workspace.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/attaching-bench-and-shelves.JPG`} alt="Attaching the bench surface and slatted bottom shelf to the frame with a drill" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/frame-with-shelves-golden-hour.JPG`} alt="Nearly complete station with bench, upper tool rack, and lower shelf — golden hour light" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      {/* ── The Result ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Two days of work, all redwood, built to last. The finished station sits perfectly in Tina&apos;s garden — bench for potting, hooks for tools, slats for storage, and a steel roof overhead.
      </p>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/finished-potting-station.JPG`} alt="Finished redwood potting station in place — corrugated steel roof, bench, tool rack, and slatted lower shelf" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          This is one of our favorite builds — simple, effective carpentry that does exactly what it needs to. Redwood frame, steel roof, built in two days. Sometimes the best projects are the most straightforward ones.
        </p>
      </blockquote>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-and-fynn-finished-build.JPG`} alt="Cal and Fynn selfie with the completed potting station behind them" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-fynn-and-tina.jpg`} alt="Cal, Fynn, and Tina smiling together after the build" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>
    </CaseStudyLayout>
  )
}
