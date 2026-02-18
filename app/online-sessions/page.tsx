import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OnlineSessionsPage() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Online Sessions
          </h1>
          <div className="mt-12 flex flex-col items-center justify-center min-h-[40vh]">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 mb-6">
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-300">No Content Yet</h2>
            <p className="text-gray-400 max-w-md">
              Webinars and virtual workshop details will be available here soon.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
