import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationProps {
  isDark: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isDark, onClose }) => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Materials', path: '/materials' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween' }}
      className={`fixed top-0 right-0 h-full w-80 z-50 ${
        isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      } shadow-lg`}
    >
      <div className="p-6">
        <button
          onClick={onClose}
          className={`p-2 rounded-full ${
            isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <X size={20} />
        </button>
        
        <nav className="mt-8">
          <ul className="space-y-4">
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
                  className={`text-xl font-medium hover:${
                    isDark ? 'text-red-400' : 'text-red-600'
                  } transition-colors`}
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