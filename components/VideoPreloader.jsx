'use client';
import { useEffect } from 'react';

export default function VideoPreloader() {
    useEffect(() => {
        // Preload videos when the page loads
        const preloadVideo = (src) => {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.src = src;
            video.load();
        };

        // Preload the background overlay video
        preloadVideo('/overlay.mp4');

        // Also preload the background image
        const img = new Image();
        img.src = '/galaxy.jpg';

    }, []);

    return null; // This component doesn't render anything
}