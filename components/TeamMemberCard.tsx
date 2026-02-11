'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import TeamMemberModal from './TeamMemberModal';

// Preload image function
const preloadImage = (src: string) => {
  if (typeof window !== 'undefined' && src) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = src;
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
  size?: 'small' | 'medium' | 'large';
}

export default function TeamMemberCard({ member, index, size = 'small' }: TeamMemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isHQ = member.role?.toLowerCase() === 'hq';

  const sizeClasses = {
    small: 'aspect-[3/4]',
    medium: 'aspect-square',
    large: 'aspect-[4/3]'
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        className="group relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => preloadImage(member.image)}
      >
      <div className={`relative w-full ${sizeClasses[size]} overflow-hidden`}>
        {member.image && !imageError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="256px"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
            <span className="text-6xl font-bold text-white">
              {member.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
      </div>
      
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold mb-1 group-hover:text-gray-300 transition-colors">
          {member.name}
        </h3>
        <p className="text-white text-sm font-medium">
          {!isHQ && member.role && `${member.role} `}
          {member.position || 'Member'}
        </p>
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
