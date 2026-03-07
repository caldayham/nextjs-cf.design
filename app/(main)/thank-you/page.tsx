import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your inquiry. Cal or Fynn will reach out within 24 hours.',
  openGraph: {
    title: 'Thank You',
    description: 'Thank you for your inquiry. Cal or Fynn will reach out within 24 hours.',
    url: 'https://cf.design/thank-you/',
    images: [{ url: '/assets/cal-fynn-outdoor-design.jpg', width: 800, height: 600, alt: 'Cal and Fynn' }],
    type: 'website',
  },
}

export default function ThankYouPage() {
  return (
    <div className="font-sans text-arch-stone bg-arch-black h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 md:mb-10">Thank You!</h1>
      <div className="w-full max-w-md md:max-w-lg overflow-hidden mb-6 md:mb-10">
        <Image
          src="/assets/cal-fynn-outdoor-design.jpg"
          alt="Cal and Fynn"
          width={800}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      <p className="text-arch-stone/70 text-xs md:text-base leading-relaxed font-light mb-8 md:mb-12 max-w-lg mx-auto text-center">
        Cal or Fynn will reach out to you via text message within 24 hours to learn more about your project and schedule your free consultation!
      </p>
      <Link href="/" className="inline-block px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] border border-white text-white hover:bg-white hover:text-arch-black transition-all">
        Back to website
      </Link>
    </div>
  )
}
