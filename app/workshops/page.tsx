import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActivityListing from '@/components/ActivityListing';
import { getActivitiesFromApi } from '@/lib/fetchActivities';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Hands-on sessions to help you learn and build new skills with FOSS UCEK.',
};

export const revalidate = 60;

export default async function WorkshopsPage() {
  const workshops = await getActivitiesFromApi('/api/workshops');

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      <div className="relative pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Workshops
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Hands-on sessions to help you learn and build new skills
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ActivityListing
          activities={workshops}
          emptyIcon={
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          }
          emptyText="Workshop schedules and registration details will be available here soon."
        />
      </div>

      <Footer />
    </div>
  );
}
