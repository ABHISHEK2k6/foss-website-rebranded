import { fetchSheetRows, convertDriveLink } from './googleSheets';
import { Activity } from '@/types/activity';

// Single tab "FOSS Activities" fed by one Google Form with an Event Type dropdown
// (Hackathons | Workshops | Events | Online Sessions).
// Columns: A=Timestamp, B=Event Type, C=Email Address, D=Description of the Event,
// E=Start Date, F=End Date, G=Start Time, H=End Time, I=Mode of Event,
// J=Venue or Meeting Link, K=Registration Link, L=Registration Deadline,
// M=Poster or Banner Image Link, N=Title of the Event, O=Status
const RANGE = "'FOSS Activities'!A2:O";

export async function fetchAllActivities(): Promise<Activity[]> {
  const sheetId = process.env.GOOGLE_SHEETS_FOSS_ACTIVITIES_ID;

  if (!sheetId) {
    throw new Error('GOOGLE_SHEETS_FOSS_ACTIVITIES_ID is not configured');
  }

  const rows = await fetchSheetRows(sheetId, RANGE);

  return rows
    .filter((row) => row[13]) // must have a title
    .map((row) => ({
      eventType: row[1] || '',
      title: row[13] || 'Untitled',
      description: row[3] || undefined,
      startDate: row[4] || '',
      endDate: row[5] || undefined,
      startTime: row[6] || undefined,
      endTime: row[7] || undefined,
      mode: row[8] || undefined,
      venue: row[9] || undefined,
      organizerEmail: row[2] || undefined,
      registrationLink: row[10] || undefined,
      registrationDeadline: row[11] || undefined,
      poster: convertDriveLink(row[12] || ''),
      status: row[14] || undefined,
    }))
    // Status blank/anything else = show; Status "FALSE" = hidden by an organizer
    .filter((activity) => activity.status?.trim().toUpperCase() !== 'FALSE');
}

export async function fetchActivitiesByType(eventType: string): Promise<Activity[]> {
  const all = await fetchAllActivities();
  return all.filter(
    (activity) => activity.eventType?.trim().toLowerCase() === eventType.trim().toLowerCase()
  );
}
