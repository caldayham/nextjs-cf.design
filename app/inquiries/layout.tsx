export const metadata = {
  title: 'Request a Consultation',
  description: 'Get in touch with CF Design for custom construction in the Bay Area.',
}

export default function InquiryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans min-h-screen bg-arch-black/95">
      {children}
    </div>
  )
}
