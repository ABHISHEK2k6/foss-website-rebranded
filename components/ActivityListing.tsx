import ActivityCard from './ActivityCard';
import { Activity } from '@/types/activity';
import { groupActivitiesByYear } from '@/lib/groupActivitiesByYear';

interface ActivityListingProps {
  activities: Activity[];
  emptyIcon: React.ReactNode;
  emptyText: string;
}

export default function ActivityListing({ activities, emptyIcon, emptyText }: ActivityListingProps) {
  const grouped = groupActivitiesByYear(activities);

  if (grouped.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center min-h-[40vh] text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white/10 mb-6">
          {emptyIcon}
        </div>
        <h2 className="text-2xl font-semibold mb-3 text-gray-300">No Content Yet</h2>
        <p className="text-gray-400 max-w-md">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {grouped.map(([year, items], groupIndex) => (
        <section key={year}>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200 border-b border-white/10 pb-3">
            {year}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((activity, index) => (
              <ActivityCard
                key={`${activity.title}-${index}`}
                activity={activity}
                index={index}
                priority={groupIndex === 0 && index < 4}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
