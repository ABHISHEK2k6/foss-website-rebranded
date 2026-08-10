import LoadingScreen from '@/components/LoadingScreen';

// Next.js automatically renders this while any route segment's data-fetching
// (e.g. the awaited fetch calls in team/hackathons/workshops/events/
// online-sessions/blogs) is in flight, then swaps in the real page once ready.
export default function Loading() {
  return <LoadingScreen />;
}
