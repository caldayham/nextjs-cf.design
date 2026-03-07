'use client'
import { useEffect } from 'react'
import { X } from '@/components/ui/Icons'
import InquiryForm from './InquiryForm'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); onClose() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[70] bg-arch-black/95 backdrop-blur-md overflow-y-auto animate-fade-in-fast">
      <button onClick={onClose} className="fixed top-6 right-6 z-[80] text-white hover:text-arch-stone transition-colors cursor-pointer">
        <X className="w-6 h-6" />
      </button>
      <InquiryForm />
    </div>
  )
}
