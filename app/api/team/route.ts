import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 300;

interface TeamMember {
  image: string;
  name: string;
  role: string;
  position?: string;
  year?: string;
  department?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
}

// Convert Google Drive sharing link to direct image link
function convertDriveLink(url: string): string {
  if (!url) return '';
  
  // Extract file ID from various Drive URL formats
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

  // If already in correct format or not a Drive link, return as is
  return url;
}

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
    const sheetId = process.env.GOOGLE_SHEETS_TEAM_ID;

    if (!apiKey || !sheetId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Google Sheets configuration missing. Please set GOOGLE_SHEETS_API_KEY and GOOGLE_SHEETS_TEAM_ID in environment variables.' 
        },
        { status: 500 }
      );
    }

    // Fetch data from Google Sheets
    // Sheet structure: Timestamp, Name, Team, Position, Year, Department, DOB, Email, Mobile, Instagram, LinkedIn, GitHub, Photo
    // Columns: A=Timestamp, B=Name, C=Team, D=Position, E=Year, F=Department, G=DOB, H=Email, I=Mobile, J=Instagram, K=LinkedIn, L=GitHub, M=Photo
    const range = "'Form responses 1'!A2:M"; // Skip header row, get all columns
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

    const response = await fetch(url, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Google Sheets API error:', errorData);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch team data from Google Sheets' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rows = data.values || [];

    // Transform the data - Map columns correctly
    // [0]=Timestamp, [1]=Name, [2]=Team, [3]=Position, [4]=Year, [5]=Department, 
    // [6]=DOB, [7]=Email, [8]=Mobile, [9]=Instagram, [10]=LinkedIn, [11]=GitHub, [12]=Photo
    const teamMembers: TeamMember[] = rows
      .filter((row: string[]) => row.length >= 2) // At least name
      .map((row: string[]) => ({
        image: convertDriveLink(row[12] || ''), // Photo is in column M (index 12)
        name: row[1] || 'Unknown',
        role: row[2] || 'Member', // Team column
        position: row[3] || undefined,
        year: row[4] || undefined,
        department: row[5] || undefined,
        email: row[7] || undefined,
        instagram: row[9] || undefined,
        linkedin: row[10] || undefined,
        github: row[11] || undefined,
      }));

    return NextResponse.json(
      { success: true, data: teamMembers }
    );
  } catch (error: unknown) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}
