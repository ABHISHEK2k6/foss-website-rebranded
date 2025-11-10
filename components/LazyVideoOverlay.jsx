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

    // Load video immediately when component mounts
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.preload = 'auto';
        video.playsInline = true;
        video.muted = true;
        video.loop = true;
        video.autoplay = false; // Don't autoplay yet

        const handleCanPlay = () => {
            setIsLoaded(true);
        };

        const handleLoadedData = () => {
            setIsLoaded(true);
        };

        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);

        // Start loading the video immediately
        video.load();

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [videoSrc]); // Load when component mounts or video source changes

    // Handle visibility for play/pause
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && trigger) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.1 }
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
    }, [trigger]);

    // Play/pause based on visibility
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isLoaded) return;

        if (isVisible && video.paused) {
            video.play().catch(console.error);
        } else if (!isVisible && !video.paused) {
            video.pause();
        }
    }, [isVisible, isLoaded]);

    return (
        <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover video-overlay"
            style={{ 
                opacity: isVisible && isLoaded ? opacity : 0,
                transition: 'opacity 1s ease-in-out',
                filter: 'contrast(1.1) saturate(0.2) brightness(0.5) grayscale(0.5)'
            }}
            muted
            loop
            playsInline
            preload="auto"
        >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}