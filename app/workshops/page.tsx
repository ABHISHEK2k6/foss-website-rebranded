import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WorkshopsPage() {
  return (
    <div className="relative min-h-screen text-white">
      <Navbar />
      
      <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Workshops
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-300">No Content Yet</h2>
            <p className="text-gray-400 max-w-md">
              Workshop schedules and registration details will be available here soon.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
