'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Activity } from '@/types/activity';
import ActivityModal from './ActivityModal';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  priority?: boolean;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateRange(start?: string, end?: string) {
  const startFormatted = formatDate(start);
  if (!end || end === start) return startFormatted;
  return `${startFormatted} – ${formatDate(end)}`;
}

export default function ActivityCard({ activity, index, priority = false }: ActivityCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dateRange = formatDateRange(activity.startDate, activity.endDate);
  const timeRange = activity.startTime && activity.endTime
    ? `${activity.startTime} – ${activity.endTime}`
    : activity.startTime || '';

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors duration-300 flex flex-col h-full max-w-xs mx-auto w-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Fixed, uniform ratio (not each poster's natural aspect ratio) so every
            card in the grid lines up cleanly instead of varying with each image. */}
        <div className="relative w-full aspect-square overflow-hidden bg-black/40">
          {activity.poster && !imageError ? (
            <Image
              src={activity.poster}
              alt={activity.title}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              priority={priority}
              loading={priority ? undefined : 'lazy'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-purple-600 to-blue-600">
              <span className="text-4xl font-bold text-white">
                {activity.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          {activity.mode && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm border border-white/20">
              {activity.mode}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col grow">
          <h2 className="text-base font-bold mb-1 group-hover:text-gray-300 transition-colors line-clamp-1">
            {activity.title}
          </h2>

          {dateRange && (
            <p className="text-xs text-gray-400 mb-0.5">
              {dateRange}
              {timeRange ? ` · ${timeRange}` : ''}
            </p>
          )}
          {activity.venue && (
            <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{activity.venue}</p>
          )}

          {activity.description && (
            <p className="text-gray-400 mb-2 line-clamp-4 text-xs grow">
              {activity.description}
            </p>
          )}

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 mt-auto">
            <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
              View More
            </span>
            {activity.registrationLink && (
              <a
                href={activity.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-200 transition-colors"
              >
                Register
              </a>
            )}
          </div>
        </div>
      </motion.article>

      <ActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={activity}
        dateRange={dateRange}
        timeRange={timeRange}
      />
    </>
  );
}
