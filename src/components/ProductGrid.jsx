import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

const ProductGrid = ({ products, activeProduct, setActiveProduct }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-6 rounded-lg cursor-pointer transition-colors ${activeProduct === product.id
                            ? 'bg-red-600 text-white'
                            : 'bg-white hover:bg-red-50'
                        }`}
                    onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                >
                    <product.icon className={`w-12 h-12 mb-4 ${activeProduct === product.id ? 'text-white' : 'text-red-600'
                        }`} />
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className={activeProduct === product.id ? 'text-gray-100' : 'text-gray-600'}>
                        High-quality packaging solution for industrial applications
                    </p>
                </motion.div>
            ))}
        </div>
    );
};

export default ProductGrid;
