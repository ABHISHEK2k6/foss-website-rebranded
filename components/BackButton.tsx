'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Back button clicked - navigating to /blogs');
    window.location.href = '/blogs';
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center text-gray-400 hover:text-white mb-8 group cursor-pointer z-[60] relative"
    >
      <svg className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Back to all blogs
    </button>
  );
}
