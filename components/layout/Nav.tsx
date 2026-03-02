'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from '@/components/ui/Icons'
import { CASE_STUDIES } from '@/data/case-studies'

interface NavProps {
  onInquiry: () => void
}

export default function Nav({ onInquiry }: NavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [csOpen, setCsOpen] = useState(false)
  const [mobileCsOpen, setMobileCsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }} className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-arch-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          {pathname === '/' ? (
            <span onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-serif text-lg tracking-wide font-bold text-white cursor-pointer">cf.design</span>
          ) : (
            <Link href="/" className="font-serif text-lg tracking-wide font-bold text-white">cf.design</Link>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Purpose', 'Process', 'Portfolio', 'Reviews', 'FAQ'].map((item) => (
            <Link key={item} href={`/#${item.toLowerCase()}`} className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors text-white/80 hover:text-white">{item}</Link>
          ))}
          <div className="relative" onMouseEnter={() => setCsOpen(true)} onMouseLeave={() => setCsOpen(false)}>
            <button className="text-xs font-semibold tracking-[0.2em] uppercase transition-colors text-white/80 hover:text-white flex items-center gap-1 cursor-pointer pb-2 -mb-2">
              Case Studies <ChevronDown className="w-3 h-3 transition-transform" style={csOpen ? { transform: 'rotate(180deg)' } : undefined} />
            </button>
            {csOpen && (
              <div className="absolute top-full right-0 pt-2">
                <div className="bg-arch-black/95 backdrop-blur-md border border-white/10 py-2 min-w-[310px]">
                  {CASE_STUDIES.map((cs) => (
                    <Link key={cs.href} href={cs.href} className="block px-4 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-white/70 hover:text-white hover:bg-white/10 transition-colors" onClick={() => setCsOpen(false)}>{cs.title}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={onInquiry} className="px-6 py-2.5 rounded-sm text-xs font-bold tracking-[0.15em] uppercase border transition-all border-white text-white hover:bg-white hover:text-arch-black cursor-pointer">Start Project</button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col space-y-4 md:hidden border-t border-gray-100">
          {['Purpose', 'Process', 'Portfolio', 'Reviews', 'FAQ'].map((item) => (
            <Link key={item} href={`/#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-lg font-serif text-arch-charcoal border-b border-gray-100 pb-3">{item}</Link>
          ))}
          <div>
            <button onClick={() => setMobileCsOpen(!mobileCsOpen)} className="flex items-center justify-between w-full text-lg font-serif text-arch-charcoal border-b border-gray-100 pb-3 cursor-pointer">
              Case Studies <ChevronDown className="w-4 h-4 transition-transform" style={mobileCsOpen ? { transform: 'rotate(180deg)' } : undefined} />
            </button>
            {mobileCsOpen && (
              <div className="flex flex-col space-y-3 pt-3">
                {CASE_STUDIES.map((cs) => (
                  <Link key={cs.href} href={cs.href} className="text-base font-serif text-arch-mineral border-b border-gray-100 pb-3 pl-4">{cs.title}</Link>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => { setIsOpen(false); onInquiry() }} className="text-lg font-serif text-arch-charcoal border-b border-gray-100 pb-3 text-left cursor-pointer">Inquiries</button>
        </div>
      )}
    </nav>
  )
}
