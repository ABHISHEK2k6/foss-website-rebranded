import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActivityListing from '@/components/ActivityListing';
import { getActivitiesFromApi } from '@/lib/fetchActivities';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hackathons',
  description: 'Build, compete, and ship something great with the FOSS UCEK community.',
};

export const revalidate = 60;

export default async function HackathonsPage() {
  const hackathons = await getActivitiesFromApi('/api/hackathons');

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      <div className="relative pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Hackathons
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Build, compete, and ship something great with the community
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ActivityListing
          activities={hackathons}
          emptyIcon={
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          emptyText="Hackathon information and upcoming events will be posted here soon."
        />
      </div>

      <Footer />
    </div>
  );
}
