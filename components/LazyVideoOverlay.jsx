'use client';
import { useEffect, useRef, useState } from 'react';

export default function LazyVideoOverlay({ 
    videoSrc = '/overlay.mp4', 
    opacity = 0.3, 
    trigger = true 
}) {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
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

    // Load video with mobile optimization
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Mobile optimization
        video.preload = isMobile ? 'none' : 'metadata';
        video.playsInline = true;
        video.muted = true;
        video.loop = true;
        video.autoplay = false;

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        const handleLoadedData = () => {
            setIsLoaded(true);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);

        // Only load video immediately on desktop
        if (!isMobile) {
            video.load();
        }

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [videoSrc, isMobile]);

    // Handle visibility for play/pause with mobile optimization
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && trigger) {
                    setIsVisible(true);
                    // Load video on mobile only when visible
                    if (isMobile && videoRef.current) {
                        videoRef.current.load();
                    }
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: isMobile ? 0.2 : 0.1 }
        );

        const currentRef = videoRef.current?.parentElement;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [trigger, isMobile]);

    // Play/pause based on visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isLoaded) return;

        if (isVisible && video.paused) {
            // Reduce playback rate on mobile for better performance
            if (isMobile) {
                video.playbackRate = 0.75;
            }
            video.play().catch(console.error);
        } else if (!isVisible && !video.paused) {
            video.pause();
        }
    }, [isVisible, isLoaded, isMobile]);

    return (
        <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover video-overlay"
            style={{ 
                opacity: isVisible && isLoaded ? (isMobile ? opacity * 0.6 : opacity) : 0,
                transition: 'opacity 1s ease-in-out',
                filter: isMobile 
                    ? 'contrast(1.0) saturate(0.1) brightness(0.4) grayscale(0.7)' 
                    : 'contrast(1.1) saturate(0.2) brightness(0.5) grayscale(0.5)',
                transform: isMobile ? 'scale(1.05)' : 'none'
            }}
            muted
            loop
            playsInline
            preload={isMobile ? 'none' : 'metadata'}
        >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}