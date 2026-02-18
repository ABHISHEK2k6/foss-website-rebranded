import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeamMemberCard from '@/components/TeamMemberCard';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

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

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (
      process.env.NODE_ENV === 'production' 
        ? (process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'https://foss-website-rebranded.vercel.app')
        : 'http://localhost:3000'
    );
    
    const response = await fetch(`${baseUrl}/api/team`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch team members:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  // Organize team members by hierarchy
  const chairperson = teamMembers.find(m => m.position?.toLowerCase() === 'chairperson');
  const viceChairperson = teamMembers.find(m => m.position?.toLowerCase() === 'vice chairperson');
  
  // Group remaining members by team (excluding HQ team)
  const teamGroups: Record<string, TeamMember[]> = {};
  teamMembers.forEach(member => {
    const pos = member.position?.toLowerCase();
    const isHQ = member.role?.toLowerCase() === 'hq';
    
    // Skip chairperson, vice chairperson, and all HQ team members
    if (pos !== 'chairperson' && pos !== 'vice chairperson' && !isHQ) {
      if (!teamGroups[member.role]) {
        teamGroups[member.role] = [];
      }
      teamGroups[member.role].push(member);
    }
  });

  // Sort members within each team: Lead first, then Co-lead, then others
  Object.keys(teamGroups).forEach(team => {
    teamGroups[team].sort((a, b) => {
      const posA = a.position?.toLowerCase() || '';
      const posB = b.position?.toLowerCase() || '';
      
      if (posA === 'lead') return -1;
      if (posB === 'lead') return 1;
      if (posA.includes('co-lead') || posA.includes('colead')) return -1;
      if (posB.includes('co-lead') || posB.includes('colead')) return 1;
      return 0;
    });
  });

  return (
    <div className="relative min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Execom Core Team
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the passionate individuals driving our community forward
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {teamMembers.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <svg 
                className="w-8 h-8 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-300">No Team Members Yet</h3>
            <p className="text-gray-400">
              Team member data will appear here once configured.
            </p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Chairperson and Vice Chairperson - No Title */}
            {(chairperson || viceChairperson) && (
              <div className="flex justify-center gap-6 flex-wrap">
                {chairperson && (
                  <div className="w-full sm:w-64">
                    <TeamMemberCard member={chairperson} index={0} size="medium" />
                  </div>
                )}
                {viceChairperson && (
                  <div className="w-full sm:w-64">
                    <TeamMemberCard member={viceChairperson} index={1} size="medium" />
                  </div>
                )}
              </div>
            )}

            {/* Team Sections */}
            {Object.keys(teamGroups).sort((a, b) => {
              // Technical team first
              if (a.toLowerCase() === 'technical') return -1;
              if (b.toLowerCase() === 'technical') return 1;
              // Then alphabetically
              return a.localeCompare(b);
            }).map((teamName, teamIndex) => (
              <div key={teamName}>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
                  {teamName} Team
                </h2>
                <div className="flex justify-center flex-wrap gap-4">
                  {teamGroups[teamName].map((member, index) => (
                    <div key={index} className="w-full sm:w-64">
                      <TeamMemberCard 
                        member={member} 
                        index={teamIndex * 10 + index} 
                        size="medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
