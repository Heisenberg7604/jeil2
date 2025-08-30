import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram, ChevronRight } from 'lucide-react';

const Footer = ({ isDark }) => {
    const currentYear = new Date().getFullYear();

    // Utility function to encode address for Google Maps
    const encodeAddressForMaps = (address) => {
        return encodeURIComponent(address);
    };

    return (
        <footer className={`mt-8 ${isDark ? 'bg-gray-900 text-gray-200 shadow-lg' : 'bg-transparent text-white shadow-lg'}`}>
            {/* Main Footer */}
            <div className={`container mx-auto px-4 py-12 ${isDark ? 'bg-gray-800' : 'bg-gray-800'} rounded-t-3xl`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <img
                                src="/assets/cropped-jeil-logo.jpg"
                                alt="JEIL Logo"
                                className="w-28 h-28 object-contain"
                            />
                        </div>
                        <p className="mb-6 text-gray-400">
                            JAGANNATH EXTRUSION INDIA LTD. and PATKAR EXTRUSIONS LTD. are pioneering forces in the packaging industry, delivering innovative solutions since 1999.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Facebook size={18} />
                            </motion.a>
                            <motion.a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Twitter size={18} />
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Linkedin size={18} />
                            </motion.a>
                            <motion.a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Instagram size={18} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Products', path: '/products' },
                                { name: 'Gallery', path: '/gallery' },
                                { name: 'Contact', path: '/contact' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="flex items-center hover:text-red-400 transition-colors"
                                    >
                                        <ChevronRight size={16} className="mr-2" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate Office */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Corporate Office</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddressForMaps('C1B - 1034 to 1037 GIDC Industrial Estate, Ankleshwar - 393 002, Gujarat, INDIA')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    C1B - 1034 to 1037 GIDC Industrial Estate,
                                    Ankleshwar - 393 002, Gujarat - INDIA
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <div className="text-sm space-y-1">
                                    <div>
                                        <a
                                            href="tel:+912646221134"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 2646 221134
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="tel:+912646222163"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 2646 222163
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="tel:+912646251083"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 2646 251083
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <a
                                    href="mailto:info@jeil.in"
                                    className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    info@jeil.in
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Globe className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <a
                                    href="https://www.jeil.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    www.jeil.in
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Works: Unit-1 */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Works</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddressForMaps('Survey No: 40/1, Shed No-1, Dadra Village, Dadra Nagar Haveli, SILVASSA, U.T. Pin - 396 193, INDIA')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    Survey No: 40/1, Shed No-1,<br />
                                    Dadra Village, Dadra Nagar Haveli,<br />
                                    SILVASSA.<br />
                                    U.T. Pin - 396 193. INDIA
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <div className="text-sm space-y-1">
                                    <div>
                                        <a
                                            href="tel:+912602669408"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 260 2669408
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="tel:+912606453234"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 260 6453234
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <a
                                    href="mailto:extrusion_India@yahoo.co.in"
                                    className="text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    extrusion_India@yahoo.co.in
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Certification Badges */}
            <div className={`py-6 ${isDark ? 'bg-gray-700' : 'bg-gray-800'} border-t border-gray-600 shadow-inner`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-6">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">ISO</span>
                                </div>
                                <span className="text-sm text-gray-300">ISO 9001:2015 Certified</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold">GMP</span>
                                </div>
                                <span className="text-sm text-gray-300">GMP Certified</span>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            Committed to quality and environmental responsibility
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={`py-4 ${isDark ? 'bg-gray-900' : 'bg-black'} border-t border-gray-700`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center">
                        <p className="text-sm text-gray-500">
                            &copy; {currentYear} JEIL. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;