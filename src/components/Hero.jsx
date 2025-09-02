import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="relative h-screen">
            {/* Background Video */}
            <div className="absolute inset-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/assets/hero.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center justify-center text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
                    >
                        Innovative Packaging Solutions
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed"
                    >
                        Elevating your products with premium quality packaging solutions for the modern industry
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/products"
                                className="bg-red-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-red-700 transition-colors inline-block w-full sm:w-auto text-center"
                            >
                                Explore Products
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                                to="/contact"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium border-2 border-white text-white hover:bg-white/10 transition-colors inline-block w-full sm:w-auto text-center"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
            >
                <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
            </motion.div>
        </div>
    );
};

export default Hero;
