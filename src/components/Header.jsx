import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from './Navigation';

const Header = ({ isDark, toggleTheme }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic blur and opacity based on scroll
    const headerOpacity = Math.min(0.95, 0.7 + scrollY * 0.002);
    const blurIntensity = Math.min(20, 8 + scrollY * 0.05);

    return (
        <>
            {/* Animated background gradient */}
            <div className="fixed top-0 left-0 right-0 h-24 z-40 pointer-events-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${isDark
                    ? 'from-slate-900/20 via-blue-900/10 to-purple-900/20'
                    : 'from-blue-50/30 via-white/20 to-purple-50/30'
                    } animate-pulse`}
                    style={{
                        animationDuration: '8s',
                        animationTimingFunction: 'ease-in-out'
                    }} />
            </div>

            <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mx-auto max-w-7xl rounded-3xl overflow-hidden relative"
                    style={{
                        background: isDark
                            ? `linear-gradient(135deg, 
                                rgba(15, 23, 42, ${headerOpacity}) 0%, 
                                rgba(30, 41, 59, ${headerOpacity * 0.9}) 50%, 
                                rgba(15, 23, 42, ${headerOpacity}) 100%)`
                            : `linear-gradient(135deg, 
                                rgba(248, 250, 252, ${headerOpacity}) 0%, 
                                rgba(241, 245, 249, ${headerOpacity * 0.9}) 50%, 
                                rgba(248, 250, 252, ${headerOpacity}) 100%)`,
                        backdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
                        WebkitBackdropFilter: `blur(${blurIntensity}px) saturate(180%)`,
                        border: isDark
                            ? '1px solid rgba(148, 163, 184, 0.15)'
                            : '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: isDark
                            ? `0 20px 40px rgba(0, 0, 0, 0.4),
                               0 8px 16px rgba(0, 0, 0, 0.2),
                               inset 0 1px 0 rgba(148, 163, 184, 0.1),
                               inset 0 -1px 0 rgba(15, 23, 42, 0.5)`
                            : `0 20px 40px rgba(0, 0, 0, 0.15),
                               0 8px 16px rgba(0, 0, 0, 0.05),
                               inset 0 1px 0 rgba(255, 255, 255, 0.4),
                               inset 0 -1px 0 rgba(203, 213, 225, 0.2)`
                    }}
                >
                    {/* Liquid glass overlay effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className={`absolute inset-0 opacity-30 ${isDark ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10'
                                : 'bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-teal-400/20'
                                }`}
                            style={{
                                background: `radial-gradient(circle at 50% 50%, 
                                    ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 0%, 
                                    transparent 50%),
                                    linear-gradient(45deg, 
                                    ${isDark ? 'rgba(168, 85, 247, 0.05)' : 'rgba(168, 85, 247, 0.1)'} 0%, 
                                    transparent 50%, 
                                    ${isDark ? 'rgba(20, 184, 166, 0.05)' : 'rgba(20, 184, 166, 0.1)'} 100%)`
                            }}
                        />

                        {/* Animated liquid bubbles */}
                        <motion.div
                            className="absolute w-32 h-32 rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.25)'
                                    } 0%, transparent 70%)`,
                                filter: 'blur(20px)',
                            }}
                            animate={{
                                x: [-50, 1200],
                                y: [10, 30, 10],
                            }}
                            transition={{
                                duration: 15,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />

                        <motion.div
                            className="absolute w-24 h-24 rounded-full"
                            style={{
                                background: `radial-gradient(circle, ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.2)'
                                    } 0%, transparent 70%)`,
                                filter: 'blur(15px)',
                            }}
                            animate={{
                                x: [1200, -50],
                                y: [20, 5, 25],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "linear",
                                delay: 7
                            }}
                        />
                    </div>

                    <div className="px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                            {/* Logo with enhanced glass effect */}
                            {/* Logo */}
                            <Link to="/" className="flex items-center cursor-pointer">
                                <motion.div whileHover={{ scale: 1.02 }}>
                                    <img
                                        src="assets/cropped-jeil-logo.jpg"
                                        alt="JEIL Logo"
                                        className="h-10 w-auto object-contain"
                                    />
                                </motion.div>
                            </Link>

                            {/* Navigation with liquid glass effect */}
                            <nav className="hidden lg:flex items-center space-x-1 relative">
                                {[
                                    { path: '/', label: 'Home' },
                                    { path: '/about', label: 'About Us' },
                                    { path: '/products', label: 'Products' },
                                    { path: '/gallery', label: 'Gallery' },
                                    { path: '/contact', label: 'Contact Us' }
                                ].map((item) => (
                                    <motion.div key={item.path} whileHover={{ y: -2 }}>
                                        <Link
                                            to={item.path}
                                            className="relative px-3 lg:px-4 py-2 rounded-xl group transition-all duration-300 text-sm lg:text-base"
                                        >
                                            <span className={`relative z-10 font-medium transition-colors duration-300 ${location.pathname === item.path
                                                ? 'text-red-400'
                                                : (isDark ? 'text-slate-300 group-hover:text-red-400' : 'text-slate-700 group-hover:text-red-600')
                                                }`}>
                                                {item.label}
                                            </span>

                                            {/* Active indicator with layoutId for smooth transitions */}
                                            {location.pathname === item.path && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className="absolute inset-0 rounded-xl"
                                                    style={{
                                                        background: isDark
                                                            ? 'rgba(239, 68, 68, 0.15)'
                                                            : 'rgba(239, 68, 68, 0.2)'
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 500,
                                                        damping: 30
                                                    }}
                                                />
                                            )}

                                            {/* Hover glass effect */}
                                            <motion.div
                                                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    background: `linear-gradient(135deg, 
                                                        ${isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(255, 255, 255, 0.3)'} 0%, 
                                                        transparent 100%)`,
                                                    backdropFilter: 'blur(8px)',
                                                    WebkitBackdropFilter: 'blur(8px)',
                                                    border: isDark
                                                        ? '1px solid rgba(148, 163, 184, 0.1)'
                                                        : '1px solid rgba(255, 255, 255, 0.2)'
                                                }}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Controls with enhanced glass styling */}
                            <div className="flex items-center space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleTheme}
                                    className="relative p-2 sm:p-3 rounded-2xl group transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, 
                                            ${isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(255, 255, 255, 0.25)'} 0%, 
                                            ${isDark ? 'rgba(71, 85, 105, 0.1)' : 'rgba(241, 245, 249, 0.3)'} 100%)`,
                                        backdropFilter: 'blur(12px) saturate(150%)',
                                        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                                        border: isDark
                                            ? '1px solid rgba(148, 163, 184, 0.15)'
                                            : '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: isDark
                                            ? `0 4px 16px rgba(0, 0, 0, 0.3),
                                               inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                                            : `0 4px 16px rgba(0, 0, 0, 0.1),
                                               inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                                    }}
                                >
                                    <motion.div
                                        animate={{ rotate: isDark ? 0 : 180 }}
                                        transition={{ duration: 0.5 }}
                                        className={isDark ? 'text-yellow-400' : 'text-slate-600'}
                                    >
                                        {isDark ? (
                                            <Sun size={16} className="sm:w-[18px] sm:h-[18px]" />
                                        ) : (
                                            <Moon size={16} className="sm:w-[18px] sm:h-[18px] rotate-180" />
                                            // or try scale-y-[-1] instead of rotate-180
                                        )}
                                    </motion.div>



                                    {/* Inner highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsMenuOpen(true)}
                                    className="lg:hidden relative p-2 sm:p-3 rounded-2xl group transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, 
                                            ${isDark ? 'rgba(148, 163, 184, 0.1)' : 'rgba(255, 255, 255, 0.25)'} 0%, 
                                            ${isDark ? 'rgba(71, 85, 105, 0.1)' : 'rgba(241, 245, 249, 0.3)'} 100%)`,
                                        backdropFilter: 'blur(12px) saturate(150%)',
                                        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                                        border: isDark
                                            ? '1px solid rgba(148, 163, 184, 0.15)'
                                            : '1px solid rgba(255, 255, 255, 0.3)',
                                        boxShadow: isDark
                                            ? `0 4px 16px rgba(0, 0, 0, 0.3),
                                               inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                                            : `0 4px 16px rgba(0, 0, 0, 0.1),
                                               inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                                    }}
                                >
                                    <Menu size={16} className={`sm:w-[18px] sm:h-[18px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />

                                    {/* Inner highlight */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom liquid wave effect */}
                    <div className="absolute inset-x-0 bottom-0 h-20 overflow-hidden">
                        {/* Base liquid layer */}
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(180deg, 
                                    transparent 0%, 
                                    ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 50%, 
                                    ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)'} 100%)`,
                                filter: 'blur(1px)',
                            }}
                            animate={{
                                background: [
                                    `linear-gradient(180deg, transparent 0%, 
                                        ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 50%, 
                                        ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)'} 100%)`,
                                    `linear-gradient(180deg, transparent 0%, 
                                        ${isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.15)'} 50%, 
                                        ${isDark ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.15)'} 100%)`,
                                    `linear-gradient(180deg, transparent 0%, 
                                        ${isDark ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.15)'} 50%, 
                                        ${isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 100%)`
                                ]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Liquid wave pattern */}
                        <svg
                            className="absolute bottom-0 w-full h-full"
                            viewBox="0 0 1200 80"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                d="M0,40 Q300,10 600,40 T1200,40 L1200,80 L0,80 Z"
                                fill={isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(255, 255, 255, 0.2)'}
                                animate={{
                                    d: [
                                        "M0,40 Q300,10 600,40 T1200,40 L1200,80 L0,80 Z",
                                        "M0,50 Q300,20 600,50 T1200,50 L1200,80 L0,80 Z",
                                        "M0,45 Q300,15 600,45 T1200,45 L1200,80 L0,80 Z",
                                        "M0,40 Q300,10 600,40 T1200,40 L1200,80 L0,80 Z"
                                    ]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </svg>

                        {/* Additional glass distortion layer */}
                        <div
                            className="absolute inset-0 mix-blend-overlay"
                            style={{
                                background: 'radial-gradient(ellipse at center bottom, rgba(255,255,255,0.1) 0%, transparent 60%)',
                                backdropFilter: 'blur(2px)',
                                WebkitBackdropFilter: 'blur(2px)'
                            }}
                        />
                    </div>

                    {/* Subtle light refraction lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-0 left-1/4 w-px h-full opacity-20"
                            style={{
                                background: `linear-gradient(to bottom, 
                                    transparent, 
                                    ${isDark ? 'rgba(148, 163, 184, 0.3)' : 'rgba(255, 255, 255, 0.5)'}, 
                                    transparent)`
                            }}
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute top-0 right-1/3 w-px h-full opacity-15"
                            style={{
                                background: `linear-gradient(to bottom, 
                                    transparent, 
                                    ${isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(255, 255, 255, 0.4)'}, 
                                    transparent)`
                            }}
                            animate={{ x: [0, -15, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        />
                    </div>
                </motion.div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <Navigation
                        isDark={isDark}
                        onClose={() => setIsMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;