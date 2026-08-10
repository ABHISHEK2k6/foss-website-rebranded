'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard';
import LoadingScreen from './LoadingScreen';

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

interface TeamMembersGridProps {
  hqMembers: TeamMember[];
  mentors: TeamMember[];
  teamGroups: Record<string, TeamMember[]>;
  sortedTeamNames: string[];
}

// Safety net: if some avatar's network request never settles (dropped
// connection, a Drive link that never resolves, etc.) this stops the loading
// screen from covering the page forever — it just reveals whatever loaded.
const MAX_WAIT_MS = 8000;

export default function TeamMembersGrid({ hqMembers, mentors, teamGroups, sortedTeamNames }: TeamMembersGridProps) {
  const allMembers = useMemo(
    () => [...hqMembers, ...mentors, ...sortedTeamNames.flatMap((name) => teamGroups[name] || [])],
    [hqMembers, mentors, teamGroups, sortedTeamNames]
  );

  const [settled, setSettled] = useState<Set<TeamMember>>(() => new Set());
  const [timedOut, setTimedOut] = useState(false);

  const handleSettle = useCallback((member: TeamMember) => {
    setSettled((prev) => {
      if (prev.has(member)) return prev;
      const next = new Set(prev);
      next.add(member);
      return next;
    });
  }, []);

  const isLoading = !timedOut && settled.size < allMembers.length;

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setTimedOut(true), MAX_WAIT_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-16">
        {hqMembers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
              HQ Team
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              {hqMembers.map((member, index) => (
                <div key={index} className="w-full sm:w-64">
                  <TeamMemberCard
                    member={member}
                    index={index}
                    size="medium"
                    priority={index < 2}
                    onSettle={() => handleSettle(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {mentors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
              Mentors
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              {mentors.map((member, index) => (
                <div key={index} className="w-full sm:w-64">
                  <TeamMemberCard
                    member={member}
                    index={index}
                    size="medium"
                    onSettle={() => handleSettle(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {sortedTeamNames.map((teamName, teamIndex) => (
          <div key={teamName}>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-200">
              {teamName} Team
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              {(teamGroups[teamName] || []).map((member, index) => (
                <div key={index} className="w-full sm:w-64">
                  <TeamMemberCard
                    member={member}
                    index={teamIndex * 10 + index}
                    size="medium"
                    onSettle={() => handleSettle(member)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
