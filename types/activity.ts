// Shape of a row from the "FOSS Activities" sheet (fed by a single Google Form
// with an Event Type dropdown: Hackathons | Workshops | Events | Online Sessions)
export type EventType = 'Hackathons' | 'Workshops' | 'Events' | 'Online Sessions';

export interface Activity {
  eventType: EventType | string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  mode?: string; // Online | Offline | Hybrid
  venue?: string; // physical venue OR meeting link, depending on mode
  organizerEmail?: string;
  registrationLink?: string;
  registrationDeadline?: string;
  poster?: string; // direct image URL (converted from Drive link)
  status?: string;
}
