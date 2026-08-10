import { Activity } from '@/types/activity';

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_BASE_URL || (
    process.env.NODE_ENV === 'production'
      ? (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://foss-website-rebranded.vercel.app')
      : 'http://localhost:3000'
  );
}

export async function getActivitiesFromApi(endpoint: string): Promise<Activity[]> {
  try {
    // Matches the 60s window on the API routes themselves, so a page visit
    // doesn't force its own fresh round-trip on top of what they already cache.
    const response = await fetch(`${getBaseUrl()}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${endpoint}:`, response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}
