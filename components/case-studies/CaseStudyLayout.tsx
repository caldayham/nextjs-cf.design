import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowLeft, MapPin } from '@/components/ui/Icons'

export interface CaseStudyData {
  heroTitle: string
  heroTitleItalic: string
  location: string
  materials: string
  year: string
  heroImage: string
  heroImageAlt: string
  overview: string
  challengeTitle: string
  challengeText: string
  challengeImage: string
  challengeImageAlt: string
  solutionTitle: string
  solutionText: string
  solutionImage: string
  solutionImageAlt: string
  galleryImages: { src: string; alt: string }[]
  quote: string
  quoteAttribution: string
  details: { label: string; value: string }[]
}

export default function CaseStudyLayout({ data }: { data: CaseStudyData }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-arch-black text-white pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container mx-auto px-6">
          <Reveal>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-arch-stone/60 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back Home
            </Link>
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-arch-mineral"></span> Case Study
            </h2>
            <h1 className="text-4xl md:text-6xl font-serif leading-tight mb-6">
              {data.heroTitle} <br /><span className="italic text-white/90">{data.heroTitleItalic}</span>
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-arch-stone/60">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {data.location}</span>
              <span>{data.materials}</span>
              <span>{data.year}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-arch-concrete">
        <div className="container mx-auto px-6 -mt-8">
          <Reveal delay={200}>
            <div className="aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden shadow-xl border-8 border-white relative">
              <Image src={data.heroImage} alt={data.heroImageAlt} fill className="object-cover" sizes="100vw" preload={true} placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28 bg-arch-concrete bg-noise">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-arch-mineral"></span> Overview
              </h2>
              <p className="text-lg md:text-xl text-arch-charcoal/80 leading-relaxed font-light">
                {data.overview}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <Reveal>
                <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-arch-mineral"></span> The Challenge
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-8 leading-tight">
                  {data.challengeTitle}
                </h3>
                <p className="text-arch-charcoal/80 leading-relaxed font-light border-l-2 border-arch-mineral/20 pl-6">
                  {data.challengeText}
                </p>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal delay={200}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-8 border-white relative">
                  <Image src={data.challengeImage} alt={data.challengeImageAlt} fill className="object-cover bg-arch-stone" sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 md:py-28 bg-arch-concrete bg-noise">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
            <div className="lg:w-1/2">
              <Reveal>
                <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-arch-mineral"></span> The Solution
                </h2>
                <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-8 leading-tight">
                  {data.solutionTitle}
                </h3>
                <p className="text-arch-charcoal/80 leading-relaxed font-light border-l-2 border-arch-mineral/20 pl-6">
                  {data.solutionText}
                </p>
              </Reveal>
            </div>
            <div className="lg:w-1/2">
              <Reveal delay={200}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-8 border-white relative">
                  <Image src={data.solutionImage} alt={data.solutionImageAlt} fill className="object-cover bg-arch-stone" sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-12 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-arch-mineral"></span> Gallery
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.galleryImages.map((img, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden border-4 border-white shadow-md relative">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client Quote */}
      <section className="py-20 md:py-28 bg-arch-black text-white">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8">
                &ldquo;{data.quote}&rdquo;
              </p>
              <p className="text-arch-stone text-xs uppercase tracking-widest font-bold">{data.quoteAttribution}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 md:py-28 bg-arch-concrete bg-noise">
        <div className="container mx-auto px-6">
          <Reveal>
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-12 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-arch-mineral"></span> Project Details
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.details.map((detail, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="border-t border-arch-stone pt-4">
                  <p className="text-xs font-bold tracking-[0.2em] text-arch-mineral uppercase mb-2">{detail.label}</p>
                  <p className="text-lg font-serif text-arch-black">{detail.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white border-t border-arch-stone">
        <div className="container mx-auto px-6 text-center">
          <Reveal>
            <h3 className="text-3xl md:text-4xl font-serif text-arch-black mb-6">Have a similar project?</h3>
            <p className="text-arch-charcoal/70 mb-10 font-light max-w-lg mx-auto">We&apos;d love to hear about it. Consultations are free within 30 minutes of Palo Alto.</p>
            <Link href="/?inquire" className="inline-block bg-arch-black text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-arch-charcoal transition-colors">Book Consultation</Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
