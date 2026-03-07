'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useShell } from '@/context/ShellContext'
import { Reveal } from '@/components/ui/Reveal'
import { MapPin, ArrowRight, ChevronDown } from '@/components/ui/Icons'
import { VIBE_IMAGES } from '@/data/vibe-images'

const mobileImg = (path: string): string => {
  const parts = path.split('/')
  const filename = parts.pop()!
  return [...parts, 'mobile', filename].join('/')
}

interface HeroVibeCardProps {
  img: string
  onLoad?: () => void
}

const HeroVibeCard = ({ img, onLoad }: HeroVibeCardProps) => (
  <div className="w-full mb-4 break-inside-avoid">
    <div className="rounded-sm overflow-hidden border border-white/10 shadow-lg shimmer-bg-dark">
      <Image
        src={img}
        alt="Life at CF"
        width={600}
        height={800}
        className="w-full h-auto object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
        loading="eager"
        sizes="(min-width: 1280px) 20vw, 33vw"
        onLoad={onLoad}
      />
    </div>
  </div>
)

// Minimum images that must load before animation starts
const MIN_LOADED_BEFORE_ANIMATE = 6

export default function Hero() {
  const { openInquiry } = useShell()
  const col1 = VIBE_IMAGES.slice(0, Math.ceil(VIBE_IMAGES.length / 2))
  const col2 = VIBE_IMAGES.slice(Math.ceil(VIBE_IMAGES.length / 2))
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [stickyBtn, setStickyBtn] = useState(false)
  const [imagesReady, setImagesReady] = useState(false)
  const loadedCount = useRef(0)

  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1
    if (!imagesReady && loadedCount.current >= MIN_LOADED_BEFORE_ANIMATE) {
      setImagesReady(true)
    }
  }, [imagesReady])

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) { setStickyBtn(false); return; }
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      setStickyBtn(rect.bottom < 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); }
  }, [])

  return (
    <section className="relative min-h-screen flex items-stretch bg-arch-black overflow-hidden">

      {/* Sticky mobile CTA */}
      {stickyBtn && (
        <button onClick={openInquiry} style={{ top: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }} className="md:hidden fixed left-4 right-20 z-[60] bg-white text-arch-black py-3 rounded-sm text-xs font-bold tracking-[0.15em] uppercase hover:bg-arch-stone transition-all flex items-center justify-center gap-2 shadow-lg animate-fade-in cursor-pointer">
          Book Consultation
        </button>
      )}

      {/* Mobile: Horizontal image marquee */}
      <div className="lg:hidden absolute top-16 left-0 right-0 z-10 overflow-hidden h-40">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-arch-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-arch-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-arch-black to-transparent z-10 pointer-events-none"></div>
        <div className={`flex gap-3 w-max ${imagesReady ? 'animate-scroll-left' : ''}`}>
          {[...VIBE_IMAGES, ...VIBE_IMAGES].map((img, i) => (
            <div key={`m-${i}`} className="shimmer-bg-dark h-40 w-48 flex-shrink-0 rounded-sm border border-white/10">
              <Image
                src={mobileImg(img)}
                alt=""
                width={192}
                height={160}
                className="h-40 w-48 object-cover rounded-sm flex-shrink-0"
                loading="eager"
                sizes="192px"
                onLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left: Text & CTA */}
      <div className="w-full lg:w-1/2 relative z-20 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-0 pb-12 lg:bg-arch-black">
        <Reveal>
          <div className="max-w-xl mt-10 lg:mt-20 pt-24 lg:pt-0">
            <p className="text-white/70 font-bold tracking-[0.25em] uppercase text-xs md:text-sm mb-2 lg:mb-6 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-white/90" />
              Bay Area, CA
            </p>
            <h1 className="text-[2.7rem] md:text-7xl lg:text-7xl font-serif text-white leading-[1.05] mb-4 lg:mb-8 tracking-tight">
              Quality Carpentry <br />
              <span className="font-light italic text-white/90">Design & Build</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 lg:mb-20 leading-relaxed font-light">
              Two brothers building the custom projects other companies won&apos;t touch!
            </p>
            <div className="flex flex-col items-stretch gap-4 md:w-[400px]">
              <button ref={buttonRef} onClick={openInquiry} className="group bg-white text-arch-black px-10 py-4 rounded-sm text-sm font-bold tracking-[0.15em] uppercase hover:bg-arch-stone transition-all flex items-center justify-center gap-3 shadow-lg cursor-pointer">
                Book Consultation
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-white/40 text-[12px] md:text-[14px] tracking-wide italic ml-1 flex items-center gap-2">
                * Free within 30 minutes of Palo Alto
              </span>
              <a href="#about" className="group border border-white text-white px-10 py-2 mt-4 rounded-sm text-sm font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                Learn More
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Right: Vibe Marquee (Split View) */}
      <div className="hidden lg:flex w-1/2 relative bg-arch-charcoal overflow-hidden h-screen">
        <div className="absolute inset-0 bg-gradient-to-t from-arch-black via-transparent to-arch-black z-10 pointer-events-none opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-arch-black via-transparent to-transparent z-10 pointer-events-none"></div>

        <div className="flex gap-4 p-4 w-full justify-center">
          {/* Column 1 - Scroll Up */}
          <div className="w-1/2 h-full overflow-hidden relative">
            <div className={`w-full space-y-4 ${imagesReady ? 'animate-scroll-up' : ''}`}>
              {[...col1, ...col1, ...col1].map((img, i) => (
                <HeroVibeCard key={`h-c1-${i}`} img={img} onLoad={handleImageLoad} />
              ))}
            </div>
          </div>
          {/* Column 2 - Scroll Down */}
          <div className="w-1/2 h-full overflow-hidden relative">
            <div className={`w-full space-y-4 ${imagesReady ? 'animate-scroll-down' : ''}`}>
              {[...col2, ...col2, ...col2].map((img, i) => (
                <HeroVibeCard key={`h-c2-${i}`} img={img} onLoad={handleImageLoad} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
