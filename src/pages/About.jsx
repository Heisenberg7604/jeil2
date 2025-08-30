import React, { useState } from 'react';
import { Factory, Award, Package, Users, Target, Leaf, Shield, Globe, X, ExternalLink, Eye, Download } from 'lucide-react';

const About = ({ isDark = false }) => {
    const [showCertificate, setShowCertificate] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const stats = [
        { label: "Years of Experience", value: "25+" },
        { label: "Yearly Production", value: "1000T+" },
        { label: "Global Clients", value: "1000+" },
        { label: "Team Members", value: "200+" }
    ];

    const values = [
        {
            icon: Target,
            title: "Excellence",
            description: "Striving for perfection in every product we deliver"
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Working together to achieve exceptional results"
        },
        {
            icon: Leaf,
            title: "Sustainability",
            description: "Committed to environmentally conscious practices"
        },
        {
            icon: Globe,
            title: "Global Impact",
            description: "Making a difference across international markets"
        }
    ];

    return (
        <div className={`min-h-screen pt-16 sm:pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Hero Section */}
            <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-10" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            About JEIL
                        </h1>
                        <p className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-12 px-4 sm:px-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            JAGANNATH EXTRUSION INDIA LTD. and PATKAR EXTRUSIONS LTD. are pioneering forces in the packaging industry,
                            delivering innovative solutions that set new standards for quality and reliability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className={`py-12 sm:py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div key={stat.label} className="text-center">
                                <p className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                    {stat.value}
                                </p>
                                <p className={`text-xs sm:text-sm px-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <h2 className={`text-2xl sm:text-3xl md:text-3xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Our Core Values
                        </h2>
                        <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            These principles guide every decision we make and every product we deliver
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <div
                                key={value.title}
                                className={`p-4 sm:p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
                            >
                                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center mb-4 sm:mb-6 mx-auto`}>
                                    <value.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                </div>
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {value.title}
                                </h3>
                                <p className={`text-center text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className={`py-12 sm:py-16 md:py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                        <div className={`p-6 sm:p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow duration-300`}>
                            <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Our Mission
                            </h2>
                            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                To understand and exceed customer requirements through timely delivery of quality-proven products at competitive prices.
                                We constantly emphasize product excellence and client satisfaction to mark our distinction in the market.
                            </p>
                        </div>

                        <div className={`p-6 sm:p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-shadow duration-300`}>
                            <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Our Vision
                            </h2>
                            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                To be the global leader in innovative packaging solutions, setting industry standards for quality,
                                sustainability, and customer satisfaction while fostering growth and excellence in everything we do.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Certifications Section with Interactive Certificate Card */}
            <section className="py-12 sm:py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Our Certifications
                        </h2>
                        <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 sm:px-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Recognized for our commitment to quality and environmental standards
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Interactive ISO Certificate Card */}
                        <div className="lg:col-span-2">
                            <div
                                className={`relative overflow-hidden rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer group`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                onClick={() => setShowCertificate(true)}
                            >
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700" />
                                </div>

                                <div className="relative p-4 sm:p-6 md:p-8">
                                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-6">
                                        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
                                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                                                <Shield className={`w-6 h-6 sm:w-8 sm:h-8 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                            </div>
                                            <div>
                                                <h3 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                    ISO 14001:2015
                                                </h3>
                                                <p className={`text-xs sm:text-sm ${isDark ? 'text-red-400' : 'text-red-600'} font-medium`}>
                                                    Environmental Management System
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className={`flex space-x-2 transform ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'} transition-all duration-300`}>
                                           
                                        </div>
                                    </div>

                                    <p className={`text-sm sm:text-base md:text-lg mb-4 sm:mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                                        Our ISO 14001:2015 certification demonstrates our commitment to environmental management 
                                        and sustainable business practices. This internationally recognized standard ensures we 
                                        minimize our environmental impact while maintaining operational excellence.
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                                        <div className="flex items-center space-x-4 sm:space-x-6">
                                            <div className="text-center">
                                                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>2015</p>
                                                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Certified Since</p>
                                            </div>
                                            <div className="text-center">
                                                <p className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>100%</p>
                                                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Compliance</p>
                                            </div>
                                        </div>
                                        
                                        <div className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'} font-medium transition-all duration-300 group-hover:bg-red-600 group-hover:text-white text-sm sm:text-base`}>
                                            View Certificate
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                                </div>
                            </div>
                        </div>

                        {/* Other Certifications */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className={`p-4 sm:p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                                <Leaf className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Environmental Management
                                </h3>
                                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Committed to sustainable practices and environmental responsibility
                                </p>
                            </div>

                            <div className={`p-4 sm:p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                                <Award className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Industry Recognition
                                </h3>
                                <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    Multiple awards for innovation and excellence in packaging solutions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Certificate Modal */}
            {showCertificate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
                    <div className={`relative w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 scale-100`}>
                        {/* Modal Header */}
                        <div className={`flex items-center justify-between p-3 sm:p-4 md:p-6 border-b ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                            <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${isDark ? 'bg-red-500/20' : 'bg-red-100'} flex items-center justify-center`}>
                                    <Shield className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                                </div>
                                <div>
                                    <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        ISO 14001:2015 Certificate
                                    </h3>
                                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        Environmental Management System
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCertificate(false)}
                                className={`p-1 sm:p-2 rounded-full hover:bg-gray-100 ${isDark ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-all duration-200`}
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                        
                        {/* Certificate Display */}
                        <div className="p-3 sm:p-4 md:p-6">
                            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-lg overflow-hidden">
                                <img
                                    src="/assets/ISO-certificate.jpg"
                                    alt="ISO 14001:2015 Certificate"
                                    className="w-full h-full object-contain bg-white"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div 
                                    className={`hidden w-full h-full items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}
                                >
                                    <div className="text-center px-4">
                                        <Shield className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                                        <h4 className={`text-base sm:text-lg font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Certificate Preview
                                        </h4>
                                        <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-3 sm:mb-4`}>
                                            Place your ISO-certificate.jpg file in the /assets/ directory
                                        </p>
                                        <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-600'} inline-block text-xs sm:text-sm`}>
                                            Path: /assets/ISO-certificate.jpg
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Modal Footer */}
                        <div className={`flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 md:p-6 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} space-y-3 sm:space-y-0`}>
                            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center sm:text-left`}>
                                Click and drag to pan • Scroll to zoom
                            </div>
                            <div className="flex space-x-2 sm:space-x-3">
                                <button className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors flex items-center space-x-1 sm:space-x-2 text-sm`}>
                                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span>Download</span>
                                </button>
                                <button
                                    onClick={() => setShowCertificate(false)}
                                    className="px-4 py-2 sm:px-6 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;