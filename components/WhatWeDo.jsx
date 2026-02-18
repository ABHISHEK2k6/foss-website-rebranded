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
            route: "/hackathons",
            image: "/events.jpg",
            imagePosition: "right"
        },
        {
            id: 2,
            title: "WORKSHOPS",
            content: "Conduct hands-on sessions on various FOSS technologies and tools.",
            route: "/workshops",
            image: "/events.jpg",
            imagePosition: "left"
        },
        {
            id: 3,
            title: "EVENTS",
            content: "Host seminars, conferences, and meetups focused on FOSS topics.",
            route: "/events",
            image: "/events.jpg",
            imagePosition: "right"
        },
        {
            id: 4,
            title: "ONLINE SESSIONS",
            content: "Deliver webinars and virtual workshops on FOSS subjects.",
            route: "/online-sessions",
            image: "/online.jpg",
            imagePosition: "left"
        }
    ];

    return (
        <section id="what-we-do" className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                {isMobile ? (
                    <div className="text-center mb-8 scroll-fade-in">
                        <h2 className="text-2xl xs:text-3xl font-bold mb-4 break-words">
                            What We Do
                        </h2>
                    </div>
                ) : (
                    <motion.div 
                        className="text-center mb-12 sm:mb-16"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
                            What We Do
                        </h2>
                    </motion.div>
                )}

                <div className="space-y-8 sm:space-y-12 w-full">
                    {sections.map((section, index) => (
                        isMobile ? (
                            // Mobile layout with CSS animations
                            <div key={section.id} className={`w-full ${index % 2 === 0 ? 'scroll-slide-left' : 'scroll-slide-right'}`}>
                                <div className="delay-200" style={{ transitionDelay: `${200 + index * 200}ms` }}>
                                    {/* Image first on mobile */}
                                    <div className="mb-4">
                                        <div className={`relative overflow-hidden rounded-lg border border-white/10 scroll-scale-in delay-${200 + index * 100}`}>
                                            <img 
                                                src={section.image} 
                                                alt={section.title}
                                                className="w-full h-40 xs:h-48 object-cover"
                                                loading="lazy"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    const placeholder = e.target.parentNode.querySelector('.image-placeholder');
                                                    if (placeholder) {
                                                        placeholder.style.display = 'flex';
                                                    }
                                                }}
                                                onLoad={(e) => {
                                                    const placeholder = e.target.parentNode.querySelector('.image-placeholder');
                                                    if (placeholder) {
                                                        placeholder.style.display = 'none';
                                                    }
                                                }}
                                            />
                                            {/* Placeholder when image doesn't load */}
                                            <div className="image-placeholder absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-4xl mb-3">📸</div>
                                                    <p className="text-sm text-gray-200 break-words font-medium">{section.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 w-full scroll-slide-up delay-${400 + index * 100}`}>
                                        <h3 className="text-lg font-bold mb-3 text-white break-words">
                                            {section.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-300 mb-3 break-words">
                                            {section.content}
                                        </p>
                                        <Link href={section.route}>
                                            <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 border border-blue-400 hover:border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-400/10 text-sm pulse-animation">
                                                View More
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Desktop layout with animations
                            <motion.div
                                key={section.id}
                                className={`grid lg:grid-cols-2 gap-6 sm:gap-8 items-center ${
                                    section.imagePosition === 'right' ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
                                }`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                            >
                                {/* Content */}
                                <motion.div 
                                    className={`bg-white/5 backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 order-2 ${
                                        section.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
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
                                        >
                                            View More
                                        </motion.button>
                                    </Link>
                                </motion.div>

                                {/* Image */}
                                <motion.div 
                                    className={`order-1 ${section.imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="relative overflow-hidden rounded-lg border border-white/10">
                                        <img 
                                            src={section.image} 
                                            alt={section.title}
                                            className="w-full h-48 xs:h-56 sm:h-64 lg:h-80 xl:h-96 object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                        {/* Placeholder when image doesn't load */}
                                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hidden items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-4xl sm:text-6xl mb-4">📸</div>
                                                <p className="text-lg sm:text-xl text-gray-300">{section.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
}