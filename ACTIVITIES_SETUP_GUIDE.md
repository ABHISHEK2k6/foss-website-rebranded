# Hackathons / Workshops / Events / Online Sessions — Setup Guide

Unlike the Team page (which has its own dedicated spreadsheet), all four activity
types share **one Google Form → one sheet tab**. A single "Event Type" dropdown
question tells the site which section (Hackathons / Workshops / Events / Online
Sessions) each row belongs to. The site fetches that one tab once per request and
filters it into four sections.

- `GET /api/hackathons` → rows where Event Type = "Hackathons"
- `GET /api/workshops` → rows where Event Type = "Workshops"
- `GET /api/events` → rows where Event Type = "Events"
- `GET /api/online-sessions` → rows where Event Type = "Online Sessions"

## The sheet

Spreadsheet: **FOSS Activities**, single tab named **`FOSS Activities`**.

| Column | Field |
|--------|-------|
| A | Timestamp (auto, from the form) |
| B | Event Type — dropdown: Hackathons / Workshops / Events / Online Sessions |
| C | Email Address |
| D | Description of the Event |
| E | Start Date |
| F | End Date |
| G | Start Time |
| H | End Time |
| I | Mode of Event |
| J | Venue or Meeting Link |
| K | Registration Link |
| L | Registration Deadline |
| M | Poster or Banner Image Link |
| N | Title of the Event |
| O | Status |

The API route reads rows by fixed column position (`'FOSS Activities'!A2:O`,
skipping the header row). **Don't reorder, insert, or delete columns** on the live
form/sheet — doing so will shift every field the code reads.

The **Event Type** value (column B) must exactly match one of the 4 strings above
(case-insensitive is fine — the match is case-insensitive) for a response to show
up in the corresponding section. Any other value (typo, blank, future category)
won't appear on any of the 4 sections.

## Poster / banner images via Google Drive

Same convention as the Team sheet:
1. Upload the poster image to Google Drive.
2. Right-click → Share → "Anyone with the link" → Viewer.
3. Paste that sharing link into the "Poster or Banner Image Link" answer.

The API automatically rewrites any of these Drive link formats into a direct image URL:
- `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- `https://drive.google.com/open?id=FILE_ID`
- `https://drive.google.com/uc?id=FILE_ID&export=view`

## Make the spreadsheet public (read-only)

1. Share → "Anyone with the link" → Viewer.
2. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## Environment variables

```env
GOOGLE_SHEETS_API_KEY=your-existing-api-key
GOOGLE_SHEETS_FOSS_ACTIVITIES_ID=the-spreadsheet-id
```

Reuses the same `GOOGLE_SHEETS_API_KEY` already set up for the Team page — no new
API key needed. This spreadsheet's ID is already set in this project's `.env.local`
as `GOOGLE_SHEETS_FOSS_ACTIVITIES_ID`.

## Verify

Once there's at least one form response, hit:

- `http://localhost:3000/api/hackathons`
- `http://localhost:3000/api/workshops`
- `http://localhost:3000/api/events`
- `http://localhost:3000/api/online-sessions`

Each should return `{ "success": true, "data": [...] }`, with a row landing in
exactly one of the four depending on its Event Type value.

## Troubleshooting

- **A response doesn't show up anywhere** — the Event Type dropdown value doesn't
  exactly match "Hackathons" / "Workshops" / "Events" / "Online Sessions" (check
  for stray spaces or a renamed dropdown option).
- **500 "GOOGLE_SHEETS_FOSS_ACTIVITIES_ID is not configured"** — env var missing,
  or the dev server wasn't restarted after editing `.env.local`.
- **Images not loading** — Drive file isn't shared as "Anyone with the link", or
  the link isn't in one of the 3 supported formats.
- **Wrong data in wrong fields** — a form question was added, removed, or
  reordered after going live, shifting the column positions the API route expects.

## What was built

- `lib/googleSheets.ts` — shared `convertDriveLink()` and `fetchSheetRows()` helpers
  (also used by `/api/team`).
- `lib/activities.ts` — `fetchAllActivities()` reads and parses the whole
  `FOSS Activities` tab; `fetchActivitiesByType()` filters it by Event Type.
- `types/activity.ts` — single `Activity` type shared by all four sections.
- `app/api/hackathons/route.ts`, `app/api/workshops/route.ts`,
  `app/api/events/route.ts`, `app/api/online-sessions/route.ts` — each just calls
  `fetchActivitiesByType(...)` with its own Event Type string.

No listing/detail pages were built yet (only the fetch layer) — say the word if
you want `/hackathons`, `/workshops`, `/events`, `/online-sessions` pages built on
top of these, similar to `app/team/page.tsx`.
