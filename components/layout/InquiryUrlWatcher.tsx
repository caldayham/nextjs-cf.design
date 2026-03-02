'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

interface InquiryUrlWatcherProps {
  onInquiry: () => void
}

export default function InquiryUrlWatcher({ onInquiry }: InquiryUrlWatcherProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.has('inquire')) {
      onInquiry()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Run only on mount — matches source's useState lazy initializer

  return null
}
