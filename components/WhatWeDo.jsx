'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LazyVideoOverlay from './LazyVideoOverlay';

export default function WhatWeDo() {
    const sections = [
        {
            id: 1,
            title: "HACKATHONS",
            content: "Organize coding competitions to solve real-world problems using FOSS.",
            route: "/hackathons",
            image: "/hackathon.jpg",
            imagePosition: "right"
        },
        {
            id: 2,
            title: "WORKSHOPS",
            content: "Conduct hands-on sessions on various FOSS technologies and tools.",
            route: "/workshops",
            image: "/workshop.jpg",
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
        <section id="what-we-do" className="relative py-16 px-4 sm:px-6 md:px-8 text-white">
            <LazyVideoOverlay videoSrc="/overlay.mp4" opacity={0.08} />
            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        What We Do
                    </h2>
                </motion.div>

                <div className="space-y-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.id}
                            className={`grid lg:grid-cols-2 gap-8 items-center ${
                                section.imagePosition === 'right' ? 'lg:grid-flow-col' : 'lg:grid-flow-col-dense'
                            }`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            {/* Content */}
                            <motion.div 
                                className={`bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 order-2 ${
                                    section.imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-white">
                                    {section.title}
                                </h3>
                                <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6">
                                    {section.content}
                                </p>
                                <Link href={section.route}>
                                    <motion.button
                                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 border border-blue-400 hover:border-blue-300 px-6 py-2 rounded-lg hover:bg-blue-400/10"
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
                                        className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Placeholder when image doesn't load */}
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hidden items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">📸</div>
                                            <p className="text-xl text-gray-300">{section.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}