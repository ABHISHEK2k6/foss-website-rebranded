import Image from 'next/image';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-black text-white">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="FOSS Logo"
          width={160}
          height={160}
          priority
          className="w-28 sm:w-36 h-auto animate-pulse"
        />
      </div>

      <div className="pb-12 sm:pb-16">
        <div
          className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin"
          role="status"
          aria-label="Loading"
        />
      </div>
    </div>
  );
}
