import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Package, Factory, Truck } from 'lucide-react';

const Gallery = ({ isDark }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const galleryImages = [
        {
            id: 1,
            src: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200',
            alt: 'Manufacturing Facility',
            category: 'facility',
            title: 'State-of-the-art Manufacturing'
        },
        {
            id: 2,
            src: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200',
            alt: 'Production Line',
            category: 'production',
            title: 'Production Line Excellence'
        },
        {
            id: 3,
            src: 'https://images.unsplash.com/photo-1635405074683-96d6921a2a68?auto=format&fit=crop&w=1200',
            alt: 'Stretch Film Production',
            category: 'products',
            title: 'Stretch Film Production'
        },
        {
            id: 4,
            src: 'https://images.unsplash.com/photo-1615800098779-1be32e60cca3?auto=format&fit=crop&w=1200',
            alt: 'Raw Materials',
            category: 'materials',
            title: 'Quality Raw Materials'
        },
        {
            id: 5,
            src: 'https://images.unsplash.com/photo-1591880907925-b189df2da5d4?auto=format&fit=crop&w=1200',
            alt: 'PP Pellets',
            category: 'materials',
            title: 'PP Pellets Processing'
        },
        {
            id: 6,
            src: 'https://images.unsplash.com/photo-1620283085439-39aed3b5e4b2?auto=format&fit=crop&w=1200',
            alt: 'PET Resin',
            category: 'materials',
            title: 'PET Resin Storage'
        },
        {
            id: 7,
            src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200',
            alt: 'PP Film',
            category: 'products',
            title: 'PP Film Manufacturing'
        },
        {
            id: 8,
            src: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=1200',
            alt: 'Quality Control',
            category: 'facility',
            title: 'Quality Control Process'
        }
    ];

    const categories = [
        { id: 'all', name: 'All', icon: Package },
        { id: 'facility', name: 'Facility', icon: Factory },
        { id: 'production', name: 'Production', icon: Package },
        { id: 'materials', name: 'Materials', icon: Package },
        { id: 'products', name: 'Products', icon: Package }
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
        <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-16">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-4xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-800'}`}
                >
                    Our Gallery
                </motion.h1>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setActiveCategory(category.id)}
                            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${activeCategory === category.id
                                ? 'bg-red-600 text-white'
                                : isDark
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <category.icon className="w-5 h-5 mr-2" />
                            {category.name}
                        </motion.button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className={`rounded-lg overflow-hidden cursor-pointer shadow-xl ${isDark ? 'bg-gray-800' : 'bg-white'
                                }`}
                            onClick={() => openImage(image, index)}
                        >
                            <div className="relative h-48">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 hover:opacity-100 transition-opacity">
                                    <h3 className="font-semibold text-sm">{image.title}</h3>
                                </div>
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
                            <div className="relative max-w-4xl max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={closeImage}
                                    className="absolute top-4 right-4 z-10 text-white hover:text-gray-300"
                                >
                                    <X size={24} />
                                </button>

                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />

                                <div className="text-center mt-4">
                                    <h3 className="text-white text-xl font-semibold">{selectedImage.title}</h3>
                                </div>

                                {/* Navigation */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                                >
                                    <ChevronLeft size={32} />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                                >
                                    <ChevronRight size={32} />
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
