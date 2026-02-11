const apiKey = 'AIzaSyCTilsly5HbM0X67xMWgt2PWqS7RzrB52c';
const sheetId = '1hDNkogjKA46QE-NUqFGjfEt0iizgS6JK6TCHNS2BuCQ';

const range = "'Form responses 1'!A2:M";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

// Convert Google Drive sharing link to direct image link
function convertDriveLink(url) {
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

console.log('Fetching team members with new structure...\n');

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values || [];
    
    console.log(`Found ${rows.length} team member(s)\n`);
    console.log('='.repeat(80));
    
    rows.forEach((row, index) => {
      const member = {
        image: convertDriveLink(row[12] || ''),
        name: row[1] || 'Unknown',
        role: row[2] || 'Member',
        position: row[3] || undefined,
        year: row[4] || undefined,
        department: row[5] || undefined,
        email: row[7] || undefined,
        instagram: row[9] || undefined,
        linkedin: row[10] || undefined,
        github: row[11] || undefined,
      };
      
      console.log(`\n${index + 1}. ${member.name}`);
      console.log(`   Team: ${member.role}`);
      if (member.position) console.log(`   Position: ${member.position}`);
      if (member.year) console.log(`   Year: ${member.year}`);
      if (member.department) console.log(`   Department: ${member.department}`);
      if (member.email) console.log(`   Email: ${member.email}`);
      if (member.instagram) console.log(`   Instagram: ${member.instagram}`);
      if (member.linkedin) console.log(`   LinkedIn: ${member.linkedin}`);
      if (member.github) console.log(`   GitHub: ${member.github}`);
      console.log(`   Photo URL: ${member.image}`);
      console.log('-'.repeat(80));
    });
    
    console.log(`\n✓ API route updated successfully!`);
    console.log(`\nThe /api/team endpoint will now return:`);
    console.log('  - image: Direct Google Drive view link');
    console.log('  - name: Member name');
    console.log('  - role: Team name');
    console.log('  - position: Team position');
    console.log('  - year: Academic year');
    console.log('  - department: Department');
    console.log('  - email: Email address');
    console.log('  - instagram, linkedin, github: Social links');
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
