'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Activity } from '@/types/activity';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activity: Activity;
  dateRange: string;
  timeRange: string;
}

// Clamp to a sane range so an unusually tall/wide poster doesn't distort the modal
function clampAspectRatio(ratio: number) {
  return Math.min(Math.max(ratio, 0.8), 2.2);
}

export default function ActivityModal({ isOpen, onClose, activity, dateRange, timeRange }: ActivityModalProps) {
  const [imageError, setImageError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-[85vw] sm:w-1/2 max-w-2xl max-h-[75vh] mx-auto overflow-y-auto overscroll-contain bg-[#0b0b12] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            style={{ WebkitOverflowScrolling: 'touch' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors bg-black/40 rounded-full p-2"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/*
              max-h caps the poster's height independent of the modal's width. The modal
              got wider (w-1/2), and a wide box combined with a tall aspect ratio (as low
              as 0.8) was producing a huge image that pushed the description off-screen,
              requiring a scroll just to reach it. Capping the height (object-cover crops
              to fill it) keeps the poster reasonably sized regardless of modal width.
            */}
            {activity.poster && !imageError && (
              <div className="relative w-full max-h-[38vh] overflow-hidden bg-black/40" style={{ aspectRatio }}>
                <Image
                  src={activity.poster}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 384px"
                  className="object-cover"
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth && img.naturalHeight) {
                      setAspectRatio(clampAspectRatio(img.naturalWidth / img.naturalHeight));
                    }
                  }}
                  onError={() => setImageError(true)}
                />
              </div>
            )}

            <div className="p-4 sm:p-5 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                {activity.mode && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                    {activity.mode}
                  </span>
                )}
                {activity.status && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/20">
                    {activity.status}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white">{activity.title}</h2>

              <div className="text-sm text-gray-300 space-y-1">
                {dateRange && <p>{dateRange}{timeRange ? ` · ${timeRange}` : ''}</p>}
                {activity.venue && <p className="text-gray-400">{activity.venue}</p>}
              </div>

              {activity.description && (
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {activity.description}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {activity.registrationLink && (
                  <a
                    href={activity.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    Register
                  </a>
                )}
                {activity.organizerEmail && (
                  <a
                    href={`mailto:${activity.organizerEmail}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    Contact Organizer
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
