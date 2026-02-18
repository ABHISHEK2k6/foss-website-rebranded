import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EventsPage() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Events
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-300">No Content Yet</h2>
            <p className="text-gray-400 max-w-md">
              Upcoming events, seminars, and meetup information will be posted here.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
