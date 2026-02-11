const apiKey = 'AIzaSyCTilsly5HbM0X67xMWgt2PWqS7RzrB52c';
const sheetId = '1hDNkogjKA46QE-NUqFGjfEt0iizgS6JK6TCHNS2BuCQ';

// First, get the spreadsheet metadata to see available sheets
const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;

console.log('Fetching spreadsheet metadata...\n');

fetch(metadataUrl)
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Error Response:', JSON.stringify(err, null, 2));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Spreadsheet Title:', data.properties.title);
    console.log('\nAvailable Sheets:');
    data.sheets.forEach(sheet => {
      console.log(`  - ${sheet.properties.title} (${sheet.properties.sheetId})`);
    });
    
    // Now fetch data from the first sheet - get ALL columns to see the structure
    const firstSheetName = data.sheets[0].properties.title;
    const range = `${firstSheetName}`;
    const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
    
    console.log(`\nFetching ALL data from "${firstSheetName}"...\n`);
    return fetch(dataUrl);
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Error Response:', JSON.stringify(err, null, 2));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Success! Full sheet structure:\n');
    
    if (data.values && data.values.length > 0) {
      // Show headers
      console.log('HEADERS:', data.values[0].join(' | '));
      console.log('Number of columns:', data.values[0].length);
      console.log('Number of rows (including header):', data.values.length);
      console.log('\n=== SAMPLE DATA (First 5 rows) ===\n');
      
      data.values.slice(0, 6).forEach((row, index) => {
        console.log(`Row ${index}:`);
        row.forEach((cell, colIndex) => {
          console.log(`  [${data.values[0][colIndex]}]: ${cell}`);
        });
        console.log('');
      });
      
      console.log('\n=== ALL TEAM MEMBERS ===\n');
      // Skip header row
      data.values.slice(1).forEach((row, index) => {
        if (row.length >= 2) {
          console.log(`${index + 1}. Name: ${row[1] || 'Unknown'}`);
          console.log(`   Team: ${row[2] || 'Not specified'}`);
          if (row.length > 3) {
            console.log(`   Additional fields: ${row.slice(3).join(', ')}`);
          }
          console.log('');
        }
      });
    } else {
      console.log('\nNo data found in the sheet.');
    }
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
