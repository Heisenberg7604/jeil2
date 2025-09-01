import React from 'react';
import { motion } from 'framer-motion';
import { Package, Shield, Truck, Users } from 'lucide-react';
import Hero from '../components/Hero';
import ParallaxProducts from '../components/ParallaxProducts';
import ParallaxRawMaterials from '../components/ParallaxRawMaterials';

const Home = ({ isDark }) => {
    const features = [
        {
            icon: Package,
            title: "Premium Quality",
            description: "Industry-leading packaging solutions crafted with precision"
        },
        {
            icon: Shield,
            title: "ISO Certified",
            description: "Internationally recognized quality management systems"
        },
        {
            icon: Truck,
            title: "Global Delivery",
            description: "Reliable shipping to destinations worldwide"
        },
        {
            icon: Users,
            title: "Expert Support",
            description: "Dedicated team of packaging specialists at your service"
        }
    ];

    return (
        <>
            <Hero />

            {/* Parallax Products Section */}
            <ParallaxProducts isDark={isDark} />

            <section className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Why Choose JEIL?
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            We combine innovation with expertise to deliver packaging solutions that exceed expectations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
                            >
                                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center mb-6 mx-auto`}>
                                    <feature.icon className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                </div>
                                <h3 className={`text-xl font-semibold mb-3 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {feature.title}
                                </h3>
                                <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Raw Materials Section */}
            <ParallaxRawMaterials isDark={isDark} />

            <section className={`py-24 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Leading the Industry in Innovation
                            </h2>
                            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                With over a decade of experience, we've established ourselves as pioneers in the packaging industry.
                                Our commitment to quality and innovation drives us to continuously improve and evolve our solutions.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "State-of-the-art manufacturing facility",
                                    "Rigorous quality control processes",
                                    "Environmentally conscious practices",
                                    "Custom solutions for unique requirements"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'} mr-3`} />
                                        {item}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img
                                src="/assets/facility/facility8.JPG"
                                alt="Manufacturing Facility"
                                className="rounded-lg shadow-2xl"
                            />
                            <div className={`absolute -bottom-6 -right-6 p-6 rounded-lg ${isDark ? 'bg-red-500' : 'bg-red-600'} text-white`}>
                                <p className="text-3xl font-bold">25+</p>
                                <p className="text-sm">Years of Excellence</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
