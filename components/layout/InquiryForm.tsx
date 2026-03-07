'use client'
import { useState } from 'react'
import { MapPin } from '@/components/ui/Icons'

export default function InquiryForm() {
  const [nearPaloAlto, setNearPaloAlto] = useState<string | null>(null)
  const [phone, setPhone] = useState('')

  const formatPhone = (val: string, prev: string) => {
    const d = val.replace(/\D/g, '').slice(0, 10)
    const deleting = val.length < prev.length
    if (!d.length) return ''
    if (d.length <= 3) return deleting ? `(${d}` : `(${d})`
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  }

  return (
    <div className="container mx-auto px-6 py-20 md:py-32 text-white relative">
      {/* Mobile header */}
      <div className="lg:hidden mb-4">
        <h2 className="text-xs font-bold tracking-[0.25em] text-arch-stone uppercase mb-8">CF Design</h2>
        <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Get Solutions.</h3>
        <p className="text-arch-stone/60 mb-4 leading-relaxed font-light text-sm">Once submitted, Cal or Fynn will send you a quick text message within 24 hours :)</p>
        <p className="text-arch-stone/60 mb-4 leading-relaxed font-light text-sm">We can't meet with everyone who reaches out but we will always point you in the right direction.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-16 md:gap-20">
        {/* Left column */}
        <div className="lg:w-1/3 order-2 lg:order-1">
          <div className="hidden lg:block">
            <h2 className="text-xs font-bold tracking-[0.25em] text-arch-stone uppercase mb-8">CF Design</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Get Solutions.</h3>
            <p className="text-arch-stone/60 mb-12 leading-relaxed font-light text-sm md:text-base">Once submitted, Cal or Fynn will send you a quick text message within 24 hours :)</p>
            <p className="text-arch-stone/60 mb-12 leading-relaxed font-light text-sm md:text-base">We only use your information to contact you directly. We never share information.</p>
          </div>
          <div className="space-y-6 text-arch-stone">
            <div className="flex items-center gap-4"><MapPin className="w-5 h-5 text-white" /><span>Serving San Mateo &amp; Santa Clara County</span></div>
          </div>
        </div>
        {/* Right column — form */}
        <div className="lg:w-2/3 order-1 lg:order-2">
          <form className="space-y-12" action="https://formspree.io/f/mpqlvore" method="POST">
            <input type="hidden" name="_next" value="https://cf.design/thank-you" />
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">Name</label>
              <input type="text" name="name" required className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif" placeholder="Your name" />
            </div>
            <div className="border-b border-white/20 pb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-6">Are you within 30 minutes of Palo Alto?</label>
              <div className="flex flex-wrap gap-8">
                {['Yes', 'No'].map(opt => (
                  <label key={opt} className="flex items-center cursor-pointer gap-3" onClick={() => setNearPaloAlto(opt)}>
                    <input type="radio" name="near_palo_alto" value={opt} required className="hidden" />
                    <div className="w-5 h-5 border border-white/50 rounded-full flex items-center justify-center">
                      <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${nearPaloAlto === opt ? 'scale-100' : 'scale-0'}`}></div>
                    </div>
                    <span className="text-lg font-serif">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value, phone))}
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif"
                  placeholder="(650) 123-4567"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">How did you hear about us?</label>
                <select
                  name="referral_source"
                  required
                  defaultValue=""
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif appearance-none cursor-pointer"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23E5E4E2' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
                >
                  <option value="" disabled style={{ color: '#999' }}>Select one</option>
                  <option value="Builder_Referral">Builder Referral</option>
                  <option value="Homeowner_Referral">Homeowner Referral</option>
                  <option value="Google">Google</option>
                  <option value="Nextdoor">Nextdoor</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Mail_Brochure">Mail Brochure</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="group">
              <label className="block text-xs font-bold uppercase tracking-widest text-arch-stone mb-4">
                Project Notes <span className="normal-case tracking-normal font-normal text-arch-stone/40 italic">(brief is fine)</span>
              </label>
              <textarea rows={2} name="project_notes" className="w-full bg-transparent border-b border-white/20 py-2 focus:border-white outline-none transition-colors text-lg font-serif" placeholder="two garden boxes and a stuck gate repair"></textarea>
            </div>
            <button type="submit" className="bg-white text-arch-black px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-arch-stone transition-colors w-full md:w-auto">Submit Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  )
}
