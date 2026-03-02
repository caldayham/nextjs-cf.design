// Server Component — no 'use client' needed
import { MapPin, Mail, Instagram, Home } from '@/components/ui/Icons'

export default function Footer() {
  return (
    <footer className="bg-arch-black text-arch-stone/40 py-12 border-t border-white/10 text-xs tracking-widest uppercase px-6">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <MapPin className="w-3.5 h-3.5" />
          <span>Serving San Mateo &amp; Santa Clara County</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3">
            <a href="sms:+16505217269&body=I'm%20interested%20in%20" className="flex items-center gap-2 hover:text-white transition-colors">
              <span>Text: (650) 521-7269</span>
            </a>
            <a href="mailto:info@cf.design" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /><span>info@cf.design</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            <a href="https://www.instagram.com/cf.design__/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Instagram className="w-3.5 h-3.5" /><span>@cf.design__</span>
            </a>
            <a href="https://nextdoor.com/page/cf-design" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" /><span>Nextdoor</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <span>© 2026 Cal and Fynn Design Services</span>
          <div className="flex gap-4">
            <img src="/assets/cf-icon.png" className="h-6 opacity-50 grayscale" alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}
