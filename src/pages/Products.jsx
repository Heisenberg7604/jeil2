import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

const Products = ({ isDark }) => {
    const [activeProduct, setActiveProduct] = useState(null);

    const products = [
        {
            id: 'stretch',
            name: 'Stretch Wrapping Film',
            description: 'High-quality stretch film for secure packaging',
            image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800'
        },
        {
            id: 'polymer',
            name: 'Polymer Bonded Masking Film',
            description: 'Advanced protection for sensitive surfaces',
            image: 'https://images.unsplash.com/photo-1535813547-3e2f90a94d3c?auto=format&fit=crop&w=800'
        },
        {
            id: 'vci',
            name: 'VCI Stretch Film',
            description: 'Corrosion protection for metal products',
            image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=800'
        },
        {
            id: 'breathable',
            name: 'Breathable Films',
            description: 'Allows air flow while maintaining protection',
            image: 'https://images.unsplash.com/photo-1536566482680-fca31930a0bd?auto=format&fit=crop&w=800'
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
                    Our Products
                </motion.h1>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-lg overflow-hidden shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'
                                }`}
                        >
                            <div className="relative h-64">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Package className={`w-6 h-6 mr-2 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                        {product.name}
                                    </h3>
                                </div>

                                <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {product.description}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className={`px-4 py-2 rounded-lg text-white ${isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
                                        }`}
                                    onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
