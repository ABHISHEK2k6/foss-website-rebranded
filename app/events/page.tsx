import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActivityListing from '@/components/ActivityListing';
import { getActivitiesFromApi } from '@/lib/fetchActivities';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Seminars, meetups, and community gatherings hosted by FOSS UCEK.',
};

export const revalidate = 60;

export default async function EventsPage() {
  const events = await getActivitiesFromApi('/api/events');

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      <div className="relative pt-28 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Events
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Seminars, meetups, and community gatherings
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <ActivityListing
          activities={events}
          emptyIcon={
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
          emptyText="Upcoming events, seminars, and meetup information will be posted here."
        />
      </div>

      <Footer />
    </div>
  );
}
