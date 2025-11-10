import './globals.css';

export const metadata = {
  title: 'FOSS UCEK',
  description: 'Free and Open Source Software - University College of Engineering Kariyavattom',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="overflow-x-hidden w-full max-w-full relative">
        {/* Global Background Image */}
        <div 
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-black to-gray-800 z-[-20]"
          style={{
            backgroundImage: "url('/galaxy.jpg')",
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Global Overlay Video with subtle black and white effect */}
        <video
          className="fixed inset-0 w-full h-full object-cover z-[-10]"
          style={{
            opacity: 0.4,
            filter: 'grayscale(100%) contrast(1.2) brightness(0.8)',
            mixBlendMode: 'screen'
          }}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        >
          <source src="/overlay.mp4" type="video/mp4" />
        </video>
        
        {/* Main Content with controlled scrolling */}
        <div 
          className="relative z-10 w-full max-w-full min-h-screen"
          style={{
            overscrollBehaviorY: 'contain'
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
