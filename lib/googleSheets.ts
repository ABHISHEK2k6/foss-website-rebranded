// Shared helpers for reading Google-Form-fed Sheets (Team, Hackathons, Workshops, Events, Online Sessions)

// Convert a Google Drive sharing link to a direct image link
export function convertDriveLink(url: string): string {
  if (!url) return '';

  const patterns = [
    /drive\.google\.com\/file\/d\/([^/]+)/,
    /drive\.google\.com\/open\?id=([^&]+)/,
    /drive\.google\.com\/uc\?.*id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }

  return url;
}

// Fetch raw rows (as string[][]) from a sheet tab/range via the Google Sheets REST API
export async function fetchSheetRows(sheetId: string, range: string): Promise<string[][]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

  if (!apiKey || !sheetId) {
    throw new Error('Google Sheets configuration missing: GOOGLE_SHEETS_API_KEY or sheet ID env var not set');
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

  // Was no-store — every request re-fetched from Sheets from scratch. This data
  // doesn't change minute-to-minute, so a short revalidation window lets Next
  // cache and serve near-instantly instead of every visitor waiting on Sheets.
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Google Sheets API error:', errorData);
    throw new Error('Failed to fetch data from Google Sheets');
  }

  const data = await response.json();
  return data.values || [];
}
