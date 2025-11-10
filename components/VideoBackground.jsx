'use client';
import { useEffect, useRef, useState } from 'react';

export default function VideoBackground({ 
    videoSources = ['/2.mp4'], 
    opacity = 0.4,
    className = "" 
}) {
    const videoRef = useRef(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset states when video changes
        setIsLoaded(false);
        setIsPlaying(false);

        // Configure video for optimal loading
        video.preload = 'auto';
        video.playsInline = true;
        video.muted = true;
        video.loop = videoSources.length === 1; // Loop if single video
        video.autoplay = true;

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        const handleLoadedData = () => {
            // Ensure video plays after loading
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.error('Video play failed:', error);
                    });
            }
        };

        const handleEnded = () => {
            if (videoSources.length > 1) {
                // Switch to next video only if multiple videos
                setCurrentVideoIndex((prev) => (prev + 1) % videoSources.length);
            }
        };

        const handlePlay = () => {
            setIsPlaying(true);
        };

        const handlePause = () => {
            setIsPlaying(false);
        };

        // Add event listeners
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);

        // Force load the video
        video.load();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, [videoSources, currentVideoIndex]);

    return (
        <>
            {/* Fallback static background */}
            <div 
                className="absolute inset-0 -z-20 bg-black"
            >
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: "url('/galaxy.jpg')" }}
                />
            </div>

            {/* Video overlay */}
            <video
                ref={videoRef}
                key={`${currentVideoIndex}-${videoSources[currentVideoIndex]}`}
                className={`absolute inset-0 -z-10 w-full h-full object-cover transition-opacity duration-1000 ${className}`}
                style={{ 
                    opacity: isLoaded ? opacity : 0,
                    filter: 'contrast(1.2) saturate(0.3) brightness(0.6) grayscale(0.4)'
                }}
                muted
                playsInline
                autoPlay
                preload="auto"
                loop={videoSources.length === 1}
            >
                <source src={videoSources[currentVideoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
}