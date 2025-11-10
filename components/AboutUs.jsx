'use client';
import { motion } from 'framer-motion';
import LazyVideoOverlay from './LazyVideoOverlay';

export default function AboutUs() {
    return (
        <section id="about" className="relative py-16 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
            <LazyVideoOverlay videoSrc="/overlay.mp4" opacity={0.1} />
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                        About Us
                    </h2>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    <motion.div 
                        className="flex flex-col space-y-8 h-full"
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div 
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 flex-1 flex flex-col justify-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                                Our Mission
                            </h3>
                            <p className="text-lg sm:text-xl leading-relaxed text-gray-300">
                                We are a dedicated team committed to delivering high-quality solutions to our clients. 
                                Our mission is to innovate and lead in our industry.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 flex-1 flex flex-col justify-center"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                                What is FOSS?
                            </h3>
                            <p className="text-lg sm:text-xl leading-relaxed text-gray-300">
                                FOSS means Free and Open Source Software. It doesn't mean software is free of cost. 
                                It means that source code of the software is open for all and anyone is free to use, 
                                study and modify the code.
                            </p>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 flex flex-col justify-between h-full"
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                                Community Driven Development
                            </h3>
                            <p className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-8">
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
                </div>
            </div>
        </section>
    );
}