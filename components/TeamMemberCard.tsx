'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import TeamMemberModal from './TeamMemberModal';

// Prefetches the *Next-optimized* image the modal will actually request
// (/_next/image?url=...&w=...&q=60), not just the raw Drive URL — those are
// separate fetch pipelines. Prefetching the raw source never warmed Next's own
// server-side optimization cache, so the modal image still had to be fetched
// from Drive and re-encoded from scratch the moment it opened. Firing this on
// hover (desktop) and touchstart (mobile, fires just before the tap completes)
// gives Next a head start so it's already warm by the time the modal opens.
const preloadImage = (src: string) => {
  if (typeof window !== 'undefined' && src) {
    const optimizedUrl = `/_next/image?url=${encodeURIComponent(src)}&w=828&q=60`;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = optimizedUrl;
    link.as = 'image';
    document.head.appendChild(link);
  }
};

interface TeamMemberCardProps {
  member: {
    image: string;
    name: string;
    role: string;
    position?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
  index: number;
  priority?: boolean;
  // Called once this card's image has either loaded, failed, or was never
  // there to begin with — lets a parent (e.g. TeamCarousel) know when it's
  // safe to stop covering the page with a loading screen.
  onSettle?: () => void;
}

export default function TeamMemberCard({ member, index, priority = false, onSettle }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // No image to load at all — nothing to wait on, so settle immediately.
  useEffect(() => {
    if (!member.image) onSettle?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [member.image]);

  const isHQ = member.role?.toLowerCase() === 'hq';
  const hasLink = Boolean(member.linkedin || member.instagram || member.github);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (index % 4) * 0.05 }}
        className="group flex h-full flex-col bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/40 hover:bg-white/10 transition-colors duration-300"
      >
        <div
          className="relative w-full aspect-square overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => preloadImage(member.image)}
          onTouchStart={() => preloadImage(member.image)}
        >
          {!hasLink && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              No Link
            </span>
          )}
          {member.image && !imageError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onLoad={() => onSettle?.()}
              onError={() => {
                setImageError(true);
                onSettle?.();
              }}
              priority={priority}
              loading={priority ? undefined : 'eager'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-600">
              <span className="text-6xl font-bold text-white">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white truncate">
              {member.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400 truncate">
              {!isHQ && member.role && `${member.role} `}
              {member.position || 'Member'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Connect
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </motion.div>

      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={member}
      />
    </>
  );
}
