import { NextResponse } from 'next/server';
import { fetchActivitiesByType } from '@/lib/activities';

// Was force-dynamic + no-store, forcing a fresh Google Sheets round-trip on
// every request. A short revalidation window lets Next cache and serve
// near-instantly instead.
export const revalidate = 60;

export async function GET() {
  try {
    const workshops = await fetchActivitiesByType('Workshops');

    return NextResponse.json(
      { success: true, data: workshops },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: unknown) {
    console.error('Error fetching workshops:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workshops' },
      { status: 500 }
    );
  }
}
