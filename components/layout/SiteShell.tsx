'use client'
import { useState, useEffect, Suspense } from 'react'
import { ShellContext } from '@/context/ShellContext'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import InquiryModal from '@/components/layout/InquiryModal'
import InquiryUrlWatcher from '@/components/layout/InquiryUrlWatcher'

interface SiteShellProps {
  children: React.ReactNode
}

export default function SiteShell({ children }: SiteShellProps) {
  const [showInquiry, setShowInquiry] = useState(false)
  const openInquiry = () => setShowInquiry(true)
  const closeInquiry = () => setShowInquiry(false)

  useEffect(() => {
    if (showInquiry) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showInquiry])

  return (
    <ShellContext.Provider value={{ openInquiry }}>
      <div className="font-sans text-arch-charcoal bg-arch-concrete">
        <Nav onInquiry={openInquiry} />
        {children}
        <Suspense fallback={null}>
          <InquiryUrlWatcher onInquiry={openInquiry} />
        </Suspense>
        <InquiryModal isOpen={showInquiry} onClose={closeInquiry} />
        <Footer />
      </div>
    </ShellContext.Provider>
  )
}
