import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sun, Moon, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Header = ({ isDark, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-800/90 text-white' : 'bg-white/90 text-gray-900'
            } backdrop-blur-md`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`p-2 rounded-full ${isDark ? 'bg-red-500' : 'bg-red-600'
                                }`}
                        >
                            <Package className="w-6 h-6 text-white" />
                        </motion.div>
                        <span className="text-xl font-bold">JEIL</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
                        <Link to="/about" className="hover:text-red-600 transition-colors">About</Link>
                        <Link to="/products" className="hover:text-red-600 transition-colors">Products</Link>
                        <Link to="/gallery" className="hover:text-red-600 transition-colors">Gallery</Link>
                        <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden p-2 rounded-full bg-gray-100"
                        >
                            <Menu size={20} />
                        </motion.button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <Navigation
                        isDark={isDark}
                        onClose={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
