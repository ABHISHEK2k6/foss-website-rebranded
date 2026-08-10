import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActivityListing from '@/components/ActivityListing';
import { getActivitiesFromApi } from '@/lib/fetchActivities';

export const revalidate = 60;

export default async function OnlineSessionsPage() {
  const sessions = await getActivitiesFromApi('/api/online-sessions');

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      <div className="relative pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Online Sessions
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Webinars and virtual sessions you can join from anywhere
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ActivityListing
          activities={sessions}
          emptyIcon={
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          }
          emptyText="Webinars and virtual workshop details will be available here soon."
        />
      </div>

      <Footer />
    </div>
  );
}
