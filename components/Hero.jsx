


'use client';
import { motion } from 'framer-motion';
import VideoBackground from './VideoBackground';

export default function Hero() {
    return (
        <>
            <VideoBackground 
                videoSources={['/2.mp4']} 
                opacity={0.4}
            />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white pt-20">
                <div className="text-center space-y-4 sm:space-y-14 px-4 sm:px-6 md:px-8">
                    <motion.h1 
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Welcome to FOSS UCEK
                    </motion.h1>
                    <motion.p 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1 }}
                    >
                        IN OPEN-SOURCE, WE FEEL STRONGLY THAT<br />TO DO SOMETHING WELL.
                    </motion.p>
                    <motion.p 
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        Your journey to success starts here.
                    </motion.p>
                </div>
            </div>
        </>
    );
}
