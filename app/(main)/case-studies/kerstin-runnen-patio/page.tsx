import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Kerstin's Rünnen Patio — CF Design Case Study",
  description:
    'An 8x8 IKEA Rünnen tile patio built on a proper substrate — from excavation and concrete removal to a beautiful outdoor dining space.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Kerstin's Rünnen Patio",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/kerstin-runnen-patio/hero-collage.jpg',
}

const IMG = '/case-studies/kerstin-runnen-patio'

export default function KerstinRunnenPatioPage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter} currentHref="/case-studies/kerstin-runnen-patio">
      {/* ── The Brief ──────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Brief
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        From bumpy roots and concrete to a family dinner patio!
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        My brother Fynn and I built this 8x8 Rünnen patio for our neighbor Kerstin, who we met on Nextdoor. The backyard corner was rough — bumpy tree roots, protruding concrete piles from a bygone structure, and soil that wasn&apos;t going to support anything level without serious prep work.
      </p>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Kerstin wanted a clean, flat surface to put a table on and eat dinner with her family outside. Simple goal — but getting there meant building it right from the ground up.
      </p>

      <div className="flex justify-center my-10">
        <div className="relative w-full max-w-[405px] aspect-[9/16] rounded-sm shadow-xl border-8 border-white overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/GfxRW6N5gI0"
            title="Kerstin's Rünnen Patio — CF Design build timelapse"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>

      {/* ── The Build ──────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Excavation
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The first step was digging out a large square hole to give us space for the base substrate. If you put pavers or tiles directly on soil, it&apos;s just one rainy season away from squiffy. We hauled out 7 massive concrete piles and removed over 60 cubic feet of seriously tough earth.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/layout-string-lines.jpg`}
            alt="Cal and Fynn measuring and laying out the patio area with string lines in the excavated earth"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/excavation-fynn-wheelbarrow.jpg`}
            alt="Fynn sitting in the excavated area with a wheelbarrow and pile of removed soil behind him"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/concrete-piles-removed.jpg`}
          alt="Seven massive concrete piles hauled out of the ground and stacked by the fence"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The frame
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Once we had the area leveled and evenly compacted, we installed the outer pressure-treated lumber frame and secured it with 8 rebar stakes, each driven two feet into the ground. The frame gives us an easy way to flatten the layers of soil, gravel, and bedding sand — and it acts as a barrier to keep the patio tiles from spreading out over time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/lumber-frame-thumbs-up.jpg`}
            alt="Thumbs up with the pressure-treated lumber frame installed and secured with rebar stakes"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/fynn-securing-frame.jpg`}
            alt="Fynn with safety glasses and drill, securing the lumber frame corner"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Gravel and sand
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Next we added 3 inches of crushed aggregate — this allows water to drain easily and won&apos;t expand or contract at different moisture levels, which would cause the patio to become uneven over time. We compacted the gravel and screeded an inch of bedding sand using a jig we made — the sand gives a nice even surface for the tiles to sink into while allowing rainfall to drain into the ground.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/compacting-crushed-aggregate.jpg`}
            alt="Cal compacting crushed aggregate inside the lumber frame with a hand tamper"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/screeding-bedding-sand.jpg`}
            alt="Cal and Fynn screeding bedding sand level across the frame using a custom jig"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Placing the tiles
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Finally we began placing the Rünnen tiles — Fynn was on placing duty while I trimmed and cut tiles on our table saw for a perfect fit. To finish it off we compacted the tiles into the sand with the tamper, placing a piece of cardboard between the tamper and tiles so as not to damage them. Then we hosed it off and took some pictures.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/placing-runnen-tiles.jpg`}
          alt="Cal and Fynn placing Rünnen deck tiles onto the leveled bedding sand"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* ── Built to Last ──────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Built to Last
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        A patio is only as good as what&apos;s underneath it. Here&apos;s why this one will stay level:
      </p>
      <ul className="text-lg text-arch-charcoal/80 leading-relaxed font-light mb-6 list-disc pl-6 space-y-2">
        <li>Pressure-treated lumber frame secured with <strong className="font-semibold text-arch-black">8 rebar stakes</strong>, each driven <strong className="font-semibold text-arch-black">2 feet</strong> into the ground</li>
        <li><strong className="font-semibold text-arch-black">3 inches of crushed aggregate</strong> for drainage — won&apos;t expand or contract with moisture</li>
        <li><strong className="font-semibold text-arch-black">1 inch of bedding sand</strong>, screeded flat with a custom jig</li>
        <li>Tiles compacted into the sand with a tamper for a <strong className="font-semibold text-arch-black">firm, even surface</strong></li>
        <li>Over <strong className="font-semibold text-arch-black">60 cubic feet of earth</strong> and <strong className="font-semibold text-arch-black">7 concrete piles</strong> removed before any building began</li>
      </ul>

      {/* ── The Result ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The finished 8x8 Rünnen patio — ready for a table, some chairs, and family dinners outside.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/finished-patio-fynn.jpg`}
          alt="Fynn posing with the completed 8x8 Rünnen tile patio in Kerstin's backyard"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          From bumpy roots and protruding concrete to a beautiful patio to eat dinner with the family on — that&apos;s the kind of transformation we love.
        </p>
      </blockquote>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/finished-patio-selfie.jpg`}
          alt="Cal and Fynn selfie with the completed Rünnen patio"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

    </CaseStudyLayout>
  )
}
