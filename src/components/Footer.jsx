import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Mail, Phone, MapPin, Globe, Facebook, Twitter, Linkedin, Instagram, ChevronRight } from 'lucide-react';

const Footer = ({ isDark }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`${isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-900 text-gray-200'}`}>
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <div className={`p-2 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-600'}`}>
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white">JEIL</span>
                        </div>
                        <p className="mb-6 text-gray-400">
                            JAGANNATH EXTRUSION INDIA LTD. and PATKAR EXTRUSIONS LTD. are pioneering forces in the packaging industry, delivering innovative solutions since 2010.
                        </p>
                        <div className="flex space-x-4">
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Facebook size={18} />
                            </motion.a>
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Twitter size={18} />
                            </motion.a>
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.1 }}
                                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 hover:bg-red-500' : 'bg-gray-800 hover:bg-red-600'} transition-colors`}
                            >
                                <Linkedin size={18} />
                            </motion.a>
                            <motion.a
                                href="#"
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
                                { name: 'Materials', path: '/materials' },
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

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin className="w-5 h-5 mr-3 text-red-500 flex-shrink-0 mt-1" />
                                <span>
                                    123 Industrial Area, Phase II<br />
                                    Gujarat, India 380015
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <span>+91 XXXXXXXXXX</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <span>info@jeil.in</span>
                            </li>
                            <li className="flex items-center">
                                <Globe className="w-5 h-5 mr-3 text-red-500 flex-shrink-0" />
                                <span>www.jeil.in</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold mb-6 text-white">Newsletter</h3>
                        <p className="mb-4 text-gray-400">
                            Subscribe to our newsletter to receive updates on new products, special offers, and industry insights.
                        </p>
                        <form className="space-y-3">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className={`w-full px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-800 border-gray-700'
                                        } focus:outline-none focus:ring-2 focus:ring-red-500`}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Certification Badges */}
            <div className={`py-6 ${isDark ? 'bg-gray-700' : 'bg-gray-800'}`}>
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
            <div className={`py-4 ${isDark ? 'bg-gray-900' : 'bg-black'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500">
                            &copy; {currentYear} JEIL. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-3 md:mt-0">
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-400">Privacy Policy</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-400">Terms of Service</a>
                            <a href="#" className="text-sm text-gray-500 hover:text-gray-400">Sitemap</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
