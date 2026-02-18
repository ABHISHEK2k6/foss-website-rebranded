import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HackathonsPage() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Hackathons
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-300">No Content Yet</h2>
            <p className="text-gray-400 max-w-md">
              Hackathon information and upcoming events will be posted here soon.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
