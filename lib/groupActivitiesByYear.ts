import { Activity } from '@/types/activity';

// Groups by the year of (endDate || startDate), most recent year first.
export function groupActivitiesByYear(activities: Activity[]): [number, Activity[]][] {
  const map = new Map<number, Activity[]>();

  for (const activity of activities) {
    const dateStr = activity.endDate || activity.startDate;
    const parsed = dateStr ? new Date(dateStr) : null;
    const year = parsed && !isNaN(parsed.getTime()) ? parsed.getFullYear() : new Date().getFullYear();

    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(activity);
  }

  return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
}
