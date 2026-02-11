# Team Members Setup Guide

This guide will help you set up the dynamic team members page that fetches data from Google Sheets.

## Step 1: Create Google Sheets Document

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "FOSS Team Members"
4. In **Sheet1**, create the following structure:

| Image URL | Name | Role |
|-----------|------|------|
| [Drive link] | John Doe | President |
| [Drive link] | Jane Smith | Vice President |

**Important Notes:**
- Row 1 is the header (will be skipped)
- Column A: Image URL (Google Drive link)
- Column B: Member Name
- Column C: Member Role

## Step 2: Set Up Google Drive Images

For each team member image:

1. Upload the image to Google Drive
2. Right-click the image → Share → Change to "Anyone with the link"
3. Copy the sharing link (format: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`)
4. Paste this link in Column A of your sheet

**The system will automatically convert the Drive link to a direct image URL!**

## Step 3: Make Google Sheet Public

1. Click "Share" button in top-right
2. Change to "Anyone with the link" can **View**
3. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

## Step 4: Get Google Sheets API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
   - (Optional) Restrict the key to only Google Sheets API for security

## Step 5: Configure Environment Variables

Add to your `.env.local` file:

```env
GOOGLE_SHEETS_API_KEY=your-api-key-here
GOOGLE_SHEETS_TEAM_ID=your-sheet-id-here
```

For production (Vercel/your hosting), add these same variables to your environment settings.

## Step 6: Access the Team Page

Visit: `http://localhost:3000/team` (or your domain)

## Troubleshooting

### Images not loading?
- Make sure Drive links are set to "Anyone with the link"
- Check if the Drive file ID is correct
- Verify the image file is actually an image (JPG, PNG, etc.)

### No data showing?
- Check if Sheet ID is correct
- Verify API key is valid and Google Sheets API is enabled
- Make sure sheet name is "Sheet1" or update the code
- Check browser console for errors

### API quota exceeded?
- Google Sheets API has a free tier limit
- Consider caching the data or reducing page refreshes

## Sheet Structure Tips

- Keep image file sizes reasonable (< 2MB recommended)
- Use consistent image dimensions for better layout
- Add members in the order you want them displayed
- Leave empty rows at bottom - they'll be filtered out automatically

## Drive Link Formats Supported

The system automatically handles these Drive URL formats:
- `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- `https://drive.google.com/open?id=FILE_ID`
- `https://drive.google.com/uc?id=FILE_ID&export=view`

All will be converted to the direct image format automatically!
