import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ChevronLeft, ChevronRight, X, Shield, Truck, Award, ArrowLeft, Download } from 'lucide-react';
import DownloadCatalogueModal from './DownloadCatalogueModal';

const ProductDetailPage = ({ product, isDark, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    // Sample product data structure with multiple images and specs
    const productData = {
        'fibc': {
            images: [
                'assets/products/FIBC.jpg',
                'assets/products/FIBC2.jpg',
                'assets/products/FIBC3.JPG',
            ],
            fullDescription: "JEIL is capable of producing PP woven Fabric from 50 gsm to 200 gsm that can be used for a variety of applications, such as small bag, making tarapaulins, grain covers, car covers and many others.",
            features: [

            ],
            applications: [

            ],
            specifications: {
                "Base": "90 x 90 cms, 95 x 95 cms, 100 x 100 cms, 105 x105 cms",
                "Height": "90 cms, 120 cms, 140 cms, 160 cms, 180 cms"
            }
        },
        'pp-woven': {
            images: [
                'assets/products/woven-sack.jpg',
                'assets/products/fabric-roll3.jpg',
                'assets/products/woven3.jpg',
                'assets/products/HDPE_PP WOVEN FABRIC AND BAGS _B.jpg',
                'assets/products/HDPE_PP WOVEN FABRIC AND BAGS _C.jpg'
            ],
            fullDescription: "JEIL is capable of producing PP woven Fabric from 50 gsm to 200 gsm that can be used for a variety of applications, such as small bag, making tarapaulins, grain covers, car covers and many others.",
            features: [
                "PP Fabric in Roll forms & Bags",
                "Available from 50 gsm to 200 gsm",
                "Four colour flexographic printing",
                "Can be coated up to width 3000mm"
            ],
            applications: [
                "Small bags",
                "Tarapaulins",
                "Grain covers",
                "Car covers"
            ],
            specifications: {
                "Width": "300mm to 1500mm (tubular) / 600mm to 3000mm (Slit open)",
                "GSM Range": "50 gsm to 200 gsm",
                "Printing": "Four colour flexographic"
            }
        },
        'stretch-wrap': {
            images: [
                'assets/products/stretch-wrapping-film.png',
                'assets/products/StretchWrap_ManualGrade.jpg',
                'assets/products/front Images.jpg'
            ],
            fullDescription: "High performance stretch wrap (pallet wrap) film for wrapping boxes or items that have been accumulated on a pallet. Our lines of stretch films are made for performance and value.",
            features: [
                "High performance stretch wrap film",
                "Made for performance and value",
                "Simple wrapping process",
                "Provides excellent stability"
            ],
            applications: [
                "Pallet wrapping",
                "Box wrapping",
                "Item stabilization",
                "Storage and transit protection"
            ],
            specifications: {
                "Thickness": "13 microns to 200 microns",
                "Width": "50 mm to 3000 mm",
                "Yield": "up to 200% – 300%"
            }
        },
        'polymer-masking': {
            images: [
                'assets/products/POLYMER BONDED MASKING FILM _A.jpg',
                'assets/products/POLYMER BONDED MASKING FILM _B.jpg',
            ],
            fullDescription: "A multilayer plastic film with a special type of polymer having adhesive property on one side. Used for protection of a product's surface from dust, scratches and damage during manufacturing, handling and transportation.",
            features: [
                "Multilayer plastic film",
                "Special polymer with adhesive property",
                "Protects from dust and scratches",
                "Easy application and removal"
            ],
            applications: [
                "Polycarbonate Sheets protection",
                "Acrylic Sheet protection",
                "PVC, PP, HDPE Sheet protection",
                "High Gloss Metal Sheet protection"
            ],
            specifications: {
                "Type": "Multilayer plastic film",
                "Adhesive": "One side polymer adhesive",
                "Protection": "Dust, scratches, damage"
            }
        },
        'vci-stretch': {
            images: [
                'assets/products/VCI STRETCH FILM _A.jpg',
                'assets/products/VCI STRETCH FILM _B.jpg'
            ],
            fullDescription: "All-in-one anti-corrosive poly-film designed to be most effective in case of multi-metal products. Special multi-layer technology that exceeds in performance compared to other available VCI films.",
            features: [
                "Anti-corrosive poly-film",
                "Multi-layer technology",
                "Exceeds performance vs other VCI films",
                "Available in multiple forms"
            ],
            applications: [
                "Multi-metal products",
                "Steel wires protection",
                "Rods protection",
                "Tubes protection"
            ],
            specifications: {
                "Thickness": "23 mic to 100 mic",
                "Film Width": "75 mm to 1200 mm",
                "Core ID": "76 mm +/-1",
                "Forms": "VCI Rolls, VCI bags, VCI sheet"
            }
        },
        'pvc-cling': {
            images: [
                'assets/products/cling-film.jpg',
                'assets/products/cling2.jpg',
            ],
            fullDescription: "PVC/PE cling films are designed for both food and industrial applications. For food, they play a vital role in protecting meat and dairy products from microorganisms, making them a preferred choice for supermarkets, catering establishments, and household storage. For industrial use, PVC cling films offer reliable protection for electrical components, cables, and wire ropes, while also safeguarding glass and high-gloss metal surfaces without leaving any residue.",
            features: [
                "Major contributor to food safety",
                "Protects from micro-organisms",
                "Widely used for fresh meat wrapping",
                "Suitable for food storage"
            ],
            applications: [
                "Fresh meat wrapping in supermarkets",
                "Food storage in catering",
                "Home food protection",
                "Dairy product protection"
            ],
            specifications: {
                "Width": "40 - 1000 mm (For Industrial Use), 100 - 1000 mm (For Food Use)",
                "Thickness": "10 microns to 80 microns",
                "Material": "PVC/PE"
            }
        },
        'anti-fog': {
            images: [
                'assets/products/cling2.jpg',
            ],
            fullDescription: "Films with proprietary agent that keeps products free from condensation of grease. Modified films that have high affinity for water, forming a continuous thin layer over the surface.",
            features: [
                "Proprietary anti-fog agent",
                "High affinity for water",
                "Continuous thin water layer formation",
                "Infrared absorber properties"
            ],
            applications: [
                "Condensation prevention",
                "Grease-free protection",
                "Food packaging",
                "Industrial applications"
            ],
            specifications: {
                "Agent": "Proprietary anti-fog",
                "Water affinity": "High",
                "Layer formation": "Continuous thin water layer"
            }
        },
        'garbage-bags': {
            images: [
                'assets/products/garbage-bags.jpg',
                'assets/products/GARBAGE BAG.jpg',
                'assets/products/garbage-bag3.png',
                'assets/products/garbage-bag4.png'
            ],
            fullDescription: "Disposable bags used to contain rubbish, trash or garbage. Made out of plastic and typically in black colour. Convenient and sanitary way of handling garbage.",
            features: [
                "Disposable plastic bags",
                "Convenient and sanitary",
                "Lightweight design",
                "Odour minimization when wrapped"
            ],
            applications: [
                "Household waste disposal",
                "Commercial garbage collection",
                "Messy or wet rubbish",
                "Odour control"
            ],
            specifications: {
                "Size": "As per requirement",
                "Thickness": "As per requirement",
                "Material": "Plastic",
                "Color": "Typically black"
            }
        },
        'pp-roofing': {
            images: [
                'assets/products/PP_roofingsheet.jpg',
                'assets/facility/bales.png',
            ],
            fullDescription: "Wide range of PP UV coated roofing sheets available in printed and textured designs. Offering multiple design options for various roofing applications.",
            features: [
                "PP UV coated roofing sheets",
                "Multi colour printed: 20 designs",
                "Multiple texture options",
                "UV protection coating"
            ],
            applications: [
                "Gate sheet",
                "Elevation",
                "Car Parking Shed",
                "Roofing applications"
            ],
            specifications: {
                "Width": "up to 32\"",
                "Thickness": "up to 2mm",
                "Length": "up to 12 feet",
                "Designs": "20 printed designs available",
                "Textures": "Glossy/fine matt/frosted/leather/diamond/PC emboss/PC line"
            }
        },
        'pp-door': {
            images: [
                'assets/products/ANGLE BOARDS & EDGE PROTECTORS_B.jpg',
                'assets/products/ANGLE BOARDS & EDGE PROTECTORS_.jpg'
            ],
            fullDescription: "Both side textured rigid PP sheets designed for various interior applications including partitions, false ceiling, bathroom doors, and wall cladding.",
            features: [
                "Both side textured",
                "Rigid PP material",
                "Multiple size options",
                "Versatile applications"
            ],
            applications: [
                "Partition walls",
                "False ceiling",
                "Bathroom doors",
                "Wall cladding"
            ],
            specifications: {
                "Thickness": "2.5 mm to 4 mm",
                "Sizes": "6'x 2' / 6' x 2.5' / 6' x 3' / 8' x 4'",
                "Material": "Rigid PP",
                "Texture": "Both sides"
            }
        },
        'slip-sheet': {
            images: [
                'assets/products/PP_roofingsheet.jpg',
                'assets/facility/bales.png',
            ],
            fullDescription: "Used for pallet-less material handling. When placed under an object allows it to be mobilized. Special surface properties for optimal load handling.",
            features: [
                "Pallet-less material handling",
                "Higher COF on top surface",
                "Lower COF on bottom surface",
                "100% reusable and recyclable"
            ],
            applications: [
                "Material handling",
                "Forklift operations",
                "Warehouse optimization",
                "Load mobilization"
            ],
            specifications: {
                "Material handling": "Pallet-less system",
                "Reusability": "100% reusable and recyclable",
                "Moisture resistance": "Yes",
                "Bacteria resistance": "Yes",
                "Cost": "Cheaper than wooden pallets"
            }
        },
        'pp-box-strapping': {
            images: [
                'assets/products/box-strapping1.jpg',
                'assets/products/box-strapping2.jpg',
                'assets/products/pet-strapping-tape.jpg',
                'assets/products/box-strapping3.jpg'
            ],
            fullDescription: "Strapping rolls made from PP materials with high shining and strength, widely used in various industries and home applications for efficient binding.",
            features: [
                "Made from PP materials",
                "High shining and strength",
                "Highest strength to weight ratio",
                "Economical and efficient"
            ],
            applications: [
                "Industrial strapping",
                "Home applications",
                "Box binding",
                "Package securing"
            ],
            specifications: {
                "Width": "6mm to 19mm",
                "Thickness": "0.5mm to 1mm",
                "Length": "As per requirement",
                "Material": "PP",
                "Grades": "Fully automatic, semi automatic, manual",
                "Colors": "Natural, white opaque, coloured and printed"
            }
        },
        'air-bubble': {
            images: [
                'assets/products/bubble-film.jpg',
                'assets/products/bubble-wrap3.png'
            ],
            fullDescription: "Transparent plastic material commonly used for packing fragile items. Provides cushioning through bubbles of different sizes for various protection levels.",
            features: [
                "Transparent plastic material",
                "Multiple bubble sizes available",
                "Excellent cushioning properties",
                "Multiple layers for added protection"
            ],
            applications: [
                "Packing fragile items",
                "Electronic products protection",
                "Shock absorption during transit",
                "Sensitive object cushioning"
            ],
            specifications: {
                "Width": "up to 1.5 meter",
                "Thickness": "200 gauge to 600 gauge",
                "Material": "Transparent plastic",
                "Bubble sizes": "Multiple sizes available"
            }
        },
        'ldpe-shrink': {
            images: [
                'assets/products/ldpe-shrink-film.jpg',
                'assets/facility/bales.png',
            ],
            fullDescription: "High performance bulk packaging film providing excellent protection and stability during storage and transit. Cost effective alternative to carton or paper packaging.",
            features: [
                "High performance bulk packaging",
                "Excellent protection and stability",
                "Made from high performance LDPE granules",
                "Cost effective alternative"
            ],
            applications: [
                "Industrial wrapping",
                "Wooden planks protection",
                "Electronic goods in cartons",
                "Loose pallet loads"
            ],
            specifications: {
                "Thickness": "30mic to 75mic",
                "Width": "300mm to 1450mm (tubular)",
                "Material": "High performance LDPE granules",
                "Packaging": "Bulk packaging film"
            }
        },
        'silage-film': {
            images: [
                'assets/products/SILAGE FILM.jpg'
            ],
            fullDescription: "High performance bulk packaging film providing excellent protection and stability during storage and transit. Cost effective alternative to carton or paper packaging.",
            features: [

            ],
            applications: [

            ],
            specifications: {

            }
        },
        'upvc-roofing': {
            images: [
                '/assets/products/upvcr-2.png',
                '/assets/products/upvcr-3.png'
            ],
            fullDescription: "Durable and weather-resistant roofing solution.",
            features: [],
            applications: [],
            specifications: {

            }
        },
        'grow-bag': {
            images: [
                'assets/products/grow-bag.jpg',
                'assets/products/grow-bag2.jpg'
            ],
            fullDescription: "Durable and weather-resistant roofing solution.",
            features: [],
            applications: [],
            specifications: {

            }
        },
        'mulching-film': {
            images: [
                'assets/products/mulching-film.jpg',
                'assets/products/mulching-film2.jpg'
            ],
            fullDescription: "Specialized film for agricultural mulching applications.",
            features: [],
            applications: [],
            specifications: {

            }
        },
        'upvc-foam-sheet': {
            images: [],
            fullDescription: "Lightweight and durable foam sheet for various applications.",
            features: [],
            applications: [],
            specifications: {

            }
        },
        'edge-protector': {
            images: [
                'assets/products/ANGLE BOARDS & EDGE PROTECTORS_B.jpg',
                'assets/products/ANGLE BOARDS & EDGE PROTECTORS_.jpg'
            ],
            fullDescription: "Protective packaging solution for edges and corners.",
            features: [],
            applications: [],
            specifications: {

            }
        }
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
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Products</span>
                    </button>

                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
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
                                            className={`w-3 h-3 rounded-full transition-colors ${index === currentImageIndex
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
                                        className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${index === currentImageIndex
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
                                <div className="grid grid-cols-1 gap-2">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Shield className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
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
                                <div className="grid grid-cols-1 gap-2">
                                    {applications.map((app, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <Truck className={`w-4 h-4 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {app}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Download Catalogue and Contact Buttons */}
                        <div className="flex space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setIsDownloadModalOpen(true)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                                    isDark
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                }`}
                            >
                                <Download className="w-5 h-5" />
                                <span>Download Catalogue</span>
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className={`px-6 py-3 rounded-lg border font-semibold transition-colors ${isDark
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

            {/* Download Catalogue Modal */}
            <DownloadCatalogueModal
                isOpen={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                productName={product.name}
                isDark={isDark}
            />
        </div>
    );
};

export default ProductDetailPage;