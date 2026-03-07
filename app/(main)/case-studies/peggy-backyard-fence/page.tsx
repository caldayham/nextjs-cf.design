import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Peggy's Backyard Dog Fence — CF Design Case Study",
  description:
    'A sturdy redwood backyard fence built in two days — including tree removal, post setting, and a custom gate — for a Palo Alto neighbor\'s dog.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Peggy's Backyard Dog Fence",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/peggy-backyard-fence/peggy-standing-by-gate-full-view.JPG',
  heroSaturationBoost: 1.8,
  heroSaturationOpacity: 0.3,
}

const IMG = '/case-studies/peggy-backyard-fence'

export default function PeggyBackyardFencePage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter} currentHref="/case-studies/peggy-backyard-fence">
      {/* ── The Brief ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Brief
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        A solid fence for our neighbor Peggy
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Our Nextdoor neighbor Peggy needed a fence for her dog — simple as that. My brother Fynn and I got it done in two days, and while we were at it, we removed two medium-sized trees that she needed gone and fixed an old gate hinge.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/backyard-before-trees-and-old-fence.JPG`} alt="Peggy's backyard before — old fence, overgrown trees, and bare dirt" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      {/* ── The Build ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Clearing the site
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Before we could start on the fence, two trees had to come down. We brought them down starting with the outer branches and worked our way down then hauled everything — branches, trunk sections, and debris - to shoreway environmental center for greenwaste composting.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/fynn-chainsawing-tree-removal.JPG`} alt="Fynn chainsawing a tree trunk in the backyard" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/tree-stump-after-removal.JPG`} alt="Tree stump remaining after chainsaw removal" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/fynn-unloading-branches-at-disposal.JPG`} alt="Fynn unloading branches from the car at the disposal facility" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/fynn-hauling-debris-at-disposal.JPG`} alt="Fynn hauling tree debris at the green waste disposal facility" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Layout and excavation
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Safety first — we called 811 (USA North before-you-dig) to get a full utility report before ever breaking ground. Once cleared, we ran a string line to map the fence run and excavated each post hole down to two feet for a four-foot fence — half the exposed height, which is what keeps a fence from wobbling.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/laying-string-line-for-fence-layout.JPG`} alt="String line laid out along the fence run with kicker board on the ground" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/post-hole-digger-tools.JPG`} alt="Post hole digger tools leaning against the house" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Setting the posts
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Before setting each post we controlled for four axes of movement — up and down, left and right, forward and back, and the rotation of the post along its vertical axis. Without getting all four right, the fence will inevitably look crooked or develop gate problems down the road. Once plumb and aligned to the string line, each post was set in concrete sloped away from the base to prevent water pooling.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/fence-posts-set-in-ground.JPG`} alt="Fence posts set in the ground with concrete bag visible" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/posts-aligned-with-string-line.JPG`} alt="Multiple posts aligned perfectly to the string line" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Rails and pickets
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        With the posts set, we attached the kicker boards, horizontal rails, and then the redwood pickets. Fasteners are hidden behind trim, cuts are perpendicular, and nothing warps the fence when secured in place.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-attaching-rails-to-posts.JPG`} alt="Cal attaching horizontal rails between the fence posts" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-securing-rail-framework.JPG`} alt="Cal securing the rail framework from the opposite angle" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/cal-attaching-redwood-pickets.JPG`} alt="Cal attaching redwood pickets to the fence frame" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      {/* ── Built to Last ────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Built to Last
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        What makes a fence installation quality? Eight things:
      </p>
      <ul className="text-lg text-arch-charcoal/80 leading-relaxed font-light mb-6 list-disc pl-6 space-y-2">
        <li><strong className="font-semibold text-arch-black">Safety</strong> — 811 utility check before any excavation</li>
        <li><strong className="font-semibold text-arch-black">Materials</strong> — redwood for natural rot and insect resistance, pressure-treated lumber where it counts</li>
        <li><strong className="font-semibold text-arch-black">Post depth</strong> — 2 feet into the ground for a 4-foot fence</li>
        <li><strong className="font-semibold text-arch-black">Post level and plumb</strong> — controlled for all 4 axes of movement before setting</li>
        <li><strong className="font-semibold text-arch-black">Concrete setting</strong> — sloped away from the base to prevent water pooling and rot</li>
        <li><strong className="font-semibold text-arch-black">Proper attachment</strong> — fasteners hidden behind trim, perpendicular cuts, no visible gaps</li>
        <li><strong className="font-semibold text-arch-black">Gate quality</strong> — kept square and stabilized to support weight without sagging</li>
        <li><strong className="font-semibold text-arch-black">Cleanup</strong> — all excess material hauled to the proper disposal facility</li>
      </ul>

      {/* ── The Result ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Two days, two trees removed, and one beautifully sturdy redwood fence with a custom gate — Peggy&apos;s dog is secure and the yard looks great.
      </p>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          From tree removal to finished fence in two days — efficient, sturdy, and built the right way for a neighbor who trusted us to get it done.
        </p>
      </blockquote>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[3/4] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/peggy-posing-with-finished-fence.JPG`} alt="Peggy posing with the finished redwood fence and gate" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[3/4] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/peggy-with-fence-wider-angle.JPG`} alt="Peggy with the completed fence, wider angle showing the full run" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image src={`${IMG}/peggy-standing-by-gate-full-view.JPG`} alt="Full view of the finished redwood fence and gate with Peggy standing alongside" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-and-fynn-in-car-serious.JPG`} alt="Cal and Fynn in the car after the job — serious faces" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image src={`${IMG}/cal-and-fynn-in-car-smiling.JPG`} alt="Cal and Fynn in the car after the job — all smiles" fill className="object-cover" sizes="(max-width: 640px) 100vw, 384px" />
        </div>
      </div>
    </CaseStudyLayout>
  )
}
