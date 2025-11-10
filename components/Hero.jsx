


'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Animation variants for desktop only
    const titleAnimation = isMobile ? {} : {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.5 }
    };

    const subtitleAnimation = isMobile ? {} : {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, delay: 1 }
    };

    const descriptionAnimation = isMobile ? {} : {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1, delay: 1.5 }
    };

    return (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white pt-8 sm:pt-16 overflow-hidden w-full max-w-full">
            <div className="text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12 px-4 sm:px-6 md:px-8 w-full max-w-6xl mx-auto -mt-8 sm:mt-0">
                    {isMobile ? (
                        <h1 className="text-2xl xs:text-3xl font-bold leading-tight break-words max-w-full fade-in">
                            Welcome to <span className="text-white">FOSS UCEK</span>
                        </h1>
                    ) : (
                        <motion.h1 
                            className="text-3xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                            {...titleAnimation}
                        >
                            Welcome to <span className="text-white">FOSS UCEK</span>
                        </motion.h1>
                    )}
                    
                    {isMobile ? (
                        <p className="text-sm xs:text-base leading-relaxed break-words max-w-full slide-up delay-200">
                            IN OPEN-SOURCE, WE FEEL STRONGLY THAT TO DO SOMETHING WELL.
                        </p>
                    ) : (
                        <motion.p 
                            className="text-xl xs:text-4xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed"
                            {...subtitleAnimation}
                        >
                            IN OPEN-SOURCE, WE FEEL STRONGLY THAT<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>TO DO SOMETHING WELL.
                        </motion.p>
                    )}
                    
                    {isMobile ? (
                        <p className="text-xs xs:text-sm text-gray-300 break-words max-w-full slide-in-scale delay-400">
                            Your journey to success starts here.
                        </p>
                    ) : (
                        <motion.p 
                            className="text-lg xs:text-3xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300"
                            {...descriptionAnimation}
                        >
                            Your journey to success starts here.
                        </motion.p>
                    )}
                </div>
            </div>
    );
}
