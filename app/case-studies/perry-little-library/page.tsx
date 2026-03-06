import type { Metadata } from 'next'
import Image from 'next/image'
import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import type { CaseStudyFrontmatter } from '@/components/case-studies/CaseStudyLayout'

export const metadata: Metadata = {
  title: "Perry's Double-Decker Little Library — CF Design Case Study",
  description:
    'A custom redwood little library with two levels, a dog treat box, and push-to-open doors — built by CF Design for a Palo Alto neighborhood.',
}

const frontmatter: CaseStudyFrontmatter = {
  title: "Perry's Double-Decker Little Library",
  date: '2025',
  location: 'Palo Alto, CA',
  heroImage: '/case-studies/perry-little-library/hero-collage.jpg',
  heroObjectPosition: 'center 35%',
  heroSaturationBoost: 1.8,
  heroSaturationOpacity: 0.3,
}

const IMG = '/case-studies/perry-little-library'

export default function PerryLittleLibraryPage() {
  return (
    <CaseStudyLayout frontmatter={frontmatter}>
      {/* ── A Returning Client ────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> A Returning Client
      </h2>
      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        From irrigation box to community landmark
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        My brother Fynn and I first met Perry earlier in 2025 when he reached out about a new redwood irrigation box. We got it built and he loved it — so a few months later, we were back on-site for something much bigger.
      </p>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Perry wanted to build a gathering point for his community on Cowper Street, just across from Hoover Park. The vision: a little library with treats for dogs, books for kids, and books for adults. A place where neighbors pause, connect, and share.
      </p>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The best part — Perry already trusted our quality from the first project and gave us full creative flexibility to bring this build to life.
      </p>

      {/* ── The Build ─────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Build
      </h2>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The core
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The heart of the library is an A-grade plywood core reinforced with 18 steel brackets and over 120 screws. Some might call it overkill — we call it solid.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0139.JPG`}
            alt="A-grade plywood core panels joined with steel brackets and screws"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0141.JPG`}
            alt="Plywood library box structure being inspected for square"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The base
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The pressure-treated post sits over two feet into the ground, set in concrete sloped away from the base to prevent water pooling. The base itself is built from redwood 2x6s and 2x4s with another six steel brackets for rock-solid stability.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0138.JPG`}
          alt="Redwood base and post assembly reinforced with steel brackets"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Redwood exterior
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        We clad the plywood core in beautiful redwood — hand-sanded up to 320 grit and finished with teak oil for weathering and color protection. The tongue-and-groove trim pieces were custom-milled to wrap the structure cleanly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0145.JPG`}
            alt="Custom-milled redwood tongue-and-groove trim pieces"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0146.JPG`}
            alt="Library body with redwood framing over plywood core"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The doors
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Each level gets its own redwood-framed door with a push-to-open magnet closure — easy for kids and adults to open with one hand.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0147.JPG`}
            alt="Redwood door frame being assembled and glued on the workbench"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0149.JPG`}
            alt="Two completed redwood door panels with plexiglass windows"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The treat box
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        A custom redwood treat box with stainless steel hinges and a clasp latch — mounted on the post for neighborhood dogs to enjoy.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0113.JPG`}
            alt="Custom redwood treat box with stainless steel hinges and clasp latch"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[4/3] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/IMG_0114.JPG`}
            alt="Treat box opened to show the latch mechanism and interior"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        The roof
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Layered redwood slats with a rougher finish overhang the front and sides by 4.5 inches — keeping the contents dry while giving the library its signature silhouette.
      </p>

      {/* ── Built to Last ─────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> Built to Last
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Every detail on this build was chosen for longevity:
      </p>
      <ul className="text-lg text-arch-charcoal/80 leading-relaxed font-light mb-6 list-disc pl-6 space-y-2">
        <li>A-grade plywood core held together by <strong className="font-semibold text-arch-black">18 steel brackets</strong> and over <strong className="font-semibold text-arch-black">120 screws</strong></li>
        <li>Redwood exterior sanded up to <strong className="font-semibold text-arch-black">320 grit</strong> and finished with teak oil for weather and UV protection</li>
        <li>Pressure-treated post over <strong className="font-semibold text-arch-black">2 feet into the ground</strong> with concrete sloped away from the base</li>
        <li>All exterior finishing nails are <strong className="font-semibold text-arch-black">stainless steel</strong> — not galvanized — to prevent iron-tannate streaking over time</li>
        <li>The entire structure is sealed with wood glue and caulking — <strong className="font-semibold text-arch-black">rigid and waterproof</strong></li>
      </ul>

      {/* ── The Result ────────────────────────────────── */}
      <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mt-16 mb-6 flex items-center gap-3">
        <span className="w-8 h-[1px] bg-arch-mineral" /> The Result
      </h2>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        The finished library before heading to its new home on Cowper Street — two levels, two doors, a treat box, and a layered redwood roof.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0163.JPG`}
          alt="Nearly complete little library before installation — front view showing both levels and roof"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <blockquote className="my-16 -mx-6 md:-mx-12 bg-arch-black text-white py-16 px-8 md:px-16 rounded-sm text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed font-serif italic">
          With two levels — lower for kids and upper for adults — a push-to-open magnet system, and a treat box for dogs, there aren&apos;t many little libraries like this in Palo Alto. Dare I say, the Bay Area.
        </p>
      </blockquote>

      <h3 className="text-2xl md:text-3xl font-serif text-arch-black mt-10 mb-4 leading-tight">
        Installed on Cowper Street
      </h3>
      <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light mb-6">
        Does your dog want a treat? Does your kiddo want to exchange a book? Just across from Hoover Park — come say hello.
      </p>
      <div className="relative aspect-[4/3] w-full rounded-sm shadow-xl border-8 border-white my-10 overflow-hidden shimmer-bg">
        <Image
          src={`${IMG}/IMG_0166.JPG`}
          alt="Fynn posing with the installed little library on Cowper Street in Palo Alto"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
        <div className="relative aspect-[3/4] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/screenshot-install-2.png`}
            alt="Fynn standing next to the installed double-decker little library"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
        <div className="relative aspect-[3/4] rounded-sm shadow-xl border-8 border-white overflow-hidden shimmer-bg">
          <Image
            src={`${IMG}/screenshot-install-3.png`}
            alt="Side view of the installed library showing the layered redwood roof overhang"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 384px"
          />
        </div>
      </div>
    </CaseStudyLayout>
  )
}
