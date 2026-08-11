import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';

const siteUrl = 'https://foss.uck.ac.in';
const siteName = 'FOSS UCEK';
const siteDescription = 'Free and Open Source Software - University College of Engineering Kariyavattom. Hackathons, workshops, events, and online sessions from the FOSS club at UCEK.';
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'FOSS UCEK',
    'Free and Open Source Software',
    'University College of Engineering Kariyavattom',
    'UCEK',
    'open source club',
    'hackathons',
    'workshops',
    'tech community Kerala',
    'FOSS club',
  ],
  authors: [{ name: siteName }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: '/',
    siteName,
    images: [{ url: '/logo.png', width: 1024, height: 1024, alt: `${siteName} Logo` }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteName,
    description: siteDescription,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Next.js's App Router expects `viewport` as an object matching its `Viewport`
// type — a raw string here doesn't produce a valid <meta name="viewport"> tag.
// Deliberately not setting maximumScale/userScalable: locking pinch-zoom is
// known to interfere with touch gesture handling (scroll included) on some
// mobile browsers/emulators, which is worse than just leaving zoom enabled.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden w-full max-w-full relative">
        {/* Global Background Image — pointer-events-none so it can never intercept
            touch/drag gestures meant for scrolling the real content above it */}
        <div
          className="fixed inset-0 w-full h-full bg-linear-to-br from-gray-900 via-black to-gray-800 -z-20 pointer-events-none"
          style={{
            backgroundImage: "url('/galaxy.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />

        {/* Global Overlay Video — pointer-events-none is important here specifically:
            <video> elements have their own native touch-gesture handling in some
            browsers even without visible controls, which can swallow a touch-drag
            as a media gesture instead of letting it bubble up as a page scroll. */}
        <video
          className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          style={{
            opacity: 0.4,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'screen'
          }}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        >
          <source src="/overlay.mp4" type="video/mp4" />
        </video>
        
        {/* Main Content */}
        <div className="relative z-10 w-full max-w-full min-h-screen">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
