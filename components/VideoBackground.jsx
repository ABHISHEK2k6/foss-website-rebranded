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
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset states when video changes
        setIsLoaded(false);
        setIsPlaying(false);

        // Mobile optimization: reduce quality and preload behavior
        if (isMobile) {
            video.preload = 'metadata';
            video.style.objectPosition = 'center center';
        } else {
            video.preload = 'auto';
        }
        
        video.playsInline = true;
        video.muted = true;
        video.loop = videoSources.length === 1;
        video.autoplay = true;

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        const handleLoadedData = () => {
            // Optimize playback for mobile
            if (isMobile) {
                video.playbackRate = 0.75; // Slightly slower on mobile
            }
            
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
    }, [videoSources, currentVideoIndex, isMobile]);

    return (
        <>
            {/* Optimized fallback static background with faster loading */}
            <div 
                className="absolute inset-0 -z-20 bg-gradient-to-br from-gray-900 via-black to-gray-800"
            >
                <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover opacity-80"
                    style={{ 
                        backgroundImage: "url('/galaxy.jpg')",
                        backgroundSize: isMobile ? 'cover' : 'cover',
                        backgroundPosition: isMobile ? 'center center' : 'center center'
                    }}
                />
            </div>

            {/* Optimized video overlay */}
            <video
                ref={videoRef}
                key={`${currentVideoIndex}-${videoSources[currentVideoIndex]}`}
                className={`absolute inset-0 -z-10 w-full h-full object-cover transition-opacity duration-1000 ${className}`}
                style={{ 
                    opacity: isLoaded ? (isMobile ? opacity * 0.7 : opacity) : 0,
                    filter: isMobile 
                        ? 'contrast(1.1) saturate(0.2) brightness(0.5) grayscale(0.6)' 
                        : 'contrast(1.2) saturate(0.3) brightness(0.6) grayscale(0.4)',
                    transform: isMobile ? 'scale(1.05)' : 'none'
                }}
                muted
                playsInline
                autoPlay
                preload={isMobile ? 'metadata' : 'auto'}
                loop={videoSources.length === 1}
            >
                <source src={videoSources[currentVideoIndex]} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
}