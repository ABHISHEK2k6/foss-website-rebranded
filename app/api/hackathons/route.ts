import { NextResponse } from 'next/server';
import { fetchActivitiesByType } from '@/lib/activities';

// Was force-dynamic + no-store, forcing a fresh Google Sheets round-trip on
// every request. A short revalidation window lets Next cache and serve
// near-instantly instead.
export const revalidate = 60;

export async function GET() {
  try {
    const hackathons = await fetchActivitiesByType('Hackathons');

    return NextResponse.json(
      { success: true, data: hackathons },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching hackathons:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hackathons' },
      { status: 500 }
    );
  }
}
