import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import type { Viewport } from 'next';

export const metadata = {
  title: 'FOSS UCEK',
  description: 'Free and Open Source Software - University College of Engineering Kariyavattom',
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
            as a media gesture instead of letting it bubble up as a page scroll.

            TEMPORARILY not autoplaying/looping, as a test: this sits behind many
            backdrop-blur elements (cards, navbar, footer), and every one of them
            has to re-sample whatever's behind it on every single frame the video
            changes — a well-known expensive combination. Freezing it on its first
            frame removes that continuous recompositing cost, to see if that's
            what's causing the scroll jank while other things are animating. */}
        <video
          className="fixed inset-0 w-full h-full object-cover -z-10 pointer-events-none"
          style={{
            opacity: 0.4,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'screen'
          }}
          muted
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
