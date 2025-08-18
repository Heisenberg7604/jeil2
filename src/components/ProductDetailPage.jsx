import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronLeft, ChevronRight, X, Shield, Truck, Award, ArrowLeft } from 'lucide-react';

const ProductDetailPage = ({ product, isDark, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Sample product data structure with multiple images and specs
    const productData = {
        'fibc': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'pp-woven': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'stretch-wrap': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'polymer-masking': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'vci-stretch': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'breathable': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'pvc-cling': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'pvc-industrial': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'anti-fog': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'garbage-bags': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'pp-roofing': {
            images: [
                'dist/assets/products/PP_roofingsheet.jpg',
                'dist/assets/facility/bales.png',
            ],
            fullDescription: "Advanced polymer bonded masking film designed for protecting sensitive surfaces during processing, painting, and finishing operations. This high-performance film provides excellent adhesion and clean removal without residue.",
            features: [
                "Multi colour printed : 20 desings.",
                "Textured : glossy/fine matt/ frosted / leather/ diamond/ PC emboss (dip emboss) / PC line etc."
            ],
            applications: [
                "Gate sheet",
                "Elevation", 
                "Car Parking Shed"
            ],
            specifications: {
                "Thickness": "0.7 - 3 microns",
                "Width": "upto 1500 mm"
            }
        },
        'pp-door': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'slip-sheet': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'hips-sheet': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'pp-box-strapping': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'air-bubble': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
        'ldpe-shrink': {
            images: [
                
            ],
            fullDescription: "",
            features: [
               
            ],
            applications: [

            ],
            specifications: {
               
            }
        },
    };

    const currentProduct = productData[product?.id] || {};
    const { images = [product?.image], fullDescription, features = [], applications = [], specifications } = currentProduct;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openImageModal = (index) => {
        setCurrentImageIndex(index);
        setIsImageModalOpen(true);
    };

    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(nextImage, 5000);
            return () => clearInterval(interval);
        }
    }, [images.length]);

    if (!product) return null;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={onClose}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Products</span>
                    </button>
                    
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${
                            isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Slideshow */}
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="relative h-96 rounded-lg overflow-hidden">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => openImageModal(currentImageIndex)}
                                />
                                
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                            
                            {images.length > 1 && (
                                <div className="flex justify-center space-x-2 mt-4">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-colors ${
                                                index === currentImageIndex
                                                    ? 'bg-red-500'
                                                    : isDark ? 'bg-gray-600' : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                            index === currentImageIndex
                                                ? 'border-red-500'
                                                : isDark ? 'border-gray-600' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div>
                        <div className="flex items-center mb-4">
                            <Package className={`w-8 h-8 mr-3 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                {product.name}
                            </h1>
                        </div>

                        <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {fullDescription || product.description}
                        </p>

                        {/* Key Features */}
                        {features.length > 0 && (
                            <div className="mb-8">
                                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Key Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Shield className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Applications */}
                        {applications.length > 0 && (
                            <div className="mb-8">
                                <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    Applications
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {applications.map((app, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Truck className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {app}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Button */}
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white ${
                                    isDark ? 'bg-red-500 hover:bg-red-600' : 'bg-red-600 hover:bg-red-700'
                                } transition-colors`}
                            >
                                Request Quote
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className={`px-6 py-3 rounded-lg border font-semibold transition-colors ${
                                    isDark
                                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                {specifications && (
                    <div className="mt-12">
                        <div className="flex items-center mb-6">
                            <Award className={`w-6 h-6 mr-3 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Technical Specifications
                            </h2>
                        </div>
                        
                        <div className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                            <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                Specification
                                            </th>
                                            <th className={`px-6 py-4 text-left font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                                Value
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(specifications).map(([key, value], index) => (
                                            <tr
                                                key={key}
                                                className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
                                            >
                                                <td className={`px-6 py-4 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                                    {key}
                                                </td>
                                                <td className={`px-6 py-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                    {value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            <AnimatePresence>
                {isImageModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-60 bg-black bg-opacity-90 flex items-center justify-center p-4"
                        onClick={() => setIsImageModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="relative max-w-4xl max-h-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={images[currentImageIndex]}
                                alt={product.name}
                                className="max-w-full max-h-full object-contain"
                            />
                            <button
                                onClick={() => setIsImageModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetailPage;