'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WhatWeDo() {
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
                const animateElements = document.querySelectorAll('#what-we-do .scroll-fade-in, #what-we-do .scroll-slide-left, #what-we-do .scroll-slide-right, #what-we-do .scroll-scale-in, #what-we-do .scroll-slide-up');
                animateElements.forEach(el => observer.observe(el));
            }, 100);

            return () => {
                const animateElements = document.querySelectorAll('#what-we-do .scroll-fade-in, #what-we-do .scroll-slide-left, #what-we-do .scroll-slide-right, #what-we-do .scroll-scale-in, #what-we-do .scroll-slide-up');
                animateElements.forEach(el => observer.unobserve(el));
                window.removeEventListener('resize', checkMobile);
            };
        }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const sections = [
        {
            id: 1,
            title: "HACKATHONS",
            content: "Organize coding competitions to solve real-world problems using FOSS.",
            route: "/hackathons"
        },
        {
            id: 2,
            title: "WORKSHOPS",
            content: "Conduct hands-on sessions on various FOSS technologies and tools.",
            route: "/workshops"
        },
        {
            id: 3,
            title: "EVENTS",
            content: "Host seminars, conferences, and meetups focused on FOSS topics.",
            route: "/events"
        },
        {
            id: 4,
            title: "ONLINE SESSIONS",
            content: "Deliver webinars and virtual workshops on FOSS subjects.",
            route: "/online-sessions"
        }
    ];

    return (
        <section id="what-we-do" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {isMobile ? (
                    <div className="text-center mb-8 scroll-fade-in">
                        <h2 className="text-2xl xs:text-3xl font-bold mb-4 wrap-break-word">
                            What We Do
                        </h2>
                    </div>
                ) : (
                    <motion.div
                        className="text-center mb-12 sm:mb-16"
                        style={{ willChange: 'transform, opacity' }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                            What We Do
                        </h2>
                    </motion.div>
                )}

                <div className="space-y-6 sm:space-y-8 w-full">
                    {sections.map((section, index) => (
                        isMobile ? (
                            // Mobile layout with CSS animations
                            <div key={section.id} className={`w-full ${index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}>
                                <div
                                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 w-full scroll-slide-up delay-200"
                                    style={{ transitionDelay: `${200 + index * 200}ms` }}
                                >
                                    <h3 className="text-lg font-bold mb-3 text-white wrap-break-word">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-300 mb-3 wrap-break-word">
                                        {section.content}
                                    </p>
                                    <Link href={section.route}>
                                        <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 border border-blue-400 hover:border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-400/10 text-sm pulse-animation">
                                            View More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            // Desktop layout: content card with a horizontal line accent extending to the edge.
                            // Grid (not flex) so the line's 1fr track is guaranteed the leftover space instead
                            // of competing with the card's own width:100% flex-basis.
                            // Alternates sides: 1st/3rd section has the line on the right, 2nd/4th on the left.
                            (() => {
                                const lineOnLeft = index % 2 === 1;
                                const card = (
                                    <motion.div
                                        key="card"
                                        className="bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 relative z-10"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">
                                            {section.title}
                                        </h3>
                                        <p className="text-base xs:text-lg sm:text-xl leading-relaxed text-gray-300 mb-4 sm:mb-6">
                                            {section.content}
                                        </p>
                                        <Link href={section.route}>
                                            <motion.button
                                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 border border-blue-400 hover:border-blue-300 px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-400/10 text-sm sm:text-base"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                View More
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                );
                                const line = <div key="line" className="h-px bg-white/20" />;

                                return (
                                    <motion.div
                                        key={section.id}
                                        className="grid items-center gap-2"
                                        style={{ gridTemplateColumns: '1fr 1fr', willChange: 'transform, opacity' }}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                    >
                                        {lineOnLeft ? [line, card] : [card, line]}
                                    </motion.div>
                                );
                            })()
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}
