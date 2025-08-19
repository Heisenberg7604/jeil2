import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import ProductDetailPage from '../components/ProductDetailPage';

const Products = ({ isDark }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showProductDetail, setShowProductDetail] = useState(false);

    const products = [
        {
            id: 'fibc',
            name: 'FIBC (Jumbo Bags)',
            description: 'Heavy-duty flexible intermediate bulk containers for industrial packaging',
            image: 'dist/assets/products/Bulk Bags.jpg'
        },
        {
            id: 'pp-woven',
            name: 'PP Woven Sack / Fabric',
            description: 'Durable polypropylene woven sacks for various packaging needs',
            image: 'dist/assets/products/woven-sack.jpg'
        },
        {
            id: 'pvc-cling',
            name: 'PVC Cling & Industrial Clining Film',
            description: 'Transparent cling film for food packaging and general wrapping',
            image: 'dist/assets/products/shrink-film2.jpg'
        },
        {
            id: 'garbage-bags',
            name: 'Garbage Bags',
            description: 'Strong and reliable waste management solutions for various applications',
            image: 'dist/assets/products/garbage-bag3.png'
        },
        {
            id: 'pp-roofing',
            name: 'PP Roofing Sheet',
            description: 'Weather-resistant polypropylene sheets for roofing applications',
            image: 'dist/assets/products/PP_roofingsheet.jpg'
        },
         {
            id: 'pp-box-strapping',
            name: 'PP Box Strapping',
            description: 'Strong polypropylene strapping for secure box and package binding',
            image: 'dist/assets/products/box-strapping2.jpg',

        },
        {
            id: 'air-bubble',
            name: 'Air Bubble Film',
            description: 'Protective cushioning film for fragile items during shipping',
            image: 'dist/assets/products/bubble-wrap2.png'
        },
        {
            id: 'stretch-wrap',
            name: 'Stretch Wrapping Film',
            description: 'High-quality stretch film for secure packaging and pallet wrapping',
            image: 'dist/assets/products/stretch-film2.jpeg'
        },
        {
            id: 'polymer-masking',
            name: 'Polymer Bonded Masking Film',
            description: 'Advanced protection film for sensitive surfaces during processing',
            image: 'dist/assets/products/POLYMER BONDED MASKING FILM _B.jpg'
        },
        {
            id: 'vci-stretch',
            name: 'VCI Stretch Film',
            description: 'Vapor corrosion inhibitor film for metal protection during storage',
            image: 'dist/assets/products/VCI STRETCH FILM _B.jpg'
        },
        {
            id: 'anti-fog',
            name: 'Anti-fog Films',
            description: 'Specialized films that prevent condensation and maintain clarity',
            image: 'dist/assets/products/ANTI FOG CLING FILM_B.jpg'
        },
        {
            id: 'pp-door',
            name: 'PP Door Panel',
            description: 'Durable polypropylene panels for door manufacturing and construction',
            image: 'dist/assets/products/ANGLE BOARDS & EDGE PROTECTORS_B.jpg'
        },
        {
            id: 'slip-sheet',
            name: 'Plastic Slip Sheet',
            description: 'Cost-effective alternative to pallets for material handling',
            image: 'dist/assets/products/SLIP SHEET_B.jpg'
        },
        {
            id: 'ldpe-shrink',
            name: 'LDPE Shrink Film',
            description: 'Low-density polyethylene film that shrinks when heated for tight packaging',
            image: 'https://images.unsplash.com/photo-1535813547-3e2f90a94d3c?auto=format&fit=crop&w=800'
        },
        {
            id: 'silage-film',
            name: 'Silage Film',
            description: 'Specialized film for agricultural silage applications',
            image: 'dist/assets/products/SILAGE FILM.jpg'
        },
        {
            id: 'upvc-roofing',
            name: 'UPVC Roofing Sheet',
            description: 'Durable and weather-resistant roofing solution',
            image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800'
        },
        {
            id: 'grow-bag',
            name: 'Grow Bag',
            description: 'Durable and breathable bags for plant growth',
            image: 'dist/assets/products/grow-bag.jpg'
        },
        {
            id: 'mulching-film',
            name: 'Mulching Film',
            description: 'Specialized film for agricultural mulching applications',
            image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800'
        },
        {
            id: 'upvc-foam-sheet',
            name: 'UPVC Foam Sheet',
            description: 'Lightweight and durable foam sheet for various applications',
            image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800'
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <div className="relative h-48">
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
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setShowProductDetail(true);
                                    }}
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Product Detail Page */}
                <AnimatePresence>
                    {showProductDetail && selectedProduct && (
                        <ProductDetailPage
                            product={selectedProduct}
                            isDark={isDark}
                            onClose={() => setShowProductDetail(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Products;