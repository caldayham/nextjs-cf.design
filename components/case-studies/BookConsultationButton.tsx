'use client'
import { useShell } from '@/context/ShellContext'

export default function BookConsultationButton() {
  const { openInquiry } = useShell()
  return (
    <button
      onClick={openInquiry}
      className="inline-block bg-arch-black text-white px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-arch-charcoal transition-colors cursor-pointer"
    >
      Book Consultation
    </button>
  )
}
