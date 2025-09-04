import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ParallaxProducts = ({ isDark }) => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform values for different elements
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
    const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
    const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

    return (
        <div
            ref={containerRef}
            className="relative h-screen overflow-hidden"
        >
            <div className={`absolute inset-0 ${isDark ? 'bg-red-900' : 'bg-red-500'}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6"
                        >
                            Engineered for <br />
                            <span className="text-yellow-300">Performance</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl text-white/90 mb-8 max-w-xl"
                        >
                            From high-strength stretch films to specialized polymer blends, our manufacturing facility produces packaging solutions that meet the most demanding industrial requirements.
                        </motion.p>
                        <motion.button
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/products')}
                            className="px-8 py-3 bg-white text-red-600 rounded-lg text-lg font-medium hover:bg-yellow-300 transition-colors"
                        >
                            Explore Products
                        </motion.button>
                    </div>

                    {/* Parallax Images */}
                    <div className="relative h-[500px] hidden lg:block">
                        {/* Stretch Film Roll */}
                        <motion.div
                            style={{ y: y1, rotate: rotate1, scale: scale1 }}
                            className="absolute top-[10%] left-[10%] w-[200px] h-[200px] z-20"
                        >
                            <img
                                src="/assets/products/FIBC.jpg"
                                alt="FIBC bags"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* HDPE Pellets */}
                        <motion.div
                            style={{ y: y2, rotate: rotate2 }}
                            className="absolute top-[30%] right-[15%] w-[180px] h-[180px] z-10"
                        >
                            <img
                                src="/assets/products/woven-sack.jpg"
                                alt="HDPE woven fabric"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* PET Preforms */}
                        <motion.div
                            style={{ y: y3, rotate: rotate3, scale: scale2 }}
                            className="absolute bottom-[20%] left-[20%] w-[150px] h-[150px] z-30"
                        >
                            <img
                                src="/assets/products/upvcr-1 copy.png"
                                alt="UPVC Roofing Sheets"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* PP Film */}
                        <motion.div
                            style={{ y: y4 }}
                            className="absolute bottom-[10%] right-[25%] w-[220px] h-[220px] z-20"
                        >
                            <img
                                src="/assets/products/grow-bag.jpg"
                                alt="PP Film"
                                className="w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Fun Fact */}
            <div className="absolute bottom-8 right-8 max-w-xs">
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 flex-shrink-0 bg-yellow-300 mt-1"></div>
                    <div>
                        <h4 className="text-white font-bold mb-2">Fun Fact:</h4>
                        <p className="text-white/80 text-sm">
                            Modern stretch films can expand up to 300% of their original length while maintaining structural integrity, making them ideal for securing irregular loads.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParallaxProducts;
