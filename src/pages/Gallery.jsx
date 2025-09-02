import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Package, Factory, Truck } from 'lucide-react';

const Gallery = ({ isDark }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const galleryImages = [
        {
            id: 1,
            src: 'assets/facility/facility1.jpg',
            alt: 'Manufacturing Facility',
            category: 'facility'
        },
        {
            id: 2,
            src: 'assets/facility/facility2.JPG',
            alt: 'Production Line',
            category: 'facility'
        },
        {
            id: 3,
            src: 'assets/facility/facility3.jpg',
            alt: 'Stretch Film Production',
            category: 'facility'
        },
        {
            id: 4,
            src: 'assets/facility/facility4.jpg',
            alt: 'Raw Materials',
            category: 'facility'
        },
        {
            id: 5,
            src: 'assets/facility/facility5.JPG',
            alt: 'PP Pellets',
            category: 'facility'
        },
        {
            id: 6,
            src: 'assets/facility/facility6.png',
            alt: 'PET Resin',
            category: 'facility'
        },
        {
            id: 7,
            src: 'assets/facility/facility8.JPG',
            alt: 'PP Film',
            category: 'facility'
        },
        {
            id: 8,
            src: 'assets/facility/facility9.jpg',
            alt: 'Quality Control',
            category: 'facility'
        },
        {
            id: 9,
            src: 'assets/facility/facility10.JPG',
            alt: 'Production Line',
            category: 'facility'
        },
        {
            id: 10,
            src: 'assets/facility/facility11.jpg',
            alt: 'Stretch Film Production',
            category: 'facility'
        },
        {
            id: 11,
            src: 'assets/facility/facility12.jpg',
            alt: 'Raw Materials',
            category: 'facility'
        },
        {
            id: 12,
            src: 'assets/facility/bales.png',
            alt: 'PP Pellets',
            category: 'facility'
        },
        {
            id: 13,
            src: 'assets/facility/blown-plant.jpg',
            alt: 'PET Resin',
            category: 'facility'
        },

    ];

    const categories = [
        { id: 'all', name: 'All', icon: Package },
        { id: 'facility', name: 'Facility', icon: Factory }
    ];

    const [activeCategory, setActiveCategory] = useState('all');

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openImage = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % filteredImages.length;
        setCurrentIndex(nextIndex);
        setSelectedImage(filteredImages[nextIndex]);
    };

    const prevImage = () => {
        const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
        setCurrentIndex(prevIndex);
        setSelectedImage(filteredImages[prevIndex]);
    };

    return (
        <div className={`min-h-screen pt-16 sm:pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    Our Gallery
                </motion.h1>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${activeCategory === category.id
                                ? 'bg-red-600 text-white'
                                : isDark
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <category.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                            {category.name}
                        </motion.button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className={`rounded-lg overflow-hidden cursor-pointer shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'
                                }`}
                            onClick={() => openImage(image, index)}
                        >
                            <div className="relative h-40 sm:h-48">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
                            onClick={closeImage}
                        >
                            <div className="relative max-w-4xl max-h-full p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={closeImage}
                                    className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 text-white hover:text-gray-300"
                                >
                                    <X size={20} className="sm:w-6 sm:h-6" />
                                </button>

                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain"
                                />

                                {/* Navigation */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                                >
                                    <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                                >
                                    <ChevronRight size={24} className="sm:w-8 sm:h-8" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Gallery;
