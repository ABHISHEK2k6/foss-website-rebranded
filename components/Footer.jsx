'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        // Optimized intersection observer for footer only
        if (window.innerWidth <= 768) {
            const footerElement = document.querySelector('footer');
            if (footerElement) {
                // Add the animate-ready class to enable hidden initial state
                footerElement.classList.add('footer-animate-ready');
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Add a small delay to prevent sudden animations
                            setTimeout(() => {
                                entry.target.classList.add('animate-in');
                            }, 50); // Reduced delay
                        }
                    });
                },
                { 
                    threshold: 0.05, // Lower threshold for footer
                    rootMargin: '0px 0px 0px 0px' // No margin for immediate trigger
                }
            );

            // Observe footer elements with minimal delay
            setTimeout(() => {
                const footerElements = document.querySelectorAll('.scroll-footer-fade, .scroll-footer-slide, .scroll-footer-social');
                footerElements.forEach(el => observer.observe(el));
            }, 100); // Reduced delay

            return () => {
                const footerElements = document.querySelectorAll('.scroll-footer-fade, .scroll-footer-slide, .scroll-footer-social');
                footerElements.forEach(el => observer.unobserve(el));
                if (footerElement) {
                    footerElement.classList.remove('footer-animate-ready');
                }
                window.removeEventListener('resize', checkMobile);
            };
        }
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        isMobile ? (
            // Mobile version with CSS animations and better spacing
            <footer className="relative bg-gradient-to-t from-gray-900/50 to-transparent backdrop-blur-sm border-t border-white/10 py-8 px-6 text-white overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                    <div className="space-y-6">
                        <div className="scroll-footer-fade delay-100">
                            <h2 className="text-2xl font-bold mb-3 break-words">
                                FOSS UCEK
                            </h2>
                            <p className="text-base text-gray-300 mb-2 break-words leading-relaxed">
                                University College of Engineering Kariyavattom
                            </p>
                            <p className="text-sm text-gray-400 mb-4 break-words">
                                Thiruvananthapuram, Kerala, India
                            </p>
                        </div>
                        
                        {/* Email */}
                        <div className="mb-6 scroll-footer-slide delay-200">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                                <span className="text-base text-gray-300 block mb-1">Email</span>
                                <a 
                                    href="mailto:fossucek@gmail.com"
                                    className="text-base text-blue-400 hover:text-blue-300 transition-colors duration-300 underline break-all"
                                >
                                    foss@uck.ac.in
                                </a>
                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-6 mb-6 scroll-footer-social delay-300">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/company/foss-ucek/" 
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/foss_ucek?igsh=bDJqZHlxNzhlaWsx"
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-110"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                                </svg>
                            </a>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/20 pt-4 scroll-footer-slide delay-400">
                            <p className="text-sm text-gray-400 break-words">
                                © 2024 FOSS UCEK. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        ) : (
            // Desktop version with Framer Motion animations
            <motion.footer 
                className="relative bg-gradient-to-t from-gray-900/50 to-transparent backdrop-blur-sm border-t border-white/10 py-4 sm:py-6 px-4 sm:px-6 md:px-8 text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Main Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                            FOSS UCEK
                        </h2>
                        <p className="text-sm xs:text-base sm:text-lg text-gray-300 mb-1">
                            University College of Engineering Kariyavattom
                        </p>
                        <p className="text-xs xs:text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
                            Thiruvananthapuram, Kerala, India
                        </p>
                        
                        {/* Email */}
                        <div className="mb-3 sm:mb-4">
                            <span className="text-sm xs:text-base text-gray-300">Email: </span>
                            <motion.a 
                                href="mailto:fossucek@gmail.com"
                                className="text-sm xs:text-base text-blue-400 hover:text-blue-300 transition-colors duration-300 underline break-all"
                                whileHover={{ scale: 1.05 }}
                            >
                                foss.uck.ac.in
                            </motion.a>
                        </div>

                        {/* Social Media Icons */}
                        <motion.div 
                            className="flex justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.4
                                    }
                                }
                            }}
                            initial="hidden"
                            whileInView="visible"
                        >
                            {/* LinkedIn */}
                            <motion.a
                                href="https://www.linkedin.com/company/foss-ucek/"
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300"
                                variants={{
                                    hidden: { scale: 0, rotate: 180 },
                                    visible: { scale: 1, rotate: 0 }
                                }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </motion.a>

                            {/* Instagram */}
                            <motion.a
                                href="https://www.instagram.com/foss_ucek?igsh=bDJqZHlxNzhlaWsx"
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 hover:bg-white/20 transition-colors duration-300"
                                variants={{
                                    hidden: { scale: 0, rotate: 180 },
                                    visible: { scale: 1, rotate: 0 }
                                }}
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
                                </svg>
                            </motion.a>
                        </motion.div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div 
                        className="border-t border-white/20 pt-2 sm:pt-3"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <p className="text-xs xs:text-sm sm:text-base text-gray-400">
                            © 2024 FOSS UCEK. All rights reserved.
                        </p>
                    </motion.div>
                </div>
            </motion.footer>
        )
    );
}