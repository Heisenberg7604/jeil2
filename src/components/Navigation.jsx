import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = ({ isDark, onClose }) => {
    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className={`fixed top-0 right-0 h-full w-80 sm:w-96 z-50 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } shadow-lg`}
        >
            <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                    <h2 className={`text-lg sm:text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Menu
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            } transition-colors`}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="mt-4 sm:mt-8">
                    <ul className="space-y-3 sm:space-y-4">
                        {menuItems.map((item, index) => (
                            <motion.li
                                key={item.name}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="cursor-pointer"
                            >
                                <Link
                                    to={item.path}
                                    onClick={onClose}
                                    className={`block text-lg sm:text-xl font-medium py-2 px-3 rounded-lg transition-colors hover:${isDark ? 'text-red-400 bg-gray-700' : 'text-red-600 bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </div>
        </motion.div>
    );
};

export default Navigation;
