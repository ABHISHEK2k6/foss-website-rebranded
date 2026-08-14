'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  status?: string;
}

interface TeamCarouselProps {
  currentMembers: TeamMember[];
  alumniMembers: TeamMember[];
}

type Tab = 'current' | 'alumni';

// Safety net: if some avatar's network request never settles this stops the
// loading screen from covering the carousel forever.
const MAX_WAIT_MS = 8000;
const AUTOPLAY_MS = 4500;

function chunk<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
}

export default function TeamCarousel({ currentMembers, alumniMembers }: TeamCarouselProps) {
  const [activeTab, setActiveTab] = useState<Tab>('current');
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [settledCurrent, setSettledCurrent] = useState<Set<TeamMember>>(() => new Set());
  const [settledAlumni, setSettledAlumni] = useState<Set<TeamMember>>(() => new Set());
  const [timedOut, setTimedOut] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Autoplay should only run once the user has actually scrolled to and
  // settled on this section, not while it's just passing through the
  // viewport on the way to somewhere else.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Responsive cards-per-page: 1 on mobile, 2 from sm, 4 from lg — matches
  // the grid classes used on each page below.
  useEffect(() => {
    const mqLg = window.matchMedia('(min-width: 1024px)');
    const mqSm = window.matchMedia('(min-width: 640px)');
    const update = () => setCardsPerPage(mqLg.matches ? 4 : mqSm.matches ? 2 : 1);
    update();
    mqLg.addEventListener('change', update);
    mqSm.addEventListener('change', update);
    return () => {
      mqLg.removeEventListener('change', update);
      mqSm.removeEventListener('change', update);
    };
  }, []);

  const activeMembers = activeTab === 'current' ? currentMembers : alumniMembers;
  const pages = useMemo(() => chunk(activeMembers, cardsPerPage), [activeMembers, cardsPerPage]);

  // Reset to the first page whenever the tab or layout changes, since the
  // previous page index may no longer exist.
  useEffect(() => {
    setCurrentPage(0);
    setTimedOut(false);
  }, [activeTab, cardsPerPage]);

  // Keep the scroll container in sync with currentPage (arrows, dots, autoplay).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: currentPage * el.clientWidth, behavior: 'smooth' });
  }, [currentPage]);

  // Sync currentPage back from manual swipe/drag scrolling.
  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const el = trackRef.current;
      if (!el || el.clientWidth === 0) return;
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setCurrentPage((prev) => (prev === idx ? prev : idx));
    }, 100);
  }, []);

  const goToPage = useCallback((idx: number) => {
    setCurrentPage(Math.max(0, Math.min(idx, pages.length - 1)));
  }, [pages.length]);

  const goPrev = () => goToPage(currentPage - 1);
  const goNext = () => goToPage((currentPage + 1) % pages.length);

  // Autoplay — paused via the toggle button or while the pointer is over the carousel.
  useEffect(() => {
    if (!isPlaying || isHovering || !isInView || pages.length <= 1) return;
    const id = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPlaying, isHovering, isInView, pages.length]);

  const handleSettle = useCallback((member: TeamMember, tab: Tab) => {
    const setter = tab === 'current' ? setSettledCurrent : setSettledAlumni;
    setter((prev) => {
      if (prev.has(member)) return prev;
      const next = new Set(prev);
      next.add(member);
      return next;
    });
  }, []);

  const settled = activeTab === 'current' ? settledCurrent : settledAlumni;
  const isLoading = !timedOut && activeMembers.length > 0 && settled.size < activeMembers.length;

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setTimedOut(true), MAX_WAIT_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div ref={sectionRef} className="max-w-3xl mx-auto">
      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current / Alumni toggle */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('current')}
            className={`rounded-full px-5 sm:px-6 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'current' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Current ({currentMembers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('alumni')}
            className={`rounded-full px-5 sm:px-6 py-2 text-sm font-semibold transition-colors ${
              activeTab === 'alumni' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Alumni ({alumniMembers.length})
          </button>
        </div>
      </div>

      {activeMembers.length === 0 ? (
        <p className="py-16 text-center text-gray-400">
          No {activeTab === 'current' ? 'current members' : 'alumni'} to show yet.
        </p>
      ) : (
        <>
          {/* Section heading + autoplay toggle */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                {activeTab === 'current' ? 'Current Team' : 'Alumni'}
              </h2>
              <span className="mt-2 block h-1 w-16 rounded-full bg-blue-500" />
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {pages.length > 1 && (
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:-left-4 sm:flex lg:-left-5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {pages.map((page, pageIdx) => (
                // This outer div is the scroll-snap slide — it must stay w-full
                // so its width matches the track's clientWidth (used to compute
                // scroll offsets for arrows/dots/autoplay). The actual card
                // width is capped on the grid *inside* it instead, so mobile's
                // single card renders narrower and centered rather than
                // stretching edge-to-edge.
                <div key={pageIdx} className="w-full shrink-0 snap-start px-1">
                  <div className="grid max-w-2xs mx-auto grid-cols-1 gap-4 sm:max-w-none sm:mx-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    {page.map((member, i) => (
                      <TeamMemberCard
                        key={`${member.name}-${pageIdx}-${i}`}
                        member={member}
                        index={pageIdx * cardsPerPage + i}
                        priority={pageIdx === 0 && i < 4}
                        onSettle={() => handleSettle(member, activeTab)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {pages.length > 1 && (
              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/80 sm:-right-4 sm:flex lg:-right-5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Pagination */}
          {pages.length > 1 && (
            <div className="mt-6 flex max-w-full items-center justify-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToPage(idx)}
                  aria-label={`Go to page ${idx + 1}`}
                  className={`tap-target-auto h-2 shrink-0 rounded-full transition-all duration-300 ${
                    idx === currentPage ? 'w-6 bg-blue-500' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
          {cardsPerPage === 1 && pages.length > 1 && (
            <p className="mt-2 text-center text-xs text-gray-400">
              Page {currentPage + 1} of {pages.length}
            </p>
          )}
        </>
      )}
    </div>
  );
}
