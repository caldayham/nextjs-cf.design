import Image from 'next/image'
import { Reveal } from '@/components/ui/Reveal'
import { REVIEWS } from '@/data/reviews'

function ReviewCard({ img }: { img: string }) {
  return (
    <div className="w-full mb-6 break-inside-avoid">
      <div className="bg-white p-3 rounded-md border border-arch-stone shadow-sm hover:shadow-md transition-all duration-500">
        <div className="overflow-hidden bg-arch-concrete grayscale-[10%] hover:grayscale-0 transition-all duration-500">
          <Image src={img} alt="Review" width={600} height={400} className="w-full h-auto object-cover mix-blend-multiply opacity-90 hover:opacity-100" loading="lazy" sizes="(min-width: 1024px) 33vw, 100vw" />
        </div>
      </div>
    </div>
  )
}

export default function Reviews() {
  const col1 = REVIEWS.filter((_, i) => i % 3 === 0)
  const col2 = REVIEWS.filter((_, i) => i % 3 === 1)
  const col3 = REVIEWS.filter((_, i) => i % 3 === 2)

  return (
    <section id="reviews" className="py-20 md:py-32 bg-arch-concrete overflow-hidden relative border-t border-arch-stone">
      <div className="container mx-auto px-6 mb-16">
        <Reveal>
          <div className="text-center">
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-arch-black">Wall of Love</h3>
          </div>
        </Reveal>
      </div>

      <div className="relative h-[600px] md:h-[800px] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-arch-concrete to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-arch-concrete to-transparent z-10 pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full max-w-7xl mx-auto px-6">
          <div className="hidden md:block relative h-full overflow-hidden hover-pause">
            <div className="animate-scroll-up w-full">
              {[...col1, ...col1].map((img, i) => <ReviewCard key={`c1-${i}`} img={img} />)}
            </div>
          </div>
          <div className="relative h-full overflow-hidden hover-pause">
            <div className="animate-scroll-down w-full">
              {[...col2, ...col2, ...col2].map((img, i) => <ReviewCard key={`c2-${i}`} img={img} />)}
            </div>
          </div>
          <div className="hidden lg:block relative h-full overflow-hidden hover-pause">
            <div className="animate-scroll-up w-full">
              {[...col3, ...col3].map((img, i) => <ReviewCard key={`c3-${i}`} img={img} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
