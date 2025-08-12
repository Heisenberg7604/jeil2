import React from 'react';
import { motion } from 'framer-motion';
import { Package, Leaf, Shield, Zap } from 'lucide-react';

const Materials = ({ isDark }) => {
    const materials = [
        {
            id: 'hdpe',
            name: 'HDPE (High-Density Polyethylene)',
            description: 'Versatile polymer with excellent chemical resistance and strength',
            properties: ['High strength', 'Chemical resistant', 'UV stable', 'Recyclable'],
            image: 'https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=800'
        },
        {
            id: 'pp',
            name: 'PP (Polypropylene)',
            description: 'Lightweight material with good thermal and chemical properties',
            properties: ['Lightweight', 'Thermal resistant', 'Chemical resistant', 'Food safe'],
            image: 'https://images.unsplash.com/photo-1591880907925-b189df2da5d4?auto=format&fit=crop&w=800'
        },
        {
            id: 'pet',
            name: 'PET (Polyethylene Terephthalate)',
            description: 'Clear, strong material ideal for packaging applications',
            properties: ['Crystal clear', 'High strength', 'Barrier properties', 'Recyclable'],
            image: 'https://images.unsplash.com/photo-1620283085439-39aed3b5e4b2?auto=format&fit=crop&w=800'
        },
        {
            id: 'ldpe',
            name: 'LDPE (Low-Density Polyethylene)',
            description: 'Flexible material with excellent impact resistance',
            properties: ['Flexible', 'Impact resistant', 'Moisture barrier', 'Cost effective'],
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800'
        }
    ];

    return (
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    Raw Materials
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`text-lg text-center mb-16 max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                    We source and process the highest quality raw materials to ensure our packaging solutions meet the most demanding requirements.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {materials.map((material, index) => (
                        <motion.div
                            key={material.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-xl overflow-hidden shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'
                                }`}
                        >
                            <div className="relative h-64">
                                <img
                                    src={material.image}
                                    alt={material.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            <div className="p-8">
                                <div className="flex items-center mb-4">
                                    <Package className={`w-6 h-6 mr-3 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                    <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {material.name}
                                    </h3>
                                </div>

                                <p className={`mb-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {material.description}
                                </p>

                                <div>
                                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        Key Properties:
                                    </h4>
                                    <ul className="space-y-2">
                                        {material.properties.map((property, propIndex) => (
                                            <li key={propIndex} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-red-400' : 'bg-red-600'} mr-3`} />
                                                {property}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Quality Assurance Section */}
                <section className={`mt-20 p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            Quality Assurance
                        </h2>
                        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Every batch of raw material undergoes rigorous testing to ensure it meets our strict quality standards.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {[
                            { icon: Shield, title: 'Certified Quality', desc: 'ISO 9001:2015 certified processes' },
                            { icon: Leaf, title: 'Sustainable Sourcing', desc: 'Environmentally responsible procurement' },
                            { icon: Zap, title: 'Performance Testing', desc: 'Rigorous material testing protocols' }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className={`w-16 h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center mb-4 mx-auto`}>
                                    <item.icon className={`w-8 h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                </div>
                                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    {item.title}
                                </h3>
                                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Materials;
