import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ParallaxRawMaterials = ({ isDark }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform values for different elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 10]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -15]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

    return (
        <div
            ref={containerRef}
            className="relative h-screen overflow-hidden"
        >
            <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-black'}`}>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-red-900/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Parallax Images */}
                    <div className="relative h-[500px] hidden lg:block">
                        {/* HDPE Granules */}
                        <motion.div
                            style={{ y: y1, rotate: rotate1, scale: scale1 }}
                            className="absolute top-[15%] right-[20%] w-[250px] h-[250px] z-20"
                        >
                            <img
                                src="/assets/facility/facility5.JPG"
                                alt="HDPE Granules"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* PP Pellets */}
                        <motion.div
                            style={{ y: y2, rotate: rotate2 }}
                            className="absolute bottom-[20%] left-[10%] w-[200px] h-[200px] z-10"
                        >
                            <img
                                src="/assets/facility/facility3.jpg"
                                alt="PP Pellets"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* PET Resin */}
                        <motion.div
                            style={{ y: y3 }}
                            className="absolute top-[40%] left-[25%] w-[180px] h-[180px] z-30"
                        >
                            <img
                                src="/assets/facility/facility4.jpg"
                                alt="PET Resin"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>

                    <div className="z-10 lg:ml-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                        >
                            From Basics <br />
                            <span className="text-red-400">To Beyond</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl text-white/90 mb-8 max-w-xl"
                        >
                            Our raw material solutions range from standard polymers to specialized blends, from HDPE and PP to custom formulations designed for your specific application requirements.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/gallery')}
                            className="px-8 py-3 bg-red-600 text-white rounded-lg text-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            Explore Gallery
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Fun Fact */}
            <div className="absolute bottom-8 left-8 max-w-xs">
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-red-500 mt-1"></div>
                    <div>
                        <h4 className="text-white font-bold mb-2">Fun Fact:</h4>
                        <p className="text-white/80 text-sm">
                            HDPE is so versatile that a single kilogram can be used to produce items as diverse as bottle caps, chemical-resistant containers, and high-strength films.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParallaxRawMaterials;
