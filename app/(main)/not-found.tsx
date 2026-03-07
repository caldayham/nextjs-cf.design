import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-arch-concrete flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-arch-mineral uppercase mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-serif text-arch-black mb-6">Page Not Found</h1>
        <p className="text-arch-charcoal/70 mb-10 font-light">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-3 bg-arch-black text-white px-8 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-arch-charcoal transition-colors">
          Back Home
        </Link>
      </div>
    </div>
  )
}
