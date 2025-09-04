import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Facebook, Linkedin, Instagram, ChevronRight } from 'lucide-react';

const Footer = ({ isDark }) => {
    const currentYear = new Date().getFullYear();

    // Utility function to encode address for Google Maps
    const encodeAddressForMaps = (address) => {
        return encodeURIComponent(address);
    };

    return (
        <footer className={`mt-8 ${isDark ? 'bg-gray-900 text-gray-200 shadow-lg' : 'bg-transparent text-white shadow-lg'}`}>
            {/* Main Footer */}
            <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${isDark ? 'bg-gray-800' : 'bg-gray-800'} rounded-t-3xl`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {/* Company Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center mb-4">
                            <img
                                src="/assets/cropped-jeil-logo.png"
                                alt="JEIL Logo"
                                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain"
                            />
                        </div>
                        <p className="mb-4 sm:mb-6 text-gray-400 text-sm sm:text-base">
                            JAGANNATH EXTRUSION INDIA LTD. is a pioneering force in the packaging industry, delivering innovative solutions since 1999.
                        </p>
                        <div className="flex space-x-3 sm:space-x-4">
                            <motion.a
                                href="https://www.linkedin.com/company/jagannath-extrusion-india-limited/"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-1.5 sm:p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/jagannath_extrusion?igsh=MXY1M2g1OHk5ZmVtZg=="
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-1.5 sm:p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Instagram size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </motion.a>
                            <motion.a
                                href="https://www.facebook.com/share/1E1mivn66t/?mibextid=wwXIfr"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                className={`p-1.5 sm:p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Facebook size={16} className="sm:w-[18px] sm:h-[18px]" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-2 sm:space-y-3">
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
                                        className="flex items-center hover:text-red-400 transition-colors text-sm sm:text-base"
                                    >
                                        <ChevronRight size={14} className="mr-2 sm:w-4 sm:h-4" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Corporate Office */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Corporate Office</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li className="flex items-start">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddressForMaps('C1B - 1034 to 1037 GIDC Industrial Estate, Ankleshwar - 393 002, Gujarat, INDIA')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    C1B - 1034 to 1037 GIDC Industrial Estate,
                                    Ankleshwar - 393 002, Gujarat - INDIA
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <div className="text-xs sm:text-sm space-y-1">
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
                                            href="tel:+912261363900"
                                            className="hover:text-red-400 transition-colors cursor-pointer block"
                                        >
                                            +91 22 61363900
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
                                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0" />
                                <a
                                    href="mailto:info@jeil.in"
                                    className="text-xs sm:text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    info@jeil.in
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0" />
                                <a
                                    href="https://www.jeil.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    www.jeil.in
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Works: Unit-1 */}
                    <div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-white">Works</h3>
                        <ul className="space-y-2 sm:space-y-3">
                            <li className="flex items-start">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeAddressForMaps('Survey No: 40/1, Shed No-1, Dadra Village, Dadra Nagar Haveli, SILVASSA, U.T. Pin - 396 193, INDIA')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs sm:text-sm hover:text-red-400 transition-colors cursor-pointer"
                                >
                                    Survey No: 40/1, Shed No-1,<br />
                                    Dadra Village, Dadra Nagar Haveli,<br />
                                    SILVASSA.<br />
                                    U.T. Pin - 396 193. INDIA
                                </a>
                            </li>
                            <li className="flex items-start">
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <div className="text-xs sm:text-sm space-y-1">
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
                        </ul>
                    </div>
                </div>
            </div>

            {/* Certification Badges */}
            <div className={`py-4 sm:py-6 ${isDark ? 'bg-gray-700' : 'bg-gray-800'} border-t border-gray-600 shadow-inner`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-center md:justify-between items-center gap-4 sm:gap-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center mr-2 sm:mr-3">
                                <span className="text-white font-bold text-sm sm:text-base">ISO</span>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-300">ISO 14001:2015 Certified</span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
                            Committed to quality and environmental responsibility
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className={`py-3 sm:py-4 ${isDark ? 'bg-gray-900' : 'bg-black'} border-t border-gray-700`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-3">
                        <p className="text-xs sm:text-sm text-gray-500 text-center">
                            &copy; {currentYear} JEIL. All rights reserved.
                        </p>
                        <a
                            href="https://www.linkedin.com/in/darshan-dorik-07a300259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                            <Linkedin size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;