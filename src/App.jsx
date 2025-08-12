import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Materials from './pages/Materials';
import NotFoundPage from './components/NotFoundPage';

function App() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <Router>
            <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
                }`}>
                <Header isDark={isDark} toggleTheme={toggleTheme} />

                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Home isDark={isDark} />
                            </motion.div>
                        } />
                        <Route path="/about" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <About isDark={isDark} />
                            </motion.div>
                        } />
                        <Route path="/products" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Products isDark={isDark} />
                            </motion.div>
                        } />
                        <Route path="/gallery" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Gallery isDark={isDark} />
                            </motion.div>
                        } />
                        <Route path="/contact" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Contact isDark={isDark} />
                            </motion.div>
                        } />
                        <Route path="/materials" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Materials isDark={isDark} />
                            </motion.div>
                        } />
                        
                        {/* 404 Not Found Route - Must be last */}
                        <Route path="*" element={
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <NotFoundPage isDark={isDark} />
                            </motion.div>
                        } />
                    </Routes>
                </AnimatePresence>

                <Footer isDark={isDark} />
            </div>
        </Router>
    );
}

export default App;
