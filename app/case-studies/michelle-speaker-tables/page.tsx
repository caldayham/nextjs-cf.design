import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Michelle's Walnut & Marble Tables — CF Design Case Study",
  description:
    'A dead walnut tree and two marble slabs become bespoke twin tables — a birthday surprise built by CF Design in Palo Alto.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Michelle's Walnut & Marble Tables",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/michelle-speaker-tables/IMG_0481.JPG',
  heroSaturationBoost: 1.8,
  heroSaturationOpacity: 0.3,
  heroObjectPosition: 'center 35%',
}

const IMG = '/case-studies/michelle-speaker-tables'

export default function MichelleSpeakerTablesPage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter}>
      {/* ── The Brief ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Brief
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        A dead tree, two marble slabs, and a birthday surprise
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Our neighbor Michelle reached out about building twin tables to hold two marble slabs she already had — and they needed to match her existing walnut cabinet. The twist: these were a surprise birthday gift for her husband. We were all in.
      </p>

      {/* ── Sourcing the Material ─────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Sourcing the Material
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        This was our first time working with walnut for a client. We sourced the lumber from a local yard that specializes in milling dead and dying old-growth trees — giving a fallen walnut a beautiful second life as heirloom furniture.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0307.JPG`}
          alt="Raw walnut lumber sourced from a reclaimed old-growth tree"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* ── The Build ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Milling &amp; laminating
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We started by milling the walnut down to 2-inch strips, then laminated everything together to create thicker boards with enough mass and rigidity for solid table components.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0377.JPG`}
            alt="Walnut lumber milled down to 2-inch strips"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0379.JPG`}
            alt="Laminating walnut strips together with clamps for added thickness"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Cutting to size
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Once the laminated boards cured, we chopped everything down to precise dimensions and sanded each piece. Here&apos;s the full layout — every component for both tables alongside Michelle&apos;s marble slabs, laid out and accounted for.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0384.jpg`}
          alt="All walnut pieces cut to size and laid out symmetrically with the two marble slabs"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0392.JPG`}
          alt="Sanded walnut table components on the workbench — ready for assembly"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Frame assembly
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We assembled the top frames within custom molds to hold the pieces perfectly square and secure while the joinery set.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0443.JPG`}
          alt="Two assembled walnut top frames held secure in custom molds"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Hidden joinery
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Every joint uses pocket-hole fasteners for a clean, hardware-free exterior. We drilled all the pocket holes, then carefully laid out every component before assembly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0448.JPG`}
            alt="All table components with pocket holes drilled, laid out before assembly"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0449.JPG`}
            alt="Close-up of pocket hole joinery in walnut pieces"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Coming together
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        With all the joinery prepped, we rough-assembled the table bases. The underside reveals the hidden pocket-hole system that keeps the exterior perfectly clean.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0460.JPG`}
            alt="Rough-assembled walnut table base with remaining parts"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0464.JPG`}
            alt="Underside of assembled table base showing hidden pocket-hole joinery"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Filling &amp; finishing
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We filled every pocket hole with walnut plugs, then routed and sanded each base until they were glass-smooth.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0469.JPG`}
            alt="Two assembled walnut table bases before filling and sanding"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0470.JPG`}
            alt="Routing and sanding an assembled walnut table base with a Makita router"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0474.JPG`}
          alt="Both walnut table bases side by side — filled, sanded, and ready for stain"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The stain
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Finally, we stained the walnut to bring out the grain. The transformation is dramatic — raw walnut to rich, dark warmth.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0477.JPG`}
          alt="Before and after staining — one table base in raw walnut, the other in rich dark stain"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* ── The Result ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Two matching tables, stained to complement Michelle&apos;s existing walnut cabinet, with her marble slabs set perfectly into the frames. From reclaimed tree to finished furniture — ready for the birthday surprise.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0479.JPG`}
          alt="Both stained walnut table bases gleaming in golden afternoon sunlight"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <div className="relative aspect-[16/9] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0481.JPG`}
          alt="Finished walnut and marble tables on stepping stones in a landscaped garden"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          A dead walnut tree, two marble slabs, and a birthday surprise — transformed into a pair of heirloom tables built to last a lifetime.
        </p>
      </blockquote>

      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0502.JPG`}
          alt="Cal posing with both finished walnut and marble tables at Michelle's home"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
    </CaseStudyLayout>
  )
}
