import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import SiteShell from '@/components/layout/SiteShell'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cf.design'),
  title: {
    default: 'CF Design — Custom Construction in the Bay Area',
    template: '%s | CF Design',
  },
  description: 'Constructing beautiful solutions in San Mateo & Santa Clara County.',
  icons: { icon: '/assets/cf-icon.png' },
  openGraph: {
    siteName: 'CF Design',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/assets/cal-fynn-build.jpg', width: 1200, height: 630, alt: 'CF Design' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${playfair.variable}`}>
      <body className="antialiased overflow-x-hidden selection:bg-arch-mineral selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
      <GoogleAnalytics gaId="G-DNSCN01BPT" />
    </html>
  )
}
