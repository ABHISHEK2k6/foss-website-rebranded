'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AboutUs() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Add intersection observer for scroll animations on mobile
        if (window.innerWidth <= 768) {
            let isScrolling = false;
            const observer = new IntersectionObserver(
                (entries) => {
                    if (isScrolling) return; // Throttle to prevent overload
                    
                    isScrolling = true;
                    requestAnimationFrame(() => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                                entry.target.classList.add('animate-in');
                                observer.unobserve(entry.target); // Stop observing after animation
                            }
                        });
                        isScrolling = false;
                    });
                },
                { 
                    threshold: [0.1, 0.2],
                    rootMargin: '0px 0px -30px 0px'
                }
            );

            // Observe all scroll animation elements after a brief delay
            setTimeout(() => {
                const animateElements = document.querySelectorAll('#about .scroll-fade-in, #about .scroll-slide-left, #about .scroll-slide-right, #about .scroll-scale-in, #about .scroll-slide-up');
                animateElements.forEach(el => observer.observe(el));
            }, 100);

            return () => {
                const animateElements = document.querySelectorAll('#about .scroll-fade-in, #about .scroll-slide-left, #about .scroll-slide-right, #about .scroll-scale-in, #about .scroll-slide-up');
                animateElements.forEach(el => observer.unobserve(el));
                window.removeEventListener('resize', checkMobile);
            };
        }
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section id="about" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10 w-full">
                {isMobile ? (
                    <div className="text-center mb-8 scroll-fade-in">
                        <h2 className="text-2xl xs:text-3xl font-bold mb-4 break-words">
                            About Us
                        </h2>
                    </div>
                ) : (
                    <motion.div 
                        className="text-center mb-8 sm:mb-12"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                            About Us
                        </h2>
                    </motion.div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch w-full">
                    {isMobile ? (
                        <div className="flex flex-col space-y-6 h-full w-full">
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex-1 flex flex-col justify-center scroll-slide-left delay-200">
                                <h3 className="text-lg font-bold mb-3 text-white break-words">
                                    Our Mission
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-300 break-words">
                                    We are a dedicated team committed to delivering high-quality solutions to our clients. 
                                    Our mission is to innovate and lead in our industry.
                                </p>
                            </div>
                            
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex-1 flex flex-col justify-center scroll-slide-right delay-400">
                                <h3 className="text-lg font-bold mb-3 text-white break-words">
                                    What is FOSS?
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-300 break-words">
                                    FOSS means Free and Open Source Software. It doesn't mean software is free of cost. 
                                    It means that source code of the software is open for all and anyone is free to use, 
                                    study and modify the code.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <motion.div 
                            className="flex flex-col space-y-6 sm:space-y-8 h-full"
                            initial={{ x: -200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <motion.div 
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 flex-1 flex flex-col justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
                                    Our Mission
                                </h3>
                                <p className="text-base xs:text-lg sm:text-xl leading-relaxed text-gray-300">
                                    We are a dedicated team committed to delivering high-quality solutions to our clients. 
                                    Our mission is to innovate and lead in our industry.
                                </p>
                            </motion.div>
                            
                            <motion.div 
                                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 flex-1 flex flex-col justify-center"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
                                    What is FOSS?
                                </h3>
                                <p className="text-base xs:text-lg sm:text-xl leading-relaxed text-gray-300">
                                    FOSS means Free and Open Source Software. It doesn't mean software is free of cost. 
                                    It means that source code of the software is open for all and anyone is free to use, 
                                    study and modify the code.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                    
                    {isMobile ? (
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex flex-col justify-between h-full w-full scroll-scale-in delay-600">
                            <div>
                                <h3 className="text-lg font-bold mb-3 text-white break-words">
                                    Community Driven Development
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-300 mb-4 break-words">
                                    This principle allows other people to contribute to the development and improvement 
                                    of a software like a community.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-center mt-auto">
                                <div className="bg-white/10 rounded-lg p-2 border border-white/20 scroll-slide-up delay-700">
                                    <div className="text-sm font-bold text-white">Open</div>
                                    <div className="text-xs text-gray-400">Source Code</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-2 border border-white/20 scroll-slide-up delay-800">
                                    <div className="text-sm font-bold text-white">Free</div>
                                    <div className="text-xs text-gray-400">To Modify</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-2 border border-white/20 scroll-slide-up delay-700">
                                    <div className="text-sm font-bold text-white">Community</div>
                                    <div className="text-xs text-gray-400">Driven</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-2 border border-white/20 scroll-slide-up delay-800">
                                    <div className="text-sm font-bold text-white">Innovation</div>
                                    <div className="text-xs text-gray-400">Focused</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <motion.div 
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 flex flex-col justify-between h-full"
                            initial={{ x: 200, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div>
                                <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white">
                                    Community Driven Development
                                </h3>
                                <p className="text-base xs:text-lg sm:text-xl leading-relaxed text-gray-300 mb-6 sm:mb-8">
                                    This principle allows other people to contribute to the development and improvement 
                                    of a software like a community.
                                </p>
                            </div>
                            <motion.div 
                                className="grid grid-cols-2 gap-2 sm:gap-4 text-center mt-auto"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1,
                                            delayChildren: 0.8
                                        }
                                    }
                                }}
                                initial="hidden"
                                whileInView="visible"
                            >
                                <motion.div 
                                    className="bg-white/10 rounded-lg p-3 sm:p-6 border border-white/20"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="text-lg sm:text-2xl font-bold text-white">Open</div>
                                    <div className="text-xs sm:text-sm text-gray-400">Source Code</div>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 rounded-lg p-3 sm:p-6 border border-white/20"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="text-lg sm:text-2xl font-bold text-white">Free</div>
                                    <div className="text-xs sm:text-sm text-gray-400">To Modify</div>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 rounded-lg p-3 sm:p-6 border border-white/20"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="text-lg sm:text-2xl font-bold text-white">Community</div>
                                    <div className="text-xs sm:text-sm text-gray-400">Driven</div>
                                </motion.div>
                                <motion.div 
                                    className="bg-white/10 rounded-lg p-3 sm:p-6 border border-white/20"
                                    variants={{
                                        hidden: { scale: 0 },
                                        visible: { scale: 1 }
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="text-lg sm:text-2xl font-bold text-white">Innovation</div>
                                    <div className="text-xs sm:text-sm text-gray-400">Focused</div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}